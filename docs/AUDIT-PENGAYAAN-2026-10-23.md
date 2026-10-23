# Audit integrasi dan notasi Pengayaan Buku — 23 Oktober 2026

## Temuan awal

- Seluruh 18 bab menautkan satu bacaan utama, dan peta buku menautkan pengayaan, tetapi tautan balik hanya tersedia pada 18 dari 51 bacaan.
- Halaman pengayaan belum memuat equations.js, konfigurasi MathJax, atau runtime MathJax lokal. Rumus pada konteks dan penjelasan serta hasil dinamis masih berupa teks biasa.

## Perbaikan

- Pemetaan daftar bacaan per bab dalam Peta Buku menjadi acuan tautan dua arah. Daftar bacaan terkait pada setiap eksplorasi kini lengkap sesuai pemetaan tersebut; setiap bacaan terkait menautkan pengayaan bab yang sesuai. Bacaan yang terkait beberapa bab menampilkan beberapa tujuan.
- Tiga bacaan operasi pecahan yang belum tercantum pada daftar Bab 2 ditambahkan. Seluruh 51 materi kini mempunyai satu kotak pengayaan; Latihan Lintas Bab menautkan halaman pengayaan umum.
- MathJax lokal 4.1.3 dengan font STIX Two, equations.js dan stylesheet rumus yang sama dengan bacaan lain ditambahkan.
- Konteks, variabel, rumus penjelasan, label dan pertanyaan yang memuat simbol memakai data-tex eksplisit. Hasil, nilai penggeser, satuan dan angka tabel dirender ulang melalui MathJax saat berubah.
- Format angka TeX memisahkan koma desimal dan pemisah ribuan; angka 29.000 tidak lagi menghasilkan TeX yang tidak sah. Pengujian baru mencakup angka desimal, ribuan, negatif dan nilai tidak berhingga.
- Pada masukan tepat 4 di Bab 17, hasil dinyatakan sebagai limit Q(s) saat s mendekati 4. Tabel menyebut Q(4) tidak terdefinisi, dan penjelasan membedakan fungsi awal dari perluasan kontinu.
- CSS pengayaan memungkinkan rumus panjang digeser mendatar tanpa scrollbar vertikal kecil di setiap rumus.

## Verifikasi

- Pemeriksa 54 halaman, ID, fragmen dan aset lokal lulus. Generator idempoten.
- 13 pengujian navigasi lulus, termasuk semua pasangan tautan bacaan/pengayaan untuk 18 bab dan kotak pengayaan pada seluruh 51 materi.
- Empat pengujian model/format angka lulus; perhitungan contoh, batas domain, ketelitian hasil, dan penanganan masukan tidak sah tetap sesuai.
- Browser: seluruh 18 panel dibuka dan tombol Amati model dicoba. Seluruh hasil dan sel angka tabel memuat MathJax; tidak ada kesalahan render pada pemeriksaan akhir.
- Interaksi Bab 17 pada masukan 4 diuji; hasil MathJax menampilkan limit, sementara tabel tetap menyebut nilai fungsi tidak terdefinisi.
- Lebar 320 piksel: tidak ditemukan halaman/kartu melebar melewati wadah maupun scrollbar vertikal kecil pada rumus.
- Perjalanan dari bacaan terkait di pengayaan Bab 6 ke Pertidaksamaan Majemuk dan kembali ke pengayaan Bab 6 berhasil.

Integrasi berarti hubungan topik dan akses dua arah. Satu eksplorasi terpilih per bab tetap tidak mewakili seluruh subbab dan kompetensi buku. Audit ini tidak mengklaim seluruh isi buku atau semua interaksi website telah divalidasi secara menyeluruh.
