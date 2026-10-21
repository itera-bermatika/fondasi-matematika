((root,factory)=>{const api=factory();if(typeof module==='object'&&module.exports)module.exports=api;else root.PiecewiseLesson=api;})(typeof window==='undefined'?globalThis:window,()=>{
'use strict';
const branch=(lo,hi,lc,hc,fn,color)=>({lo,hi,lc,hc,fn,color});
const examples=[
{id:'absolute',cut:0,tex:String.raw`f(x)=\begin{cases}-x,&x<0\\x,&x\ge0\end{cases}`,domain:String.raw`\mathbb R`,inDomain:()=>true,branches:[branch(-Infinity,0,false,false,x=>-x,'#3c6c99'),branch(0,Infinity,true,false,x=>x,'#785497')]},
{id:'jump',cut:1,tex:String.raw`f(x)=\begin{cases}x+1,&x<1\\3,&x\ge1\end{cases}`,domain:String.raw`\mathbb R`,inDomain:()=>true,branches:[branch(-Infinity,1,false,false,x=>x+1,'#3c6c99'),branch(1,Infinity,true,false,()=>3,'#785497')]},
{id:'point',cut:1,tex:String.raw`f(x)=\begin{cases}x+1,&x<1\\5,&x=1\\x+1,&x>1\end{cases}`,domain:String.raw`\mathbb R`,inDomain:()=>true,branches:[branch(-Infinity,1,false,false,x=>x+1,'#3c6c99'),branch(1,1,true,true,()=>5,'#466e4a'),branch(1,Infinity,false,false,x=>x+1,'#785497')]},
{id:'hole',cut:1,tex:String.raw`f(x)=\begin{cases}x+1,&x<1\\x+1,&x>1\end{cases}`,domain:String.raw`\mathbb R\setminus\{1\}`,inDomain:x=>x!==1,branches:[branch(-Infinity,1,false,false,x=>x+1,'#3c6c99'),branch(1,Infinity,false,false,x=>x+1,'#785497')]}
];
function matches(b,x){return (x>b.lo||(b.lc&&x===b.lo))&&(x<b.hi||(b.hc&&x===b.hi));}
function evaluate(example,x){if(!example.inDomain(x))return {status:'outside',indices:[],values:[]};const indices=example.branches.map((b,i)=>matches(b,x)?i:-1).filter(i=>i>=0),values=indices.map(i=>example.branches[i].fn(x));if(!indices.length)return {status:'missing',indices,values};return {status:new Set(values).size>1?'ambiguous':'defined',indices,values,value:values[0]};}
function boundary(mode){return {inDomain:()=>true,branches:[branch(-Infinity,1,false,mode==='overlap',x=>x+1),branch(1,Infinity,mode!=='gap',false,()=>3)]};}
return {examples,matches,evaluate,boundary};
});
