const assert=require('node:assert/strict');
const {fraction,midpoint,decimal,decimalTex}=require('../dist/bilangan-real-core.js');
assert.deepEqual(fraction(-6,-8),{n:3,d:4});assert.deepEqual(fraction(0,3),{n:0,d:1});assert.throws(()=>fraction(1,0),RangeError);
assert.deepEqual(decimal(1,8),{integer:'0',nonRepeating:'125',repeating:'',terminates:true});
assert.deepEqual(decimal(1,6),{integer:'0',nonRepeating:'1',repeating:'6',terminates:false});
assert.deepEqual(decimal(-1,3),{integer:'-0',nonRepeating:'',repeating:'3',terminates:false});
assert.equal(decimal(22,7).repeating,'142857');assert.equal(decimalTex(6,3),'2');
for(let n=-9;n<=9;n++)for(let d=1;d<=12;d++){
 const v=decimal(n,d),prefix=Number(v.nonRepeating||'0')/10**v.nonRepeating.length;
 const cycle=v.repeating?Number(v.repeating)/(10**v.nonRepeating.length*(10**v.repeating.length-1)):0;
 const rebuilt=(n<0?-1:1)*(Math.abs(Number(v.integer))+prefix+cycle);
 assert.ok(Math.abs(rebuilt-n/d)<1e-12,`${n}/${d}`);
}
for(const [a,b] of [[{n:0,d:1},{n:1,d:1}],[{n:1,d:3},{n:1,d:2}],[{n:-1,d:1},{n:0,d:1}]]){
 let end=b;for(let i=0;i<=10;i++){const m=midpoint(a,end);assert.ok(m.n/m.d>a.n/a.d&&m.n/m.d<end.n/end.d);assert.ok(Math.abs(m.n/m.d-(a.n/a.d+end.n/end.d)/2)<1e-14);end=m;}
}
console.log('OK: exact finite/repeating decimals for all lab inputs, sign and zero handling, and strict midpoints through ten refinements.');
