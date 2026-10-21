# Fondasi Matematika

- Website: https://itera-bermatika.github.io/fondasi-matematika/
- Portal bahan belajar: https://itera-bermatika.github.io/
- Repositori: https://github.com/itera-bermatika/fondasi-matematika

Bacaan interaktif berbahasa Indonesia untuk membantu mahasiswa membangun
kembali fondasi matematika. Saat ini tersedia 50 halaman belajar dalam sembilan kelompok materi,
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

Panduan dan formulir: [uji-coba.html](https://itera-bermatika.github.io/fondasi-matematika/uji-coba.html). Halaman pendukung ini berada di luar 50 halaman materi.
Formulir menyimpan draf di browser dan mengunduh teks; tidak mengumpulkan tanggapan ke server. Jangan memasukkan tanggapan mahasiswa ke repositori publik.
Panduan pelaksanaan: `dist/panduan-uji-coba.md`; lembar pengamatan: `dist/lembar-pengamatan.csv`.

Peta penyelarasan 18 bab buku: [peta-buku.html](https://itera-bermatika.github.io/fondasi-matematika/peta-buku.html). Peta buku dan halaman uji coba adalah halaman pendukung, di luar jumlah bacaan.
