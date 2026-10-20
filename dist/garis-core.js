((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LineLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function slope(x1,y1,x2,y2){return x1===x2?null:(y2-y1)/(x2-x1);}
function clip(m,b,limit=5){const points=[];for(const x of [-limit,limit]){const y=m*x+b;if(y>=-limit&&y<=limit)points.push({x,y});}if(m!==0)for(const y of [-limit,limit]){const x=(y-b)/m;if(x>=-limit&&x<=limit&&!points.some(p=>Math.abs(p.x-x)<1e-9&&Math.abs(p.y-y)<1e-9))points.push({x,y});}return points.length===2?points:null;}
function point(x,y){return {x:60+x*10,y:60-y*10};}
return {slope,clip,point};
});