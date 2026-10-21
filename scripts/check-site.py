"""Check local HTML links/assets before publishing, without dependencies."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit

ROOT = Path(__file__).resolve().parents[1] / 'dist'
errors = []


class Links(HTMLParser):
    def __init__(self, page):
        super().__init__()
        self.page = page
        self.ids = set()
        self.fragments = []

    def handle_starttag(self, tag, attrs):
        attributes = dict(attrs)
        identifier = attributes.get('id')
        if identifier:
            if identifier in self.ids:
                errors.append(f'{self.page.name}: duplicate id {identifier}')
            self.ids.add(identifier)
        for name, value in attrs:
            if name not in ('href', 'src') or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc:
                continue
            if name == 'href' and url.fragment:
                self.fragments.append((url.path, unquote(url.fragment), value))
            if not url.path:
                continue
            if url.path.startswith('/'):
                errors.append(f'{self.page.name}: root-relative URL {value}')
                continue
            target = self.page.parent / unquote(url.path)
            if not target.exists():
                errors.append(f'{self.page.name}: missing {value}')


pages = sorted(ROOT.glob('*.html'))
if not pages or not (ROOT / 'index.html').is_file():
    errors.append('dist/index.html is required')
documents = {}
for page in pages:
    document = Links(page)
    document.feed(page.read_text(encoding='utf-8'))
    documents[page.resolve()] = document
for page, document in documents.items():
    for path, fragment, value in document.fragments:
        target = (page.parent / unquote(path)).resolve() if path else page
        if target in documents and fragment not in documents[target].ids:
            errors.append(f'{page.name}: missing section {value}')
for asset in ('vendor/mathjax/tex-mml-svg.js',
              'vendor/mathjax-stix2-font/svg.js'):
    if not (ROOT / asset).is_file():
        errors.append(f'missing MathJax asset: {asset}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {len(pages)} pages, unique IDs, local HTML links/sections/assets checked.')
