const assert=require('node:assert/strict');const {cases,value,solve,accepts,contains,intervalTex}=require('../dist/pertidaksamaan-kuadrat-core.js');
for(const q of cases)for(const relation of ['<','<=','>','>=']){const result=solve(q,relation);for(let x=-10;x<=10;x+=.125){const v=q.a*x*x+q.b*x+q.c;const expected=relation==='<'?v<0:relation==='<='?v<=0:relation==='>'?v>0:v>=0;assert.equal(accepts(q,relation,x),expected);assert.equal(result.some(i=>contains(i,x)),expected,`${q.id}, ${relation}, ${x}`);}if(q.factors)for(let x=-4;x<=4;x+=.25)assert.ok(value(q,x)===q.a*(x-q.factors[0])*(x-q.factors[1]));}
assert.equal(intervalTex(solve(cases[0],'<=')),'[-2,1]');assert.equal(intervalTex(solve(cases[2],'<=')),'\\{1\\}');assert.deepEqual(solve(cases[2],'<'),[]);assert.deepEqual(solve(cases[4],'<='),[]);assert.equal(solve(cases[4],'>')[0].lo,-Infinity);
// The sampled graph uses x=-5..5, y=-6..6; clipping must not change numeric membership.
for(const q of cases)for(let i=0;i<=320;i++){const x=-5+i/32,y=value(q,x);assert.ok(Number.isFinite(y));assert.ok(35+(x+5)*33>=35&&35+(x+5)*33<=365);}
assert.throws(()=>solve({a:0,b:1,c:0},'>'),RangeError);
console.log('OK: all quadratic lab cases and signs, exact boundary membership, double/no roots, coefficient reversal, factor signs and finite graph samples.');
