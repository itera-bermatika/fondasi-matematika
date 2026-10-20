/* Exact integer/fraction arithmetic shared by the lesson and its checks. */
((root, factory) => {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.LinearLesson = api;
})(typeof window === 'undefined' ? globalThis : window, () => {
  'use strict';
  function rational(n, d = 1) {
    if (!Number.isSafeInteger(n) || !Number.isSafeInteger(d) || d === 0) return null;
    if (d < 0) { n = -n; d = -d; }
    let a = Math.abs(n), b = d;
    while (b) { const remainder = a % b; a = b; b = remainder; }
    return {n: n / a, d: d / a};
  }
  function parseAnswer(source) {
    const s = source.trim().replace(/−/g, '-').replace(',', '.');
    let n, d;
    const fraction = s.match(/^([+-]?\d+)\s*\/\s*([+-]?\d+)$/);
    if (fraction) { n = Number(fraction[1]); d = Number(fraction[2]); }
    else if (/^[+-]?(?:\d+(?:\.\d{1,6})?|\.\d{1,6})$/.test(s)) {
      const decimals = s.includes('.') ? s.split('.')[1].length : 0;
      n = Number(s.replace('.', '')); d = 10 ** decimals;
    } else return null;
    return Math.abs(n) <= 1000000 && Math.abs(d) <= 1000000 ? rational(n, d) : null;
  }
  function equalAnswer(a, b) { return !!a && !!b && a.n * b.d === b.n * a.d; }
  // a*x+b = c*x+d, with integer coefficients in this lesson.
  function classify(a, b, c, d) {
    if (![a,b,c,d].every(Number.isSafeInteger)) throw new TypeError('Integer coefficients required.');
    const coefficient = a - c, constant = d - b;
    if (coefficient === 0) return {kind: constant === 0 ? 'all' : 'none'};
    return {kind:'one', value:rational(constant, coefficient)};
  }
  function holds(a, b, c, d, value) {
    return !!value && (a-c)*value.n + (b-d)*value.d === 0;
  }
  function fractionTex(value) {
    if (value.d === 1) return String(value.n);
    return (value.n < 0 ? '-' : '') + `\\frac{${Math.abs(value.n)}}{${value.d}}`;
  }
  function linearTex(a, b) {
    if (a === 0) return String(b);
    return (a === 1 ? 'x' : a === -1 ? '-x' : `${a}x`) + (b === 0 ? '' : b > 0 ? `+${b}` : String(b));
  }
  return {rational,parseAnswer,equalAnswer,classify,holds,fractionTex,linearTex};
});
