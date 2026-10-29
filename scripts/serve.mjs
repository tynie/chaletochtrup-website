/**
 * Minimaler statischer Server fuer die lokale Vorschau von dist/ (ohne
 * Abhaengigkeiten). Aufruf: node scripts/serve.mjs [port]
 *
 * Vorschau ohne chayns-Host: http://localhost:5173/?mock=1
 * (Mock-Modus, siehe src/dev/mockMode.ts). Ohne ?mock=1 wartet chayns-api
 * auf einen chayns-Host und rendert nichts.
 */
import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';
import { resolve, dirname, extname, join, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const port = Number(process.argv[2] ?? process.env.PORT ?? 5173);

const TYPES = {
    '.html': 'text/html; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.map': 'application/json; charset=utf-8',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.webp': 'image/webp',
};

/** Pfad relativ zu dist/ aufloesen; alles ausserhalb von dist/ wird abgewiesen. */
function resolveFile(pathname) {
    const relative = pathname === '/' ? 'index.html' : decodeURIComponent(pathname).replace(/^\/+/, '');
    const file = resolve(root, relative);
    if (file !== root && !file.startsWith(root + sep)) return null;
    return file;
}

createServer(async (req, res) => {
    const url = new URL(req.url ?? '/', 'http://localhost');
    const file = resolveFile(url.pathname);
    try {
        if (!file) throw new Error('outside root');
        const body = await readFile(file);
        res.writeHead(200, {
            'content-type': TYPES[extname(file)] ?? 'application/octet-stream',
            'cache-control': 'no-cache',
        });
        res.end(body);
    } catch {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end('Not found');
    }
}).listen(port, () => {
    console.log(`Vorschau: http://localhost:${port}/?mock=1  (dist: ${join(root)})`);
});
