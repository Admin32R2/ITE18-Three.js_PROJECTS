import * as THREE from 'three'
// GSAP animation library, installed with: npm install --save gsap@3.5.1
import gsap from 'gsap'

// Activity 1.4 - Animations
// Animation works like stop motion: move objects a little, render, and repeat on every frame.
// Each approach from the lesson is kept below as a commented step; the active one is GSAP.

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
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
// The single render call was removed from here; rendering now happens inside tick()
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Step 1: requestAnimationFrame loop
// tick() asks the browser to call tick() again on the next frame, creating an infinite loop.
// Problem: += 0.01 per frame means a 144Hz screen spins the cube faster than a 60Hz one.
// const tick = () =>
// {
//     // Update objects
//     mesh.rotation.y += 0.01
//
//     // Render
//     renderer.render(scene, camera)
//
//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }
// tick()

// Step 2: adapt to the frame rate with a delta time
// deltaTime = milliseconds since the previous frame (~16ms at 60fps), so the rotation
// speed is the same on every screen. 0.001 keeps it close to one radian per second.
// let time = Date.now()
//
// const tick = () =>
// {
//     // Time
//     const currentTime = Date.now()
//     const deltaTime = currentTime - time
//     time = currentTime
//
//     // Update objects
//     mesh.rotation.y += 0.001 * deltaTime
//
//     // Render
//     renderer.render(scene, camera)
//
//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }
// tick()

// Step 3: THREE.Clock
// getElapsedTime() returns the seconds since the clock was created, so no manual math.
// cos/sin of the same angle move the cube along a circle; the camera version orbits
// the camera instead and keeps it pointed at the cube with lookAt.
// const clock = new THREE.Clock()
//
// const tick = () =>
// {
//     const elapsedTime = clock.getElapsedTime()
//
//     // Update objects
//     mesh.rotation.y = elapsedTime
//     // mesh.position.x = Math.cos(elapsedTime)
//     // mesh.position.y = Math.sin(elapsedTime)
//
//     // Animate the camera instead of the mesh
//     // camera.position.x = Math.cos(elapsedTime)
//     // camera.position.y = Math.sin(elapsedTime)
//     // camera.lookAt(mesh.position)
//
//     // Render
//     renderer.render(scene, camera)
//
//     // Call tick again on the next frame
//     window.requestAnimationFrame(tick)
// }
// tick()

// Step 4 (active): GSAP tween
// Moves the cube from x = 0 to x = 2 over 1 second, after waiting 1 second.
// GSAP updates mesh.position with its own requestAnimationFrame, but we still
// need tick() to render the scene every frame so the movement is visible.
gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 })

const tick = () =>
{
    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
