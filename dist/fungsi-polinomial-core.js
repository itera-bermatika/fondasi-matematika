((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PolynomialLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function value(a,m,n,x){const y=a*(x+1)**m*(x-2)**n;return y===0?0:y;}
function tails(a,m,n){return {left:Math.sign(a)*((m+n)%2===0?1:-1),right:Math.sign(a)};}
function sample(a,m,n,root,side){const qn=root*4+side,qd=4;return {x:qn/qd,numerator:a*(qn+qd)**m*(qn-2*qd)**n,denominator:qd**(m+n)};}
function point(x,y){return {x:180+30*x,y:180-30*y};}
return {value,tails,sample,point};
});