# My Three.js Notes (Activities 2.1-2.3)

Simple notes on what each activity does and what it is teaching me.

---

## How to Run Any Activity

Each activity is its own Vite project. `node_modules` is not included, so install first:

```
cd "Activity 2.1 Lights"
npm install
npm run dev
```

Then open the `localhost` link shown in the terminal.

---

## Activity 2.1 - Lights

**What it shows:** A sphere, cube, torus, and floor lit by several different light types.

**What it is teaching me:** How each light behaves:
- `AmbientLight` brightens everything evenly.
- `DirectionalLight` works like sunlight coming from one direction.
- `HemisphereLight` blends sky and ground colors.
- `PointLight` shines outward from one position.
- `RectAreaLight` creates a soft rectangular light source.
- `SpotLight` creates a cone of light aimed at a target.

**Key idea:** Materials like `MeshStandardMaterial` need lights to be visible.

---

## Activity 2.2 - Shadows

**What it shows:** A moving sphere casting shadows on a plane, with real-time shadow settings and two image-based shadow examples.

**What it is teaching me:** How shadows need setup in three places:
- Enable shadows on the renderer with `renderer.shadowMap.enabled = true`.
- Set lights to `castShadow = true`.
- Set objects to `castShadow` or `receiveShadow`.

**Key idea:** Real-time shadows look good but cost performance, so fake or baked shadows can be useful.

---

## Activity 2.3 - Haunted House

**What it shows:** A textured haunted house scene with walls, roof, door, bushes, graves, fog, moonlight, a door lamp, and animated ghost lights.

**What it is teaching me:** How to combine the previous lessons into a small finished scene:
- Texture maps add color, roughness, normals, ambient occlusion, alpha, metalness, and displacement.
- Groups keep related objects organized.
- Fog, dark background color, and colored lights create mood.
- Repeated grave objects build the environment quickly.
- Animated point lights can act like moving ghosts.

**Key idea:** A scene feels complete when geometry, materials, lights, shadows, textures, and animation all work together.
