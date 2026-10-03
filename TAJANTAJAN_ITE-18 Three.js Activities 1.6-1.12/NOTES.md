# My Three.js Notes (Activities 1.6–1.12)

Simple notes on what each activity does and what it's teaching me.

**Live site (Activity 1.12):** _paste Vercel URL here_

---

## How to Run Any Activity

Each activity is its own Vite project. `node_modules` isn't included, so install first:

```
cd "Activity 1.6"
npm install
npm run dev
```

Then open the `localhost` link shown in the terminal.

---

## Activity 1.6 — Fullscreen and Resizing

**What it shows:** The red cube, but now the canvas fills the whole browser window. Double-click to go fullscreen, double-click again to leave.

**What it's teaching me:** How to make a 3D page feel like a real app instead of a small box:
- `window.innerWidth` / `innerHeight` – make the canvas the size of the window
- CSS (`margin: 0`, `position: fixed`, `overflow: hidden`) – removes the white border and scrollbar
- `resize` event – when the window changes size, update the sizes, the camera's `aspect` (+ `updateProjectionMatrix()`), and the renderer
- `setPixelRatio(Math.min(window.devicePixelRatio, 2))` – sharp on retina screens without wasting performance (above 2 you can't see the difference)
- `dblclick` + `requestFullscreen()` / `exitFullscreen()` – toggles fullscreen (with `webkit` versions for Safari)

**Key idea:** Every activity after this one starts with this fullscreen setup.

---

## Activity 1.7 — Geometries

**What it shows:** A messy red wireframe made of 50 random triangles.

**What it's teaching me:** What a geometry actually is — a list of **vertices** (points) joined into **triangles** (faces):
- Built-in geometries (Box, Sphere, Torus, Cone…) have **segments** that control how many triangles they use. More = smoother but slower
- `wireframe: true` shows the triangles' edges
- I can build my **own** shape with `BufferGeometry`: put x, y, z numbers into a `Float32Array`, wrap it in a `BufferAttribute` (read 3 at a time), and name it `'position'`

**Key idea:** `count * 3 * 3` = number of triangles × 3 corners × 3 numbers (x, y, z) per corner.

---

## Activity 1.8 — Debug UI

**What it shows:** The red cube with a control panel in the top-right corner.

**What it's teaching me:** How to tweak values live with **lil-gui** (a safer replacement for dat.gui):
- **Slider** – `gui.add(mesh.position, 'y').min(-3).max(3).step(0.01).name('elevation')`
- **Checkbox** – appears automatically for true/false values (`visible`, `wireframe`)
- **Color picker** – `addColor(...)` + `onChange(...)` to copy the color into the material
- **Button** – any function in an object becomes a button (the `spin` button uses GSAP to do a 360° turn)

**Key idea:** Add tweaks as I go, not at the end — it makes experimenting way faster.

---

## Activity 1.9 — Textures

**What it shows:** A cube covered in a pixel-art Minecraft diamond-ore texture.

**What it's teaching me:** How to put images on 3D objects:
- Texture types: color, alpha, height, normal, ambient occlusion, metalness, roughness (the last ones are **PBR** – realistic rendering)
- `TextureLoader` loads images; `LoadingManager` tracks when *all* of them are done
- **UV unwrapping** – how a flat image is wrapped around a 3D shape (like unfolding a box)
- Transforming textures: `repeat`, `offset`, `rotation`, `center`, `wrapS`/`wrapT`
- **Filters**: `NearestFilter` keeps hard pixels (great for pixel art), `LinearFilter` smooths them. `generateMipmaps = false` saves GPU memory when using Nearest
- Texture sizes should be powers of 2 (512, 1024, 2048)

**Key idea:** Files in `/static/` are loaded without the word "static" in the path, e.g. `'/textures/minecraft.png'`.

---

## Activity 1.10 — Materials

**What it shows:** A shiny metal sphere, plane, and donut reflecting a street scene, with metalness/roughness sliders.

**What it's teaching me:** The different built-in materials and when to use them:
- `MeshBasicMaterial` – flat color/texture, no lights needed
- `MeshNormalMaterial` – colorful, based on which way each face points
- `MeshMatcapMaterial` – fakes lighting with an image of a lit ball (fast, looks great)
- `MeshDepthMaterial` – white when close, black when far
- `MeshLambertMaterial` / `MeshPhongMaterial` – react to lights (Phong adds shiny highlights)
- `MeshToonMaterial` – cartoon style
- `MeshStandardMaterial` – realistic (PBR) with `metalness` + `roughness`, can use all the door textures
- **Environment map** – 6 pictures (a cube) of the surroundings that shiny objects reflect, loaded with `CubeTextureLoader`

**Key idea:** Materials that react to light are completely black until I add lights (`AmbientLight`, `PointLight`).

---

## Activity 1.11 — 3D Text

**What it shows:** Big 3D "Hello Three.js" text in the middle with 100 donuts floating around it.

**What it's teaching me:** My first "real" mini project:
- `FontLoader` + `TextGeometry` turn text into 3D (needs a typeface `.json` font in `/static/fonts/`)
- `textGeometry.center()` centers the text (using its **bounding box**)
- A `for` loop + `Math.random()` creates 100 donuts with random position, rotation, and size
- **Optimization**: reuse ONE geometry and ONE material for all 100 donuts instead of making 100 copies

**Key idea:** The text code goes *inside* the font loader's callback because the font isn't ready until it loads.

---

## Activity 1.12 — Go Live

**What it shows:** The finished 3D text project (with a purple matcap), ready to publish online.

**What it's teaching me:** How to put a project on the internet:
- `npm run build` – turns my project into plain HTML/CSS/JS in a `/dist/` folder (what web hosts need — never upload `node_modules`)
- **Vercel** – a free hosting site. I added it with `npm install vercel` and a `"deploy": "vercel --prod"` script in `package.json`
- `npm run deploy` – logs in, asks some setup questions (output directory = `dist`), then gives me a live URL
- **Other way: GitHub + Vercel** – push the project to a GitHub repo, then import it on vercel.com:
  - Root Directory: `Activity 1.12` (or the full path from the repo root if the repo is a parent folder)
  - Framework Preset: Vite · Build Command: `npm run build` · Output Directory: `dist`
  - Every new push to GitHub re-deploys the site automatically
- `.gitignore` keeps `node_modules`, `dist`, and `.vercel` out of the repo, since Vercel rebuilds them itself

**Key idea:** The code barely changes in this activity — it's all about building and publishing.

---

## Big Picture

| Step | Focus |
|---|---|
| 1.6 | Fill the window, handle resizing and fullscreen |
| 1.7 | Understand geometries and build my own |
| 1.8 | Tweak values live with a debug panel |
| 1.9 | Wrap images (textures) onto objects |
| 1.10 | Choose materials, add lights and reflections |
| 1.11 | Build a mini project: 3D text + floating donuts |
| 1.12 | Build and publish the project online |

These activities move from setup (fullscreen, debug panel) to looks (geometry, textures, materials) to a finished, published project.
