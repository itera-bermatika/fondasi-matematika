const {test}=require('node:test');
const assert=require('node:assert/strict');
const {chapters,evaluate,formatNumberTex}=require('../dist/pengayaan-buku-core.js');

test('Indonesian decimals and thousands produce valid unambiguous TeX numbers',()=>{
 assert.equal(formatNumberTex(29000),'29\\,000');
 assert.equal(formatNumberTex(207.36),'207{,}36');
 assert.equal(formatNumberTex(12000.5),'12\\,000{,}5');
 assert.equal(formatNumberTex(-0.01),'-0{,}01');
 assert.equal(formatNumberTex(1e-14),'0');
 assert.throws(()=>formatNumberTex(Infinity),RangeError);
});
test('all 18 contextual calculations agree with independently calculated examples',()=>{
 const examples=[[1,4,18],[2,20.1,.1],[3,4,28],[4,2,36],[5,24,8],[6,29000,5],[7,6,5],[8,3,21000],[9,10,30],[10,120,12],[11,18,4],[12,6,36],[13,2,256],[14,4,207.36],[15,2,3],[16,4,0],[17,3.9,7.9],[18,.1,.81]];
 assert.equal(chapters.length,18);
 for(const [id,x,y] of examples)assert.ok(Math.abs(evaluate(id,x)-y)<1e-8,`chapter ${id}`);
});
test('physical boundaries, plateaus, direction, and limit extension',()=>{
 assert.equal(evaluate(1,10),30);assert.equal(evaluate(5,8),0);
 assert.equal(evaluate(6,27000),5);assert.equal(evaluate(6,26000),4);
 assert.equal(evaluate(9,8),30);assert.equal(evaluate(9,12),30);
 assert.equal(evaluate(10,480),30);assert.equal(evaluate(11,30),8);
 assert.equal(evaluate(12,5),evaluate(12,7));
 assert.equal(evaluate(15,0),1);assert.equal(evaluate(15,4),5);
 assert.equal(evaluate(16,1),-3);
 assert.equal(evaluate(17,4),8); // API returns extension/limit; UI explicitly says Q(4) undefined.
 assert.ok(Math.abs(evaluate(18,.01)-.0801)<1e-10);
});
test('reject unsupported, nonfinite, out-of-domain and off-step input',()=>{
 for(const c of chapters){assert.throws(()=>evaluate(c.id,NaN),RangeError);assert.throws(()=>evaluate(c.id,c.min-c.step),RangeError);assert.throws(()=>evaluate(c.id,c.max+c.step),RangeError);assert.throws(()=>evaluate(c.id,c.min+c.step/2),RangeError);}
 assert.throws(()=>evaluate(0,1),RangeError);assert.throws(()=>evaluate(8,1.5),RangeError);assert.throws(()=>evaluate(13,6),RangeError);assert.throws(()=>evaluate(1,'4'),RangeError);
});
