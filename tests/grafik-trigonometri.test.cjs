const assert=require('node:assert/strict'),c=require('../dist/grafik-trigonometri-core.js');
const close=(a,b)=>assert.ok(Math.abs(a-b)<1e-10,`${a} != ${b}`);
close(c.value(0),0);close(c.value(Math.PI/2),1);close(c.value(Math.PI),0);close(c.value(0,{kind:'cos'}),1);
const example={a:-2,b:2,h:Math.PI/2,k:1};const s=c.stats(example);assert.deepEqual({amplitude:s.amplitude,min:s.min,max:s.max,midline:s.midline},{amplitude:2,min:-1,max:3,midline:1});close(s.period,Math.PI);close(c.value(Math.PI/2,example),1);assert.ok(c.value(Math.PI/2+0.01,example)<1);
assert.equal(c.stats({a:0,b:2,k:1}).period,null);close(c.value(2,{a:0,k:1}),1);
for(const b of [0.5,1,2])for(const kind of ['sin','cos'])for(const a of [-3,-1,1,3]){const q={kind,a,b,h:-Math.PI/2,k:2},t=c.stats(q);for(let x=0;x<=12;x+=0.1){const y=c.value(x,q);assert.ok(y>=t.min-1e-10&&y<=t.max+1e-10);close(y,c.value(x+t.period,q));}const points=c.curve(q,4*Math.PI,5);assert.equal(points.length,481);assert.ok(points.every(p=>p.x>=48&&p.x<=610&&p.y>=25&&p.y<=265));}
for(let x=-6;x<=6;x+=0.1)close(c.value(x,{kind:'cos'}),c.value(x+Math.PI/2));
console.log('OK: key points, amplitude, period, shifts, reflection, constant case, range and plot bounds.');
