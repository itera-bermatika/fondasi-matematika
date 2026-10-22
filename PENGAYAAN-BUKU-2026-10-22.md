# Pengayaan buku pada bacaan interaktif

Halaman `dist/pengayaan-buku.html` memuat 18 eksplorasi terpilih yang mendampingi revisi buku Prekalkulus 22 Oktober 2026. Tujuannya menghubungkan simbol, satuan, domain, dan penafsiran tanpa mensyaratkan pengetahuan teknik. Ini bukan pemindahan seluruh isi buku atau validasi menyeluruh kompetensi tiap bab.

Setiap bab mempunyai konteks mandiri, pilihan masukan yang dibatasi domain, prediksi numerik, hasil dan penjelasan model, tabel perbandingan, serta refleksi. Mengubah masukan menghapus hasil dan prediksi sebelumnya agar mahasiswa dapat memprediksi kembali. Tombol Amati model dapat dipakai tanpa menilai prediksi. Refleksi tersimpan di localStorage peramban; kegagalan penyimpanan diberitahukan. Tidak ada pengiriman refleksi ke server.

Bab 17 sengaja membedakan Q(4) yang tidak terdefinisi dari limit 8; hasil pada masukan 4 diberi label limit. Bab 6 dan 8 menggunakan jumlah paket bulat. Bab 16 membedakan kecepatan rata-rata dan kelajuan rata-rata. Bab 18 membandingkan perubahan luas tepat dan pendekatan turunan.

Peta buku dan 18 bacaan terkait ditautkan ke eksplorasi. Halaman pendamping terdaftar sebagai utilitas sehingga urutan 51 bacaan tetap konsisten.

Untuk mengubah skenario, sunting `scripts/add-book-enrichment.py` lalu jalankan generator dan `scripts/sync-navigation.py`. Logika interaksi serta gaya ada pada `dist/pengayaan-buku.js` dan `.css`. Jalankan pengujian model `tests/pengayaan-buku.test.cjs`, pemeriksa tautan, dan pemeriksa navigasi setelah perubahan.
