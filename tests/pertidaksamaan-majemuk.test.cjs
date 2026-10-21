const assert=require('node:assert/strict');const {ray,contains,combine,intervalTex}=require('../dist/pertidaksamaan-majemuk-core.js');
const truth=(r,b,x)=>r==='<'?x<b:r==='<='?x<=b:r==='>'?x>b:x>=b;
for(const ra of ['<','<=','>','>='])for(const rb of ['<','<=','>','>='])for(let a=-4;a<=4;a++)for(let b=-4;b<=4;b++)for(const op of ['and','or']){const A=ray(ra,a),B=ray(rb,b),result=combine(A,B,op);assert.deepEqual(result,combine(B,A,op));for(let x=-6;x<=6;x+=.5){const expected=op==='and'?truth(ra,a,x)&&truth(rb,b,x):truth(ra,a,x)||truth(rb,b,x);assert.equal(result.some(i=>contains(i,x)),expected,`${ra}${a} ${op} ${rb}${b} at ${x}`);}}
assert.equal(intervalTex(combine(ray('>=',2),ray('<=',2),'and')),'\\{2\\}');
assert.equal(intervalTex(combine(ray('>',3),ray('<',-1),'and')),'\\varnothing');
const hole=combine(ray('<',2),ray('>',2),'or');assert.equal(hole.length,2);assert.equal(hole.some(i=>contains(i,2)),false);
const filled=combine(ray('<=',2),ray('>',2),'or');assert.equal(filled.length,1);assert.equal(contains(filled[0],2),true);
console.log('OK: all lab relations and bounds, inclusive union, intersection, commutativity, endpoint membership, empty sets, singletons and touching intervals.');
