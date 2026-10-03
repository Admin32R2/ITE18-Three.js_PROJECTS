# My Three.js Notes (Activities 1.1–1.5)

Simple notes on what each activity does and what it's teaching me.

---

## Activity 1.1 — Basic Scene

**What it shows:** A red cube on a black background.

**How I run it:** Just double-click `index.html`. No terminal, no npm.

**What it's teaching me:** The 4 basic things every Three.js scene needs:
1. A **Scene** – the container that holds everything
2. An **Object** (the cube) – a Mesh = a shape (geometry) + a look (material)
3. A **Camera** – the point of view we render from
4. A **Renderer** – draws the scene onto a `<canvas>`

Three.js is loaded the simplest way possible here: just a `<script src="three.min.js">` tag, no bundler, no `npm install`.

---

## Activity 1.2 — Local Server

**What it shows:** The exact same red cube as 1.1. Looks identical.

**How I run it:** `npm run dev` in the terminal (needs Node.js + Vite).

**What it's teaching me:** A better way to load Three.js — using `import * as THREE from 'three'` instead of a plain `<script>` tag. This is the "real" setup professionals use, because:
- It lets me use extra classes not included in the basic library (like `OrbitControls` later in 1.5)
- It lets me load local files (textures, models) which browsers block otherwise
- It gives auto-reload when I save a file

**Key idea:** 1.1 and 1.2 look the same on purpose — this activity is only about the setup, not the visuals.

---

## Activity 1.3 — Transform Objects

**What it shows:** 3 red cubes in a row, stretched taller and tilted slightly, with a small axis helper (red/green lines).

**What it's teaching me:** How to move, resize, and rotate things:
- `position` – moves an object (x = right, y = up, z = toward camera)
- `scale` – resizes an object (2 = double size, 0.5 = half size)
- `rotation` – spins an object (measured in radians, using `Math.PI`)
- `Group` – a container that lets me transform several objects at once (like scaling all 3 cubes together by scaling the Group instead of each cube one by one)

**Key idea:** These 4 properties (position, scale, rotation, quaternion) exist on every object in Three.js — cubes, cameras, groups, everything.

---

## Activity 1.4 — Animations

**What it shows:** A cube that slides from the center to the right after a short pause.

**What it's teaching me:** How to make things move over time instead of just sitting still:
- `requestAnimationFrame` – asks the browser to run my code again on the next frame, creating a loop
- `THREE.Clock` – tracks elapsed time so animation speed is the same on every computer/screen
- **GSAP** – an animation library that makes smooth movements (`gsap.to(...)`) easier than writing the math myself

**Key idea:** Without a loop like this, Three.js only draws one single frame and then stops — animation means "move a little, redraw, move a little, redraw," over and over.

---

## Activity 1.5 — Cameras

**What it shows:** A cube I can rotate around and zoom into with my mouse.

**What it's teaching me:** Camera types and camera control:
- `PerspectiveCamera` – camera with real-world depth (far things look smaller). Has `near`/`far` limits for what's visible
- `OrthographicCamera` – camera with **no** depth perspective (used for things like RTS games where size shouldn't change with distance)
- **OrbitControls** – lets the person viewing the page control the camera:
  - Left-click + drag → rotate around the object
  - Right-click + drag → pan
  - Scroll wheel → zoom

**Key idea:** A static screenshot of 1.5 can look like a flat square depending on the camera angle — that's normal. The important part only shows up when I actually drag the mouse around in the browser.

---

## Big Picture

| Step | Focus |
|---|---|
| 1.1 → 1.2 | Get a cube on screen, two different ways to load Three.js |
| 1.3 | Move/resize/rotate objects |
| 1.4 | Make objects move over time |
| 1.5 | Control the camera / viewpoint |

Each activity keeps the same red cube but adds one new skill on top of the last one.
