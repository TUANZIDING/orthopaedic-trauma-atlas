# Product Design QA

## Target

Direction 1: 教学路径工作台（selected ideation option 1）。Reference state: 1440px desktop landing page, Chinese default, warm ivory/forest-green clinical editorial system.

## Checks

- [x] Hero presents a single primary CTA, `进入三维演示`, linking to `leg-fasciotomy-v2/index.html`.
- [x] Hero presents the selected 3D pilot plate and labels the teaching layers.
- [x] Four-step teaching path is visible: 识别解剖、分步操作、神经血管风险、复盘与讨论.
- [x] Three anatomical modules remain reachable: leg, thigh, foot.
- [x] Chinese/English toggle updates visible copy and the document language; verified with Playwright.
- [x] All eight homepage images loaded with non-zero natural dimensions.
- [x] Desktop screenshot reviewed at 1440px wide in Chinese state.
- [x] Mobile screenshot reviewed at 390px wide; `document.documentElement.scrollWidth === window.innerWidth`.
- [x] Primary links, anchors, evidence link and maintenance link resolve to existing local paths.
- [x] No browser console/page errors during the homepage interaction check.
- [x] Existing module verification passed: three modules, six stages, Chinese/English states, 4K PNG and SVG export, and no mobile overflow.

## Evidence

- Homepage browser check: `/tmp/atlas-home-desktop-zh.png`, `/tmp/atlas-home-desktop.png`, `/tmp/atlas-home-mobile.png`.
- Existing module check: `node scripts/verify.mjs` returned `errors: []` for leg, thigh and foot.
- Inline homepage script: `node --check /tmp/atlas-home-inline.js` passed.
- HTML parse and asset-path checks passed.

## Result

final result: passed

Remaining P3 polish: the hero uses the project's existing 3D pilot teaching plate as the visual anchor; a future pass could add a dedicated crop or interactive preview without changing the information architecture.
