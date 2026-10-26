# Zakariae Bekri — portfolio

A cinematic, buildless 3D and visual design portfolio hosted on GitHub Pages. No dependency installation or compilation is needed.

## Update your work without code

1. Visit [Pages CMS](https://app.pagescms.org/) and sign in with GitHub.
2. Install its GitHub App for **bekri.github.io** only. This one-time account authorization must be completed by the owner.
3. Open this repository and select the branch you want to edit. Use `portfolio-3d-rework` during review, and `main` after the rework is merged.
4. Open **Portfolio projects**. Add or reorder entries, upload a main image, select a category, write a description and save.
5. Add additional images, software names, a role, a client or a video if relevant. The optional URL slug is generated from the title when omitted. Keep an existing slug unchanged to preserve shared links.
6. Turn off **Show on portfolio** to hide a project without deleting it.

Edit **Profile and homepage** to update the opening text, biography, contact details and animation. Upload MP4/WebM for video and a still image for the poster. Prefer WebP or compressed JPEG/PNG for renders; keep videos short and compressed. Uploaded assets are stored under `media/`.

The editor configuration is ready in `.pages.yml`. The first authenticated editing session cannot be verified until the owner connects the GitHub App. Saving through the editor commits changes to GitHub; the live website updates after GitHub Pages publishes the changed branch.

## Hosting

Keep GitHub Pages publishing the repository root. `index.html`, `app.js`, `styles.css`, `data/` and `media/` are the complete new website. `.nojekyll` allows direct static serving. If Pages currently publishes from another directory or an external workflow, change it to the root of `main` when merging this rework. Do not merge until the branch version has been reviewed.

The previous compiled application remains in `assets/`, `dist/` and `public/` for reference; it is not used by the new homepage. Existing original project content was migrated into `data/projects.json`. The rework plan is in [docs/REWORK_PLAN.md](docs/REWORK_PLAN.md).

## Local preview

Run `python -m http.server 8000` from this repository, then open `http://localhost:8000`. Opening `index.html` directly as a file will not load JSON content. No build step is required.

## Interaction and accessibility

- Filter the gallery by discipline; 3D work is the default.
- Click a project for its description, artwork, optional gallery/video and shareable `#project/slug` link.
- Use Escape to close a project and arrow keys to move between its images.
- Pause opening animation using **Pause motion**. Reduced-motion preferences are respected, and off-screen video pauses.
- Navigation, filters and the project dialog are keyboard accessible.
- Contact links open the visitor’s email app or WhatsApp; no unconfigured contact form is displayed.

## Credits

Existing portfolio artwork and animation were reused at the owner's request. No new client work, awards, testimonials or experience were invented. Manrope is distributed under the SIL Open Font License; see `media/Manrope-OFL.txt`.

## Development checks

- `python3 scripts/validate-content.py` validates JSON content and local assets.
- `python3 scripts/validate-cms.py` checks CMS fields against JSON (requires PyYAML).
- `node --check app.js` checks JavaScript syntax.
- `python3 scripts/test-browser.py` exercises real browser interactions (requires Python Playwright and Chromium). Set `CHROMIUM_PATH` if necessary. Set `AXE_SCRIPT_PATH` to a local axe-core `axe.min.js` to include the optional accessibility audit.

See [verification results](docs/VERIFICATION.md), [product context](PRODUCT.md), and [design decisions and skill references](DESIGN.md). The character animation now uses a controlled MP4 rather than an automatically playing GIF in the project viewer. Original animation files remain available in `media/` as source references.
