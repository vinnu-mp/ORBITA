# Orbita — Hero Section

Premium space learning platform hero section built with React + Three.js.

---

## Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Add Earth textures (see Textures section below)

# 3. Start dev server
npm run dev
```

---

## Textures

Place the following files in `/public/textures/`:

| File | Source | Notes |
|---|---|---|
| `earth_daymap.jpg` | [NASA Visible Earth](https://visibleearth.nasa.gov/images/73909) | 8K day texture |
| `earth_normal.jpg` | [Solar System Scope](https://www.solarsystemscope.com/textures/) | Normal map |
| `earth_roughness.jpg` | Specular map from Solar System Scope | Inverted for roughness |
| `earth_clouds.jpg` | [NASA GOES](https://visibleearth.nasa.gov/images/57747) | Cloud alpha layer |

**Free high-quality source:** https://www.solarsystemscope.com/textures/  
All textures are CC Attribution — free for educational/demo use.

**Performance tip:** Compress to 4K max for production. Use `.webp` if your pipeline supports it.

---

## Project Structure

```
src/
├── pages/
│   └── HomePage.jsx              # Root page, lazy loads sections
│
├── components/
│   └── home/
│       ├── Hero/
│       │   ├── HeroSection.jsx   # Layout shell
│       │   ├── HeroText.jsx      # Branding, heading, CTAs
│       │   └── HeroStats.jsx     # Stat chips + live indicator
│       │
│       ├── EarthScene/
│       │   ├── EarthCanvas.jsx   # R3F Canvas (lazy-loaded)
│       │   ├── EarthMesh.jsx     # Earth + cloud + hologram meshes
│       │   ├── AtmosphereGlow.jsx# Fresnel shader glow halo
│       │   └── SceneLighting.jsx # Three-point lighting rig
│       │
│       └── Background/
│           ├── StarField.jsx     # Canvas 2D animated stars
│           ├── GridOverlay.jsx   # CSS grid lines
│           └── OrbitalRings.jsx  # SVG animated orbital rings
│
├── hooks/
│   └── useEarthRotation.js       # Reusable rotation hooks
│
├── store/
│   └── store.js                  # Redux Toolkit store
│
├── App.jsx
├── main.jsx
└── index.css
```

---

## Architecture Decisions

### Why EarthCanvas is lazy-loaded
Three.js + R3F is ~500KB gzipped. Lazy loading with `React.lazy()` defers this
until the hero section mounts, improving initial page load time. The `<Suspense>`
fallback shows a soft pulsing glow in the meantime.

### Why StarField is a 2D canvas, not inside R3F
The R3F Canvas has its own WebGL context. Keeping stars in a plain 2D canvas:
- Saves draw calls inside the 3D scene
- Lets the Earth Canvas be suspended/unmounted independently
- Is simpler to implement with twinkling alpha animations

### Why AtmosphereGlow uses a custom ShaderMaterial instead of a post-processing bloom
Bloom via `@react-three/postprocessing` adds 1-2 render passes and noticeably
impacts mobile frame rates. The Fresnel shader trick achieves 90% of the visual
result at zero extra render cost — one extra draw call per frame.

### Why GridOverlay is pure CSS
A grid overlay is a static decorative element. CSS `backgroundImage` with
`linear-gradient` is hardware-accelerated, costs nothing at runtime, and
doesn't need JavaScript.

### DPR capping at 2
On 3x+ screens (most modern phones), rendering at native DPR triples the
pixel count. Capping at 2 cuts fill-rate pressure significantly with no
perceptible quality difference at typical viewing distances.

### Manual Vite chunk splitting
Separating `three`, `@react-three/*`, and React into their own chunks means:
- Browser caches vendor code independently of app code
- Faster subsequent deploys (only app chunk changes)

---

## Extending Later

### Add Moon
Inside `EarthMesh.jsx`, add a second `<mesh>` that orbits via `useFrame`.
Position it relative to Earth using polar coordinates.

### Add Satellites
Create a `SatelliteSystem.jsx` component with N small meshes on parametric
elliptical orbits. Pass TLE orbital data from an API via Redux.

### Add Galaxy Map
Create a separate `/explore` route with its own R3F Canvas, a star catalog
dataset, and `OrbitControls` enabled (it's fine for interactive exploration pages).

### Add Educational Interactions
Raycasting on Earth clicks → dispatch Redux action → open an info panel.
Use `useThree().raycaster` or Drei's `<Raycaster>` for clean integration.

### Add Night Lights
Add a `lightsMap` to `useTexture(...)` in `EarthMesh.jsx` and assign it
to `emissiveMap` on the `MeshStandardMaterial`. The dark side of Earth will
glow with city lights automatically.

---

## Dependencies

| Package | Purpose |
|---|---|
| `three` | 3D engine |
| `@react-three/fiber` | React renderer for Three.js |
| `@react-three/drei` | R3F helpers (useTexture, Preload, etc.) |
| `react-router-dom` | Client-side routing |
| `@reduxjs/toolkit` | State management |
| `react-hook-form` | Form handling (future auth/onboarding) |
| `axios` | HTTP client (future space data APIs) |
