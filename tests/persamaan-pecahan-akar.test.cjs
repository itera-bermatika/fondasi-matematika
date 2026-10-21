const assert=require('node:assert/strict');const {rational,checkRational,roots,checkRoot}=require('../dist/persamaan-pecahan-akar-core.js');
for(let a=1;a<=3;a++)for(let b=0;b<=6;b++){const r=rational(a,b);assert.equal(r.candidate,b-a);assert.equal(r.valid,b!==2*a);assert.equal(checkRational(a,b,a).status,'excluded');if(r.valid)assert.ok((r.candidate**2-a*a)/(r.candidate-a)===b);assert.equal(checkRational(a,b,r.candidate).status,r.valid?'valid':'excluded');}
for(const r of roots){assert.equal(checkRoot(r.c,r.d,r.candidates[0]).status,'valid');assert.equal(checkRoot(r.c,r.d,r.candidates[1]).status,'extraneous');for(const x of r.candidates)assert.equal(x+r.c,(x-r.d)**2);}
assert.equal(checkRoot(2,0,-3).status,'outside');assert.equal(checkRoot(2,0,1).status,'incorrect');assert.equal(checkRational(2,5,4).status,'incorrect');
assert.equal(checkRoot(-2,-1,3).status,'incorrect');
console.log('OK: all rational lab parameters, excluded denominators, every squared-equation candidate, extraneous sign branches and original-equation checks.');
