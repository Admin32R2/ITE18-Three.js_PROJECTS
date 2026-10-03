import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Activity 1.6 - Fullscreen and Resizing
// The canvas now fills the whole browser window, follows window resizes,
// uses a sensible pixel ratio, and toggles fullscreen on double-click.
// style.css removes the default page margin/padding and pins the canvas
// to the top-left so there is no white border or scrollbar.

// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
// Fit the viewport instead of the old fixed 800 x 600
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

// Handle resize
// When the window changes size, every size-dependent part has to be updated
window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    // A new aspect ratio only takes effect after the projection matrix is recalculated
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    // setSize also resizes the <canvas> element itself.
    // The pixel ratio is refreshed here too in case the window moved to another screen.
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Handle fullscreen
// Double-click toggles fullscreen on the canvas.
// The webkit-prefixed versions are fallbacks for Safari, which does not
// support the standard fullscreen API names.
window.addEventListener('dblclick', () =>
{
    const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement

    if(!fullscreenElement)
    {
        // Not in fullscreen yet, so request it on the canvas
        if(canvas.requestFullscreen)
        {
            canvas.requestFullscreen()
        }
        else if(canvas.webkitRequestFullscreen)
        {
            canvas.webkitRequestFullscreen()
        }
    }
    else
    {
        // Already in fullscreen, so leave it
        if(document.exitFullscreen)
        {
            document.exitFullscreen()
        }
        else if(document.webkitExitFullscreen)
        {
            document.webkitExitFullscreen()
        }
    }
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

// Pixel ratio
// Retina / mobile screens can have a pixel ratio of 2 or 3, which means 4x or 9x
// more pixels to render. Capping it at 2 keeps the image sharp without the
// performance and battery cost of 3.
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
