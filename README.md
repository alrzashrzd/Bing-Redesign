# Microsoft Bing Redesign

> A conceptual redesign of the Microsoft Bing search homepage — a single-page, full-viewport hero with glassmorphism UI, dynamic video backgrounds, and full internationalization support.

![License](https://img.shields.io/badge/license-MIT-blue)
![Copyright](https://img.shields.io/badge/copyright-%40alrzashrzd-white)

---

## ⚠️ Disclaimer

**This project is NOT an official Microsoft product or service.** It is a personal concept/design project created by [@alrzashrzd](https://github.com/alrzashrzd) for educational and portfolio purposes only. This project is **not affiliated with, endorsed by, sponsored by, or in any way officially connected with Microsoft Corporation** or any of its subsidiaries or affiliates.

All Microsoft trademarks, logos, brand names, and product names used in this project are the property of Microsoft Corporation. Their use in this project is for design reference and visual identification purposes only.

**"Microsoft Bing" is a trademark of Microsoft Corporation. This project does not represent Microsoft Bing or any Microsoft service.**

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Responsive Design](#responsive-design)
- [Internationalization](#internationalization)
- [Video Backgrounds](#video-backgrounds)
- [Animations](#animations)
- [Design System](#design-system)
- [Contributing](#contributing)
- [License](#license)
- [Author](#author)

---

## Overview

This project is a pixel-faithful conceptual redesign of the Microsoft Bing search homepage. It features a full-viewport hero layout with a glassmorphism search card, dynamic nature video backgrounds, a complete internationalization system with 11 languages, and a fully responsive design that adapts across desktop, tablet, and mobile viewports.

The entire website consists of a **single page** — a full-screen hero with no scrolling, no additional sections, and no page transitions. Everything lives within the viewport.

---

## Demo Video

https://github.com/user-attachments/assets/ad7b67b1-9109-4395-9fca-9af49737b335

---

## Features

### 🎨 Visual Design
- **Glassmorphism UI** — Frosted glass cards, subtle borders, and layered shadows
- **Dynamic video backgrounds** — 11 nature video backgrounds (sunflowers, landscapes, forests, waterfalls) sourced from Mixkit, with a wallpaper-changer button
- **Mouse-follow glow effect** — Radial gradient follows cursor position inside the search card
- **Dark overlay system** — 22% black overlay on video for contrast, plus a 45% dim overlay when typing in search
- **Entrance animations** — Choreographed load-in sequence with staggered timing (brand → nav → headline → card → chips → send → footer)

### 🔍 Search Interface
- **Category chips** — Images, Videos, Shopping, Maps, News — radio-style selection
- **Dynamic placeholders** — Search placeholder changes based on selected category (e.g., "Find visuals" for Images)
- **Toolbar icons** — Picture, Voice, Attach icons with a vertical divider and glassy send button
- **Mobile chip dropdown** — Model-selector-style dropdown on compact viewports

### 🌐 Internationalization (i18n)
- **11 languages** — English, Español, Français, Deutsch, 日本語, 中文, 한국어, Português, العربية, हिन्दी, فارسی
- **Full translation system** — All UI text, placeholders, and chip labels translate on selection
- **RTL support** — Arabic and Persian automatically switch to right-to-left layout

### 📱 Responsive Design
- **Three breakpoints** — Desktop (absolute positioning), Tablet (fluid flex), Compact/Mobile (stacked)
- **Desktop** — Pixel-scaled 1560×1008 reference frame with `--u` unit system
- **Tablet** — Fluid layout with `clamp()` sizing, single-row toolbar
- **Mobile** — Full-width card, chip dropdown, header icon buttons, touch-friendly targets

### 🔐 Authentication UI
- **Glassy sign-in popup** — Modal with email/password inputs, Sign In / Create Account buttons
- **Microsoft account SSO** — "Continue with Microsoft account" button with Microsoft logo

### 🛠 Header Toolbar
- **Profile button** — Opens sign-in popup
- **Language button** — Toggles glassy language dropdown (11 languages)
- **Wallpaper button** — Cycles through 11 nature video backgrounds
- **Microsoft 365 button** — Opens 4×2 grid popup (Teams, Word, Excel, PowerPoint, Outlook, OneNote, Defender, OneDrive)
- **Glassy tooltips** — English-only hover tooltips on all header icons

---

## Tech Stack

| Technology | Usage |
|------------|-------|
| **HTML5** | Semantic markup, `<video>` for backgrounds |
| **CSS3** | Custom properties, `backdrop-filter`, `clamp()`, CSS Grid, Flexbox, `@keyframes` |
| **Vanilla JavaScript** | IIFE-scoped, no dependencies, no build tools |
| **Google Fonts** | Space Grotesk (variable), Noto Sans variants for non-Latin scripts |
| **Mixkit** | Free stock nature video backgrounds |

**No frameworks. No libraries. No build tools.** Pure HTML + CSS + JS.

---

## Project Structure

```
├── index.html          # Main HTML document
├── style.css           # All styles (desktop, tablet, compact, animations)
├── script.js           # Interactions, i18n system, video cycling
├── preview.html        # Inlined preview build (for development)
├── README.md           # This file
├── LICENSE             # MIT License
└── .gitignore          # Git ignore rules
```

---

## Getting Started

### Quick Start

1. Clone the repository:
   ```bash
   git clone https://github.com/alrzashrzd/microsoft-bing-redesign.git
   cd microsoft-bing-redesign
   ```

2. Open `index.html` in a browser:
   ```bash
   open index.html
   ```

3. That's it. No build step, no dependencies, no server required.

### Development

For live development with external CSS/JS files:

```bash
# Using Python
python -m http.server 8080

# Using Node.js
npx serve .

# Using PHP
php -S localhost:8080
```

Then open `http://localhost:8080` in your browser.

---

## Responsive Design

### Desktop (default)
- Unit-scaled layout based on a 1560×1008 reference frame
- `--u` CSS variable scales all measurements proportionally
- Absolute positioning inside the search card for pixel-perfect toolbar alignment
- Full header with brand, nav links, and CTA button

### Tablet (600–1180px wide, ≥600px height)
- Fluid layout using `clamp()` for all sizes
- Single-row toolbar (chips left, controls right)
- Header stays horizontal with all elements visible
- Card switches from absolute to flex layout

### Compact/Mobile (≤599px wide, or short+narrow)
- Full-width card with stacked layout
- Chip dropdown replaces individual chips (model-selector style)
- Header icon buttons shown directly (no hamburger)
- Touch-friendly 38px tap targets
- Safe area padding for notched devices

---

## Internationalization

The i18n system is built with `data-i18n` and `data-i18n-placeholder` attributes on HTML elements. When a language is selected from the dropdown:

1. All `[data-i18n]` elements update their `textContent`
2. All `[data-i18n-placeholder]` elements update their `placeholder`
3. Font family switches for non-Latin scripts
4. `dir="rtl"` is set for Arabic and Persian
5. Dynamic chip placeholders update if a category is selected

**Supported languages:**

| Code | Language | Script |
|------|----------|--------|
| `en` | English | Latin |
| `es` | Español | Latin |
| `fr` | Français | Latin |
| `de` | Deutsch | Latin |
| `pt` | Português | Latin |
| `ja` | 日本語 | CJK |
| `zh` | 中文 | CJK |
| `ko` | 한국어 | Hangul |
| `ar` | العربية | Arabic (RTL) |
| `hi` | हिन्दी | Devanagari |
| `fa` | فارسی | Arabic (RTL) |

---

## Video Backgrounds

The project uses **11 nature video backgrounds** from [Mixkit](https://mixkit.co) (free stock video). Videos are loaded via `<video>` with `autoplay`, `muted`, `loop`, `playsinline`, and `object-fit: cover`.

Users can cycle through backgrounds using the wallpaper icon button in the header.

| # | Video ID | Description |
|---|----------|-------------|
| 1 | 4881 | Gigantic field of sunflowers |
| 2 | 2213 | Nature landscape |
| 3 | 51445 | Nature scenery |
| 4 | 1173 | Mountain landscape |
| 5 | 4645 | Forest scene |
| 6 | 4633 | Waterfall |
| 7 | 1446 | Nature panorama |
| 8 | 1230 | Landscape view |
| 9 | 1259 | Nature scene |
| 10 | 1838 | Forest path |
| 11 | 4235 | Mountain view |

---

## Animations

### Entrance Sequence
All animations run once on first paint under `html.anim` class. The sequence:

| Element | Animation | Duration | Delay |
|---------|-----------|----------|-------|
| Brand | settle-down | 0.58s | 0.06s |
| Mark (logo) | scale pop | 0.62s | 0.06s |
| Nav links | settle-down (staggered) | 0.50s | 0.16s–0.31s |
| Get Started | settle-down | 0.55s | 0.34s |
| Headline | focus (blur + translate) | 1.00s | 0.30s |
| Composer card | panel slide-up | 0.90s | 0.62s |
| Search input | populate | 0.50s | 0.88s |
| Chips | populate | 0.50s | 0.94s |
| Right cluster | populate | 0.50s | 1.00s |
| Send button | scale pop | 0.50s | 1.00s |
| Footer | settle-up | 0.55s | 1.34s |

### Easing Curves
- **Primary**: `cubic-bezier(0.16, 1, 0.3, 1)` — snappy, confident
- **Soft**: `cubic-bezier(0.22, 1, 0.36, 1)` — gentle deceleration

### Reduced Motion
Respects `prefers-reduced-motion: reduce` — all animation durations reduced to 0.01ms.

---

## Design System

### Color Palette
- **Background**: `#0a0d12`
- **Glass card**: `rgba(255, 255, 255, 0.06)` + `blur(24px)`
- **Glass border**: `rgba(255, 255, 255, 0.09)`
- **Text primary**: `#fff`
- **Text secondary**: `rgba(255, 255, 255, 0.7)`
- **Text muted**: `rgba(255, 255, 255, 0.35)`
- **Video overlay**: `rgba(0, 0, 0, 0.22)`
- **Typing dim**: `rgba(0, 0, 0, 0.45)`

### Typography
- **Font**: Space Grotesk (variable weight 300–700)
- **Display**: weight 410, `opsz 32`
- **Body**: weight 400
- **Labels**: weight 500
- **CTA**: weight 520

### Spacing (Desktop Unit System)
1 reference pixel = `--u = min(0.06410256vw, 0.12400794vh)`
All measurements scale proportionally to viewport size.

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

**Important**: The MIT license covers the code in this repository. Microsoft trademarks, logos, and brand assets used in this project remain the property of Microsoft Corporation and are not covered by this license.

---

## Author

**@alrzashrzd**

- GitHub: [github.com/alrzashrzd](https://github.com/alrzashrzd)

---

<p align="center">
  <i>This is a personal concept project for educational purposes only.</i><br>
  <i>Not affiliated with Microsoft Corporation.</i>
</p>
