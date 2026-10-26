# Rework verification

Verified in Chromium against the local rework on 27 October 2026. These results were rerun in this workspace; earlier verification notes from the uploaded ZIP were replaced.

## Passed

- `python3 scripts/validate-content.py`: all 17 projects, settings and local asset references.
- `python3 scripts/validate-cms.py`: CMS YAML paths, required fields, categories and JSON field coverage. Media and image/file configuration were also checked against the Pages CMS source implementation. This is not an authenticated CMS integration test.
- `node --check app.js` and `git diff --check`.
- `python3 scripts/test-browser.py`: ten browser regression groups cover discipline counts (4/6/4/3 and 17 total), all 17 project deep links and images, Escape, history, next project, clipboard sharing, focus return, hero pause persistence, offscreen/background pause, reduced-motion poster, controlled project animation, mobile navigation, 320/375/768/1440px overflow checks, CMS-shaped content updates, hidden projects, generated slugs, gallery retry, invalid project URLs and direct contact links.
- An eleventh browser group ran with `AXE_SCRIPT_PATH` pointing to axe-core 4.10.3: no automated WCAG A/AA/2.1 AA or best-practice violations in the checked desktop, phone and project-viewer states. This does not establish complete accessibility conformance.
- Visual inspection of desktop and phone renders. The current full-page desktop capture is in `docs/preview.jpg`.

The hero animation is a local 451 KB MP4 with a still poster. The character-animation GIF was converted to a local approximately 308 KB MP4 with native playback controls. Closing its viewer pauses playback. All runtime artwork and the font are local.

## Repeat the checks

Serving the site needs only Python 3: `python3 -m http.server 8000 --bind 127.0.0.1` from the repository root. No Node dependency installation is needed to run the site.

The content validator uses Python's standard library. CMS validation additionally needs PyYAML. Browser checks need the Python Playwright package and Chromium; set `CHROMIUM_PATH` if Chromium is not on PATH. These test tools are available in the prepared cloud environment. The optional accessibility group additionally requires axe-core's `axe.min.js`; set `AXE_SCRIPT_PATH` to its local path. Tests start their own ephemeral local server and do not change content files or send contact messages.

## Owner actions and limitations

- Authorize the Pages CMS GitHub App for this repository at https://app.pagescms.org/ before attempting a real CMS edit. The first authenticated save remains unverified.
- Review the branch before merging. GitHub Pages publication from the root of `main`, and the live published result, remain separate checks.
- Browser viewport emulation is not physical-device testing. Static Python hosting does not emulate GitHub Pages error routing.
- The automated contrast audit used a still poster and cannot prove contrast for every frame of a moving background. The authored overlay remains in place to support legibility.
