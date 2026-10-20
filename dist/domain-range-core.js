((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.DomainRangeLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function allowed(rule,x){return rule==='reciprocal'?x!==1:rule==='root'?x>=2:rule==='square';}
function evaluate(rule,x){if(!allowed(rule,x))return null;if(rule==='reciprocal')return 1/(x-1);if(rule==='root')return Math.sqrt(x-2);return x*x;}
function squareRange(a,b,leftOpen=false,rightOpen=false){if(a>=b)throw new RangeError('Increasing interval required');const aa=a*a,bb=b*b,min=a<=0&&b>=0?0:Math.min(aa,bb),max=Math.max(aa,bb);return {min,max,minIncluded:(a<0&&b>0)||(aa===min&&!leftOpen)||(bb===min&&!rightOpen),maxIncluded:(aa===max&&!leftOpen)||(bb===max&&!rightOpen)};}
function point(x,y){return {x:180+40*x,y:310-30*y};}
return {allowed,evaluate,squareRange,point};
});