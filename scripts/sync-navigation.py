"""Render/check the shared reading order without a build runtime or dependencies."""
import argparse
import json
import re
from html import escape, unescape
from pathlib import Path
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
DIST = ROOT / 'dist'
START = '<!-- reading-order:start -->'
END = '<!-- reading-order:end -->'
ANCHOR = re.compile(r'<a\b[^>]*>[\s\S]*?</a>')


def attrs(anchor):
    return dict(re.findall(r'([\w-]+)="([^"]*)"', anchor.split('>', 1)[0]))


def normalized(href, page):
    url = urlsplit(unescape(href))
    return (url.path or page) + ('#' + url.fragment if url.fragment else '')


def top_link(next_lesson, index=False, utility=False):
    if utility:
        href, label = next_lesson['href'], 'Mulai →'
        description = 'Mulai membaca: ' + next_lesson['title']
    elif next_lesson:
        href, label = next_lesson['href'], 'Lanjut →'
        description = 'Lanjut ke ' + next_lesson['title']
    else:
        href, label = 'index.html#peta', 'Peta →'
        description = 'Kembali ke peta belajar'
    extra = ''
    if index:
        extra = ''.join(' data-' + key + '="' + escape(value, quote=True) + '"'
                        for key, value in {
                            'home-href': FIRST['href'], 'home-label': 'Mulai →',
                            'home-description': 'Mulai membaca: ' + FIRST['title'],
                            'reading-href': href, 'reading-label': label,
                            'reading-description': description,
                        }.items())
        href, label, description = FIRST['href'], 'Mulai →', 'Mulai membaca: ' + FIRST['title']
    return (f'<a id="primary-reading-link" class="nav-cta" href="{escape(href, quote=True)}" '
            f'aria-label="{escape(description, quote=True)}" title="{escape(description, quote=True)}"'
            f'{extra}>{label}</a>')


def render_header(source, page, next_lesson, utility):
    match = re.search(r'<header\b[\s\S]*?</header>', source)
    if not match:
        raise ValueError(page + ': missing header')
    header = match.group(0)
    nav_match = re.search(r'<nav\b[\s\S]*?</nav>', header)
    if not nav_match:
        raise ValueError(page + ': missing primary menu')
    nav = nav_match.group(0)
    ctas = [m for m in ANCHOR.finditer(nav) if 'nav-cta' in attrs(m.group()).get('class', '').split()]
    if len(ctas) > 1:
        raise ValueError(page + ': multiple primary actions')
    cta = top_link(next_lesson, index=page == 'index.html', utility=utility)
    if ctas:
        m = ctas[0]
        nav = nav[:m.start()] + cta + nav[m.end():]
    else:
        nav = nav.replace('</nav>', cta + '</nav>')
    map_links = [m for m in ANCHOR.finditer(nav)
                 if normalized(attrs(m.group()).get('href', ''), page) == 'index.html#peta'
                 and 'nav-cta' not in attrs(m.group()).get('class', '').split()]
    if len(map_links) != 1:
        raise ValueError(page + ': expected one primary map link')
    m = map_links[0]
    map_link = ('<a class="nav-map" href="index.html#peta" aria-label="Peta belajar">'
                'Peta<span class="nav-map-long"> belajar</span></a>')
    nav = nav[:m.start()] + map_link + nav[m.end():]
    nav = re.sub(r'<a class="nav-home"[\s\S]*?</a>', '', nav)
    nav = nav.replace('</nav>', '<a class="nav-home" href="https://itera-bermatika.github.io/">Beranda ITERA</a></nav>')
    title = unescape(re.sub('<[^>]+>', '', re.search(r'<title>(.*?)</title>', source).group(1))).split(' — ')[0]
    if page == 'index.html':
        title = 'Bacaan Prekalkulus'
    brand = ('<a class="brand" href="index.html"><span class="brand-mark" aria-hidden="true">P</span>'
             '<span class="brand-copy">ITERA BERMATIKA<small>' + escape(title) + '</small></span></a>')
    header = '<header>' + brand + nav + '</header>'
    return source[:match.start()] + header + source[match.end():]


