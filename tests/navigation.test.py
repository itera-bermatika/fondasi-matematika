"""Exercise the actual navigation checker against isolated, broken copies."""
import shutil
import re
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

SOURCE = Path(__file__).resolve().parents[1]


class NavigationChecks(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory(prefix='.navigation-test-', dir=SOURCE)
        self.root = Path(self.temp.name)
        self.assertEqual(self.root.resolve().parent, SOURCE.resolve())
        self.addCleanup(self.temp.cleanup)
        (self.root / 'dist').mkdir()
        (self.root / 'scripts').mkdir()
        for page in (SOURCE / 'dist').glob('*.html'):
            shutil.copyfile(page, self.root / 'dist' / page.name)
        for relative in ('dist/app.js', 'reading-order.json', 'scripts/sync-navigation.py'):
            shutil.copyfile(SOURCE / relative, self.root / relative)

    def check(self):
        return subprocess.run(
            [sys.executable, str(self.root / 'scripts/sync-navigation.py'), '--check'],
            capture_output=True, text=True, encoding='utf-8', timeout=20)

    def replace(self, relative, before, after):
        path = self.root / relative
        source = path.read_text(encoding='utf-8')
        self.assertIn(before, source)
        path.write_text(source.replace(before, after, 1), encoding='utf-8')

    def test_current_site_is_consistent(self):
        result = self.check()
        self.assertEqual(result.returncode, 0, result.stdout + result.stderr)

    def test_every_page_has_one_identity_home_and_reading_sidebar(self):
        for path in (SOURCE / 'dist').glob('*.html'):
            source = path.read_text(encoding='utf-8')
            with self.subTest(page=path.name):
                header = re.search(r'<header>[\s\S]*?</header>', source).group()
                self.assertEqual(header.count('class="brand-mark"'), 1)
                self.assertIn('ITERA BERMATIKA<small>', header)
                self.assertEqual(header.count('class="nav-home"'), 1)
                self.assertIn('href="https://itera-bermatika.github.io/"', header)
                self.assertEqual(len(re.findall(r'<aside\b', source)), 1)
                self.assertIn('aria-label="Isi bacaan"', source)
                self.assertNotIn('<aside class="wrap">', source)
                for context in re.findall(r'<div class="book-context"[\s\S]*?</div>', source):
                    self.assertIn('pengayaan-buku.html#bab-', context)

    def test_header_identity_cannot_drift(self):
        self.replace('dist/bilangan-real.html', 'ITERA BERMATIKA<small>', 'Fondasi<small>')
        self.assertNotEqual(self.check().returncode, 0)

    def test_context_link_cannot_become_a_second_sidebar(self):
        self.replace('dist/variabel-ekspresi.html',
                     '<div class="book-context" aria-label="Konteks buku">', '<aside class="wrap">')
        self.replace('dist/variabel-ekspresi.html', '</p></div><!-- reading-order:start -->', '</p></aside><!-- reading-order:start -->')
        self.assertNotEqual(self.check().returncode, 0)

    def test_footers_and_final_navigation_share_one_pattern(self):
        footers = set()
        for path in (SOURCE / 'dist').glob('*.html'):
            source = path.read_text(encoding='utf-8')
            with self.subTest(page=path.name):
                footers.add(re.search(r'<footer\b[\s\S]*?</footer>', source).group())
                self.assertEqual(source.count('class="reading-navigation chapter-nav"'), 1)
                self.assertIn('<!-- reading-order:end --></article>', source)
                self.assertIn('<small>', source)
        self.assertEqual(len(footers), 1)
        self.assertIn('Tri Utomo · Institut Teknologi Sumatera', next(iter(footers)))

    def test_footer_cannot_silently_drift(self):
        self.replace('dist/koordinat.html', 'Bacaan Prekalkulus · ITERA Bermatika', 'Footer lama')
        self.assertNotEqual(self.check().returncode, 0)

    def test_header_cannot_silently_point_to_a_prerequisite(self):
        self.replace('dist/koordinat.html',
                     'id="primary-reading-link" class="nav-cta" href="jarak-titik-tengah.html"',
                     'id="primary-reading-link" class="nav-cta" href="bilangan.html"')
        result = self.check()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('koordinat.html', result.stderr)

    def test_bottom_and_header_cannot_diverge(self):
        self.replace('dist/koordinat.html',
                     'data-reading-next href="jarak-titik-tengah.html"',
                     'data-reading-next href="garis.html"')
        self.assertNotEqual(self.check().returncode, 0)

    def test_embedded_lesson_keeps_its_own_next_target(self):
        self.replace('dist/index.html',
                     'data-reading-href="variabel-ekspresi.html"',
                     'data-reading-href="bilangan.html"')
        self.assertNotEqual(self.check().returncode, 0)

    def test_home_map_cannot_drift_from_the_reading_order(self):
        self.replace('dist/app.js', 'href="bilangan.html"', 'href="pecahan.html"')
        result = self.check()
        self.assertNotEqual(result.returncode, 0)
        self.assertIn('Home topic order differs', result.stderr)


if __name__ == '__main__':
    unittest.main()
