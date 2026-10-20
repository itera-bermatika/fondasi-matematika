((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.LogarithmLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';const bases={two:{n:2,d:1},three:{n:3,d:1},half:{n:1,d:2},ten:{n:10,d:1}};
function power(key,t){const b=bases[key];return (b.n/b.d)**t;}
function exactPower(key,t){if(!Number.isInteger(t))throw new RangeError('Integer exponent required');const b=bases[key];return t>=0?{n:b.n**t,d:b.d**t}:{n:b.d**(-t),d:b.n**(-t)};}
function logarithm(key,y){if(!(y>0))return null;const b=bases[key];const value=Math.log(y)/Math.log(b.n/b.d),nearest=Math.round(value);return Math.abs(value-nearest)<1e-12?(nearest===0?0:nearest):value;}
function point(x,y){return {x:180+30*x,y:180-30*y};}
return {bases,power,exactPower,logarithm,point};
});