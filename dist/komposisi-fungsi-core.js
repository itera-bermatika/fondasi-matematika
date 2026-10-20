((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CompositionLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';const f=x=>2*x+1,g=x=>x*x;
function operation(kind,x){const a=f(x),b=g(x);if(kind==='add')return a+b;if(kind==='subtract')return a-b;if(kind==='multiply')return a*b;if(kind==='divide')return b===0?null:a/b;throw new RangeError('Unknown operation');}
function compose(order,x){if(order==='fg'){const middle=g(x);return {middle,result:f(middle),other:g(f(x))};}if(order==='gf'){const middle=f(x);return {middle,result:g(middle),other:f(g(x))};}throw new RangeError('Unknown order');}
function rootCompositionAllowed(order,x){return order==='uv'?2*x-1>=0:order==='vu'?x>=0:false;}
return {f,g,operation,compose,rootCompositionAllowed};
});