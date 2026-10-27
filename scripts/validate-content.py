"""Validate the editable portfolio content and local asset references."""
import json
import re
from pathlib import Path
from urllib.parse import unquote, urlparse

ROOT = Path(__file__).resolve().parents[1]
projects = json.loads((ROOT / "data/projects.json").read_text())
site = json.loads((ROOT / "data/site.json").read_text())
assert isinstance(projects, list), "Projects must be a JSON array"
seen = set()


def asset(value):
    if not value:
        return
    assert isinstance(value, str), f"Asset must be a string: {value}"
    parsed = urlparse(value)
    assert parsed.scheme in ("", "http", "https"), f"Unsafe asset URL: {value}"
    if not parsed.scheme:
        path = (ROOT / unquote(parsed.path.lstrip("/"))).resolve()
        assert path.is_relative_to(ROOT), f"Asset escapes repository: {value}"
        assert path.is_file(), f"Missing asset: {value}"


for project in projects:
    assert project.get("title", "").strip(), "Project title is required"
    assert project.get("category") in ["3D", "Design", "Illustration", "Web & UI"], f"Unknown category: {project}"
    assert isinstance(project.get("published", True), bool), "Published must be true or false"
    assert isinstance((project.get("tools") or []), list), "Tools must be a list"
    slug = project.get("slug")
    if slug:
        assert re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", slug), f"Invalid custom slug: {slug}"
        assert slug not in seen, f"Duplicate slug: {slug}"
        seen.add(slug)
    assert project.get("image"), f"Main artwork required: {project['title']}"
    for key in ["image", "thumbnail", "video"]:
        asset(project.get(key))
    assert isinstance((project.get("gallery") or []), list), "Gallery must be a list"
    for image in (project.get("gallery") or []):
        asset(image)
    if project.get("link"):
        assert urlparse(project["link"]).scheme in ("http", "https"), "Project link must use HTTP(S)"

for key in ["heroPoster", "heroVideo"]:
    asset(site.get(key))
assert "@" in site.get("email", ""), "Contact email is required"
assert (ROOT / "media/manrope-latin.woff").is_file(), "Local font missing"
print(f"Validated {len(projects)} projects, settings and all referenced local assets.")
