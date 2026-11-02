/* ==========================================================================
   Browser half of the whitepaper's password protection (encrypting half:
   scripts/whitepaper/lock.mjs). Derives the AES key from what the reader types, decrypts the
   paper into the page, and decrypts the PDF on demand. The password is kept
   in sessionStorage, so it lasts for this tab and is gone when it closes.
   ========================================================================== */
const KEY = 'trace-whitepaper-pw';
const enc = new TextEncoder();
const unb64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

const remember = {
  get() { try { return sessionStorage.getItem(KEY); } catch { return null; } },
  set(v) { try { sessionStorage.setItem(KEY, v); } catch { /* private mode: ask again next time */ } },
  clear() { try { sessionStorage.removeItem(KEY); } catch { /* ignore */ } },
};

async function deriveKey(password, salt, iterations) {
  const base = await crypto.subtle.importKey('raw', enc.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, base,
    { name: 'AES-GCM', length: 256 }, false, ['decrypt']);
}

/* Resolves to { body, toc }, or throws if the password is wrong. */
async function openText(envelope, password) {
  const key = await deriveKey(password, unb64(envelope.salt), envelope.iter);
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: unb64(envelope.iv) }, key, unb64(envelope.ct));
  return JSON.parse(new TextDecoder().decode(plain));
}

/* Every "Download the PDF" button (top and bottom) shares one decryption. */
function pdfDownloads(buttons, password, iterations) {
  let blobUrl = null;
  for (const button of buttons) {
    button.hidden = false;
    button.addEventListener('click', async () => {
      const { src, name } = button.dataset;
      if (!blobUrl) {
        const label = button.firstChild.textContent;
        button.disabled = true;
        button.firstChild.textContent = 'Preparing the PDF… ';
        try {
          const buf = new Uint8Array(await (await fetch(src)).arrayBuffer());
          const key = await deriveKey(password, buf.slice(0, 16), iterations);
          const pdf = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: buf.slice(16, 28) }, key, buf.slice(28));
          blobUrl = URL.createObjectURL(new Blob([pdf], { type: 'application/pdf' }));
        } catch (err) {
          console.warn('whitepaper: could not prepare the PDF', err);
          button.firstChild.textContent = 'Download failed, try again ';
          button.disabled = false;
          return;
        }
        button.firstChild.textContent = label;
        button.disabled = false;
      }
      const a = document.createElement('a');
      a.href = blobUrl; a.download = name;
      document.body.append(a); a.click(); a.remove();
    });
  }
}

/* Wire the lock form. `onOpen` runs once the paper is in the page. */
export function setupLock(onOpen) {
  const data = document.getElementById('paper-locked');
  const form = document.getElementById('lock-form');
  if (!data || !form) return;
  const envelope = JSON.parse(data.textContent || 'null');
  const input = form.querySelector('input');
  const msg = form.querySelector('.lock__msg');
  const button = form.querySelector('button');

  async function attempt(password, fromStorage) {
    if (!envelope) { msg.textContent = 'This paper is not available yet.'; return; }
    button.disabled = true;
    msg.textContent = 'Unlocking…';
    try {
      const { body, toc } = await openText(envelope, password);
      remember.set(password);
      document.querySelector('.paper__body').innerHTML = body;
      document.querySelector('.paper__toc nav').innerHTML = toc;
      document.querySelector('.paper__side').hidden = false;
      document.querySelector('.paper').classList.remove('paper--locked');
      pdfDownloads(document.querySelectorAll('.pdf-download'), password, envelope.iter);
      onOpen();
      // A reader who arrived on a deep link (#sec:…) lands on it now.
      if (location.hash) document.getElementById(decodeURIComponent(location.hash.slice(1)))?.scrollIntoView();
      else if (!fromStorage) document.querySelector('.paper')?.scrollIntoView();
    } catch {
      if (fromStorage) { remember.clear(); msg.textContent = ''; }
      else { msg.textContent = 'That password did not work. Check it and try again.'; input.select(); }
      button.disabled = false;
    }
  }

  form.addEventListener('submit', (e) => { e.preventDefault(); if (input.value) attempt(input.value.trim(), false); });
  const saved = remember.get();
  if (saved) attempt(saved, true);
}
