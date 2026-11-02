/* The whitepaper is password-protected while this is false: the repository
   (which is public) and the site carry only the encrypted paper
   (locked.json and public/media/hybrid-workforces/*.pdf.enc, made by
   scripts/whitepaper/lock.mjs), the page is noindex and out of the sitemap.

   To publish openly: commit body.html, toc.html and whitepaper.pdf (remove
   them from web/.gitignore) and set this to true. */
export const WHITEPAPER_PUBLIC = false;
