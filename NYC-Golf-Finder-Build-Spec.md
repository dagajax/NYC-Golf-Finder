# NYC Golf Finder — Build Specification

## What This App Is

A single-page React application that helps golfers in Manhattan find public golf courses accessible from Penn Station (34th St & 7th Ave, Chelsea). It shows an interactive SVG map with course pins, filter controls, and expandable course detail cards. The end goal is to host it publicly on Azure Static Web Apps.

---

## Tech Stack

- **Framework:** React 18 (Vite build tool)
- **Styling:** Inline styles (no CSS framework — dark green/gold golf aesthetic)
- **Map:** Custom SVG — no external map library
- **Hosting target:** Azure Static Web Apps (free tier)
- **No backend / no database** — all course data is hardcoded in-app

---

## Project Structure

```
nyc-golf-finder/
├── index.html            # Entry point, dark background base style
├── package.json          # Vite + React dependencies
├── vite.config.js        # Vite config with React plugin
├── .gitignore            # node_modules, dist, .DS_Store
├── README.md
└── src/
    ├── main.jsx          # ReactDOM.createRoot, renders <App />
    └── App.jsx           # Entire application (single component)
```

Everything lives in one `App.jsx` file. No routing, no external API calls, no separate CSS files.

---

## Design Aesthetic

The app should feel like a **premium golf clubhouse digital display** — dark, moody, elegant.

- **Background:** Very dark green (`#0d1b0e`)
- **Primary accent:** Muted golf green (`#4a9e4e`, `#2d5a30`, `#c5e8c7`)
- **Secondary accent:** Warm gold (`#E8A83A`) for prices, highlights, and active states
- **Typography:** Georgia serif throughout — gives it a classic, editorial golf feel
- **Cards/panels:** Dark semi-transparent greens with subtle green borders
- **Interactive elements:** Pill-shaped buttons with green gradients when active, muted when inactive
- **No emojis in the design** except for functional icons in tags (🚗🚇🚶📍🛒🌐✦)

### Borough Color Coding

Each region gets a distinct dot color used on the map and in the course list:

| Region | Color |
|---|---|
| Bronx | `#E85D3A` (orange-red) |
| Brooklyn | `#3A7CE8` (blue) |
| Queens | `#E8A83A` (gold) |
| Staten Island | `#3AE87C` (green) |
| Long Island | `#C43AE8` (purple) |
| New Jersey | `#E83A8C` (pink) |
| Westchester | `#3AD4E8` (cyan) |

---

## Course Database

All 18 entries stored as a `COURSES` array of objects. Each course object has these fields:

```js
{
  id: Number,               // Unique ID
  name: String,             // Full name, e.g. "Van Cortlandt Park GC"
  borough: String,          // Region key matching BOROUGH_COLORS
  lat: Number,              // Latitude
  lng: Number,              // Longitude
  holes: Number,            // 9, 18, 36, or 90 (Bethpage has 5 courses)
  par: Number,
  yards: Number,
  style: String,            // "Parkland", "Links", "Executive", etc.
  budget: String,           // "budget" | "mid" | "premium"
  weekday18: Number,        // Green fee in dollars (0 if not offered)
  weekend18: Number,
  weekday9: Number,
  weekend9: Number,
  cart: Number,             // Cart fee per person (0 if N/A or included)
  transit: String | Array,  // Transit directions — string for most, array of options for Skyway
  transitTime: Number,      // Minutes from Penn Station via transit (999 = not transit-accessible)
  walkTransit: Boolean,     // true = can walk from subway/train stop (< 20 min walk)
  driveTime: Number,        // Minutes driving from Penn Station (base estimate)
  driveRange: String,       // Drive time range, e.g. "25–40" (accounts for traffic)
  description: String,      // 1-2 sentence course description
  highlight: String,        // Short standout feature
  phone: String,
  website: String,          // URL for course website / tee time booking
}
```

### Complete Course List

