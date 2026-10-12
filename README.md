# Halo — Landing Page

A polished, production-style SaaS landing page for a fictional product-analytics platform called **Halo**. Built with plain **HTML**, **CSS**, and **vanilla JavaScript** — no frameworks, no build step.

![Halo landing page — full-page screenshot](screenshot.png)

## Features

- **Sticky glass nav** with scroll-progress bar and a responsive mobile hamburger menu
- **Hero** with a gradient headline, animated "LIVE" pill, and a detailed 3D-tilted dashboard mockup (KPIs, SVG area chart, live event feed)
- **Feature grid** (6 cards) with tinted icon chips
- **Platform showcase** with an AI-generated "story" panel and animated comparison bars
- **Dark stats band** with count-up number animations (IntersectionObserver-triggered)
- **Testimonials**, **pricing** with a monthly/yearly price toggle, and an accessible **FAQ accordion**
- **Gradient CTA panel** and a full multi-column **footer**
- **Reveal-on-scroll** animations, hover micro-interactions, and a demo **toast** notification
- Responsive layout (desktop → tablet → phone) and `prefers-reduced-motion` support

## Files

| File | Purpose |
| --- | --- |
| `index.html` | Page structure and content (single page, semantic markup) |
| `styles.css` | Design system + all component styles, responsive breakpoints |
| `script.js` | All interactions (nav, counters, toggle, accordion, toast, tilt) |
| `screenshot.png` | Full-page render at 1440 px width (see image above) |

## Design system

- **Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display/serif) + [Inter](https://fonts.google.com/specimen/Inter) (UI/body), loaded from Google Fonts with graceful system-font fallback
- **Palette:** warm paper background (`#FBF9F6`), deep ink text (`#14162B`), sunset gradient accent (`#FF8A3D → #FF4D8D → #7A5CFF`)
- **Spacing/radius:** 1140 px content container, 16 px card radius, soft layered shadows
- All tokens are CSS custom properties in `:root` — swap the palette in one place

## Run it

No build required. Either open the file directly:

```powershell
start .\index.html
```

or serve the folder with any static server:

```powershell
npx serve .
```

## Interactions exposed to tooling

`script.js` exposes a small global for automation:

```js
window.Halo.finalize(); // reveal all sections + set counters to final values
```

## Browser support

Modern evergreen browsers (Chrome, Edge, Firefox, Safari). Uses CSS custom properties, `backdrop-filter`, IntersectionObserver, and `matchMedia` — all with sensible degradation.
