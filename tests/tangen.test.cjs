const assert=require('node:assert/strict'),c=require('../dist/tangen-core.js');
for(const d of [90,270,-90,450]){assert.equal(c.ratios(d).tan,null);assert.equal(c.ratios(d).sec,null);assert.equal(c.ratios(d).cot,0);}
for(const d of [0,180,360]){assert.equal(c.ratios(d).cot,null);assert.equal(c.ratios(d).csc,null);assert.equal(c.ratios(d).tan,0);}
assert.ok(c.ratios(89).tan>57);assert.ok(c.ratios(91).tan<-57);assert.ok(Math.abs(c.ratios(45).tan-1)<1e-12);
for(let d=0;d<=360;d++){const p=c.ratios(d),q=c.ratios(d+180);if(p.tan!==null){assert.ok(Math.abs(1+p.tan*p.tan-p.sec*p.sec)<1e-8);assert.ok(Math.abs(p.tan-q.tan)<1e-8);}if(p.cot!==null)assert.ok(Math.abs(1+p.cot*p.cot-p.csc*p.csc)<1e-8);}
console.log('OK: undefined ratios, values on axes, signs near 90 degrees, identities and periodicity.');
