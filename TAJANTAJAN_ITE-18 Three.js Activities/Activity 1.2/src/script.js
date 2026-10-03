// Activity 1.2 - Local Server
// Same red cube as Activity 1.1, now served by Vite (npm run dev).
// Instead of a global THREE from a <script> tag, Three.js is installed with npm
// and imported as an ES module from node_modules.
import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// Red 1x1x1 cube: BoxGeometry for the shape, MeshBasicMaterial for a flat color
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
// Pulled back on z so the cube is in front of the camera instead of around it
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
