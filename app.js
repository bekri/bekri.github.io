/* Buildless portfolio: content is edited in Pages CMS and stored as JSON. */
"use strict";
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [
  ...parent.querySelectorAll(selector),
];
const icon = (name) =>
  `<svg class="icon" aria-hidden="true" viewBox="0 0 24 24"><use href="/icons.svg#${name}"></use></svg>`;
let siteName = "Zakariae Bekri";
const escapeHTML = (value) =>
  String(value ?? "").replace(
    /[&<>"']/g,
    (char) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        char
      ],
  );
function safeURL(value, fallback = "") {
  if (typeof value !== "string" || !value.trim()) return fallback;
  try {
    const parsed = new URL(value, location.href);
    return ["https:", "http:"].includes(parsed.protocol)
      ? parsed.href
      : fallback;
  } catch {
    return fallback;
  }
}
const state = {
  projects: [],
  filter: "3D",
  current: null,
  gallery: 0,
  trigger: null,
  openedFromPage: false,
};
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let paused = reducedMotion.matches;
try {
  paused ||= localStorage.getItem("zb-motion-paused") === "true";
} catch {
  /* Storage may be disabled. */
}
let heroSource = "/media/hero.mp4";
const heroVideo = $("#hero-video");
const dialog = $("#project-dialog");
const cursor = $("#project-cursor");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.08 },
);
document.documentElement.classList.add("js-ready");
document.addEventListener("keydown", () =>
  document.documentElement.classList.add("keyboard-navigation"),
);
document.addEventListener("pointerdown", () =>
  document.documentElement.classList.remove("keyboard-navigation"),
);
$(".hero-foot").addEventListener(
  "animationend",
  () => document.documentElement.classList.add("intro-complete"),
  { once: true },
);
if (paused) document.documentElement.classList.add("intro-complete");
function observeReveals() {
  $$(".reveal:not(.in-view)").forEach((node) => revealObserver.observe(node));
}
observeReveals();

function applyMotion() {
  document.documentElement.classList.toggle(
    "motion-paused",
    paused || reducedMotion.matches,
  );
  $("#motion-toggle").disabled = reducedMotion.matches;
  $("#motion-toggle").setAttribute("aria-pressed", String(paused));
  $("#motion-toggle").setAttribute(
    "aria-label",
    paused ? "Enable animation" : "Pause animation",
  );
  $("#motion-icon").innerHTML = icon(paused ? "play" : "pause");
  $("#motion-label").textContent = reducedMotion.matches
    ? "Reduced motion"
    : paused
      ? "Play motion"
      : "Pause motion";
  if (reducedMotion.matches)
    $("#motion-toggle").setAttribute(
      "aria-label",
      "Animation disabled by your reduced motion preference",
    );
  if (
    paused ||
    reducedMotion.matches ||
    document.hidden ||
    dialog.open ||
    !heroVisible
  )
    heroVideo.pause();
  else if (heroSource) {
    const nextSource = safeURL(heroSource);
    if (heroVideo.src !== nextSource) {
      heroVideo.src = nextSource;
      heroVideo.load();
    }
    heroVideo.play().catch(() => {
      /* Poster stays visible if autoplay is unavailable. */
    });
  }
}
let heroVisible = true;
heroVideo.addEventListener("playing", () => heroVideo.classList.add("ready"));
heroVideo.addEventListener("error", () => heroVideo.classList.remove("ready"));
$("#motion-toggle").addEventListener("click", () => {
  paused = !paused;
  try {
    localStorage.setItem("zb-motion-paused", String(paused));
  } catch {
    /* Optional preference. */
  }
  applyMotion();
});
reducedMotion.addEventListener("change", (event) => {
  paused = event.matches;
  applyMotion();
});
document.addEventListener("visibilitychange", applyMotion);
new IntersectionObserver(
  ([entry]) => {
    heroVisible = entry.isIntersecting;
    applyMotion();
  },
  { threshold: 0 },
).observe($("#home"));
applyMotion();
$("#year").textContent = new Date().getFullYear();

