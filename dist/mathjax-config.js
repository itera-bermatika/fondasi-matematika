/* MathJax 4.1.3 and New Computer Modern are served from this site. */
window.MathJax = {
  loader: {
    load:['a11y/assistive-mml'],
    paths: {mathjax:'/vendor/mathjax',fonts:'/vendor','mathjax-newcm':'/vendor/mathjax-font'}
  },
  output: {font:'mathjax-newcm',fontPath:'/vendor/mathjax-font'},
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
      document.dispatchEvent(new Event('fondasi-mathjax-ready'));
      return Promise.resolve();
    }
  }
};
