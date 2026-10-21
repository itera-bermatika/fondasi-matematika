((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RadicalLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function nthRoot(a,n){if(!Number.isInteger(n)||n<2)throw new RangeError('Indeks akar sekurang-kurangnya dua.');if(a<0&&n%2===0)return null;return a<0?-Math.pow(-a,1/n):Math.pow(a,1/n);}
function simplify(n){if(!Number.isInteger(n)||n<0||n>10000)throw new RangeError('Radikan harus bilangan bulat dari nol sampai sepuluh ribu.');if(n===0)return {outside:0,inside:1};let outside=1;for(let k=1;k*k<=n;k++)if(n%(k*k)===0)outside=k;return {outside,inside:n/(outside*outside)};}
function texRoot(n){const {outside,inside}=simplify(n);return inside===1?String(outside):(outside===1?'':String(outside))+'\\sqrt{'+inside+'}';}
function positivePower(a,m,n){if(!(a>0)||!Number.isInteger(m)||!Number.isInteger(n)||n<1)throw new RangeError('Lab pangkat rasional menggunakan basis positif.');return Math.pow(a,m/n);}
return {nthRoot,simplify,texRoot,positivePower};
});
