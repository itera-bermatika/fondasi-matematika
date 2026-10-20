((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.TransformLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function value(x,a,h,k){return a*(x-h)*(x-h)+k;}
function transform(u,v,a,h,k){return {x:u+h,y:a*v+k};}
function range(a,k){return a===0?{min:k,max:k}:a>0?{min:k,max:Infinity}:{min:-Infinity,max:k};}
function point(x,y){return {x:180+30*x,y:180-30*y};}
return {value,transform,range,point};
});