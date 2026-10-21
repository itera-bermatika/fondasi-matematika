((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PointGeometry=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function measure(a,b){const dx=b.x-a.x,dy=b.y-a.y;return {dx,dy,squared:dx*dx+dy*dy,distance:Math.hypot(dx,dy),midpoint:{x:(a.x+b.x)/2,y:(a.y+b.y)/2}};}
function screen(p){return {x:250+p.x*42,y:250-p.y*42};}
return {measure,screen};
});