const menuButton = $("#menu-toggle");
function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  $("#mobile-nav").hidden = true;
}
menuButton.addEventListener("click", () => {
  const expanded = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(expanded));
  $("#mobile-nav").hidden = !expanded;
});
$$("#mobile-nav a").forEach((link) =>
  link.addEventListener("click", closeMenu),
);
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !dialog.open && !$("#mobile-nav").hidden) {
    closeMenu();
    menuButton.focus({ preventScroll: true });
  }
});
document.addEventListener("click", (event) => {
  if (
    !event.target.closest(".mobile-nav, .menu-toggle") &&
    !$("#mobile-nav").hidden
  )
    closeMenu();
});
matchMedia("(min-width: 681px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

function updateSite(site) {
  if (!site || typeof site !== "object") return;
  if (typeof site.name === "string" && site.name.trim()) {
    siteName = site.name.trim();
    $(".wordmark").setAttribute("aria-label", `${siteName}, home`);
    document.title = state.current
      ? `${state.current.title} | ${siteName}`
      : `${siteName} | 3D Artist & Visual Designer`;
  }
  $$("[data-site]").forEach((node) => {
    if (site[node.dataset.site]) node.textContent = site[node.dataset.site];
  });
  if (site.eyebrow) $("#hero-eyebrow").textContent = site.eyebrow;
  if (site.intro) $("#hero-intro").textContent = site.intro;
  if (site.headline) {
    $("#hero-title").replaceChildren();
    String(site.headline)
      .split("\n")
      .forEach((line, index) => {
        const span = document.createElement("span");
        if (index === 1) {
          const words = line.split(" ");
          const last = words.pop();
          span.append(words.join(" ") + " ");
          const em = document.createElement("em");
          em.textContent = last;
          span.append(em);
        } else span.textContent = line;
        $("#hero-title").append(span);
      });
  }
  if (site.aboutTitle) {
    const lines = String(site.aboutTitle).split("\n");
    $("#about-title").replaceChildren();
    lines.forEach((line, index) => {
      if (index) $("#about-title").append(document.createElement("br"));
      const span = document.createElement("span");
      if (index === lines.length - 1 && lines.length > 1) {
        const words = line.split(" ");
        const last = words.pop();
        span.append(words.join(" ") + " ");
        const em = document.createElement("em");
        em.textContent = last;
        span.append(em);
      } else span.textContent = line;
      $("#about-title").append(span);
    });
  }
  if (site.about) {
    $("#about-bio").replaceChildren();
    String(site.about)
      .split(/\n\s*\n/)
      .filter(Boolean)
      .forEach((text) => {
        const p = document.createElement("p");
        p.textContent = text;
        $("#about-bio").append(p);
      });
  }
  if (Array.isArray(site.skills)) {
    $("#skills").replaceChildren();
    site.skills.forEach((skill) => {
      const li = document.createElement("li");
      li.textContent = skill;
      $("#skills").append(li);
    });
  }
  $$("[data-link]").forEach((link) => {
    const key = link.dataset.link;
    if (
      key === "email" &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(site.email ?? "")
    ) {
      link.href = `mailto:${site.email}`;
      link.textContent = site.email;
      $("#contact-email").href = link.href;
    } else if (key === "whatsapp" && /\d/.test(site.phone ?? ""))
      link.href = `https://wa.me/${String(site.phone).replace(/\D/g, "")}`;
    else if (site[key] && safeURL(site[key])) link.href = safeURL(site[key]);
  });
  if (safeURL(site.heroPoster)) {
    $("#hero-poster").src = safeURL(site.heroPoster);
    heroVideo.poster = safeURL(site.heroPoster);
  }
  heroSource = safeURL(site.heroVideo);
  applyMotion();
}

function shownProjects() {
  return state.projects.filter(
    (p) => state.filter === "All" || p.category === state.filter,
  );
}
function renderProjects() {
  const visible = shownProjects();
  $$(".filter").forEach((button) => {
    const active = button.dataset.filter === state.filter;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    const count = state.projects.filter(
      (p) =>
        button.dataset.filter === "All" || p.category === button.dataset.filter,
    ).length;
    $("span", button).textContent = String(count).padStart(2, "0");
  });
  $("#project-count").textContent =
    `${String(visible.length).padStart(2, "0")} PROJECT${visible.length === 1 ? "" : "S"}`;
  $("#project-grid").innerHTML = visible.length
    ? visible
        .map(
          (p, index) => `
    <article class="project-card reveal" style="transition-delay:${(index % 2) * 90}ms">
      <button class="project-button" data-project="${escapeHTML(p.slug)}" aria-label="View ${escapeHTML(p.title)}">
        <div class="project-image-wrap"><span class="project-index">${String(index + 1).padStart(2, "0")}</span><img src="${escapeHTML(safeURL(p.thumbnail || p.image))}" alt="${escapeHTML(p.title)}" loading="lazy" decoding="async"><span class="project-open-icon" aria-hidden="true">${icon("arrow-up-right")}</span></div>
        <div class="project-card-meta"><div><h3>${escapeHTML(p.title)}</h3><span class="project-category">${escapeHTML(p.category === "3D" ? "3D modeling & visualization" : p.category)}</span></div><span class="project-tool">${escapeHTML(p.tools?.[0] || "")}</span></div>
      </button>
    </article>`,
        )
        .join("")
    : '<p class="empty-state">New work is on its way. Explore another category in the meantime.</p>';
  $("#project-grid").setAttribute("aria-busy", "false");
  observeReveals();
}
$$(".filter").forEach((button) =>
  button.addEventListener("click", () => {
    if (state.filter === button.dataset.filter) return;
    state.filter = button.dataset.filter;
    cursor.classList.remove("visible");
    if (
      document.startViewTransition &&
      !paused &&
      !reducedMotion.matches &&
      !document.documentElement.classList.contains("keyboard-navigation")
    )
      document.startViewTransition(renderProjects);
    else renderProjects();
  }),
);
$("#project-grid").addEventListener("click", (event) => {
  const button = event.target.closest("[data-project]");
  if (!button) return;
  state.trigger = button;
  state.openedFromPage = true;
  location.hash = `project/${encodeURIComponent(button.dataset.project)}`;
});

function mediaItems(project) {
  const images = [
    project.image,
    ...(Array.isArray(project.gallery) ? project.gallery : []),
  ]
    .filter(Boolean)
    .map((url) => ({ type: "image", url: safeURL(url) }))
    .filter((item) => item.url);
  if (safeURL(project.video))
    images.push({ type: "video", url: safeURL(project.video) });
  return images;
}
function renderMedia() {
  const media = mediaItems(state.current);
  const item = media[state.gallery];
  if (!item) {
    $("#detail-media").innerHTML = "";
    return;
  }
  $("#detail-media").innerHTML =
    item.type === "video"
      ? `<video controls playsinline preload="metadata" poster="${escapeHTML(safeURL(state.current.image))}" src="${escapeHTML(item.url)}" aria-label="${escapeHTML(state.current.title)} video"></video>`
      : `<img src="${escapeHTML(item.url)}" alt="${escapeHTML(state.current.title)}${state.gallery ? " — additional image " + state.gallery : ""}">`;
  const count = $("#media-count");
  if (count)
    count.textContent = `${String(state.gallery + 1).padStart(2, "0")} / ${String(media.length).padStart(2, "0")}`;
}
function openProject(project) {
  state.current = project;
  state.gallery = 0;
  const index = state.projects.indexOf(project);
  const next = state.projects[(index + 1) % state.projects.length];
  $("#dialog-counter").textContent =
    `PROJECT ${String(index + 1).padStart(2, "0")} / ${String(state.projects.length).padStart(2, "0")}`;
  const media = mediaItems(project);
  $("#project-detail").innerHTML =
    `<div class="detail-heading"><span class="mono">${escapeHTML(project.category)} / SELECTED PROJECT</span><h2 id="project-title">${escapeHTML(project.title)}</h2></div>
    <div class="detail-main" id="detail-media"></div>
    ${media.length > 1 ? `<div class="gallery-controls"><span class="mono" id="media-count"></span><div class="gallery-buttons"><button data-gallery="-1" aria-label="Previous image">${icon("arrow-left")}</button><button data-gallery="1" aria-label="Next image">${icon("arrow-right")}</button></div></div>` : ""}
    <div class="detail-body"><div><p class="detail-description">${escapeHTML(project.description)}</p><div class="detail-actions"><button id="copy-link">Copy project link ${icon("arrow-up-right")}</button>${safeURL(project.link) ? `<a href="${escapeHTML(safeURL(project.link))}" target="_blank" rel="noopener noreferrer">Visit project ${icon("arrow-up-right")}</a>` : ""}</div></div><dl class="detail-facts">${project.role ? `<div><dt>My role</dt><dd>${escapeHTML(project.role)}</dd></div>` : ""}${project.client ? `<div><dt>Project for</dt><dd>${escapeHTML(project.client)}</dd></div>` : ""}<div class="detail-tools"><dt>Tools</dt><dd>${(project.tools || []).map((tool) => `<span>${escapeHTML(tool)}</span>`).join("")}</dd></div></dl></div>
    <button class="detail-next" data-next="${escapeHTML(next.slug)}"><div><span class="mono">NEXT PROJECT</span><h3>${escapeHTML(next.title)}</h3></div><span class="next-arrow" aria-hidden="true">${icon("arrow-up-right")}</span></button>`;
  renderMedia();
  if (!dialog.open) dialog.showModal();
  dialog.scrollTop = 0;
  document.body.classList.add("modal-open");
  cursor.classList.remove("visible");
  document.title = `${project.title} | ${siteName}`;
  $("#dialog-close").focus({ preventScroll: true });
  applyMotion();
}
function closeProject() {
  $$("#detail-media video").forEach((video) => video.pause());
  if (dialog.open) dialog.close();
  document.body.classList.remove("modal-open");
  state.current = null;
  document.title = `${siteName} | 3D Artist & Visual Designer`;
  applyMotion();
  if (state.trigger?.isConnected) state.trigger.focus({ preventScroll: true });
}
function requestClose() {
  if (state.openedFromPage) {
    state.openedFromPage = false;
    history.back();
  } else {
    history.replaceState(null, "", "#work");
    closeProject();
    $("#work").scrollIntoView({ behavior: "instant" });
  }
}
$("#dialog-close").addEventListener("click", requestClose);
$(".dialog-wordmark").addEventListener("click", (event) => {
  event.preventDefault();
  requestClose();
});
dialog.addEventListener("cancel", (event) => {
  event.preventDefault();
  requestClose();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("modal-open");
  if (dialog.open === false) applyMotion();
});
function toast(message) {
  $("#toast").textContent = message;
  $("#toast").classList.add("visible");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => $("#toast").classList.remove("visible"), 2400);
}
dialog.addEventListener("click", async (event) => {
  const galleryButton = event.target.closest("[data-gallery]");
  if (galleryButton && state.current) {
    const length = mediaItems(state.current).length;
    state.gallery =
      (state.gallery + Number(galleryButton.dataset.gallery) + length) % length;
    renderMedia();
  }
  const next = event.target.closest("[data-next]");
  if (next)
    (history.replaceState(
      null,
      "",
      `#project/${encodeURIComponent(next.dataset.next)}`,
    ),
      route());
  if (event.target.closest("#copy-link")) {
    try {
      await navigator.clipboard.writeText(location.href);
      toast("Project link copied");
    } catch {
      toast("Copy the address from your browser to share this project.");
    }
  }
});
dialog.addEventListener("keydown", (event) => {
  if (
    !state.current ||
    !["ArrowLeft", "ArrowRight"].includes(event.key) ||
    event.target.closest("video, input, textarea")
  )
    return;
  if (mediaItems(state.current).length > 1) {
    event.preventDefault();
    state.gallery =
      (state.gallery +
        (event.key === "ArrowLeft" ? -1 : 1) +
        mediaItems(state.current).length) %
      mediaItems(state.current).length;
    renderMedia();
  }
});
function route() {
  if (!state.projects.length) return;
  let slug;
  try {
    slug = decodeURIComponent(location.hash.replace(/^#project\//, ""));
  } catch {
    slug = "";
  }
  if (location.hash.startsWith("#project/")) {
    const project = state.projects.find((p) => p.slug === slug);
    if (project) openProject(project);
    else {
      closeProject();
      history.replaceState(null, "", "#work");
      toast("This project is no longer available.");
    }
  } else if (dialog.open) closeProject();
}
window.addEventListener("hashchange", route);

const finePointer = matchMedia("(hover: hover) and (pointer: fine)");
$("#project-grid").addEventListener("pointermove", (event) => {
  if (!finePointer.matches || paused || reducedMotion.matches) return;
  const overImage = event.target.closest(".project-image-wrap");
  cursor.classList.toggle("visible", !!overImage);
  cursor.style.left = `${event.clientX}px`;
  cursor.style.top = `${event.clientY}px`;
});
$("#project-grid").addEventListener("pointerleave", () =>
  cursor.classList.remove("visible"),
);
window.addEventListener("scroll", () => cursor.classList.remove("visible"), {
  passive: true,
});

async function loadProjects() {
  try {
    const response = await fetch("/data/projects.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Project data unavailable");
    const data = await response.json();
    if (!Array.isArray(data)) throw new Error("Invalid project data");
    const usedSlugs = new Set();
    state.projects = data
      .filter(
        (p) =>
          p &&
          p.published !== false &&
          typeof p.title === "string" &&
          p.title.trim(),
      )
      .map((p) => {
        const base =
          String(p.slug || p.title)
            .normalize("NFKD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "") || "project";
        let slug = base,
          suffix = 2;
        while (usedSlugs.has(slug)) slug = `${base}-${suffix++}`;
        usedSlugs.add(slug);
        return { ...p, slug, tools: Array.isArray(p.tools) ? p.tools : [] };
      });
    renderProjects();
    route();
  } catch {
    $("#project-grid").innerHTML =
      `<div class="empty-state"><p>The gallery couldn’t load. Please try again, or visit my ArtStation.</p><button class="retry-button" id="retry-projects">Try again ${icon("retry")}</button></div>`;
    $("#project-grid").setAttribute("aria-busy", "false");
    $("#project-count").textContent = "GALLERY UNAVAILABLE";
    $("#retry-projects").addEventListener("click", loadProjects, {
      once: true,
    });
  }
}
fetch("/data/site.json", { cache: "no-cache" })
  .then((response) => {
    if (!response.ok) throw new Error("Settings unavailable");
    return response.json();
  })
  .then(updateSite)
  .catch(() => {
    /* Meaningful HTML defaults remain available. */
  });
loadProjects();
