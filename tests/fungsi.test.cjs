const assert=require('node:assert/strict');const {evaluate,classify,point}=require('../dist/fungsi-core.js');
assert.equal(evaluate('linear',3),7);assert.equal(evaluate('linear',4),9);assert.equal(evaluate('square',-2),4);assert.equal(evaluate('square',.5),.25);
const domain=[-1,0,1],codomain=[0,1,2];assert.equal(classify(domain,codomain,[[-1,1],[0,0],[1,1]]).isFunction,true);assert.deepEqual(classify(domain,codomain,[[-1,1],[0,0]]).missing,[1]);assert.deepEqual(classify(domain,codomain,[[-1,1],[0,0],[1,1],[1,2]]).conflicts,[1]);assert.equal(classify(domain,codomain,[[-1,1],[0,0],[1,3]]).isFunction,false);
for(const rule of ['linear','square'])for(let i=0;i<=80;i++){const x=-2+i/20,y=evaluate(rule,x),p=point(x,y);assert.ok(p.x>=30&&p.x<=270&&p.y>=30&&p.y<=270);assert.ok(Math.abs((p.x-150)/60-x)<1e-10);assert.ok(Math.abs((180-p.y)/30-y)<1e-10);}
console.log('OK: evaluation, many-to-one functions, missing/conflicting/out-of-codomain outputs and plot bounds.');
