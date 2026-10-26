"""Browser regression checks. Requires Playwright and a local Chromium installation.
Run: python3 scripts/test-browser.py (serves an ephemeral localhost port).
"""
from functools import partial
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from threading import Thread
import json
import os
import shutil

from playwright.sync_api import sync_playwright, expect

ROOT = Path(__file__).resolve().parents[1]
PROJECTS = json.loads((ROOT / 'data/projects.json').read_text())

class QuietHandler(SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass

server = ThreadingHTTPServer(('127.0.0.1', 0), partial(QuietHandler, directory=str(ROOT)))
Thread(target=server.serve_forever, daemon=True).start()
BASE = f'http://127.0.0.1:{server.server_port}'
passed = []

def check(name, test):
    test()
    passed.append(name)
    print('PASS', name)

try:
 with sync_playwright() as p:
    executable = os.environ.get('CHROMIUM_PATH') or shutil.which('chromium')
    browser = p.chromium.launch(**({'executable_path': executable} if executable else {}), headless=True, args=['--no-sandbox'])
    context = browser.new_context(viewport={'width':1440,'height':1000}, permissions=['clipboard-read','clipboard-write'])
    page = context.new_page()
    def visit(url):
        page.goto("about:blank")
        page.goto(url)

    errors = []
    page.on('pageerror', lambda e: errors.append(str(e)))
    visit(BASE)
    expect(page.locator('.project-card')).to_have_count(4)

    def filter_checks():
        for category, count in [('3D',4),('Design',6),('Illustration',4),('Web & UI',3),('All',17)]:
            page.locator(f'[data-filter="{category}"]').click()
            expect(page.locator('.project-card')).to_have_count(count)
            expect(page.locator(f'[data-filter="{category}"]')).to_have_attribute('aria-pressed','true')
    check('All discipline filters preserve all 17 projects', filter_checks)

    def dialogs():
        for project in PROJECTS:
            visit(BASE+'/#project/'+project['slug'])
            expect(page.locator('#project-dialog')).to_be_visible()
            expect(page.locator('#project-title')).to_have_text(project['title'])
            expect(page.locator('#detail-media img')).to_be_visible()
            page.wait_for_function('document.querySelector("#detail-media img").naturalWidth > 0')
            page.keyboard.press('Escape')
            expect(page.locator('#project-dialog')).not_to_be_visible()
    check('Every project deep link opens correct artwork and closes with Escape', dialogs)

    def history_focus():
        visit(BASE+'/#work')
        expect(page.locator('.project-card')).to_have_count(4)
        trigger=page.locator('[data-project]').first
        trigger.click()
        expect(page.locator('#project-dialog')).to_be_visible()
        page.locator('#copy-link').click()
        expect(page.locator('#toast')).to_have_text('Project link copied')
        assert page.evaluate('navigator.clipboard.readText()') == page.url
        page.locator('[data-next]').click()
        expect(page.locator('#project-title')).to_have_text(PROJECTS[1]['title'])
        page.keyboard.press('Escape')
        expect(page.locator('#project-dialog')).not_to_be_visible()
        expect(trigger).to_be_focused()
        page.go_forward()
        expect(page.locator('#project-title')).to_have_text(PROJECTS[1]['title'])
        page.go_back()
        expect(page.locator('#project-dialog')).not_to_be_visible()
    check('Project history, next project, clipboard sharing and focus return', history_focus)

    def motion():
        visit(BASE)
        page.wait_for_function('document.querySelector("#hero-video").readyState >= 2 && !document.querySelector("#hero-video").paused')
        page.locator('#motion-toggle').click()
        assert page.locator('#hero-video').evaluate('(v)=>v.paused')
        expect(page.locator('#motion-toggle')).to_have_attribute('aria-pressed','true')
        page.reload()
        expect(page.locator('#motion-toggle')).to_have_attribute('aria-pressed','true')
        assert page.locator('#hero-video').evaluate('(v)=>v.paused')
        page.locator('#motion-toggle').click()
        page.wait_for_function('!document.querySelector("#hero-video").paused')
        page.locator('[data-project]').first.click()
        assert page.locator('#hero-video').evaluate('(v)=>v.paused')
        page.keyboard.press('Escape')
        page.locator('#work').scroll_into_view_if_needed()
        page.wait_for_function('document.querySelector("#hero-video").paused')
    check('Motion pause persists; video pauses offscreen and behind dialog', motion)

    def reduced():
        rc=browser.new_context(reduced_motion='reduce')
        rp=rc.new_page();rp.goto(BASE)
        expect(rp.locator('.project-card')).to_have_count(4)
        expect(rp.locator('#motion-toggle')).to_have_attribute('aria-pressed','true')
        assert rp.locator('#hero-video').evaluate('(v)=>v.paused && !v.getAttribute("src")')
        assert rp.locator('#hero-video').evaluate('(v)=>getComputedStyle(v).display')=='none'
        rp.locator('#work').scroll_into_view_if_needed()
        expect(rp.locator('.project-card').first).to_have_css('opacity','1')
        rc.close()
    check('Reduced motion starts with still poster and visible project content', reduced)

    def gallery_video():
        visit(BASE+'/#project/lumen-character-animation')
        expect(page.locator('#project-dialog')).to_be_visible()
        page.keyboard.press('ArrowRight')
        expect(page.locator('#detail-media video')).to_be_visible()
        expect(page.locator('#media-count')).to_have_text('02 / 02')
        page.locator('#detail-media video').evaluate('(v)=>v.play()')
        page.wait_for_function('!document.querySelector("#detail-media video").paused')
        page.keyboard.press('Escape')
        expect(page.locator('#project-dialog')).not_to_be_visible()
        assert page.locator('#detail-media video').evaluate('(v)=>v.paused')
    check('Project animation has native video controls and stops on close', gallery_video)

    def responsive():
        for width in [320,375,768,1440]:
            page.set_viewport_size({'width':width,'height':900})
            visit(BASE+'/#work');expect(page.locator('.project-card')).to_have_count(4)
            assert page.evaluate('document.documentElement.scrollWidth <= innerWidth'), f'Overflow at {width}px'
            page.locator('[data-project]').first.click()
            expect(page.locator('#project-dialog')).to_be_visible()
            assert page.locator('#project-dialog').evaluate('(d)=>d.scrollWidth <= d.clientWidth'), f'Dialog overflow at {width}px'
            page.keyboard.press('Escape')
        page.set_viewport_size({'width':375,'height':812})
        visit(BASE)
        page.locator('#menu-toggle').click()
        expect(page.locator('#mobile-nav')).to_be_visible()
        page.locator('#mobile-nav a[href="#work"]').click()
        expect(page.locator('#mobile-nav')).not_to_be_visible()
        expect(page.locator('#menu-toggle')).to_have_attribute('aria-expanded','false')
    check('320–1440px layouts and mobile menu have no horizontal overflow', responsive)

    def content_edit():
        fixture={'title':'New CMS Project','category':'3D','published':True,'image':PROJECTS[0]['image'],'description':'Edited through JSON','tools':['Blender']}
        data=[fixture,{**fixture,'title':'Hidden CMS Project','published':False},*PROJECTS]
        page.route('**/data/projects.json', lambda route:route.fulfill(json=data))
        visit(BASE+'/#work')
        expect(page.locator('.project-card')).to_have_count(5)
        page.locator('[data-project="new-cms-project"]').click()
        expect(page.locator('#project-title')).to_have_text('New CMS Project')
        assert page.url.endswith('#project/new-cms-project')
        expect(page.locator('.detail-description')).to_have_text('Edited through JSON')
        assert page.locator('[data-project="hidden-cms-project"]').count()==0
        page.unroute('**/data/projects.json')
    check('CMS-shaped data edits, new slug, ordering and hidden entries render correctly', content_edit)

    def recovery():
        page.route('**/data/projects.json', lambda route:route.fulfill(status=503,body='Unavailable'))
        visit(BASE)
        expect(page.locator('#retry-projects')).to_be_visible()
        expect(page.locator('#project-grid')).to_have_attribute('aria-busy','false')
        page.unroute('**/data/projects.json')
        page.locator('#retry-projects').click()
        expect(page.locator('.project-card')).to_have_count(4)
        visit(BASE+'/#project/not-real')
        expect(page.locator('#toast')).to_have_text('This project is no longer available.')
        expect(page.locator('#project-dialog')).not_to_be_visible()
    check('Gallery errors recover on retry and unknown project links fail safely', recovery)

    def contacts():
        assert page.locator('[data-link="email"]').get_attribute('href')=='mailto:bzpw00@gmail.com'
        assert page.locator('[data-link="whatsapp"]').get_attribute('href')=='https://wa.me/212787013028'
        assert page.locator('[data-link="linkedin"]').get_attribute('href').startswith('https://www.linkedin.com/in/')
        assert page.locator('form').count()==0
        assert not errors, errors
    check('Contact destinations are direct and no browser runtime errors occurred', contacts)
    axe_path = os.environ.get('AXE_SCRIPT_PATH')
    if axe_path:
        def accessibility():
            visit(BASE)
            page.emulate_media(reduced_motion='reduce')
            expect(page.locator('.project-card')).to_have_count(4)
            for surface in ['desktop', 'dialog', 'mobile']:
                if surface == 'desktop': page.set_viewport_size({'width':1440,'height':1000})
                if surface == 'dialog': page.locator('[data-project]').first.click()
                if surface == 'mobile':
                    page.keyboard.press('Escape')
                    page.set_viewport_size({'width':375,'height':812})
                page.add_script_tag(path=axe_path)
                results = page.evaluate('async () => await axe.run(document, {runOnly: {type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "best-practice"]}})')
                assert not results['violations'], [(v['id'], [n['target'] for n in v['nodes']]) for v in results['violations']]
        check('Axe accessibility audit: desktop, project viewer and phone', accessibility)
    browser.close()
finally:
 server.shutdown()
print(f'{len(passed)} browser checks passed.')
