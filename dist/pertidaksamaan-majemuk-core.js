((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CompoundLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function ray(relation,bound){if(!Number.isFinite(bound)||!['<','<=','>','>='].includes(relation))throw new RangeError('Hubungan dan batas harus sah.');return relation.startsWith('<')?{lo:-Infinity,hi:bound,lc:false,hc:relation==='<='}:{lo:bound,hi:Infinity,lc:relation==='>=',hc:false};}
function contains(interval,x){return (x>interval.lo||(interval.lc&&x===interval.lo))&&(x<interval.hi||(interval.hc&&x===interval.hi));}
function intersect(a,b){const lo=Math.max(a.lo,b.lo),hi=Math.min(a.hi,b.hi),lc=contains(a,lo)&&contains(b,lo),hc=contains(a,hi)&&contains(b,hi);return lo<hi||(lo===hi&&lc&&hc)?[{lo,hi,lc,hc}]:[];}
function unite(a,b){const [first,second]=[a,b].sort((x,y)=>x.lo-y.lo||Number(y.lc)-Number(x.lc));if(second.lo>first.hi||(second.lo===first.hi&&!first.hc&&!second.lc))return [{...first},{...second}];const hi=Math.max(first.hi,second.hi);return [{lo:first.lo,hi,lc:first.lc,hc:(first.hi===hi&&first.hc)||(second.hi===hi&&second.hc)}];}
function combine(a,b,op){if(op==='and')return intersect(a,b);if(op==='or')return unite(a,b);throw new RangeError('Gunakan dan atau atau.');}
function intervalTex(intervals){if(!intervals.length)return '\\varnothing';return intervals.map(i=>{if(i.lo===i.hi)return '\\{'+i.lo+'\\}';return (i.lc?'[':'(')+(i.lo===-Infinity?'-\\infty':i.lo)+','+(i.hi===Infinity?'\\infty':i.hi)+(i.hc?']':')');}).join('\\cup');}
return {ray,contains,intersect,unite,combine,intervalTex};
});
