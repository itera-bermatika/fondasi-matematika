((root,factory)=>{if(typeof module==='object'&&module.exports)module.exports=factory(require('./persamaan-linear-core.js'));else root.InverseLesson=factory(root.LinearLesson);})(typeof window==='undefined'?globalThis:window,num=>{
'use strict';
function forward(q){return num.rational(2*q.n+q.d,q.d);}
function inverse(q){return num.rational(q.n-q.d,2*q.d);}
function preimages(y,branch){if(y<0)return [];const r=Math.sqrt(y);if(branch==='positive')return [r];if(branch==='negative')return [r===0?0:-r];if(branch==='all')return y===0?[0]:[-r,r];throw new RangeError('Unknown branch');}
return {forward,inverse,preimages};
});