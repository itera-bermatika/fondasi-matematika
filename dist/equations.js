/* Shared mathematical typography for static reading and live activities. */
(() => {
  'use strict';
  const NS = 'http://www.w3.org/1998/Math/MathML';
  const supers = {'⁰':'0','¹':'1','²':'2','³':'3','⁴':'4','⁵':'5','⁶':'6','⁷':'7','⁸':'8','⁹':'9','⁻':'−','⁺':'+','ᵃ':'a','ᵇ':'b','ᶜ':'c','ᵈ':'d','ᵐ':'m','ⁿ':'n','ᵖ':'p','ᵠ':'q','ˣ':'x'};
  function node(tag, ...children) {
    const e = document.createElementNS(NS, tag);
    for (const child of children.flat()) e.append(typeof child === 'string' ? document.createTextNode(child) : child);
    return e;
  }
  function tokenize(source) {
    return source.match(/\d+(?:[.,]\d+)*|[a-zA-Z]|[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ᵃᵇᶜᵈᵐⁿᵖᵠˣ]+|[^\s]/gu) || [];
  }
  function parse(source) {
    const tokens = tokenize(source); let i = 0;
    function atom() {
      const t = tokens[i++];
      if (t === undefined) return node('mrow');
      let result;
      if (t === '(' || t === '[') {
        const close = t === '(' ? ')' : ']';
        const inner = sequence(close);
        if (tokens[i] === close) i++;
        result = node('mrow', node('mo', t), inner, node('mo', close));
        result.dataset.group = 'true';
      } else if (t === '√') {
        let radicand = atom();
        if (radicand.dataset.group) radicand = ungroup(radicand);
        result = node('msqrt', radicand);
      } else if (t === '|' ) {
        result = node('mrow', node('mo','|'), sequence('|'), node('mo','|'));
        if (tokens[i] === '|') i++;
      } else if (t === '½') result = node('mfrac',node('mn','1'),node('mn','2'));
      else if (/^\d/.test(t)) result = node('mn', t);
      else if (/^[a-zA-Z]$/.test(t)) result = node('mi', t);
      else result = node('mo', t === '-' ? '−' : t);
      if (tokens[i] && /^[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ᵃᵇᶜᵈᵐⁿᵖᵠˣ]+$/.test(tokens[i])) {
        const exp = tokens[i++].split('').map(c => supers[c]).join('');
        result = node('msup', result, parse(exp));
      } else if (tokens[i] === '^') { i++; result = node('msup', result, atom()); }
      return result;
    }
    function ungroup(e) {
      if (!e.dataset.group) return e;
      return e.children[1];
    }
    function sequence(close) {
      const pieces = [];
      while (i < tokens.length && tokens[i] !== close) {
        if (tokens[i] === '/' && pieces.length) {
          i++;
          const factors = [pieces.pop()];
          while (pieces.length && pieces[pieces.length-1].localName !== 'mo') factors.unshift(pieces.pop());
          const numerator = factors.length === 1 ? factors[0] : node('mrow',factors);
          let denominator;
          if (tokens[i] === '-' || tokens[i] === '−') {
            i++; denominator = node('mrow',node('mo','−'),atom());
          } else denominator = atom();
          pieces.push(node('mfrac', ungroup(numerator), ungroup(denominator)));
        } else pieces.push(atom());
      }
      return node('mrow', pieces);
    }
    return sequence();
  }
  function equation(source) {
    const math = node('math', parse(source));
    math.setAttribute('display','inline');
    math.setAttribute('aria-label',source);
    math.setAttribute('data-source',source);
    const span = document.createElement('span');
    span.className = 'equation-inline'; span.append(math); return span;
  }
  // Only isolated mathematical identifiers are recognized, never fragments of words.
  const identifier = '(?:xy|ab|ac|pq|qx|px|kx|kb|mn|[a-dkmnpqtx-yABC])';
  const number = '\\d+(?:[.,]\\d+)*½?';
  const power = '[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ᵃᵇᶜᵈᵐⁿᵖᵠˣ]*';
  const atomPattern = `(?:${number}(?:${identifier})?|${identifier}|[□½])${power}(?![\\p{L}\\p{N}])`;
  const operator = '[()+−\\-×÷/=<>≠≤≥≈±√|→\\[\\]]';
  const superscriptPattern = '[⁰¹²³⁴⁵⁶⁷⁸⁹⁻⁺ᵃᵇᶜᵈᵐⁿᵖᵠˣ]+';
  const run = new RegExp(`(?<![\\p{L}\\p{N}])(?:${atomPattern}|[√(−\\-|=<>≠≤≥≈±])(?:\\s*(?:${atomPattern}|${operator}|${superscriptPattern}))*`, 'gu');
  const excluded = 'math,.equation-inline,script,style,textarea,input,select,option,[data-no-equation]';
  function textNode(text) {
    if (!text.parentElement || text.parentElement.closest(excluded)) return;
    if (text.parentElement.closest('svg') && !text.parentElement.closest('.equation-svg')) return;
    const source = text.nodeValue;
    if (!source.trim()) return;
    run.lastIndex = 0; const matches = [...source.matchAll(run)];
    if (!matches.length) return;
    const fragment = document.createDocumentFragment(); let last = 0, changed = false;
    for (const match of matches) {
      const raw = match[0].trimEnd();
      if (!/[\da-dkmnpqtx-yABC□½]/.test(raw)) continue;
      // Do not absorb an enclosing prose parenthesis unless it is balanced.
      let end = raw.length;
      while (end && /[+×÷/=<>≠≤≥≈±√→\-−]$/.test(raw.slice(0,end))) end--;
      let value = raw.slice(0,end).trimEnd();
      if (!value) continue;
      const opens = (value.match(/\(/g)||[]).length, closes = (value.match(/\)/g)||[]).length;
      while (closes > opens && value.endsWith(')')) value = value.slice(0,-1);
      fragment.append(document.createTextNode(source.slice(last,match.index)), equation(value));
      last = match.index + value.length; changed = true;
    }
    if (changed) { fragment.append(document.createTextNode(source.slice(last))); text.replaceWith(fragment); }
  }
  function render(root) {
    if (root.nodeType === Node.TEXT_NODE) { textNode(root); return; }
    if (!(root instanceof Element) || root.closest(excluded)) return;
    if (root.closest('svg') && !root.closest('.equation-svg')) return;
    // Replace the previous hand-built fraction with a real fraction layout.
    for (const old of root.querySelectorAll('.frac:not([data-equation-fraction])')) {
      const parts = [...old.children];
      if (parts.length !== 2) continue;
      const math = node('math',node('mfrac',parse(parts[0].textContent),parse(parts[1].textContent)));
      math.setAttribute('aria-label',old.getAttribute('aria-label') || `${parts[0].textContent}/${parts[1].textContent}`);
      old.replaceChildren(math); old.dataset.equationFraction = 'true';
    }
    const walker = document.createTreeWalker(root,NodeFilter.SHOW_TEXT);
    const texts = []; while (walker.nextNode()) texts.push(walker.currentNode);
    texts.forEach(textNode);
  }
  // Native select menus cannot contain equation markup. Keep their state and
  // events, and provide an accessible button-based equation picker beside them.
  const pickers = new Map();
  function syncPickers() {
    for (const select of document.querySelectorAll('select')) {
      let picker = pickers.get(select);
      if (!picker) {
        const details = document.createElement('details'); details.className='equation-picker';
        const summary = document.createElement('summary');
        const list = document.createElement('div'); list.className='equation-options';
        details.append(summary,list); select.after(details); select.classList.add('equation-native-select');
        select.setAttribute('tabindex','-1'); select.setAttribute('aria-hidden','true');
        const label = document.querySelector(`label[for="${select.id}"]`);
        if (label) { label.id ||= `${select.id}-equation-label`; details.setAttribute('aria-labelledby',label.id); }
        for (const option of select.options) {
          const button = document.createElement('button'); button.type='button'; button.textContent=option.textContent;
          button.dataset.option=option.value;
          button.addEventListener('click',()=>{
            select.value=option.value; select.dispatchEvent(new Event('change',{bubbles:true}));
            details.open=false; summary.focus();
          }); list.append(button);
        }
        details.addEventListener('keydown',e=>{ if(e.key==='Escape'){details.open=false;summary.focus();} });
        picker={details,summary,list,value:null}; pickers.set(select,picker);
      }
      if (picker.value !== select.value) {
        picker.summary.textContent=select.selectedOptions[0]?.textContent || ''; picker.value=select.value;
        for (const button of picker.list.children) button.setAttribute('aria-pressed',String(button.dataset.option===select.value));
      }
      render(picker.details);
    }
  }
  const graphLabels = new WeakMap();
  function syncGraphs() {
    for (const text of document.querySelectorAll('svg text')) {
      const source=text.textContent;
      if(!source.trim())continue;
      const key=[source,text.getAttribute('x'),text.getAttribute('y')].join('|');
      let label=graphLabels.get(text);
      if(label?.key===key)continue;
      if(!label){
        const box=document.createElementNS('http://www.w3.org/2000/svg','foreignObject');
        box.classList.add('equation-svg-box');box.setAttribute('pointer-events','none');
        const content=document.createElementNS('http://www.w3.org/1999/xhtml','div');
        content.className='equation-svg';box.append(content);text.after(box);
        text.style.opacity='0';text.setAttribute('aria-hidden','true');
        label={box,content,key:null};graphLabels.set(text,label);
      }
      const size=parseFloat(getComputedStyle(text).fontSize)||20;
      const width=Math.min(350,Math.max(70,source.length*size*.7));
      const anchor=text.getAttribute('text-anchor')||'start';
      const x=parseFloat(text.getAttribute('x'))||0,y=parseFloat(text.getAttribute('y'))||0;
      label.box.setAttribute('x',x-(anchor==='middle'?width/2:anchor==='end'?width:0));
      label.box.setAttribute('y',y-size*1.55);label.box.setAttribute('width',width);
      label.box.setAttribute('height',size*3);label.box.style.overflow='visible';
      label.content.style.fontSize=`${size}px`;label.content.style.textAlign=anchor==='middle'?'center':anchor==='end'?'right':'left';
      label.content.textContent=source;render(label.content);label.key=key;
    }
  }
  function start() {
    let busy=false, timer;
    const observer = new MutationObserver(records=>{
      if (busy) return;
      const roots=new Set();
      for(const record of records){
        if(record.target instanceof Element && record.target.closest('math,.equation-inline,svg')) continue;
        roots.add(record.target.nodeType===Node.TEXT_NODE?record.target.parentElement:record.target);
      }
      if(!roots.size)return;
      clearTimeout(timer);timer=setTimeout(()=>refresh(),60);
    });
    function refresh(){
      busy=true;observer.disconnect();
      clearTimeout(timer);
      for(const label of document.querySelectorAll('.choice')){
        if(label.querySelector('.choice-copy'))continue;
        const input=label.querySelector('input');if(!input)continue;
        const copy=document.createElement('span');copy.className='choice-copy';
        for(const child of [...label.childNodes])if(child!==input)copy.append(child);
        label.append(copy);
      }
      render(document.body);syncPickers();syncGraphs();
      observer.observe(document.body,{childList:true,subtree:true,characterData:true});busy=false;
    }
    document.addEventListener('change',()=>setTimeout(refresh,0));
    document.addEventListener('input',()=>setTimeout(refresh,0));
    document.addEventListener('click',()=>setTimeout(refresh,0));
    refresh();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);else start();
})();
