"""Generate the companion page from reviewed, explicit chapter scenarios."""
import json
import re
from html import escape
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
# title, context, input label, minimum, maximum, step, initial, question,
# expression, output unit, interpretation, reflection, related reading
rows = [
('Bahasa Matematika', 'Wadah mula-mula berisi 10 L. Air masuk tetap 2 L/menit hingga kapasitas 30 L. Abaikan kebocoran.', 'Waktu (menit)', 0,10,1,4,'Berapa volume air?', '10+2*x','L','V = 10 + 2t berlaku untuk 0 ≤ t ≤ 10 menit. Angka 2 menyatakan laju, bukan volume awal.','Jika waktu dinyatakan dalam detik, mengapa koefisiennya harus berubah?','variabel-ekspresi.html'),
('Sistem Bilangan Riil','Ukuran yang diterima adalah 20 ± 0,2 cm. Batas toleransi termasuk dalam rentang yang diterima.','Ukuran (cm)',19.5,20.5,0.1,20.1,'Berapa selisih mutlak ukuran ini dari 20 cm?','Math.abs(x-20)','cm','Ukuran diterima jika |x − 20| ≤ 0,2, yaitu 19,8 ≤ x ≤ 20,2 cm. Selisih merupakan ukuran jarak, selalu tidak negatif.','Apakah menulis 20 saja sudah menyampaikan satuan dan ketelitian pengukuran?','bilangan-real.html'),
('Ekspresi Aljabar','Persegi panjang mempunyai lebar x cm dan panjang (x + 3) cm.','Lebar x (cm)',1,10,1,4,'Berapa luas persegi panjang?','x*(x+3)','cm²','Luas x(x + 3) = x² + 3x. Kedua bentuk menyatakan luas yang sama; x harus positif dalam model ini.','Bagaimana gambar dua bagian luas menjelaskan sifat distributif?','distributif.html'),
('Pangkat dan Akar','Sebuah persegi luasnya 9 cm². Semua panjang sisinya diperbesar dengan faktor k.','Faktor skala k',1,5,0.5,2,'Berapa luas persegi setelah diperbesar?','9*x*x','cm²','Panjang dikali k membuat luas dikali k². Sisi awal 3 cm menjadi 3k cm.','Mengapa faktor luas berbeda dari faktor panjang? Bagaimana dengan volume kubus?','pangkat-akar.html'),
('Persamaan','Wadah berisi 8 L dan diisi tetap 2 L/menit hingga paling banyak 28 L.','Target volume (L)',8,28,2,24,'Berapa waktu untuk mencapai target ini?','(x-8)/2','menit','Dari 8 + 2t = V diperoleh t = (V − 8)/2. Target di bawah volume awal tidak dapat dicapai dengan proses pengisian ini.','Apa arti solusi negatif jika persamaan diperluas di luar konteks?','persamaan-linear.html'),
('Pertidaksamaan','Biaya tetap Rp12.000 ditambah Rp3.000 per paket. Setidaknya satu paket dibeli; jumlah paket bulat.','Anggaran (rupiah)',15000,30000,1000,29000,'Paling banyak berapa paket dapat dibeli?','Math.floor((x-12000)/3000)','paket','Selesaikan 12.000 + 3.000n ≤ B, lalu pilih bilangan bulat terbesar yang memenuhi. Sisa anggaran tidak menjadi pecahan paket.','Mengapa batas real perlu ditafsirkan ulang ketika barang dihitung satu per satu?','pertidaksamaan-linear.html'),
('Geometri Koordinat','A = (1, 2) dan B = (4, y) pada denah. Setiap satuan koordinat mewakili 1 m.','Koordinat y titik B',2,10,1,6,'Berapa jarak lurus A ke B?','Math.hypot(3,x-2)','m','Jarak lurus √(3² + (y − 2)²). Rute mengikuti garis horizontal lalu vertikal mempunyai panjang 3 + |y − 2| m.','Kapan jarak pada denah tidak sama dengan panjang perjalanan yang bisa ditempuh?','jarak-titik-tengah.html'),
('Fungsi','Biaya C(n) = 12.000 + 3.000n rupiah untuk n ∈ {1, 2, 3, 4, 5}.','Jumlah paket n',1,5,1,3,'Berapa biaya untuk masukan ini?','12000+3000*x','rupiah','Domain adalah lima bilangan bulat. Range adalah {15.000, 18.000, 21.000, 24.000, 27.000}; tidak semua bilangan nonnegatif menjadi keluaran.','Apa perbedaan range dan kodomain jika kodomain dipilih sebagai semua bilangan real nonnegatif?','domain-range.html'),
('Grafik Fungsi','V(t) = 6 + 3t L sampai t = 8 menit. Setelah penuh, volume tetap 30 L hingga t = 12 menit.','Waktu (menit)',0,12,1,10,'Berapa volume pada waktu ini?','Math.min(6+3*x,30)','L','Grafik naik pada 0 ≤ t ≤ 8 lalu mendatar sampai t = 12. Mendatar berarti volume tetap; waktu terus berjalan.','Apakah bagian grafik mendatar menyatakan wadah kosong? Jelaskan melalui nilai keluarannya.','membaca-grafik.html'),
('Operasi dan Komposisi Fungsi','Ubah u detik menjadi c(u) = u/60 menit, lalu masukkan ke V(t) = 6 + 3t L, untuk 0 ≤ t ≤ 8.','Waktu u (detik)',0,480,30,120,'Berapa volume setelah kedua proses?','6+3*x/60','L','Komposisi V(c(u)) = 6 + 3(u/60). Domain dalam detik adalah 0 ≤ u ≤ 480. Urutan proses mengikuti arti satuannya.','Mengapa langsung memasukkan angka detik ke rumus yang memakai menit menghasilkan jawaban keliru?','komposisi-fungsi.html'),
('Fungsi Invers','Pada fase pengisian V(t) = 6 + 3t untuk 0 ≤ t ≤ 8 menit, tiap volume 6–30 L terjadi tepat satu kali.','Volume (L)',6,30,3,18,'Pada menit ke berapa volume ini dicapai?','(x-6)/3','menit','Invers t = (V − 6)/3 mempunyai domain [6, 30] L dan range [0, 8] menit.','Jika fase volume tetap 30 L hingga menit ke-12 disertakan, mengapa invers tidak lagi merupakan fungsi?','fungsi-invers.html'),
('Fungsi Linear dan Kuadrat','Persegi panjang berkeliling 24 cm memiliki sisi x dan (12 − x) cm. Kedua sisi harus positif.','Sisi x (cm)',1,11,1,6,'Berapa luasnya?','x*(12-x)','cm²','A(x) = x(12 − x) = 36 − (x − 6)², untuk 0 < x < 12. Luas terbesar 36 cm² dicapai saat x = 6.','Jika x dibatasi sampai 4 cm, apakah luas terbesar tetap terjadi pada x = 6?','fungsi-kuadrat.html'),
('Fungsi Polinomial dan Rasional','Kotak tanpa tutup dibuat dari lembar 20 × 12 cm dengan memotong persegi sisi x pada tiap sudut.','Sisi potongan x (cm)',0.5,5.5,0.5,2,'Berapa volume kotak?','x*(20-2*x)*(12-2*x)','cm³','V(x) = x(20 − 2x)(12 − 2x). Domain fisik 0 < x < 6 menjaga tinggi, panjang, dan lebar positif.','Mengapa nilai aljabar yang dapat dihitung untuk x = 7 tidak menggambarkan kotak ini?','fungsi-polinomial.html'),
('Fungsi Eksponensial dan Logaritma','Jumlah awal 100 satuan tumbuh 20% dari jumlah saat itu pada setiap periode. Model ini bersifat hipotetis.','Jumlah periode n',0,8,1,4,'Berapa jumlah setelah n periode?','100*Math.pow(1.2,x)','satuan','E(n) = 100(1,2)ⁿ. Model penambahan tetap 20 satuan memberi 100 + 20n, yang umumnya berbeda.','Kapan jumlah pertama kali sedikitnya 200? Bandingkan ambang real sekitar 3,802 dengan periode bulat.','fungsi-eksponensial.html'),
('Fungsi Trigonometri','Titik pada roda ideal berjari-jari 2 m berputar beraturan. Pusat setinggi 3 m; periode 8 detik; titik mulai dari bawah.','Waktu (detik)',0,16,1,2,'Berapa tinggi titik dari tanah?','3-2*Math.cos(Math.PI*x/4)','m','h(t) = 3 − 2 cos(πt/4), dengan sudut dalam radian. Tinggi selalu antara 1 dan 5 m, dan berulang setiap 8 detik.','Mengapa tinggi yang sama bisa terjadi pada beberapa waktu?','grafik-trigonometri.html'),
('Perubahan dan Laju Perubahan','Posisi s(t) = (t − 2)² m untuk 0 ≤ t ≤ 4 detik. Bandingkan posisi awal dengan posisi pada t > 0.','Waktu akhir t (detik)',0.5,4,0.5,4,'Berapa kecepatan rata-rata dari t = 0 sampai waktu akhir?','x-4','m/detik','Kecepatan rata-rata = ((t − 2)² − 4)/t = t − 4. Pada t = 4 nilainya nol, meskipun jarak tempuh total 8 m dan kelajuan rata-rata 2 m/detik.','Apa yang hilang jika gerak hanya diringkas melalui perpindahan awal–akhir?','laju-perubahan.html'),
('Limit dan Kekontinuan','Q(s) = (s² − 16)/(s − 4), dengan s ≠ 4. Dekati 4 melalui nilai yang tersedia.','Masukan s',3,5,0.1,3.9,'Berapa nilai Q(s), atau nilai limitnya jika s tepat 4?','x+4','', 'Untuk s ≠ 4, Q(s) = s + 4. Limit saat s → 4 adalah 8, tetapi Q(4) tidak terdefinisi. Memberi nilai 8 di titik itu membentuk perluasan kontinu.','Mengapa kesamaan bentuk setelah pencoretan tidak otomatis menambahkan 4 ke domain awal?','kekontinuan.html'),
('Laju Sesaat dan Pengantar Turunan','Luas persegi A(x) = x² cm². Dari sisi awal 4 cm, sisi bertambah h cm.','Pertambahan h (cm)',0.01,1,0.01,0.1,'Berapa pertambahan luas yang tepat?','8*x+x*x','cm²','ΔA = (4 + h)² − 16 = 8h + h². Pendekatan turunan memberi 8h cm²; selisihnya h² cm². A′(4) = 8 cm menyatakan luas per perubahan panjang.','Mengapa pendekatan 8h makin dekat secara relatif saat h mengecil?','garis-singgung.html'),
]

