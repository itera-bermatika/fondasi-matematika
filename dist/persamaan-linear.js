(() => {
  'use strict';
  const $ = selector => document.querySelector(selector), core = window.LinearLesson;
  const saved = {
    get(key) { try { return localStorage.getItem('fondasi-linear-'+key); } catch { return null; } },
    set(key,value) { try { localStorage.setItem('fondasi-linear-'+key,value); return true; } catch { return false; } }
  };
  function math(tex) { const span = document.createElement('span'); span.dataset.tex = tex; return span; }
  function setMath(host, tex) { host.replaceChildren(math(tex)); }
  const signed = n => String(n).replace('-', '−').replace('.', ',');
  $('#check').addEventListener('click', () => {
    const value = document.querySelector('[name="awal"]:checked')?.value;
    const response = $('#check-feedback');
    response.replaceChildren();
    if (!value) { response.textContent = 'Pilih satu dugaan terlebih dahulu.'; return; }
    if (value === '4') response.append('Tepat. ',math('3\\times4+2=14'),'. Kedua ruas sama nilainya.');
    else response.append('Coba ganti huruf dengan dugaanmu: ', math(`3\\times${value}+2=${3*Number(value)+2}`),'. Nilai ini belum sama dengan ruas kanan.');
  });

  function candidate() {
    const x = Number($('#candidate').value), left = 3*x+2;
    $('#candidate-out').value = signed(x);
    setMath($('#left-value'),String(left));
    $('#left-marker').style.left = `${(left+10)/40*100}%`;
    setMath($('#candidate-equation'),`3\\times(${x})+2=${left} ${left === 14 ? '=' : left < 14 ? '<' : '>'}14`);
    // Use separate equality and comparison, not a chain that repeats equality.
    if (left === 14) setMath($('#candidate-equation'),`3\\times(${x})+2=14`);
    const feedback = $('#candidate-feedback'); feedback.replaceChildren();
    if (left === 14) feedback.append('Kedua nilai bertemu. ',math('x=4'),' membuat persamaan awal benar. Jadi nilai ini adalah solusi.');
    else feedback.append('Pada ',math(`x=${x}`),', ruas kiri bernilai ',math(String(left)),left < 14 ? ', lebih kecil dari ruas kanan. Coba perbesar nilai variabel.' : ', lebih besar dari ruas kanan. Coba perkecil nilai variabel.');
  }
  $('#candidate').addEventListener('input',candidate);
  $('#reset-candidate').addEventListener('click',() => { $('#candidate').value=2; candidate(); }); candidate();

  const examples = [{a:3,b:2,c:14},{a:2,b:-5,c:7},{a:-2,b:3,c:11}];
  let phase=0;
  const current = () => examples[Number($('#example').value)];
  function operationButton(label, action) {
    const button=document.createElement('button'); button.type='button'; button.textContent=label; button.addEventListener('click',action); return button;
  }
  function showStep() {
    const {a,b,c}=current(), choices=$('#step-choices'); choices.replaceChildren();
    setMath($('#step-equation'),phase===0 ? `${core.linearTex(a,b)}=${c}` : phase===1 ? `${core.linearTex(a,0)}=${c-b}` : `x=${core.fractionTex(core.rational(c-b,a))}`);
    if(phase===0) {
      $('#step-prompt').textContent='Hilangkan suku tetap tanpa mengubah solusi.';
      const op=b>0?'Kurangi':'Tambahkan', amount=Math.abs(b);
      choices.append(operationButton(`${op} kedua ruas dengan ${amount}`,advance),operationButton(`${op} ruas kiri saja dengan ${amount}`,()=>wrong('left')),operationButton(`${op} ruas kanan saja dengan ${amount}`,()=>wrong('right')));
    } else if(phase===1) {
      $('#step-prompt').textContent='Sekarang hilangkan koefisien variabel.';
      choices.append(operationButton(`Bagi kedua ruas dengan ${signed(a)}`,advance),operationButton(`Bagi ruas kiri saja dengan ${signed(a)}`,()=>wrong('divide-one')),operationButton('Bagi kedua ruas dengan nol',()=>wrong('zero')));
    } else {
      $('#step-prompt').textContent='Solusi sudah ditemukan. Periksa hasil substitusi di bawah, atau coba persamaan lainnya.';
    }
  }
  function wrong(kind) {
    const message = kind==='zero' ? 'Pembagian dengan nol tidak terdefinisi. Pilih pembagi yang sama dan bukan nol.' : kind==='divide-one' ? 'Membagi satu ruas saja mengubah hubungan kedua ruas. Untuk menjaga solusi, bagi keduanya dengan bilangan yang sama dan bukan nol.' : `Mengubah ruas ${kind==='left'?'kiri':'kanan'} saja tidak menjaga kesetaraan. Persamaan di atas belum diubah; coba pilih operasi yang diterapkan pada kedua ruas.`;
    $('#step-feedback').className='feedback incorrect'; $('#step-feedback').textContent=message;
  }
  function history(tex,reason) {
    const li=document.createElement('li'), note=document.createElement('span'); note.className='reason';note.textContent=reason;li.append(math(tex),note);$('#step-history').append(li);
  }
  function advance() {
    const {a,b,c}=current(); if(phase>=2)return;
    if(phase===0) {
      const tail=b>0?`-${b}`:`+${-b}`;
      history(`${core.linearTex(a,b)}${tail}=${c}${tail}`,b>0?`Kurangi kedua ruas dengan ${b}.`:`Tambahkan ${-b} pada kedua ruas.`);
      history(`${core.linearTex(a,0)}=${c-b}`,'Sederhanakan setiap ruas.');
    } else {
      history(`\\frac{${core.linearTex(a,0)}}{${a}}=\\frac{${c-b}}{${a}}`,`Bagi kedua ruas dengan ${signed(a)}, yang bukan nol.`);
      const value=core.rational(c-b,a), tex=core.fractionTex(value);
      history(`x=${tex}`,'Solusi diperoleh melalui operasi yang dapat dibalik.');
      $('#solution-check').replaceChildren('Periksa persamaan awal: ',math(`${a}\\times(${tex})${b<0?b:`+${b}`}=${c}`),'. Kedua ruas sama nilainya.');
    }
    phase++; $('#step-feedback').className='feedback correct';$('#step-feedback').textContent=phase===1?'Langkah ini menjaga solusi. Lanjutkan untuk membuat variabel tersisa sendiri.':'Tepat. Solusi sudah diperiksa pada persamaan awal.';showStep();
  }
  function resetSteps() { phase=0;$('#step-history').replaceChildren();$('#step-feedback').textContent='';$('#solution-check').replaceChildren();showStep(); }
  $('#example').addEventListener('change',resetSteps);$('#reset-steps').addEventListener('click',resetSteps);resetSteps();

  const questions=[
    {tex:'x+5=12',answer:core.rational(7),hint:'Kurangi kedua ruas dengan 5.',reason:'x=12-5=7',check:'7+5=12'},
    {tex:'3x+2=14',answer:core.rational(4),hint:'Kurangi kedua ruas dengan 2, kemudian bagi dengan 3.',reason:'3x=12\\quad\\Rightarrow\\quad x=4',check:'3\\times4+2=14'},
    {tex:'2x-5=7',answer:core.rational(6),hint:'Tambahkan 5 pada kedua ruas dahulu.',reason:'2x=12\\quad\\Rightarrow\\quad x=6',check:'2\\times6-5=7'},
    {tex:'-2x+3=11',answer:core.rational(-4),hint:'Kurangi kedua ruas dengan 3, lalu bagi dengan bilangan negatif yang menjadi koefisien.',reason:'-2x=8\\quad\\Rightarrow\\quad x=-4',check:'-2\\times(-4)+3=11'},
    {tex:'\\frac{x}{3}+2=5',answer:core.rational(9),hint:'Setelah mengurangi 2 pada kedua ruas, kalikan keduanya dengan 3.',reason:'\\frac{x}{3}=3\\quad\\Rightarrow\\quad x=9',check:'\\frac{9}{3}+2=5'},
    {tex:'4x+1=3',answer:core.rational(1,2),hint:'Kurangi kedua ruas dengan 1, lalu bagi dengan 4.',reason:'4x=2\\quad\\Rightarrow\\quad x=\\frac12',check:'4\\times\\frac12+1=3'},
    {tex:'5x+1=2x+10',answer:core.rational(3),hint:'Kurangi kedua ruas dengan 2x, kemudian kurangi dengan 1.',reason:'3x=9\\quad\\Rightarrow\\quad x=3',check:'5\\times3+1=2\\times3+10=16'}
  ];
  const solved=new Set();
  function progress() { $('#progress').textContent=`${solved.size} dari 8 latihan telah dijawab dengan tepat.`; }
  questions.forEach((q,i)=>{
    const card=document.createElement('div');card.className='question';
    card.innerHTML=`<h3 data-no-equation>Latihan ${i+1}</h3><p class="exercise-prompt"></p><form class="number-form" data-q="${i}"><label for="answer${i}">Jawaban latihan ${i+1}: nilai variabel yang memenuhi persamaan</label><div class="answer-line"><input id="answer${i}" type="text" inputmode="text" autocomplete="off" required aria-describedby="feedback${i}" placeholder="misalnya 3 atau 1/2"><button class="button" type="submit">Periksa jawaban</button></div></form><p id="feedback${i}" class="feedback" role="status"></p><details><summary>Butuh petunjuk?</summary><p class="hint"></p></details><details><summary>Lihat pembahasan</summary><p class="explanation"></p></details>`;
    card.querySelector('.exercise-prompt').append('Tentukan solusi ',math(q.tex),'.');
    card.querySelector('.hint').textContent=q.hint;
    card.querySelector('.explanation').append(math(q.reason),'. Periksa: ',math(q.check),'.');
    card.querySelector('form').addEventListener('submit',event=>{
      event.preventDefault(); const answer=core.parseAnswer($('#answer'+i).value),ok=core.equalAnswer(answer,q.answer),feedback=$('#feedback'+i);feedback.replaceChildren();feedback.className='feedback '+(ok?'correct':'incorrect');
      if(!answer) feedback.textContent='Tulis satu bilangan bulat, desimal, atau pecahan dengan penyebut bukan nol.';
      else if(ok) {feedback.append('Tepat. Periksa kembali: ',math(q.check),'.');solved.add(i);}
      else feedback.textContent='Belum tepat. Ganti variabel pada persamaan awal dengan jawabanmu, lalu bandingkan nilai kedua ruas. Petunjuk tersedia di bawah.';
      progress();
    });
    $('#questions').append(card);
  });
  $('#check-type').addEventListener('click',()=>{
    const choice=document.querySelector('[name="solution-type"]:checked')?.value,feedback=$('#type-feedback');feedback.replaceChildren();feedback.className='feedback '+(choice==='all'?'correct':'incorrect');
    if(!choice) feedback.textContent='Pilih satu jawaban terlebih dahulu.';
    else if(choice==='all') {feedback.append('Tepat. Distributif memberi ',math('2x+2=2x+2'),'. Pernyataan ini benar untuk semua bilangan real.');solved.add(7);}
    else feedback.append('Coba buka kurung. Setelah suku variabel dikurangi dari kedua ruas, tersisa ',math('2=2'),'. Ini tidak membatasi variabel pada satu nilai saja.');progress();
  });
  $('#reflection').value=saved.get('reflection')||'';
  $('#reflection').addEventListener('input',()=>{$('#reflection-note').textContent=saved.set('reflection',$('#reflection').value)?'Catatan tersimpan pada peramban ini.':'Catatan belum dapat disimpan. Salin jika ingin menyimpannya.';});
  function complete() {$('#complete').textContent='Bacaan sudah ditandai selesai ✓';$('#complete-note').textContent='Kamu dapat membaca dan mencoba kembali kapan saja.';}
  if(saved.get('complete')==='yes')complete();
  $('#complete').addEventListener('click',()=>{const ok=saved.set('complete','yes');complete();if(!ok)$('#complete-note').textContent='Bacaan ditandai selesai, tetapi peramban belum dapat menyimpan kemajuannya.';});progress();
})();
