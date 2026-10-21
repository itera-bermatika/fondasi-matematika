# Audit urutan navigasi — 21 Oktober 2026

## Temuan

Seluruh 53 dokumen HTML diperiksa: 51 halaman bacaan/latihan dan dua halaman pendukung. Pada 41 halaman belajar, tombol kanan atas sebelumnya merupakan pintasan ke prasyarat/bacaan lain, bukan tujuan berikutnya sesuai urutan bawah. Sepuluh halaman belajar belum mempunyai tombol tersebut. Beranda memulai bacaan kesetaraan meskipun tombol mulai utama dan peta dimulai dari bilangan. Label dan urutan tautan bawah juga belum seragam.

Tautan tersebut umumnya menuju berkas yang sah; masalah utamanya adalah fungsi tombol yang tidak konsisten. Daftar target sebelum perbaikan disimpan dalam NAVIGATION-AUDIT-BASELINE.json.

## Aturan yang diterapkan

- Tombol kanan atas bacaan adalah “Lanjut →” dan menuju tujuan yang sama dengan tautan Lanjut di bawah. Label aksesibilitas serta tooltip menyebut judul lengkap tujuan.
- Navigasi bawah selalu Kembali kemudian Lanjut, menggunakan satu urutan dari reading-order.json, sama dengan urutan di peta belajar.
- Beranda dan halaman pendukung memakai “Mulai →” menuju Bilangan dan Garis Bilangan.
- Saat index.html menampilkan bacaan kesetaraan, tombol berubah menjadi Lanjut ke Variabel dan Ekspresi Aljabar. Perubahan hash kembali ke peta/beranda mengembalikan tombol Mulai.
- Bacaan pertama kembali ke beranda. Latihan lintas bab sebagai halaman terakhir kembali ke peta belajar, bukan membuat lompatan atau siklus ke bab lain.
- Tautan prasyarat/bacaan tambahan berada di isi halaman. Mereka tidak diubah menjadi bagian dari urutan utama.
- Menu Peta tetap terlihat pada ponsel; label ringkasnya “Peta”. Tombol atas ringkas agar muat bersama identitas situs pada layar 320 piksel.

## Pemeriksaan

- Pemeriksa otomatis mencakup seluruh 53 halaman dan memastikan peta, urutan, header, serta navigasi bawah selaras.
- Lima pengujian terhadap salinan sementara membuktikan bahwa perubahan target header, target bawah, target bacaan kesetaraan, dan urutan peta akan ditolak pemeriksa. Salinan tidak mengubah materi asli.
- Seluruh 53 halaman dibuka pada browser dalam aplikasi dengan lebar 320 piksel. Tidak ditemukan menu Peta tersembunyi, header melebar, tombol utama ganda, atau perbedaan target atas/bawah pada halaman belajar. Beranda dan halaman pendukung diperiksa sesuai pengecualiannya.
- Perpindahan Pangkat/Akar → Kesetaraan → Variabel, kembali ke kesetaraan, dan kembali ke Peta diuji lewat tombol nyata. Tampilan desktop juga diperiksa.
- Seluruh tautan/fragmen lokal dan sintaks app.js lulus pemeriksaan. Audit ini memeriksa navigasi, bukan menilai ulang isi matematika atau menjamin pengujian pada seluruh browser fisik.

## Urutan hasil audit

