# Portfolio rework

## Goal
Build a professional portfolio for Bekri Zakariae that puts 3D work first, keeps GitHub Pages hosting, and can be updated without editing code.

## Art direction
- Cinematic forest opening using the existing homepage animation, converted to a smaller looping video with a still-image fallback.
- Charcoal, warm white, muted forest green and a restrained chartreuse accent.
- Large editorial typography, numbered sections, asymmetric project images, and quiet interface details.
- Purposeful motion: introduction sequence, image reveals, hover response and smooth project transitions. Respect reduced motion and provide an animation pause control.

## Structure
1. Opening: name, disciplines, animation and link to selected work.
2. Work: default to 3D, retain all 17 existing projects through filters for other disciplines.
3. Project viewer: full artwork, description, role, tools, optional gallery, video and external link. Shareable hash URLs and keyboard navigation.
4. About: truthful short profile, skills and links to ArtStation, LinkedIn and email.
5. Contact: direct email, WhatsApp and a clear call to action.

## Editing
Use Pages CMS with a repository-root `.pages.yml`. Editable JSON files store projects and site settings. Media uploads go into `media/`. Project lists can be reordered, published/hidden, and expanded with images and optional video. The site reads those files directly, so no build tool is required for content edits.

Pages CMS replaces the previously suggested Decap CMS because its hosted GitHub integration avoids maintaining an additional OAuth server. One owner action remains: sign in at https://app.pagescms.org and grant its GitHub App access to this repository. Until that happens the configuration is prepared, but authenticated editing is not verified.

## Implementation
- Use buildless HTML, CSS and JavaScript; GitHub Pages continues serving the repository root.
- Preserve original compiled assets on the branch; new files do not depend on them.
- Copy and optimize existing artwork locally so the new site does not rely on Imgur at runtime.
- Keep contact actions direct; do not show a form that cannot deliver messages.
- Prepare work on `portfolio-3d-rework` and open a reviewable pull request.

## Verification
- Desktop and phone browser checks, layout overflow, motion pause and reduced-motion behavior.
- Filters, project opening/closing, share links, gallery navigation, keyboard operation and contact links.
- Validate CMS YAML against content structure and confirm JSON and local assets load.
- Check that edits to project data are reflected by the rendered gallery.
- Live publication and the first authenticated CMS save are separate from branch-preview verification.
