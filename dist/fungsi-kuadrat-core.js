((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.QuadraticLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function value(a,b,c,x){return a*x*x+b*x+c;}
function analyze(a,b,c){if(a===0)throw new RangeError('Quadratic coefficient must be nonzero');const delta=b*b-4*a*c,h=(-b/(2*a))||0,k=c-b*b/(4*a);const roots=delta<0?[]:delta===0?[h]:[(-b-Math.sqrt(delta))/(2*a),(-b+Math.sqrt(delta))/(2*a)].map(x=>x===0?0:x).sort((x,y)=>x-y);return {delta,h,k,roots};}
function point(x,y){return {x:180+30*x,y:180-30*y};}
return {value,analyze,point};
});