data=[]
for i,r in enumerate(rows,1):
    title,context,label,lo,hi,step,initial,question,expr,unit,explanation,reflection,href=r
    data.append(dict(id=i,title=title,context=context,label=label,min=lo,max=hi,step=step,initial=initial,question=question,unit=unit,explanation=explanation,reflection=reflection,href=href))
core='''(function(root){"use strict";\nconst chapters = DATA;\nconst models = [MODELS];\nfunction evaluate(id, value) {\n const c=chapters.find(c=>c.id===id);\n if(!c || typeof value!=="number" || !Number.isFinite(value) || value<c.min-1e-9 || value>c.max+1e-9 || Math.abs((value-c.min)/c.step-Math.round((value-c.min)/c.step))>1e-7) throw new RangeError("Masukan di luar pilihan model");\n return models[id-1](value);\n}\nconst api={chapters,evaluate};\nif(typeof module!=="undefined" && module.exports) module.exports=api; else root.BookEnrichment=api;\n})(typeof window!=="undefined"?window:globalThis);\n'''.replace('DATA',json.dumps(data,ensure_ascii=False)).replace('MODELS',',\n'.join('x=>'+r[8] for r in rows))
(DIST/'pengayaan-buku-core.js').write_text(core,encoding='utf-8')
source=(DIST/'peta-buku.html').read_text(encoding='utf-8')
header=re.search(r'<header[\s\S]*?</header>',source).group()
cards=[]
for c in data:
    i=c['id']
    cards.append(f'''<section class="book-card" id="bab-{i}" data-chapter="{i}">
<p class="eyebrow">BAB {i:02}</p><h2>{escape(c['title'])}</h2><p>{escape(c['context'])}</p>
<p><a href="{c['href']}">Baca konsepnya →</a> · <a href="peta-buku.html#bab-{i}">Peta bab</a></p>
<details{' open' if i==1 else ''}><summary>Prediksi, coba, dan jelaskan</summary><div class="lab"></div></details>
</section>''')
html='''<!doctype html><html lang="id"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Eksplorasi Pendamping Buku — Fondasi Matematika</title><link rel="stylesheet" href="style.css"><link rel="stylesheet" href="navigation.css"><link rel="stylesheet" href="pengayaan-buku.css"><script defer src="pengayaan-buku-core.js"></script><script defer src="pengayaan-buku.js"></script></head><body><a class="skip" href="#isi">Langsung ke isi</a>'''+header+'''<main class="wrap book-enrichment" id="isi"><p class="eyebrow">PENDAMPING BUKU PREKALKULUS · 18 BAB</p><h1>Dari simbol<br>ke makna.</h1><p class="lead">Buat prediksi, ubah masukan, lalu jelaskan hasilnya. Contoh memakai konteks sederhana tanpa memerlukan mata kuliah teknik.</p><p>Eksplorasi terpilih ini mendampingi pengayaan buku revisi 22 Oktober 2026. Bacalah konsep pada bacaan terkait; halaman ini tidak menggantikan seluruh pembahasan dan latihan buku.</p><nav class="chapter-jump" aria-label="Pilih bab">'''+''.join(f'<a href="#bab-{i}">Bab {i}</a>' for i in range(1,19))+'''</nav>'''+''.join(cards)+'''<p><a href="peta-buku.html">← Kembali ke peta buku</a></p><noscript><p>Aktifkan JavaScript untuk menggunakan eksplorasi. Konteks setiap bab dan tautan bacaan tetap dapat dibaca.</p></noscript></main><footer class="wrap"><p>Fondasi Matematika · Bacaan pendamping prekalkulus</p></footer></body></html>'''
(DIST/'pengayaan-buku.html').write_text(html,encoding='utf-8')
for i in range(1,19):
    pattern=rf'(<section class="chapter-card" id="bab-{i}">[\s\S]*?)(</section>)'
    if f'href="pengayaan-buku.html#bab-{i}"' not in source:
        source=re.sub(pattern,lambda m:m[1]+f'<p><a href="pengayaan-buku.html#bab-{i}">Eksplorasi konteks buku: bab {i} →</a></p>'+m[2],source,count=1)
