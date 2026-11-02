/* ==========================================================================
   Encrypt the whitepaper for publication while it is password-protected.
   --------------------------------------------------------------------------
   Usage (from web/):  node scripts/whitepaper/lock.mjs [password-file]
   build.sh runs this after regenerating the paper, when web/.whitepaper-
   password exists. The password file defaults to web/.whitepaper-password
   (git-ignored). Change the password by editing that file and rerunning.

   The repository is public, so the plain paper (src/papers/hybrid-workforces/
   body.html, toc.html, whitepaper.pdf) is git-ignored and only this script's
   output is committed:
     src/papers/hybrid-workforces/locked.json          body + contents
     public/media/hybrid-workforces/<name>.pdf.enc     the PDF
   Both are AES-256-GCM under a PBKDF2-SHA256 key; the page decrypts them in
   the browser (src/papers/hybrid-workforces/unlock.js).
   ========================================================================== */
import { readFileSync, writeFileSync } from 'node:fs';
import { webcrypto as crypto } from 'node:crypto';

const ITERATIONS = 600_000; // OWASP's 2023 figure for PBKDF2-SHA256
const PDF_NAME = 'designing-for-hybrid-human-ai-workforces.pdf';
const SRC = 'src/papers/hybrid-workforces';

const password = readFileSync(process.argv[2] || '.whitepaper-password', 'utf8').trim();
if (password.length < 12) { console.error('lock.mjs: use a password of 12+ characters'); process.exit(1); }

const salt = crypto.getRandomValues(new Uint8Array(16));
const base = await crypto.subtle.importKey('raw', new TextEncoder().encode(password), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations: ITERATIONS },
  base, { name: 'AES-GCM', length: 256 }, false, ['encrypt']);
const seal = async (data) => {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  return { iv, ct: new Uint8Array(await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, data)) };
};
const b64 = (u) => Buffer.from(u).toString('base64');

const body = readFileSync(`${SRC}/body.html`, 'utf8');
const toc = readFileSync(`${SRC}/toc.html`, 'utf8');
const pdf = readFileSync(`${SRC}/whitepaper.pdf`);

const text = await seal(new TextEncoder().encode(JSON.stringify({ body, toc })));
writeFileSync(`${SRC}/locked.json`, JSON.stringify({
  v: 1, iter: ITERATIONS, salt: b64(salt), iv: b64(text.iv), ct: b64(text.ct), pdfBytes: pdf.length,
}) + '\n');

// The PDF blob: salt (16) | iv (12) | ciphertext.
const sealed = await seal(new Uint8Array(pdf));
const out = new Uint8Array(28 + sealed.ct.length);
out.set(salt, 0); out.set(sealed.iv, 16); out.set(sealed.ct, 28);
writeFileSync(`public/media/hybrid-workforces/${PDF_NAME}.enc`, out);

console.log(`lock.mjs: wrote ${SRC}/locked.json and public/media/hybrid-workforces/${PDF_NAME}.enc`);
