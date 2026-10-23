# Fondasi Matematika

- Website: https://itera-bermatika.github.io/fondasi-matematika/
- Portal bahan belajar: https://itera-bermatika.github.io/
- Repositori: https://github.com/itera-bermatika/fondasi-matematika

Bacaan interaktif berbahasa Indonesia untuk membantu mahasiswa membangun
kembali fondasi matematika. Saat ini tersedia 51 halaman belajar dalam sembilan kelompok materi,
dengan eksplorasi, latihan, pembahasan, dan MathJax berfont STIX Two.

## Menjalankan di komputer

Dari folder proyek, jalankan:

```sh
python -m http.server 8000 --directory dist
```

Buka `http://localhost:8000`. Hindari membuka berkas HTML secara langsung
melalui alamat `file://`, karena pemuatan komponen matematika dapat dibatasi
oleh browser. Tidak diperlukan pemasangan paket untuk website ini.

## Menerbitkan dengan GitHub Pages

1. Simpan proyek dalam repositori GitHub dengan cabang `main`.
2. Untuk GitHub Free, gunakan repositori publik. Sumber dan isi bacaan dapat
   dilihat publik; jangan menyimpan data pribadi mahasiswa atau kredensial.
3. Pada **Settings → Pages → Build and deployment → Source**, pilih
   **GitHub Actions**.
4. Jalankan workflow **Terbitkan bacaan ke GitHub Pages**, atau dorong perubahan
   ke `main`. Workflow memeriksa berkas lalu menerbitkan isi folder `dist`.
5. Tautan hasil publikasi tersedia pada **Settings → Pages** dan hasil workflow.

Alamat proyek biasanya berbentuk `https://nama-akun.github.io/nama-repositori/`.
Komponen MathJax menggunakan alamat relatif terhadap proyek, sehingga dapat
dimuat baik pada domain utama maupun di bawah nama repositori.

## Menulis dan memeriksa materi

- Edit bacaan dan aktivitas pada `dist/`.
- Pedoman penulisan rumus tersedia dalam [MATH-AUTHORING.md](MATH-AUTHORING.md).
- Jalankan `python scripts/check-site.py` sebelum menerbitkan.
- Periksa tampilan pada smartphone dan coba aktivitas yang diubah.

Catatan dan kemajuan belajar saat ini disimpan pada browser masing-masing,
bukan dalam database akun. Berpindah domain tidak memindahkan catatan browser
secara otomatis. GitHub Pages melayani berkas statis; komputasi SageMath atau
penyimpanan terpusat memerlukan layanan terpisah.

MathJax dan data font disertakan pada `dist/vendor/`; pertahankan lisensi
pihak ketiga yang menyertainya. Metadata hosting lama pada `.openai/` tidak
digunakan oleh workflow GitHub Pages dan tidak masuk ke berkas website publik.

## Uji coba mahasiswa

