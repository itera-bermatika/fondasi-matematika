((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.FunctionLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function evaluate(rule,x){if(rule==='linear')return 2*x+1;if(rule==='square')return x*x;throw new RangeError('Unknown rule');}
function classify(domain,codomain,pairs){const missing=[],conflicts=[],outside=[];for(const x of domain){const outputs=[...new Set(pairs.filter(p=>p[0]===x).map(p=>p[1]))];if(outputs.length===0)missing.push(x);if(outputs.length>1)conflicts.push(x);}for(const [x,y] of pairs)if(!domain.includes(x)||!codomain.includes(y))outside.push([x,y]);return {isFunction:!missing.length&&!conflicts.length&&!outside.length,missing,conflicts,outside};}
function point(x,y){return {x:150+60*x,y:180-30*y};}
return {evaluate,classify,point};
});