((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.UnitCircleLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
const exact={0:['1','0'],30:[String.raw`\frac{\sqrt{3}}{2}`,String.raw`\frac12`],45:[String.raw`\frac{\sqrt{2}}{2}`,String.raw`\frac{\sqrt{2}}{2}`],60:[String.raw`\frac12`,String.raw`\frac{\sqrt{3}}{2}`],90:['0','1']};
function coordinates(degrees){const rad=degrees*Math.PI/180,clamp=v=>Math.abs(v)<1e-12?0:Math.abs(v-1)<1e-12?1:Math.abs(v+1)<1e-12?-1:v,cos=clamp(Math.cos(rad)),sin=clamp(Math.sin(rad)),normalized=((degrees%360)+360)%360,reference=normalized<=90?normalized:normalized<=180?180-normalized:normalized<=270?normalized-180:360-normalized,pair=exact[reference];return {cos,sin,normalized,reference,cosTex:pair?(cos<0?'-':'')+pair[0]:null,sinTex:pair?(sin<0?'-':'')+pair[1]:null};}
function point(cos,sin){return {x:180+120*cos,y:180-120*sin};}
function arc(degrees){if(degrees===0)return [];const count=Math.max(2,Math.ceil(Math.abs(degrees)/2));return Array.from({length:count+1},(_,i)=>{const t=degrees*Math.PI/180*i/count;return {x:180+34*Math.cos(t),y:180-34*Math.sin(t)};});}
return {coordinates,point,arc};
});