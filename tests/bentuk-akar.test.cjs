const assert=require('node:assert/strict');const {nthRoot,simplify,positivePower}=require('../dist/bentuk-akar-core.js');
for(let n=2;n<=5;n++)for(const a of [-32,-16,-8,0,8,16,32]){const v=nthRoot(a,n);if(a<0&&n%2===0){assert.equal(v,null);continue;}assert.ok(Math.abs(v**n-a)<1e-10);if(n%2===0)assert.ok(v>=0);}
assert.equal(nthRoot(-27,3),-3);assert.equal(nthRoot(16,4),2);assert.equal(nthRoot(-16,4),null);
assert.deepEqual(simplify(72),{outside:6,inside:2});assert.deepEqual(simplify(12),{outside:2,inside:3});assert.deepEqual(simplify(0),{outside:0,inside:1});
for(let n=1;n<=100;n++){const {outside,inside}=simplify(n);assert.equal(outside**2*inside,n);for(let k=2;k*k<=inside;k++)assert.notEqual(inside%(k*k),0);}
for(const [a,m,n,value] of [[8,2,3,4],[16,3,4,8],[27,-2,3,1/9],[9,1,2,3]])assert.ok(Math.abs(positivePower(a,m,n)-value)<1e-12);
assert.throws(()=>positivePower(-8,1,3),RangeError);assert.throws(()=>positivePower(0,-1,2),RangeError);assert.throws(()=>simplify(-1),RangeError);
console.log('OK: odd/even real roots, exact square-factor extraction for all lab inputs, positive-base rational powers and excluded cases.');
