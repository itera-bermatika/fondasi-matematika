((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.RationalLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';const denominators=[1,2,4,10,100];
function value(kind,x){if(x===1)return null;if(kind==='hole')return x+1;if(kind==='pole'||kind==='partial')return 1+2/(x-1);throw new RangeError('Unknown function');}
function sample(kind,index,side){const d=denominators[index];return {x:{n:d+side,d},y:kind==='hole'?{n:2*d+side,d}:{n:1+side*2*d,d:1}};}
function point(x,y){return {x:180+30*x,y:180-30*y};}
return {value,sample,point,denominators};
});