/* MathJax 4.1.3 and STIX Two are served from this site. */
window.MathJax = {
  loader: {
    load:['a11y/assistive-mml'],
    paths: {mathjax:'/vendor/mathjax',fonts:'/vendor','mathjax-stix2':'/vendor/mathjax-stix2-font'}
  },
  output: {font:'mathjax-stix2',fontPath:'/vendor/mathjax-stix2-font'},
  tex: {inlineMath:[['\\(','\\)']],displayMath:[['\\[','\\]'],['$$','$$']],processEscapes:true},
  svg: {fontCache:'local'},
  options: {
    enableEnrichment:false,enableSpeech:false,enableBraille:false,
    menuOptions:{settings:{enrich:false,speech:false,braille:false,assistiveMml:true}}
  },
  startup: {
    typeset:false,
    pageReady() {
      document.documentElement.dataset.mathjaxVersion=window.MathJax.version;
      document.documentElement.dataset.mathjaxFont='stix2';
      document.dispatchEvent(new Event('fondasi-mathjax-ready'));
      return Promise.resolve();
    }
  }
};
