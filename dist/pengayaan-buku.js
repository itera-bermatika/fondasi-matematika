(function(){'use strict';
const {chapters,evaluate}=window.BookEnrichment;
const fmt=n=>new Intl.NumberFormat('id-ID',{maximumFractionDigits:4}).format(Math.abs(n)<1e-12?0:n);
for(const c of chapters){
 const host=document.querySelector(`[data-chapter="${c.id}"] .lab`);
 const key=`fondasi-refleksi-buku-v1-${c.id}`;
 host.innerHTML=`<label for="input-${c.id}">${c.label}</label><input id="input-${c.id}" type="range" min="${c.min}" max="${c.max}" step="${c.step}" value="${c.initial}"><output for="input-${c.id}" class="input-value"></output><p>${c.question}</p><form><label for="prediction-${c.id}">Prediksi Anda${c.unit?' ('+c.unit+')':''}</label><input id="prediction-${c.id}" type="text" inputmode="decimal" autocomplete="off" placeholder="Misalnya 2,5" aria-describedby="hint-${c.id}"><p id="hint-${c.id}">Gunakan koma atau titik desimal, tanpa pemisah ribuan. Perbandingan jawaban memakai toleransi pembulatan 0,005.</p><button type="submit">Periksa prediksi</button><button class="secondary observe" type="button">Amati model</button></form><p class="feedback" role="status"></p><div class="result" hidden><output class="answer"></output><p>${c.explanation}</p><table><caption>Bandingkan tiga masukan dalam domain</caption><thead><tr><th scope="col">${c.label}</th><th scope="col">Hasil${c.unit?' ('+c.unit+')':''}</th></tr></thead><tbody></tbody></table></div><label for="reflection-${c.id}">Jelaskan dengan kata-kata Anda</label><p>${c.reflection}</p><textarea id="reflection-${c.id}" placeholder="Tuliskan alasan, satuan, atau batas model yang Anda temukan."></textarea><p class="save-status" role="status"></p>`;
 const slider=host.querySelector('input[type=range]'), prediction=host.querySelector('input[type=text]'), result=host.querySelector('.result'), feedback=host.querySelector('.feedback');
 const current=()=>Number(slider.value);
 function show(){
  const x=current(), y=evaluate(c.id,x);
  host.querySelector('.answer').textContent=(c.id===17&&Math.abs(x-4)<1e-8?'Limit = ': 'Hasil = ')+fmt(y)+(c.unit?' '+c.unit:'');
  const xs=[c.min,x,c.max].filter((v,i,a)=>a.indexOf(v)===i);
  const tbody=host.querySelector('tbody');tbody.replaceChildren();
  for(const v of xs){const tr=document.createElement('tr');for(const text of [fmt(v),c.id===17&&Math.abs(v-4)<1e-8?'Tidak terdefinisi; limit 8':fmt(evaluate(c.id,v))]){const td=document.createElement('td');td.textContent=text;tr.append(td);}tbody.append(tr);}
  result.hidden=false;
 }
 function update(){host.querySelector('.input-value').textContent=fmt(current());result.hidden=true;feedback.textContent='';prediction.value='';}
 slider.addEventListener('input',update);update();
 host.querySelector('form').addEventListener('submit',event=>{event.preventDefault();const raw=prediction.value.trim();if(!/^[+-]?(?:\d+(?:[.,]\d*)?|[.,]\d+)$/.test(raw)){feedback.textContent='Masukkan satu bilangan dengan koma atau titik desimal, tanpa satuan atau pemisah ribuan.';prediction.focus();return;}const n=Number(raw.replace(',','.'));if(!Number.isFinite(n)){feedback.textContent='Masukkan bilangan berhingga.';return;}const correct=Math.abs(n-evaluate(c.id,current()))<=0.005;feedback.textContent=correct?'Prediksi sesuai dengan model. Periksa arti dan satuannya di bawah.':'Prediksi belum sesuai dengan model. Bandingkan hasil dengan langkah dan asumsi di bawah.';show();});
 host.querySelector('.observe').addEventListener('click',()=>{feedback.textContent='Model ditampilkan tanpa menilai prediksi. Gunakan hasilnya untuk menjelaskan hubungan masukan dan keluaran.';show();});
 const reflection=host.querySelector('textarea'),status=host.querySelector('.save-status');
 try{reflection.value=localStorage.getItem(key)||'';status.textContent='Refleksi disimpan hanya di peramban ini; tidak dikirim ke server.';}catch{status.textContent='Penyimpanan peramban tidak tersedia. Salin refleksi Anda sebelum menutup halaman.';}
 reflection.addEventListener('input',()=>{try{localStorage.setItem(key,reflection.value);status.textContent='Refleksi tersimpan di peramban ini.';}catch{status.textContent='Refleksi belum tersimpan. Salin tulisan Anda sebelum menutup halaman.';}});
}
})();
