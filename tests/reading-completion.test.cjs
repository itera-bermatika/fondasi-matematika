'use strict';
const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
const path=require('node:path');
const source=fs.readFileSync(path.join(__dirname,'../dist/reading-completion.js'),'utf8');
function load(store,key='lesson-a',blocked=false){
  const button={dataset:{storageKey:key},textContent:'Tandai bacaan selesai',attributes:{},setAttribute(k,v){this.attributes[k]=v},addEventListener(name,fn){this[name]=fn}};
  const note={textContent:''};
  const localStorage={getItem(k){if(blocked)throw Error('blocked');return store.get(k)||null},setItem(k,v){if(blocked)throw Error('blocked');store.set(k,v)}};
  vm.runInNewContext(source,{document:{querySelector:()=>button,getElementById:()=>note},localStorage});
  return {button,note};
}
test('completion persists across reloads and announces status',()=>{
  const store=new Map(),first=load(store);first.button.click();
  assert.equal(store.get('lesson-a'),'yes');
  const restored=load(store);assert.equal(restored.button.attributes['aria-pressed'],'true');
  assert.match(restored.note.textContent,/tersimpan/);
});
test('completion stays isolated between readings',()=>{
  const store=new Map();load(store,'lesson-a').button.click();
  const other=load(store,'lesson-b');assert.equal(other.button.textContent,'Tandai bacaan selesai');
  assert.equal(store.has('lesson-b'),false);
});
test('blocked browser storage still allows marking without claiming persistence',()=>{
  const state=load(new Map(),'lesson-a',true);state.button.click();
  assert.equal(state.button.attributes['aria-pressed'],'true');assert.match(state.note.textContent,/belum dapat disimpan/);
});
test('legacy pages are ignored by the new handler',()=>{
  vm.runInNewContext(source,{document:{querySelector:()=>null}});
});