def render_bottom(source, page, previous, following, utility=False):
    previous_href = previous['href'] if previous else 'index.html#beranda'
    following_href = following['href'] if following else 'index.html#peta'
    previous_label = '← ' + previous['title'] if previous else '← Beranda Prekalkulus'
    following_label = following['title'] + ' →' if following else 'Peta belajar →'
    previous_caption, following_caption = 'SEBELUMNYA', 'SELANJUTNYA'
    if utility:
        previous_href, previous_label, previous_caption = 'index.html#peta', '← Peta belajar', 'KEMBALI'
        following_caption = 'MULAI MEMBACA'
    elif not previous:
        previous_caption = 'KEMBALI'
    if not following:
        following_caption = 'KEMBALI'
    block = (START + '<nav class="reading-navigation chapter-nav" aria-label="Urutan bacaan">'
             f'<a data-reading-prev href="{escape(previous_href, quote=True)}"><small>{previous_caption}</small>'
             + escape(previous_label) + '</a>'
             f'<a data-reading-next href="{escape(following_href, quote=True)}"><small>{following_caption}</small>'
             + escape(following_label) + '</a></nav>' + END)
    generated = re.compile(re.escape(START) + r'[\s\S]*?' + re.escape(END))
    if START in source:
        if len(generated.findall(source)) != 1:
            raise ValueError(page + ': expected exactly one reading navigation block')
        source = generated.sub('', source)
        # Put the final navigation after all reading content, including context links.
        article = re.search(r'<article\b[\s\S]*?</article>', source)
        if not article:
            raise ValueError(page + ': missing reading article')
        body = article.group()
        body = ANCHOR.sub(lambda m: '' if 'back-link' in attrs(m.group()).get('class', '').split()
                          and normalized(attrs(m.group()).get('href', ''), page) == 'index.html#peta'
                          else m.group(), body)
        body = re.sub(r'(?:<p>)?<a href="index.html#peta">(?:← )?Kembali ke peta belajar(?: →)?</a>(?:</p>)?(?=</article>)', '', body)
        body = body.replace('</article>', block + '</article>')
        return source[:article.start()] + body + source[article.end():]
    if utility:
        return source.replace('</article>', block + '</article>', 1)
    old = []
    for m in ANCHOR.finditer(source):
        a = attrs(m.group())
        if 'back-link' not in a.get('class', '').split():
            continue
        target = normalized(a.get('href', ''), page)
        text = unescape(re.sub('<[^>]+>', '', m.group()))
        if target in (previous_href, following_href) or any(t in text for t in ('Lanjut:', 'Selanjutnya:', '← Kembali:')):
            old.append(m)
    if not old:
        raise ValueError(page + ': no existing bottom links to replace')
    result = source[:old[0].start()] + block
    cursor = old[0].end()
    for m in old[1:]:
        result += source[cursor:m.start()]
        cursor = m.end()
    return result + source[cursor:]


def render_footer(source, page):
    footer = re.search(r'<footer\b[\s\S]*?</footer>', source)
    if not footer:
        raise ValueError(page + ': missing footer')
    resources = ''
    if page == 'index.html' and 'class="site-footer"' not in footer.group():
        links = [m.group() for m in ANCHOR.finditer(footer.group())
                 if attrs(m.group()).get('href') in ('peta-buku.html', 'uji-coba.html')]
        if links:
            resources = '<nav class="site-resources" aria-label="Sumber pendamping">' + ''.join(links) + '</nav>'
    replacement = ('<footer class="site-footer"><span>Tri Utomo · Institut Teknologi Sumatera</span>'
                   '<span>Bacaan Prekalkulus · ITERA Bermatika</span>'
                   '<a href="https://github.com/itera-bermatika/fondasi-matematika/issues" '
                   'target="_blank" rel="noopener">Kirim koreksi ↗</a></footer>')
    return source[:footer.start()] + resources + replacement + source[footer.end():]


