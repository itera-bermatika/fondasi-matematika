((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ExponentialLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';const bases={two:{n:2,d:1},three:{n:3,d:1},half:{n:1,d:2},third:{n:1,d:3}};
function value(A,key,x){const b=bases[key];return A*(b.n/b.d)**x;}
function exact(A,key,x){if(!Number.isInteger(x))throw new RangeError('Integer exponent required');const b=bases[key];return x>=0?{n:A*b.n**x,d:b.d**x}:{n:A*b.d**(-x),d:b.n**(-x)};}
function point(x,y){return {x:180+(140/3)*x,y:310-26*y};}
return {bases,value,exact,point};
});