if 'Pengayaan 22 Oktober 2026:' not in source:
    source=source.replace('<section id="tinjauan">','<p>Pengayaan 22 Oktober 2026: <a href="pengayaan-buku.html">18 eksplorasi konteks buku</a> kini tersedia dengan prediksi, percobaan, penjelasan, dan refleksi. Satu contoh terpilih per bab belum mewakili seluruh kompetensi bab.</p><section id="tinjauan">')
(DIST/'peta-buku.html').write_text(source,encoding='utf-8')
for c in data:
    page=DIST/c['href']
    text=page.read_text(encoding='utf-8')
    if f'href="pengayaan-buku.html#bab-{c["id"]}"' not in text:
        callout=f'<aside class="wrap"><p><a href="pengayaan-buku.html#bab-{c["id"]}">Coba konteks buku bab {c["id"]}: {escape(c["title"])} →</a></p></aside>'
        text=text.replace('</main>',callout+'</main>',1)
        page.write_text(text,encoding='utf-8')
order=json.loads((ROOT/'reading-order.json').read_text(encoding='utf-8'))
if 'pengayaan-buku.html' not in order['utilities']: order['utilities'].append('pengayaan-buku.html')
(ROOT/'reading-order.json').write_text(json.dumps(order,indent=2,ensure_ascii=False)+'\n',encoding='utf-8')

