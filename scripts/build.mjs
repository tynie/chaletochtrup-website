/**
 * Lokaler Build (esbuild) fuer Vorschau und Typ-/Bundle-Pruefung.
 *
 * In der chayns.codes-IDE wird NICHT dieses Skript verwendet, sondern der
 * Bundler der IDE-Vorlage; dort wird nur der Inhalt von src/ uebernommen
 * (siehe README.md). Dieses Skript baut src/index.tsx zu dist/index.js,
 * kopiert src/index.html nach dist/ und die Bilder aus media/ nach
 * dist/media/, damit die Seite lokal im Browser (npm run serve, Mock-Modus)
 * getestet werden kann.
 *
 * Aufruf: node scripts/build.mjs [--watch]
 */
import * as esbuild from 'esbuild';
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const watch = process.argv.includes('--watch');
const outdir = resolve(root, 'dist');

/** @type {import('esbuild').BuildOptions} */
const options = {
    bundle: true,
    format: 'iife',
    platform: 'browser',
    target: 'es2020',
    entryPoints: { index: resolve(root, 'src/index.tsx') },
    outdir,
    entryNames: '[name]',
    jsx: 'automatic',
    define: { 'process.env.NODE_ENV': '"production"' },
    legalComments: 'none',
    minify: !watch,
    sourcemap: watch,
    logLevel: 'info',
};

/**
 * src/index.html enthaelt bewusst keinen Script-Tag (die chayns.codes-IDE
 * fuegt ihren eigenen ein, siehe Kommentar dort); fuer die lokale Vorschau
 * wird er hier ergaenzt.
 */
function copyStatic() {
    mkdirSync(outdir, { recursive: true });
    const html = readFileSync(resolve(root, 'src/index.html'), 'utf8').replace(
        '</body>',
        '    <script src="index.js"></script>\n</body>',
    );
    writeFileSync(resolve(outdir, 'index.html'), html);
    const media = resolve(root, 'media');
    if (existsSync(media)) cpSync(media, resolve(outdir, 'media'), { recursive: true });
}

async function run() {
    if (!watch) rmSync(outdir, { recursive: true, force: true });
    copyStatic();
    if (watch) {
        const ctx = await esbuild.context(options);
        await ctx.watch();
        console.log('Watching for changes ...');
    } else {
        await esbuild.build(options);
        console.log('Build fertig: dist/');
    }
}

run().catch((err) => {
    console.error(err);
    process.exit(1);
});
