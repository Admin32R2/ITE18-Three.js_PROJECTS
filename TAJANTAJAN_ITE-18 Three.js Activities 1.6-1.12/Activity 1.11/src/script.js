import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// FontLoader and TextGeometry are not part of the core THREE object,
// so they are imported from the examples folder like OrbitControls
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import * as dat from 'lil-gui'

// Activity 1.11 - 3D Text
// A big centered 3D "Hello Three.js" surrounded by 100 floating donuts,
// inspired by ilithya's portfolio. Both use one shared matcap material.

// Base
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
const textureLoader = new THREE.TextureLoader()
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')

// Test cube from the starter, removed once the text was working
// const cube = new THREE.Mesh(
//     new THREE.BoxGeometry(1, 1, 1),
//     new THREE.MeshBasicMaterial()
// )
// scene.add(cube)

// Fonts
// TextGeometry needs a font in "typeface" JSON format. helvetiker_regular and its
// LICENSE were copied from node_modules/three/examples/fonts/ into /static/fonts/.
const fontLoader = new FontLoader()

fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) =>
    {
        // Unlike TextureLoader, the font only exists inside this callback,
        // so everything that needs it is created here
        console.log('loaded')

        // Material
        // One matcap material shared by the text and every donut
        // (step 1 used new THREE.MeshBasicMaterial({ wireframe: true }) to see the triangles)
        const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture })

        // Text
        // Values are much smaller than the documentation example to fit this scene.
        // curveSegments and bevelSegments control smoothness: lower = fewer triangles.
        const textGeometry = new TextGeometry(
            'Hello Three.js',
            {
                font: font,
                size: 0.5,
                height: 0.2,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        // Centering by hand
        // The bounding box measures the space the geometry takes. Translating the
        // geometry by minus half its size moves its middle to the mesh origin.
        // The bevel size / thickness are subtracted for an exact center.
        // textGeometry.computeBoundingBox()
        // console.log(textGeometry.boundingBox)
        // textGeometry.translate(
        //     - (textGeometry.boundingBox.max.x - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.y - 0.02) * 0.5, // Subtract bevel size
        //     - (textGeometry.boundingBox.max.z - 0.03) * 0.5  // Subtract bevel thickness
        // )

        // center() does the same bounding box calculation in one call
        textGeometry.center()

        const text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        // Donuts
        // The geometry is created once outside the loop and reused by all 100
        // meshes, which is much cheaper than building 100 identical geometries
        const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45)

        for(let i = 0; i < 100; i++)
        {
            const donut = new THREE.Mesh(donutGeometry, material)

            // Random position inside a 10 x 10 x 10 box around the text
            donut.position.x = (Math.random() - 0.5) * 10
            donut.position.y = (Math.random() - 0.5) * 10
            donut.position.z = (Math.random() - 0.5) * 10

            // Half a turn is enough because a donut is symmetrical
            donut.rotation.x = Math.random() * Math.PI
            donut.rotation.y = Math.random() * Math.PI

            // Same random value on all 3 axes so donuts shrink evenly instead of squashing
            const scale = Math.random()
            donut.scale.set(scale, scale, scale)

            scene.add(donut)
        }
    }
)

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
camera.position.z = 2
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