**Bronx:**
1. **Van Cortlandt Park GC** — 18H, Par 70, 6052y, Parkland. Budget ($52 wkday / $66 wkend). Oldest public course in America (1895). 1 train to 242nd St, walkable. Drive: 25–40 min. `walkTransit: true`. Website: golfnyc.com/van-cortlandt-course/
2. **Pelham/Split Rock GC** — 36H (two 18-hole courses), Par 71, 6548y, Parkland. Mid ($62/$78). 6 train to Pelham Bay Park. Drive: 25–40 min. Website: pelhamsplitrock.com
3. **Mosholu GC** — 9H, Par 31, 1545y, Executive Par-3. Budget ($18/$22 for 9). 4 train to Woodlawn, walkable. Walk-only course, no carts. Drive: 25–35 min. `walkTransit: true`.
4. **Bally's Ferry Point** — 18H, Par 72, 7407y, Links. Premium ($149/$219). Jack Nicklaus Signature Design. NOT transit-accessible (`transitTime: 999`). Cart included in fee. Drive: 20–35 min.

**Brooklyn:**
5. **Dyker Beach GC** — 18H, Par 72, 6548y, Parkland. Budget ($52/$66). Verrazzano Bridge views. R train to 86th St. Drive: 20–35 min.
6. **Marine Park GC** — 18H, Par 72, 6866y, Links-style. Budget ($52/$66). Longest NYC muni course, Jamaica Bay winds. 2/5 train + Q35 bus. Drive: 30–50 min.

**Queens:**
7. **Forest Park GC** — 18H, Par 67, 5354y, Parkland. Budget ($52/$66). Tight woodland fairways. J/Z to Woodhaven Blvd. Drive: 25–40 min.
8. **Clearview Park GC** — 18H, Par 70, 6249y, Parkland. Budget ($52/$66). Throgs Neck Bridge views. 7 train + Q16 bus or LIRR to Bayside. Drive: 30–45 min.
9. **Douglaston GC** — 18H, Par 67, 5585y, Parkland. Budget ($52/$66). Manhattan skyline views. LIRR to Douglaston. Drive: 25–40 min.
10. **Kissena GC** — 18H, Par 64, 4665y, Executive. Budget ($42/$53). Great for beginners. 7 train to Main St + Q65 bus. Drive: 25–40 min.

**Staten Island:**
11. **La Tourette GC** — 18H, Par 72, 6492y, Parkland. Budget ($52/$66). Best-conditioned NYC muni. SI Ferry + S74 bus. Drive: 35–55 min.
12. **Silver Lake GC** — 18H, Par 69, 5769y, Parkland. Budget ($52/$66). Stunning skyline panoramas. SI Ferry + S61/S62 bus. Drive: 30–50 min.
13. **South Shore GC** — 18H, Par 72, 6302y, Parkland. Budget ($52/$66). Wide fairways, relaxed vibe. SI Ferry + S78 bus. Drive: 40–60 min.

**Long Island:**
14. **Bethpage State Park** — 90H (5 courses), Par 71, 7468y, Championship. Mid ($38/$43 for Green/Blue/Yellow — Black course costs ~$100 extra). LIRR to Farmingdale + taxi. Drive: 50–75 min. Ryder Cup & US Open host.
15. **Harbor Links (Championship)** — 18H, Par 72, 6927y, Links. Premium ($78/$108). Reclaimed sand mine, Audubon Certified. LIRR to Port Washington + short Uber. Drive: 30–45 min. Cart mandatory weekends.
16. **Harbor Links (Lower 9)** — 9H, Par 31, 1668y, Executive. Budget ($19/$22). Walking allowed anytime. Same location as Championship. Drive: 30–45 min.

**New Jersey:**
17. **Skyway GC** — 9H, Par 36, 3247y, Links. Mid ($44/$48 for 9, $69/$80 for 18 via double booking). Built on former landfill in Jersey City, 142 slope. Drive: 15–25 min. Transit has 3 options (stored as array):
    - A: PATH to Journal Square + short Uber
    - B: NJ Transit to Secaucus Jct + short Uber
    - C: Short Uber from Manhattan (~15 min)

