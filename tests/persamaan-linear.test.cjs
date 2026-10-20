const assert = require('node:assert/strict');
const c = require('../dist/persamaan-linear-core.js');
for (const [a,b,right] of [[3,2,14],[2,-5,7],[-2,3,11],[4,1,3]]) {
  const solution=c.classify(a,b,0,right);
  assert.equal(solution.kind,'one');
  assert.ok(c.holds(a,b,0,right,solution.value),'solution satisfies original equation');
  assert.ok(c.holds(a,0,0,right-b,solution.value),'subtracting constant preserves solution');
  assert.ok(c.holds(-3*a,-3*b,0,-3*right,solution.value),'nonzero negative scaling preserves solution');
  assert.ok(!c.holds(a,b+1,0,right,solution.value),'changing one side breaks equality');
}
assert.deepEqual(c.classify(2,2,2,2),{kind:'all'});
assert.deepEqual(c.classify(2,2,2,3),{kind:'none'});
assert.deepEqual(c.classify(5,1,2,10),{kind:'one',value:{n:3,d:1}});
for(const answer of ['1/2','2/4','-1/-2','0.5','0,5','.5']) assert.ok(c.equalAnswer(c.parseAnswer(answer),{n:1,d:2}));
assert.deepEqual(c.parseAnswer('−4'),{n:-4,d:1});
for(const invalid of ['1/0','x=4','2+2','Infinity','','1/2/3','999999999999999999']) assert.equal(c.parseAnswer(invalid),null);
assert.equal(c.fractionTex(c.rational(2,-4)),'-\\frac{1}{2}');
assert.equal(c.rational(3,0),null);
console.log('OK: solutions, equivalent steps, negative coefficients, fractions, and invalid inputs.');
