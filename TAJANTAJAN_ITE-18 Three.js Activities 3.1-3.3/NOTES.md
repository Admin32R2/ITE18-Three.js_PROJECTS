# My Three.js Notes (Activities 3.1-3.3)

Simple notes on what each activity does and what it is teaching me.

---

## How to Run Any Activity

Each activity is its own Vite project. `node_modules` is not included, so install first:

```
cd "Activity 3.1 Particles"
npm install
npm run dev
```

Then open the `localhost` link shown in the terminal.

---

## Activity 3.1 - Particles

**What it shows:** 20,000 colorful ring-shaped particles floating in a wave that moves across the scene.

**What it is teaching me:** How to build particles:
- A `BufferGeometry` with a `position` attribute where every vertex becomes one particle.
- `PointsMaterial` and `Points` are used instead of a normal material and `Mesh`.
- `alphaMap` + `transparent` give the particles a texture shape, and `depthWrite = false` fixes particles hiding each other.
- `AdditiveBlending` adds colors together for a glowing look.
- A `color` attribute with `vertexColors = true` gives each particle its own color.
- Changing the position array in `tick` (and setting `needsUpdate = true`) animates each particle separately.

**Key idea:** Particles are cheap, so you can have thousands of them, but updating every particle in JavaScript each frame gets slow (shaders are the better way later).

---

## Activity 3.2 - Galaxy Generator

**What it shows:** A spiral galaxy made of 100,000 particles that is rebuilt every time a setting in the debug panel changes.

**What it is teaching me:** How to generate shapes with math:
- A `generateGalaxy` function that disposes the old geometry/material and removes the old points before making new ones.
- `radius`, `branches`, and `spin` place particles on curved arms using `Math.cos` and `Math.sin`.
- `randomness` with `Math.pow` keeps stars dense near the arms and more spread out at the edges.
- `Color.lerp()` mixes the inside color into the outside color based on distance from the center.
- `onFinishChange` in lil-gui regenerates the galaxy only after a value is set.

**Key idea:** Always `dispose()` old geometries and materials when regenerating, or memory keeps piling up.

---

## Activity 3.3 - Scroll Based Animation

**What it shows:** A simple portfolio page where a torus, cone, and torus knot sit beside each section, with the camera following the scroll.

**What it is teaching me:** How to use Three.js as the background of a normal web page:
- `alpha: true` on the renderer and a CSS background fix the white elastic-scroll area.
- `MeshToonMaterial` with a gradient texture (using `NearestFilter`) gives a cartoon look.
- The camera moves by `- scrollY / sizes.height * objectsDistance` so one section scrolled equals one object.
- The camera is inside a `Group` so the mouse parallax and the scroll do not overwrite each other.
- Easing with `deltaTime` makes the parallax smooth and the same speed on any screen refresh rate.
- GSAP (`gsap@3.5.1`) spins the mesh of the section you just arrived at.

**Key idea:** Separate concerns (scroll on the camera, parallax on the group, rotation added with `+=`) so animations can stack without fighting each other.