**Westchester:**
18. **Dunwoodie GC** — 18H, Par 70, 5830y, Parkland. Mid ($55/$62). 1903 hilltop course, dramatic elevation, lighted driving range. Metro-North Harlem Line to Crestwood + short Uber. Drive: 25–40 min.

---

## App Layout

The app has 4 vertical sections, top to bottom:

### 1. Header Bar
- Golf flag emoji + "NYC Golf Finder" title in large Georgia serif
- Subtitle: "Public courses accessible from Penn Station · Chelsea, Manhattan"
- Dark green gradient background with subtle radial glow accents

### 2. View Toggle + Filters

**View Toggle** (two buttons above the filter panel):
- **🎯 Filtered View** — default, applies all filters below
- **📋 Show All 18 Courses** — bypasses all filters, shows everything sorted by commute time. When active, the filter panel below dims to 40% opacity and becomes non-interactive (`pointerEvents: none`).

**Filter Panel** (single row of controls, responsive grid):

| Filter | Type | Options | Default |
|---|---|---|---|
| How are you getting there? | 3 pill buttons | 🚶 Subway + Walk, 🚇 Train + Uber, 🚗 Uber / Car | Uber / Car |
| Max commute | Range slider (20–120 min) | Shows current value in gold | 120 min |
| How many holes? | 3 pill buttons | Any, 9, 18 | Any |
| Budget | 4 pill buttons | Any, $, $$, $$$ | Any |
| Day type | 2 pill buttons | Weekday, Weekend | Weekday |

### 3. Map + Course List (side by side grid)

**Left: SVG Map (~60% width)**
- Dark background with subtle grid lines
- Penn Station shown as a gold dot with "PENN STATION" label
- Dashed concentric rings at ~30, 60, 90 minute commute radii (based on selected transport mode)
- Each course is a colored flag pin (borough color) — dot + vertical line + triangular flag
- Dashed lines connect Penn Station to each course (highlighted on hover/select)
- Hovering or clicking a course shows its name in a tooltip box near the pin
- Tooltip labels auto-flip to the left when the course is near the right edge of the map
- Map viewport is capped so far-flung courses (Bethpage) don't shrink the NYC cluster. Outlier courses clamp to the map edges (12px from border) so they remain visible and clickable.
- Borough color legend shown at top of map area

**Right: Course Card List (~40% width, scrollable)**
- Cards sorted by commute time (nearest first)
- Each card shows:
  - Borough color dot + course name (bold)
  - Metadata line: Borough · Holes · Par · Yards · Style
  - Price in large gold text (adapts to weekday/weekend and 9/18 hole selection)
  - Tag pills: drive time range from Penn Station (always visible), transit time (if in transit mode), distance in miles, cart fee
- Clicking a card expands it to reveal:
  - Course description paragraph
  - Highlight callout (gold ✦ icon)
  - "Getting there" directions (single string for most courses; for Skyway, renders an array of 3 options with left-border accent styling)
  - Phone number
  - Price breakdown tags (9H and 18H rates)
  - **🌐 Course Website & Tee Times** — green button linking to course website (opens new tab, `stopPropagation` prevents card collapse)

### 4. Footer
- Notes about rate sources, effective dates, reservation fees, and link to golfnyc.com for booking.

---

## Filter Logic Details

### Transport Mode Behavior

| Mode | What it filters | Time shown | Sort by |
|---|---|---|---|
| 🚶 Subway + Walk | Only courses where `walkTransit: true` (Van Cortlandt, Mosholu) | transitTime | transitTime |
| 🚇 Train + Uber | All courses except those with `transitTime >= 999` (excludes Ferry Point) | transitTime | transitTime |
| 🚗 Uber / Car | All courses | driveTime | driveTime |

