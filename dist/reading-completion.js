/* Completion for the added readings; legacy controls keep their original storage. */
(() => {
  'use strict';
  const button = document.querySelector('[data-reading-complete]');
  if (!button) return;
  const note = document.getElementById('complete-note');
  const key = button.dataset.storageKey;
  const show = saved => {
    button.textContent = 'Bacaan sudah ditandai selesai ✓';
    button.setAttribute('aria-pressed', 'true');
    note.textContent = saved
      ? 'Kemajuan tersimpan di peramban ini. Kamu dapat kembali membaca dan berlatih kapan saja.'
      : 'Bacaan sudah ditandai selesai. Kemajuan belum dapat disimpan di peramban ini.';
  };
  try { if (localStorage.getItem(key) === 'yes') show(true); } catch {}
  button.addEventListener('click', () => {
    let saved = false;
    try { localStorage.setItem(key, 'yes'); saved = true; } catch {}
    show(saved);
  });
})();
