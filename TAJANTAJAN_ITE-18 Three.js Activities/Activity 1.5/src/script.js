import * as THREE from 'three'
// OrbitControls is not part of the core THREE object, so it is imported from the examples folder
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Activity 1.5 - Cameras
// Covers PerspectiveCamera parameters, OrthographicCamera, custom mouse controls,
// and finally the built-in OrbitControls (the active result).

// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Cursor
// Mouse position normalized to the range -0.5 to 0.5 on both axes (0 = canvas center).
// y is negated because clientY grows downward while Three.js y grows upward.
const cursor = {
    x: 0,
    y: 0
}

window.addEventListener('mousemove', (event) =>
{
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = - (event.clientY / sizes.height - 0.5)
})

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
scene.add(mesh)

// Camera
// PerspectiveCamera(fov, aspect, near, far)
// fov: vertical view angle in degrees (45 to 75 is a good range)
// aspect: canvas width / height
// near / far: anything closer than 0.1 or farther than 100 is not rendered.
// Extreme values like 0.0001 and 9999999 cause z-fighting, so keep them reasonable.
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

// OrthographicCamera(left, right, top, bottom, near, far)
// No perspective: objects keep the same size at any distance.
// Multiplying left/right by the aspect ratio stops the square view from being
// stretched onto the rectangular canvas, so the cube still looks like a cube.
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(- 1 * aspectRatio, 1 * aspectRatio, 1, - 1, 0.1, 100)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Controls
// Left drag rotates around the target, right drag pans, and the wheel zooms.
// The canvas is passed so it is the element that listens to the mouse events.
const controls = new OrbitControls(camera, canvas)
// Damping adds inertia for smoother movement; it requires controls.update() every frame
controls.enableDamping = true

// Target: the point the camera orbits around (scene center by default).
// update() is needed after changing it manually.
// controls.target.y = 2
// controls.update()

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Mesh rotation removed so the camera movement is easier to see
    // mesh.rotation.y = elapsedTime

    // Custom controls (replaced by OrbitControls)
    // Step 1: move the camera with the cursor, amplified by 5, while looking at the cube
    // camera.position.x = cursor.x * 5
    // camera.position.y = cursor.y * 5
    // camera.lookAt(mesh.position)

    // Step 2: full turn around the cube.
    // sin/cos of the same angle place the camera on a circle of radius 2;
    // cursor.x * Math.PI * 2 maps the canvas width to one complete rotation.
    // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 2
    // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 2
    // camera.position.y = cursor.y * 3
    // camera.lookAt(mesh.position)

    // Update controls so damping keeps easing the camera between frames
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
