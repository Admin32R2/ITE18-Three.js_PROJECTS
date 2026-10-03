// Activity 1.1 - Basic Scene
// No bundler and no modules: three.min.js is loaded with a <script> tag in index.html
// before this file, which exposes the global THREE variable used below.

// Sanity checks: confirms this script runs and that the Three.js library loaded
console.log('Hello Three.js')
console.log(THREE)

// Canvas
// Grab the <canvas class="webgl"> from the HTML so the renderer can draw into it
const canvas = document.querySelector('canvas.webgl')

// Scene
// The container that holds every object, light and camera we want to render
const scene = new THREE.Scene()

// Object
// A Mesh combines a geometry (the shape) and a material (how it looks)
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// Sizes
// Temporary fixed render size, reused for the camera aspect ratio and the renderer
const sizes = {
    width: 800,
    height: 600
}

// Camera
// 75 degree vertical field of view, aspect ratio = width / height
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// Move the camera backward on z; otherwise it would sit inside the cube and see nothing
camera.position.z = 3
scene.add(camera)

// Renderer
// Draws the scene from the camera's point of view into our canvas
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// First render
renderer.render(scene, camera)
