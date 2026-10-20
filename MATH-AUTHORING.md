# Mathematical notation

All lessons load the locally hosted MathJax 4.1.3 renderer. Font data and optional
extensions are local under `dist/vendor/`. Update the runtime and font together.
The upstream Apache-2.0 license is in `dist/vendor/mathjax/LICENSE`.

For new content, write LaTeX explicitly rather than relying on the compatibility
reader for the original plain-text lessons:

```html
<span data-tex="\frac{a}{b}"></span>
<div class="formula" data-tex="\int_0^1 x^2\,dx=\frac13" data-display="block"></div>
<div class="formula" data-tex="\begin{pmatrix}1&2\\3&4\end{pmatrix}" data-display="block"></div>
```

Inline `\( ... \)` and display `\[ ... \]` delimiters are also supported.
HTML attributes require normal HTML escaping, particularly `&amp;` for matrix
column separators. Prefer a `data-tex` property set through JavaScript when
producing complex dynamic content. Use a fresh element for a changed equation,
or update its `data-tex` and remove `data-tex-ready` before the next render.

The original activity scripts still write their existing plain-text expressions.
`equations.js` reads these into structured input and calls MathJax's asynchronous
MathML-to-SVG conversion. New LaTeX calls the TeX-to-SVG conversion. Conversion is
serialized; results for removed elements are discarded so rapid slider changes
cannot restore stale answers. Unavailable rendering leaves readable source or
native MathML in place. Student answer inputs and reflection notes are not
typeset.

Equation picker buttons retain the original select values and change events.
Do not remove those selects unless also updating the activity implementation.
