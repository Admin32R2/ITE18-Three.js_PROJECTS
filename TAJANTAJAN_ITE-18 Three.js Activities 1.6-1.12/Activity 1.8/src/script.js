import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
// lil-gui is a drop-in replacement for dat.gui (installed with: npm install --save lil-gui).
// It is imported as "dat" so the code matches the lesson.
import * as dat from 'lil-gui'

// Activity 1.8 - Debug UI
// A small control panel (top-right corner) lets us tweak values live
// instead of editing the code and reloading every time.

// Parameters
// Values the GUI controls that are not direct properties of a Three.js object.
// The color lives here so it is written in one place only, and spin is a
// function so the GUI can show it as a button.
const parameters = {
    color: 0xff0000,
    spin: () =>
    {
        // One full turn (2 * PI radians) in 1 second, starting from the current angle
        gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
    }
}

// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// The material reads its color from parameters so the two never get out of sync
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: parameters.color })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Debug
// Tweaks are added after the objects they control exist
const gui = new dat.GUI()

// Range: a slider for a number, limited between -3 and 3 in steps of 0.01,
// with a friendlier label than "y"
gui
    .add(mesh.position, 'y')
    .min(- 3)
    .max(3)
    .step(0.01)
    .name('elevation')

// Checkboxes: lil-gui picks a checkbox automatically because these are booleans
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// Color: changing the picker only updates parameters.color, so onChange
// copies the new value into the material
gui
    .addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })

// Button: functions show up as buttons, clicking runs parameters.spin()
gui.add(parameters, 'spin')

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 3
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
