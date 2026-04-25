# NYC Golf Finder

A single-page React app that helps Manhattan-based golfers find public courses
accessible from Penn Station (Chelsea). Interactive SVG map, filter controls
for transport / commute / holes / budget, and expandable course detail cards
for all 18 courses across NYC, Long Island, New Jersey, and Westchester.

Built with **React 18 + Vite**. No backend, no external APIs — all course data
is hardcoded so it deploys as pure static files.

## Local development

```bash
npm install
npm run dev
```

The dev server runs at http://localhost:5173.

## Production build

```bash
npm run build
```

Output is written to `./dist`.

## Project structure

```
src/
├── App.jsx                     # Top-level layout + state
├── main.jsx                    # Entry point
├── styles/
│   ├── tokens.css              # Color, spacing, typography tokens
│   └── global.css              # Body / reset / typography defaults
├── data/
│   ├── courses.js              # All 18 courses (the source of truth)
│   └── boroughColors.js        # Region → color map
├── utils/
│   ├── geo.js                  # Haversine + lat/lng → SVG projection
│   ├── pricing.js              # getPrice() helper
│   └── filtering.js            # applyFilters() + sortByCommute()
└── components/
    ├── Header/
    ├── ViewToggle/
    ├── Filters/
    ├── Map/
    ├── CourseList/
    └── Footer/
```

Each component lives in its own folder with a co-located `.module.css` file
so styles are scoped and easy to iterate on. Theme colors and spacing are
defined as CSS variables in `src/styles/tokens.css` — change a value there
to re-skin the whole app.

## Deploy to Azure Static Web Apps

The simplest path is the Azure Portal flow:

1. Push this repo to GitHub (e.g. `dagajax/NYC-Golf-Finder`).
2. In the Azure Portal: **Create resource → Static Web App**.
3. Connect to your GitHub repo and the `main` branch.
4. Build settings:
   - **Build preset:** React
   - **App location:** `/`
   - **Output location:** `dist`
5. Azure auto-deploys on every `git push` to `main`. The free tier includes
   custom domains, HTTPS, and 100 GB bandwidth/month.

## Adding or editing courses

All course data lives in [`src/data/courses.js`](src/data/courses.js). Each
entry follows the same shape — see the build spec
([`NYC-Golf-Finder-Build-Spec.md`](NYC-Golf-Finder-Build-Spec.md)) for field
documentation.
# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
