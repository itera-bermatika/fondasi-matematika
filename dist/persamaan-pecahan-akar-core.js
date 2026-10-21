((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.EquationCandidates=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function rational(a,b){const candidate=b-a;return {candidate,excluded:a,valid:candidate!==a};}
function checkRational(a,b,x){if(x===a)return {status:'excluded'};return {status:(x*x-a*a)/(x-a)===b?'valid':'incorrect'};}
const roots=[{id:'two',c:2,d:0,candidates:[2,-1]},{id:'six',c:6,d:0,candidates:[3,-2]},{id:'shift',c:0,d:2,candidates:[4,1]},{id:'both',c:1,d:1,candidates:[3,0]}];
function checkRoot(c,d,x){const radicand=x+c,right=x-d;if(radicand<0)return {status:'outside',radicand,right};if(right<0)return {status:'extraneous',radicand,right};return {status:Math.abs(Math.sqrt(radicand)-right)<1e-12?'valid':'incorrect',radicand,right};}
return {rational,checkRational,roots,checkRoot};
});