def render_layout(source, page):
    # A context link is content, not a second sticky grid sidebar.
    contexts = re.findall(r'<aside class="wrap">([\s\S]*?)</aside>', source)
    source = re.sub(r'<aside class="wrap">[\s\S]*?</aside>', '', source)
    if contexts:
        context = '<div class="book-context" aria-label="Konteks buku">' + ''.join(contexts) + '</div>'
        close = '</article>' if '</article>' in source else '</main>'
        source = source.replace(close, context + close, 1)
    if page == 'index.html' or '<aside' in source:
        return source
    main = re.search(r'<main\b([^>]*)>([\s\S]*?)</main>', source)
    if not main:
        raise ValueError(page + ': missing main content')
    body = main.group(2)
    links = []
    def heading(match):
        attributes, content = match.groups()
        found = re.search(r'\bid="([^"]+)"', attributes)
        target = found.group(1) if found else 'bagian-' + str(len(links) + 1)
        if not found:
            attributes += ' id="' + target + '"'
        label = unescape(re.sub('<[^>]+>', '', content)).strip()
        links.append('<a href="#' + target + '">' + escape(label) + '</a>')
        return '<h2' + attributes + '>' + content + '</h2>'
    body = re.sub(r'<h2([^>]*)>([\s\S]*?)</h2>', heading, body)
    if page == 'latihan-lintas-bab.html':
        links = ['<a href="#paket-' + key + '">Paket ' + key.upper() + '</a>' for key in 'abcd'] + links
    classes = re.search(r'\bclass="([^"]*)"', main.group(1))
    classes = ' '.join(c for c in (classes.group(1).split() if classes else []) if c != 'wrap')
    sidebar = ('<aside class="reading-sidebar"><a class="text-link" href="index.html#peta">← Kembali ke peta belajar</a>'
               '<p class="eyebrow">PREKALKULUS</p><h3>Dalam bacaan ini</h3>'
               '<nav aria-label="Isi bacaan">' + ''.join(links) + '</nav></aside>')
    replacement = '<main class="reader-wrap shared-reader">' + sidebar + '<article id="isi" class="' + classes + '">' + body + '</article></main>'
    return source[:main.start()] + replacement + source[main.end():]


def render(source, page, previous, following, utility=False):
    source = render_layout(source, page)
    source = render_header(source, page, following, utility)
    source = render_bottom(source, page, previous, following, utility)
    source = render_footer(source, page)
    source = re.sub(r'<link rel="stylesheet" href="navigation.css(?:\?[^"]*)?">', '', source)
    css = '<link rel="stylesheet" href="navigation.css?v=20261023-footer">'
    if css not in source:
        source = source.replace('</head>', css + '</head>')
    return source


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--check', action='store_true', help='Fail if generated navigation is stale.')
    args = parser.parse_args()
    data = json.loads((ROOT / 'reading-order.json').read_text(encoding='utf-8'))
    lessons = data['lessons']
    global FIRST
    FIRST = lessons[0]
    hrefs = [lesson['href'] for lesson in lessons]
    pages = [urlsplit(href).path for href in hrefs]
    if len(set(hrefs)) != len(hrefs) or len(set(pages)) != len(pages):
        raise ValueError('Reading order must not repeat a lesson or page.')
    if set(pages + data['utilities']) != {p.name for p in DIST.glob('*.html')}:
        raise ValueError('Every HTML page must be a lesson or a declared utility.')
    # The home map must present exactly the same order, including the embedded lesson.
    app = (DIST / 'app.js').read_text(encoding='utf-8')
    map_hrefs = [normalized(href, 'index.html') for href in re.findall(r'href="([^"]+)"', app)]
    if map_hrefs != hrefs:
        raise ValueError('Home topic order differs from reading-order.json.')
    stale = []
    for i, page in enumerate(pages):
        path = DIST / page
        source = path.read_text(encoding='utf-8')
        result = render(source, page, lessons[i - 1] if i else None,
                        lessons[i + 1] if i + 1 < len(lessons) else None)
        if source != result:
            stale.append(page)
            if not args.check:
                path.write_text(result, encoding='utf-8')
    for page in data['utilities']:
        path = DIST / page
        source = path.read_text(encoding='utf-8')
        result = render(source, page, None, FIRST, utility=True)
        if source != result:
            stale.append(page)
            if not args.check:
                path.write_text(result, encoding='utf-8')
    if args.check and stale:
        raise SystemExit('Stale navigation: ' + ', '.join(stale))
    print(f'OK: {len(lessons)} lessons, {len(data["utilities"])} utilities; '
          f'home map, header actions and previous/next links aligned. '
          f'{len(stale)} pages {"need update" if args.check else "updated"}.')


if __name__ == '__main__':
    main()