Panduan dan formulir: [uji-coba.html](https://itera-bermatika.github.io/fondasi-matematika/uji-coba.html). Halaman pendukung ini berada di luar 51 halaman materi.
Formulir menyimpan draf di browser dan mengunduh teks; tidak mengumpulkan tanggapan ke server. Jangan memasukkan tanggapan mahasiswa ke repositori publik.
Panduan pelaksanaan: `dist/panduan-uji-coba.md`; lembar pengamatan: `dist/lembar-pengamatan.csv`.

Peta penyelarasan 18 bab buku: [peta-buku.html](https://itera-bermatika.github.io/fondasi-matematika/peta-buku.html). Peta buku dan halaman uji coba adalah halaman pendukung, di luar jumlah bacaan.

Latihan penghubung: `dist/latihan-lintas-bab.html` (12 soal, empat paket). Tinjauan ulang cakupan dan batasnya: `docs/TINJAUAN-PENYELARASAN-2026-10-21.md`.

## Urutan navigasi

`reading-order.json` adalah acuan urutan 51 bacaan/latihan. Urutan tautan pada peta di `dist/app.js` harus sama. Setelah mengubah urutan atau menambah halaman, jalankan `python scripts/sync-navigation.py`, lalu `python scripts/sync-navigation.py --check` dan `python scripts/check-site.py`.

Tombol kanan atas pada bacaan selalu menuju bacaan berikutnya, sesuai tautan bawah. Judul tujuan tersedia pada label aksesibilitas dan tooltip. Beranda dan halaman pendukung memulai dari bacaan pertama; saat beranda menampilkan bacaan kesetaraan, tombol berubah mengikuti posisi bacaan itu. Halaman latihan terakhir kembali ke peta belajar. Halaman pendukung dideklarasikan terpisah dan tidak menambah urutan materi.

Menu peta tetap terlihat pada ponsel, dengan label ringkas “Peta”. Prasyarat dan bacaan tambahan tetap ditautkan pada isi bacaan, bukan dijadikan tujuan tombol Lanjut.

## Keseragaman tampilan

Header seluruh halaman memakai identitas ITERA BERMATIKA, judul bahasan pada baris kedua, ikon P dengan bentuk yang sama dengan bacaan Grup/Ring, dan tautan Beranda ITERA ke landing page organisasi. Menu Peta belajar tetap terlihat pada ponsel.

`python scripts/sync-navigation.py` juga melengkapi kerangka dua kolom dan daftar isi bagi halaman tambahan yang belum mempunyai menu samping. Pada ponsel daftar isi menjadi deretan tautan yang dapat digeser. Tautan konteks buku harus berada dalam `.book-context` di dalam artikel, bukan `<aside class="wrap">` yang menjadi kolom ketiga dan ikut melekat saat menggulir. Aturan tampilan bersama berada di `dist/navigation.css`; halaman cukup memuat satu salinan stylesheet ini. Detail audit: `docs/AUDIT-TAMPILAN-2026-10-23.md`.

## Footer dan penutup bacaan

Seluruh halaman memakai footer bersama: nama dan institusi, identitas Bacaan Prekalkulus, lalu Kirim koreksi ke issues repositori ini. Pola mengikuti footer Grup/Ring tanpa menyalin nomor versi atau nama jilidnya. Dua tautan sumber pendamping pada beranda tetap tersedia sebelum footer.

Navigasi akhir memakai label kecil Sebelumnya/Selanjutnya dan judul tujuan, dengan garis pemisah seperti Grup/Ring. Blok ini selalu menjadi elemen terakhir artikel, setelah konteks buku dan tautan tambahan. Pada layar sampai 400 piksel kedua tujuan disusun vertikal. Halaman pendukung memakai Kembali ke peta dan Mulai membaca. Aturan dibuat oleh `scripts/sync-navigation.py` dan diperiksa bersama pengujian navigasi.

## Kelengkapan penutup setiap materi

Seluruh 51 halaman materi mempunyai tepat satu blok `.reading-completion`, diikuti navigasi akhir sebagai anak langsung artikel utama. Sebelas materi tambahan memakai `dist/reading-completion.js` dengan kunci penyimpanan terpisah per halaman; 40 materi lama tetap memakai pengendali dan kunci penyimpanan sebelumnya. Halaman pendukung tidak diberi penanda selesai materi.

Generator membaca pasangan tag artikel secara seimbang, termasuk kartu contoh berbentuk artikel bersarang. Jangan mencari batas artikel dengan pola yang berhenti pada penutup artikel pertama. Pengujian mencegah navigasi masuk ke kartu contoh, memeriksa kelengkapan tombol pada seluruh materi, dan memeriksa pemulihan status selesai serta kegagalan penyimpanan browser.

## Integrasi pengayaan dan MathJax

Daftar bacaan pada setiap bab di `dist/peta-buku.html` menjadi acuan tautan dua arah: generator menampilkan seluruh bacaan terkait di Pengayaan Buku dan kotak pengayaan bab terkait pada setiap bacaan. Operasi pecahan disertakan pada Bab 2. Latihan Lintas Bab menautkan pengayaan umum karena mencakup beberapa bab. Setelah mengubah pemetaan, jalankan generator dan pemeriksa navigasi agar kedua arah diperbarui bersama.

`pengayaan-buku.html` memakai MathJax lokal yang sama dengan bacaan lain. Notasi eksplisit pada konteks, label, pertanyaan, penjelasan dan refleksi disimpan sebagai `data-tex` dalam data bab. Nilai penggeser, hasil, dan tabel dibuat ulang sebagai notasi MathJax saat interaksi. `formatNumberTex` membedakan koma desimal Indonesia dari spasi pemisah ribuan untuk TeX; kolom prediksi tetap menerima angka biasa dengan koma atau titik desimal. Perhitungan dan kunci refleksi tetap dipertahankan.
