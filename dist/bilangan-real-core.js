((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RealNumbersLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
  'use strict';
  function fraction(n,d){
    if(!Number.isSafeInteger(n)||!Number.isSafeInteger(d)||d===0)throw new RangeError('Pecahan memerlukan bilangan bulat dan penyebut bukan nol.');
    if(d<0){n=-n;d=-d;}let a=Math.abs(n),b=d;while(b){[a,b]=[b,a%b];}return {n:n/a,d:d/a};
  }
  function tex(f){return f.d===1?String(f.n):`${f.n<0?'-':''}\\frac{${Math.abs(f.n)}}{${f.d}}`;}
  function midpoint(a,b){return fraction(a.n*b.d+b.n*a.d,2*a.d*b.d);}
  function decimal(n,d){
    const f=fraction(n,d),sign=f.n<0?'-':'',integer=Math.floor(Math.abs(f.n)/f.d);
    let remainder=Math.abs(f.n)%f.d,digits='',seen=new Map();
    while(remainder&&!seen.has(remainder)){
      seen.set(remainder,digits.length);remainder*=10;digits+=Math.floor(remainder/f.d);remainder%=f.d;
    }
    const start=remainder?seen.get(remainder):digits.length;
    return {integer:sign+integer,nonRepeating:digits.slice(0,start),repeating:digits.slice(start),terminates:remainder===0};
  }
  function decimalTex(n,d){const v=decimal(n,d);return v.integer+((v.nonRepeating||v.repeating)?'{,}'+v.nonRepeating+(v.repeating?'\\overline{'+v.repeating+'}':''):'');}
  return {fraction,tex,midpoint,decimal,decimalTex};
});
