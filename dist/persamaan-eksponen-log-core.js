((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.ExpLogEquationLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function exponential(x){const left=2**x;return {left,residual:left-3};}
function logCandidate(x){const product=(x-1)*(x-3),allowed=x>3,logSum=allowed?Math.log2(x-1)+Math.log2(x-3):null;return {product,allowed,logSum,solves:allowed&&Math.abs(logSum-3)<1e-12};}
return {exponential,logCandidate,exactSolution:Math.log2(3)};
});