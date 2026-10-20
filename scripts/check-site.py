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

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name not in ('href', 'src') or not value:
                continue
            url = urlsplit(value)
            if url.scheme or url.netloc or not url.path:
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
for page in pages:
    Links(page).feed(page.read_text(encoding='utf-8'))
for asset in ('vendor/mathjax/tex-mml-svg.js',
              'vendor/mathjax-stix2-font/svg.js'):
    if not (ROOT / asset).is_file():
        errors.append(f'missing MathJax asset: {asset}')
if errors:
    raise SystemExit('\n'.join(errors))
print(f'OK: {len(pages)} pages and local HTML links/assets checked.')
