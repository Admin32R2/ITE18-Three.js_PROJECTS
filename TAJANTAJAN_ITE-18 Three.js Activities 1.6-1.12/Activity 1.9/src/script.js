import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

// Activity 1.9 - Textures
// Textures are images wrapped onto a geometry's surface.
// Files in /static/ are served from the site root, so /static/textures/door/color.jpg
// is loaded as '/textures/door/color.jpg'.
// Each step is kept as a comment; the active result is the pixel-art minecraft
// texture using NearestFilter so it stays crisp instead of blurry.

// Textures

// Step 1: loading with native JavaScript
// WebGL cannot use an <img> directly, so it is wrapped in a THREE.Texture.
// The texture is created outside the load callback so the material can use it
// right away; needsUpdate tells Three.js to upload the image once it arrives.
// const image = new Image()
// const texture = new THREE.Texture(image)
// image.addEventListener('load', () =>
// {
//     texture.needsUpdate = true
// })
// image.src = '/textures/door/color.jpg'

// Step 2 (active): LoadingManager + TextureLoader
// TextureLoader does the Image/Texture/needsUpdate work for us.
// A LoadingManager tracks every texture at once, which is useful for a loading screen.
const loadingManager = new THREE.LoadingManager()
loadingManager.onStart = () =>
{
    console.log('loading started')
}
loadingManager.onLoad = () =>
{
    console.log('loading finished')
}
loadingManager.onProgress = () =>
{
    console.log('loading progressing')
}
loadingManager.onError = () =>
{
    console.log('loading error')
}

const textureLoader = new THREE.TextureLoader(loadingManager)

// The door texture set: color, alpha, height, normal, ambient occlusion,
// metalness and roughness (the PBR maps described in the lesson)
// const colorTexture = textureLoader.load('/textures/door/color.jpg')
const alphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const heightTexture = textureLoader.load('/textures/door/height.jpg')
const normalTexture = textureLoader.load('/textures/door/normal.jpg')
const ambientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const metalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const roughnessTexture = textureLoader.load('/textures/door/roughness.jpg')

// Step 3: transforming the texture (used with the door color texture)
// repeat: tiles the texture; wrapS / wrapT must be RepeatWrapping or the edge pixels stretch
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.wrapS = THREE.RepeatWrapping
// colorTexture.wrapT = THREE.RepeatWrapping
// MirroredRepeatWrapping flips every other tile
// colorTexture.wrapS = THREE.MirroredRepeatWrapping
// colorTexture.wrapT = THREE.MirroredRepeatWrapping
// offset: slides the texture across the UV coordinates
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// rotation: in radians, around the UV point set by center (0.5, 0.5 is the middle)
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5

// Step 4: filtering
// minFilter: used when the texture is larger than the surface on screen.
// A detailed checkerboard makes NearestFilter's moire artifacts easy to see.
// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// colorTexture.minFilter = THREE.NearestFilter
// magFilter: used when the texture is smaller than the surface.
// A tiny 8x8 checkerboard looks blurry with the default LinearFilter.
// const colorTexture = textureLoader.load('/textures/checkerboard-8x8.png')
// colorTexture.magFilter = THREE.NearestFilter

// Step 5 (active): pixel-art texture
// NearestFilter keeps the hard pixel edges. Mipmaps are only needed by the
// smoother min filters, so they are switched off to save GPU memory.
const colorTexture = textureLoader.load('/textures/minecraft.png')
colorTexture.generateMipmaps = false
colorTexture.minFilter = THREE.NearestFilter
colorTexture.magFilter = THREE.NearestFilter

// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
// Other geometries show how UV unwrapping stretches the same texture differently:
// const geometry = new THREE.SphereGeometry(1, 32, 32)
// const geometry = new THREE.ConeGeometry(1, 1, 32)
// const geometry = new THREE.TorusGeometry(1, 0.35, 32, 100)
const geometry = new THREE.BoxGeometry(1, 1, 1)

// The UV coordinates Three.js generated for this geometry (2 values per vertex)
console.log(geometry.attributes.uv)

// map replaces the plain color with the texture
const material = new THREE.MeshBasicMaterial({ map: colorTexture })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

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
camera.position.x = 1
camera.position.y = 1
camera.position.z = 1
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