### Holes Filter
- **Any** — shows all courses
- **9** — ONLY shows courses where `holes === 9` (dedicated 9-hole courses: Mosholu, Harbor Links Lower 9, Skyway). Does NOT show 18-hole courses that offer a 9-hole rate.
- **18** — hides courses where `holes === 9`

### Budget Filter
- **$** (budget) — most NYC Parks munis (~$42–$66)
- **$$** (mid) — Pelham/Split Rock, Bethpage, Skyway, Dunwoodie (~$38–$80)
- **$$$** (premium) — Ferry Point, Harbor Links Championship (~$78–$219)

### Price Display
Prices update dynamically based on the Weekday/Weekend toggle and the holes filter:
- `getPrice(course)` returns `weekend9`/`weekday9` when holes filter is "9", otherwise returns `weekend18`/`weekday18`

---

## Map Technical Details

### Coordinate System
- Origin: Penn Station at `{ lat: 40.7506, lng: -73.9935 }`
- SVG viewBox: `0 0 600 500`
- Latitude/longitude mapped to pixel coordinates via linear interpolation
- Haversine formula used to calculate distance in miles from Penn Station

### Viewport Capping
The map auto-fits to filtered courses but caps the longitude span at `0.45` degrees to prevent Bethpage/Harbor Links from stretching the map too wide. Courses outside the capped viewport are clamped to 12px from the SVG edge using `clampX`/`clampY` functions, keeping them visible and clickable.

### Time Rings
Three dashed circles at 30, 60, 90 minute radii from Penn Station. Ring size is calculated using an approximate travel speed:
- Transit/walk modes: 0.35 mi/min
- Car mode: 0.55 mi/min

Rings that exceed the max commute slider are dimmed.

---

## Responsive Considerations

- Filter grid uses `repeat(auto-fit, minmax(180px, 1fr))` to wrap on smaller screens
- Course list has `maxHeight: 540px` with `overflowY: auto` for scrolling
- Tag pills use `flexWrap: wrap` to handle overflow
- SVG map uses `width: 100%` with `height: auto` to scale

---

## Build & Deploy Instructions

### Local Development
```bash
npm create vite@latest nyc-golf-finder -- --template react
cd nyc-golf-finder
npm install
# Replace src/App.jsx with the app code
npm run dev
```

### Build for Production
```bash
npm run build
# Output goes to ./dist
```

### Deploy to Azure Static Web Apps

**Option A — Azure CLI (quick one-off):**
```bash
npm install -g @azure/static-web-apps-cli
npm run build
swa deploy ./dist
```

**Option B — GitHub + Azure Portal (CI/CD):**
1. Push project to GitHub repository (e.g., `dagajax/NYC-Golf-Finder`)
2. In Azure Portal → Create resource → Static Web App
3. Connect to your GitHub repo
4. Build settings:
   - **Build Preset:** React
   - **App location:** `/`
   - **Output location:** `dist`
5. Azure auto-deploys on every `git push` to `main`

**Cost:** Free tier includes custom domains, SSL, 100GB bandwidth/month.

### Git Commands
```bash
git init
git add .
git commit -m "Initial commit - NYC Golf Finder"
git branch -M main
git remote add origin https://github.com/dagajax/NYC-Golf-Finder.git
git push -u origin main
```

---

## Future Enhancement Ideas

- **Real-time tee time availability** via course APIs or web scraping
- **Weather overlay** — show current wind/temp at each course (especially useful for links courses like Marine Park and Skyway)
- **Congestion pricing indicator** — note the $9 toll for courses requiring re-entry below 60th St
- **"My bag" feature** — save favorite courses to local storage
- **Mobile-first responsive layout** — stack map above list on narrow screens
- **Google Maps directions link** — one-tap navigation from course cards
- **NYC Parks reservation card** integration — show savings for cardholders
- **Course condition reports** — pull from social media or course websites
- **Group cost calculator** — enter number of players, include cart split, show total per person
