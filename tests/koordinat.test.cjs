const assert=require('node:assert/strict');const {location,position}=require('../dist/koordinat-core.js');
for(const [x,y,expected] of [[3,2,'I'],[-3,2,'II'],[-3,-2,'III'],[3,-2,'IV'],[0,2,'y-axis'],[0,-2,'y-axis'],[2,0,'x-axis'],[-2,0,'x-axis'],[0,0,'origin']])assert.equal(location(x,y),expected);
assert.deepEqual(position(0,0),{left:50,top:50});
for(let x=-5;x<=5;x++)for(let y=-5;y<=5;y++){const p=position(x,y);assert.ok(p.left>=0&&p.left<=100&&p.top>=0&&p.top<=100);assert.ok(Math.abs((p.left-50)*12/100-x)<1e-12);assert.ok(Math.abs((50-p.top)*12/100-y)<1e-12);}
assert.equal(location(.5,-.5),'IV');console.log('OK: quadrants, axes, origin and coordinate-to-screen orientation.');
