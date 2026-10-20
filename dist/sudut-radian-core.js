((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.AngleLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function radians(degrees){return degrees*Math.PI/180;}
function degrees(radians){return radians*180/Math.PI;}
function arcLength(radius,theta){return radius*Math.abs(theta);}
function point(radius,theta){return {x:180+radius*Math.cos(theta),y:180-radius*Math.sin(theta)};}
function arc(radius,theta){if(theta===0)return [];const count=Math.max(2,Math.ceil(Math.abs(theta)*40));return Array.from({length:count+1},(_,i)=>point(radius,theta*i/count));}
function coterminal(a,b){return Math.abs((a-b)/(2*Math.PI)-Math.round((a-b)/(2*Math.PI)))<1e-10;}
return {radians,degrees,arcLength,point,arc,coterminal};
});