| No. | Bacaan | Sebelumnya | Berikutnya |
|---|---|---|---|
| 1 | [Bilangan dan Garis Bilangan](https://itera-bermatika.github.io/fondasi-matematika/bilangan.html) | Beranda | Mengenali Bilangan Real |
| 2 | [Mengenali Bilangan Real](https://itera-bermatika.github.io/fondasi-matematika/bilangan-real.html) | Bilangan dan Garis Bilangan | Pecahan: Bagian dan Nilai |
| 3 | [Pecahan: Bagian dan Nilai](https://itera-bermatika.github.io/fondasi-matematika/pecahan.html) | Mengenali Bilangan Real | Menjumlahkan dan Mengurangkan Pecahan |
| 4 | [Menjumlahkan dan Mengurangkan Pecahan](https://itera-bermatika.github.io/fondasi-matematika/operasi-pecahan.html) | Pecahan: Bagian dan Nilai | Perkalian Pecahan: Bagian dari Suatu Bagian |
| 5 | [Perkalian Pecahan: Bagian dari Suatu Bagian](https://itera-bermatika.github.io/fondasi-matematika/perkalian-pecahan.html) | Menjumlahkan dan Mengurangkan Pecahan | Pembagian Pecahan: Berapa Kelompok yang Muat? |
| 6 | [Pembagian Pecahan: Berapa Kelompok yang Muat?](https://itera-bermatika.github.io/fondasi-matematika/pembagian-pecahan.html) | Perkalian Pecahan: Bagian dari Suatu Bagian | Urutan Operasi dan Tanda Kurung |
| 7 | [Urutan Operasi dan Tanda Kurung](https://itera-bermatika.github.io/fondasi-matematika/urutan-operasi.html) | Pembagian Pecahan: Berapa Kelompok yang Muat? | Pangkat dan Akar |
| 8 | [Pangkat dan Akar](https://itera-bermatika.github.io/fondasi-matematika/pangkat-akar.html) | Urutan Operasi dan Tanda Kurung | Memahami Tanda Sama Dengan |
| 9 | [Memahami Tanda Sama Dengan](https://itera-bermatika.github.io/fondasi-matematika/index.html#bacaan) | Pangkat dan Akar | Variabel dan Ekspresi Aljabar |
| 10 | [Variabel dan Ekspresi Aljabar](https://itera-bermatika.github.io/fondasi-matematika/variabel-ekspresi.html) | Memahami Tanda Sama Dengan | Sifat Distributif dan Penyederhanaan Aljabar |
| 11 | [Sifat Distributif dan Penyederhanaan Aljabar](https://itera-bermatika.github.io/fondasi-matematika/distributif.html) | Variabel dan Ekspresi Aljabar | Faktorisasi: Dari Penjumlahan ke Perkalian |
| 12 | [Faktorisasi: Dari Penjumlahan ke Perkalian](https://itera-bermatika.github.io/fondasi-matematika/faktorisasi.html) | Sifat Distributif dan Penyederhanaan Aljabar | Bentuk Akar dan Pangkat Rasional |
| 13 | [Bentuk Akar dan Pangkat Rasional](https://itera-bermatika.github.io/fondasi-matematika/bentuk-akar.html) | Faktorisasi: Dari Penjumlahan ke Perkalian | Persamaan Linear Satu Variabel |
| 14 | [Persamaan Linear Satu Variabel](https://itera-bermatika.github.io/fondasi-matematika/persamaan-linear.html) | Bentuk Akar dan Pangkat Rasional | Persamaan Pecahan dan Akar |
| 15 | [Persamaan Pecahan dan Akar](https://itera-bermatika.github.io/fondasi-matematika/persamaan-pecahan-akar.html) | Persamaan Linear Satu Variabel | Pertidaksamaan Linear Satu Variabel |
| 16 | [Pertidaksamaan Linear Satu Variabel](https://itera-bermatika.github.io/fondasi-matematika/pertidaksamaan-linear.html) | Persamaan Pecahan dan Akar | Pertidaksamaan Majemuk dan Interval |
| 17 | [Pertidaksamaan Majemuk dan Interval](https://itera-bermatika.github.io/fondasi-matematika/pertidaksamaan-majemuk.html) | Pertidaksamaan Linear Satu Variabel | Nilai Mutlak: Persamaan dan Pertidaksamaan |
| 18 | [Nilai Mutlak: Persamaan dan Pertidaksamaan](https://itera-bermatika.github.io/fondasi-matematika/nilai-mutlak.html) | Pertidaksamaan Majemuk dan Interval | Pertidaksamaan Kuadrat dan Tabel Tanda |
| 19 | [Pertidaksamaan Kuadrat dan Tabel Tanda](https://itera-bermatika.github.io/fondasi-matematika/pertidaksamaan-kuadrat.html) | Nilai Mutlak: Persamaan dan Pertidaksamaan | Koordinat Kartesius |
| 20 | [Koordinat Kartesius](https://itera-bermatika.github.io/fondasi-matematika/koordinat.html) | Pertidaksamaan Kuadrat dan Tabel Tanda | Jarak Dua Titik dan Titik Tengah |
| 21 | [Jarak Dua Titik dan Titik Tengah](https://itera-bermatika.github.io/fondasi-matematika/jarak-titik-tengah.html) | Koordinat Kartesius | Kemiringan dan Persamaan Garis |
| 22 | [Kemiringan dan Persamaan Garis](https://itera-bermatika.github.io/fondasi-matematika/garis.html) | Jarak Dua Titik dan Titik Tengah | Memahami Konsep Fungsi |
| 23 | [Memahami Konsep Fungsi](https://itera-bermatika.github.io/fondasi-matematika/fungsi.html) | Kemiringan dan Persamaan Garis | Domain dan Range |
| 24 | [Domain dan Range](https://itera-bermatika.github.io/fondasi-matematika/domain-range.html) | Memahami Konsep Fungsi | Fungsi dengan Aturan per Bagian |
| 25 | [Fungsi dengan Aturan per Bagian](https://itera-bermatika.github.io/fondasi-matematika/fungsi-per-bagian.html) | Domain dan Range | Membaca Grafik Fungsi |
| 26 | [Membaca Grafik Fungsi](https://itera-bermatika.github.io/fondasi-matematika/membaca-grafik.html) | Fungsi dengan Aturan per Bagian | Operasi dan Komposisi Fungsi |
| 27 | [Operasi dan Komposisi Fungsi](https://itera-bermatika.github.io/fondasi-matematika/komposisi-fungsi.html) | Membaca Grafik Fungsi | Memahami Fungsi Invers |
| 28 | [Memahami Fungsi Invers](https://itera-bermatika.github.io/fondasi-matematika/fungsi-invers.html) | Operasi dan Komposisi Fungsi | Transformasi Grafik Fungsi |
| 29 | [Transformasi Grafik Fungsi](https://itera-bermatika.github.io/fondasi-matematika/transformasi-fungsi.html) | Memahami Fungsi Invers | Memahami Fungsi Kuadrat |
| 30 | [Memahami Fungsi Kuadrat](https://itera-bermatika.github.io/fondasi-matematika/fungsi-kuadrat.html) | Transformasi Grafik Fungsi | Memahami Fungsi Polinomial |
| 31 | [Memahami Fungsi Polinomial](https://itera-bermatika.github.io/fondasi-matematika/fungsi-polinomial.html) | Memahami Fungsi Kuadrat | Memahami Fungsi Rasional |
| 32 | [Memahami Fungsi Rasional](https://itera-bermatika.github.io/fondasi-matematika/fungsi-rasional.html) | Memahami Fungsi Polinomial | Memahami Fungsi Eksponensial |
| 33 | [Memahami Fungsi Eksponensial](https://itera-bermatika.github.io/fondasi-matematika/fungsi-eksponensial.html) | Memahami Fungsi Rasional | Memahami Logaritma |
| 34 | [Memahami Logaritma](https://itera-bermatika.github.io/fondasi-matematika/fungsi-logaritma.html) | Memahami Fungsi Eksponensial | Persamaan Eksponensial dan Logaritma |
| 35 | [Persamaan Eksponensial dan Logaritma](https://itera-bermatika.github.io/fondasi-matematika/persamaan-eksponen-log.html) | Memahami Logaritma | Sudut dan Radian |
| 36 | [Sudut dan Radian](https://itera-bermatika.github.io/fondasi-matematika/sudut-radian.html) | Persamaan Eksponensial dan Logaritma | Lingkaran Satuan, Sinus dan Kosinus |
| 37 | [Lingkaran Satuan, Sinus dan Kosinus](https://itera-bermatika.github.io/fondasi-matematika/lingkaran-satuan.html) | Sudut dan Radian | Tangen dan Perbandingan Lainnya |
| 38 | [Tangen dan Perbandingan Lainnya](https://itera-bermatika.github.io/fondasi-matematika/tangen.html) | Lingkaran Satuan, Sinus dan Kosinus | Grafik Sinus dan Kosinus |
| 39 | [Grafik Sinus dan Kosinus](https://itera-bermatika.github.io/fondasi-matematika/grafik-trigonometri.html) | Tangen dan Perbandingan Lainnya | Persamaan Trigonometri Dasar |
| 40 | [Persamaan Trigonometri Dasar](https://itera-bermatika.github.io/fondasi-matematika/persamaan-trigonometri.html) | Grafik Sinus dan Kosinus | Identitas dan Rumus Trigonometri |
| 41 | [Identitas dan Rumus Trigonometri](https://itera-bermatika.github.io/fondasi-matematika/identitas-trigonometri.html) | Persamaan Trigonometri Dasar | Fungsi Trigonometri Invers |
| 42 | [Fungsi Trigonometri Invers](https://itera-bermatika.github.io/fondasi-matematika/trigonometri-invers.html) | Identitas dan Rumus Trigonometri | Penerapan Trigonometri pada Segitiga |
| 43 | [Penerapan Trigonometri pada Segitiga](https://itera-bermatika.github.io/fondasi-matematika/penerapan-trigonometri.html) | Fungsi Trigonometri Invers | Laju Perubahan Rata-Rata |
| 44 | [Laju Perubahan Rata-Rata](https://itera-bermatika.github.io/fondasi-matematika/laju-perubahan.html) | Penerapan Trigonometri pada Segitiga | Memahami Gagasan Limit |
| 45 | [Memahami Gagasan Limit](https://itera-bermatika.github.io/fondasi-matematika/gagasan-limit.html) | Laju Perubahan Rata-Rata | Menghitung Limit Dasar |
| 46 | [Menghitung Limit Dasar](https://itera-bermatika.github.io/fondasi-matematika/limit-dasar.html) | Memahami Gagasan Limit | Kekontinuan Fungsi |
| 47 | [Kekontinuan Fungsi](https://itera-bermatika.github.io/fondasi-matematika/kekontinuan.html) | Menghitung Limit Dasar | Limit Tak Hingga dan Perilaku di Tak Hingga |
| 48 | [Limit Tak Hingga dan Perilaku di Tak Hingga](https://itera-bermatika.github.io/fondasi-matematika/limit-tak-hingga.html) | Kekontinuan Fungsi | Dari Garis Sekan ke Garis Singgung |
| 49 | [Dari Garis Sekan ke Garis Singgung](https://itera-bermatika.github.io/fondasi-matematika/garis-singgung.html) | Limit Tak Hingga dan Perilaku di Tak Hingga | Rangkuman dan Cek Kesiapan Kalkulus |
| 50 | [Rangkuman dan Cek Kesiapan Kalkulus](https://itera-bermatika.github.io/fondasi-matematika/kesiapan-kalkulus.html) | Dari Garis Sekan ke Garis Singgung | Latihan Lintas Bab Prekalkulus |
| 51 | [Latihan Lintas Bab Prekalkulus](https://itera-bermatika.github.io/fondasi-matematika/latihan-lintas-bab.html) | Rangkuman dan Cek Kesiapan Kalkulus | Peta belajar |

## Pemeliharaan

Perbarui reading-order.json dan urutan tautan peta di dist/app.js saat menambah bacaan. Jalankan `python scripts/sync-navigation.py`, `python scripts/sync-navigation.py --check`, `python tests/navigation.test.py`, dan `python scripts/check-site.py`. Penerbitan otomatis menjalankan pemeriksaan konsistensi dan regresi navigasi agar penyimpangan tidak ikut terbit.
