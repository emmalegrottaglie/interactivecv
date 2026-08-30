# Interactive CV — Emma Legrottaglie

A single-page personal CV and art portfolio for Emma Legrottaglie (QA Engineer &
illustrator). It is a static site with no build step, no dependencies, and no
server-side code: `index.html` is the whole application.

Repository: https://github.com/emmalegrottaglie/interactivecv

## Quick start

```bash
git clone https://github.com/emmalegrottaglie/interactivecv.git
```

Then serve the repo root. Any static file server works — opening `index.html`
directly from disk also works, but a server is closer to how it will be hosted.

```bash
python -m http.server 8000
```

Then visit http://localhost:8000.

## Deploying

Deploying is a file copy — GitHub Pages, Netlify, or any static host will serve
the repo root as-is.

GitHub Pages is not enabled on this repository yet. To turn it on: **Settings →
Pages → Source: Deploy from a branch → Branch: `main` / `/ (root)`**. The site
will then be published at https://emmalegrottaglie.github.io/interactivecv/.

## What's in the repo

| Path | Purpose |
| --- | --- |
| `index.html` | The entire site — markup, inline CSS, and four inline scripts. |
| `assets/emma-photo.jpg` | Sidebar portrait. |
| `assets/art/` | Art portfolio images referenced by the gallery. |
| `script.js`, `style.css` | **Unused.** Leftovers from an earlier typewriter-console version of the CV; `index.html` does not reference either file. See [Legacy files](#legacy-files). |

## Page structure

`index.html` is a `.layout` grid of two columns that scroll independently
inside a viewport-height frame: `.sidebar` (name, portrait, about, contact,
theme toggle) on the left, and `.content` on the right holding the sections
`#experience`, `#projects`, `#skills`, `#education`, and `#portfolio`. The frame
itself is `height:100vh; overflow:hidden` — neither column is `position:fixed`;
each just scrolls its own overflow. Below the 880px breakpoint the grid
collapses to one column and the page returns to normal whole-page scrolling.

A single `.lightbox` dialog lives at the end of the body and is reused for every
artwork.

Four inline scripts run the interactive parts:

1. **Theme boot** (in `<head>`) — reads the saved theme from `localStorage`,
   falls back to `prefers-color-scheme`, and sets `data-theme` on `<html>`
   *before first paint* so there is no flash of the wrong theme.
2. **Art portfolio** — renders the gallery from the `artworks` array, wires the
   category filter buttons, and drives the lightbox.
3. **Scroll reveal** — adds `.is-visible` to `.reveal` elements as they enter
   the viewport, with a staggered delay so grouped items cascade in.
4. **Theme toggle** — flips `data-theme`, persists the choice, and keeps the
   button's `aria-label` in sync.

Every `localStorage` access is wrapped in `try`/`catch`, so the page still works
in sandboxes that block storage — the theme simply stops persisting across
reloads.

## Common tasks

### Add or change artwork

1. Put the image file in `assets/art/`.
2. Add an entry to the `artworks` array in the portfolio script inside
   `index.html`:

```js
{ src: "assets/art/your-file.jpg", title: "Piece name", cat: "Illustration" }
```

`cat` must match one of the filter buttons in the `#portfolio` section —
currently `"Illustration"`, `"Traditional Art"`, or `"Digital Art"`. To add a
category, add a matching filter button in the HTML.

The gallery, filters, and lightbox pick up the change automatically. Until a
real file exists at `src`, a coloured placeholder showing the title is rendered
so the layout never looks broken.

### Edit CV content

Experience, projects, skills, and education are plain markup in their
respective `<section>` elements. Edit them directly — there is no data file or
templating layer.

### Adjust theming

Colors are CSS custom properties defined in the inline `<style>` block, with a
`[data-theme="dark"]` override set. Change the tokens rather than individual
rules so both themes stay consistent.

Fonts are loaded from Google Fonts: Fraunces (display serif), Hanken Grotesk
(body), and JetBrains Mono (dates and labels).

## Legacy files

`script.js` and `style.css` implement a typewriter-console version of the CV
that predates the current design. Nothing links to them. `script.js` carries a
long header comment documenting two bugs that were fixed in it (text-wrap
smearing, and earlier lines disappearing) along with the invariants that keep
them fixed — worth reading before reviving that code, and worth deleting along
with the files if the console version is not coming back.

## Contributing

There is no toolchain to install and no tests. Edit the files, reload the page,
and check both themes and a narrow viewport before committing — the layout has
a mobile breakpoint and the theme toggle affects every token.
