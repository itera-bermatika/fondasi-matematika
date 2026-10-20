((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.CoordinateLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
function location(x,y){if(x===0&&y===0)return 'origin';if(x===0)return 'y-axis';if(y===0)return 'x-axis';return x>0?(y>0?'I':'IV'):(y>0?'II':'III');}
function position(x,y){return {left:50+x*100/12,top:50-y*100/12};}
return {location,position};
});