(() => {
  'use strict';
  const key = 'fondasi-pilot-v1';
  const form = document.querySelector('#pilot-form');
  const ratings = [
    ['language','Bahasa penjelasannya mudah saya pahami.'],
    ['terms','Istilah baru dijelaskan saat saya membutuhkannya.'],
    ['examples','Contoh membantu saya memahami alasannya.'],
    ['activity','Saya memahami apa yang harus dilakukan pada aktivitas interaktif.'],
    ['feedback','Tanggapan latihan membantu saya memperbaiki pemahaman.'],
    ['navigation','Saya mudah menemukan bacaan dan bagian yang dibutuhkan.'],
    ['math','Rumus dan simbol matematika terbaca dengan jelas.'],
    ['screen','Tampilan nyaman digunakan pada perangkat saya.']
  ];
  const options = ['1 · Sangat tidak setuju','2 · Tidak setuju','3 · Netral','4 · Setuju','5 · Sangat setuju','Belum mencoba / tidak dapat menilai'];
  for (const [name,title] of ratings) {
    const fieldset = document.createElement('fieldset');
    const legend = document.createElement('legend'); legend.textContent = title;
    const row = document.createElement('div'); row.className = 'rating-row';
    options.forEach((label,index) => {
      const wrapper = document.createElement('label'); wrapper.className = 'rating-choice';
      const input = document.createElement('input'); input.type = 'radio'; input.name = name;
      input.value = index === 5 ? 'na' : String(index + 1);
      wrapper.append(input,document.createTextNode(label));row.append(wrapper);
    });
    fieldset.append(legend,row);document.querySelector('#pilot-ratings').append(fieldset);
  }
  const labels = {participant:'Kode peserta',lesson:'Bacaan',device:'Perangkat',browser:'Browser',duration:'Durasi (menit)',...Object.fromEntries(ratings),learned:'Gagasan yang lebih dipahami',confusing:'Bagian yang membingungkan',problem:'Masalah tampilan atau tombol',priority:'Prioritas perbaikan'};
  const controls = [...form.querySelectorAll('input,select,textarea[name]')];
  function read() { return Object.fromEntries(new FormData(form).entries()); }
  function text() {
    const values = read();
    return 'MASUKAN UJI COBA FONDASI MATEMATIKA\nVersi formulir: 21 Oktober 2026\nTidak memuat penilaian kelulusan.\n\n' + Object.entries(labels).map(([name,label]) => {
      const value = values[name];
      const answer = ratings.some(([id]) => id === name) && value ? (value === 'na' ? options[5] : options[Number(value)-1]) : value;
      return label + '\n' + (answer || '(tidak diisi)');
    }).join('\n\n') + '\n';
  }
  function preview() { document.querySelector('#response-preview').value = text(); }
  let usableStorage = true;
  try {
    const saved = JSON.parse(localStorage.getItem(key) || 'null');
    if (saved && saved.version === 1 && saved.answers && typeof saved.answers === 'object') {
      for (const element of controls) {
        const value = saved.answers[element.name];
        if (typeof value !== 'string') continue;
        if (element.type === 'radio') element.checked = element.value === value;
        else element.value = value.slice(0,element.maxLength > 0 ? element.maxLength : 3000);
      }
    }
  } catch { usableStorage = false; }
  const saveStatus = document.querySelector('#pilot-save');
  saveStatus.textContent = usableStorage ? 'Draf disimpan di peramban ini bila kamu mengubah isian.' : 'Draf tidak dapat dimuat. Unduh atau salin tanggapan sebelum meninggalkan halaman.';
  function update() {
    preview();document.querySelector('#export-status').textContent = '';
    try { localStorage.setItem(key,JSON.stringify({version:1,answers:read()}));saveStatus.textContent = 'Draf tersimpan di peramban ini. Belum terkirim kepada pengajar.'; }
    catch { saveStatus.textContent = 'Draf belum dapat disimpan. Unduh atau salin tanggapan sebelum meninggalkan halaman.'; }
  }
  form.addEventListener('input',update); form.addEventListener('change',update);
  form.addEventListener('submit',event => {
    event.preventDefault();preview();
    const url = URL.createObjectURL(new Blob(['\ufeff',text()],{type:'text/plain;charset=utf-8'}));
    const link = document.createElement('a');link.href = url;link.download = 'masukan-fondasi-matematika.txt';
    document.body.append(link);link.click();link.remove();setTimeout(() => URL.revokeObjectURL(url),30000);
    document.querySelector('#export-status').textContent = 'Unduhan diminta. Periksa folder unduhan; tanggapan belum terkirim. Jika unduhan tidak tersedia, gunakan salinan teks.';
  });
  document.querySelector('#copy-response').addEventListener('click',async () => {
    preview();
    try { await navigator.clipboard.writeText(text());document.querySelector('#export-status').textContent = 'Tanggapan disalin. Tempelkan pada media yang disepakati dengan pengajar; belum terkirim otomatis.'; }
    catch { const area = document.querySelector('#response-preview');area.closest('details').open = true;area.focus();area.select();document.querySelector('#export-status').textContent = 'Penyalinan otomatis tidak tersedia. Salin teks pratinjau secara manual.'; }
  });
  document.querySelector('#clear-pilot').addEventListener('click',() => {
    form.reset();preview();document.querySelector('#export-status').textContent = '';
    try { localStorage.removeItem(key);saveStatus.textContent = 'Draf formulir ini dihapus. Jawaban latihan tidak diubah.'; }
    catch { saveStatus.textContent = 'Isian sudah dikosongkan, tetapi draf peramban belum dapat dihapus.'; }
  });
  preview();
})();
