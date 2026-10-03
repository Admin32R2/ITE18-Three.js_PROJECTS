import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
// Debug panel (installed with: npm install --save lil-gui)
import * as dat from 'lil-gui'

// Activity 1.10 - Materials
// A material decides the color of every visible pixel of a geometry.
// One material is shared by a sphere, a plane and a torus so each material
// type can be compared on 3 shapes at once.
// Each material from the lesson is kept as a commented step; the active result
// is a metallic MeshStandardMaterial reflecting an environment map.

// Debug
const gui = new dat.GUI()

// Base
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Textures
// Loaded before the material is created so they are ready to assign
const textureLoader = new THREE.TextureLoader()

const doorColorTexture = textureLoader.load('/textures/door/color.jpg')
const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg')
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg')
const matcapTexture = textureLoader.load('/textures/matcaps/1.png')
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg')

// Environment map
// Three.js uses cube maps: 6 images, one per side (positive/negative x, y, z).
// It needs CubeTextureLoader instead of TextureLoader, with an array of paths.
const cubeTextureLoader = new THREE.CubeTextureLoader()
const environmentMapTexture = cubeTextureLoader.load([
    '/textures/environmentMaps/0/px.jpg',
    '/textures/environmentMaps/0/nx.jpg',
    '/textures/environmentMaps/0/py.jpg',
    '/textures/environmentMaps/0/ny.jpg',
    '/textures/environmentMaps/0/pz.jpg',
    '/textures/environmentMaps/0/nz.jpg'
])

// Objects

// MeshBasicMaterial: flat color or texture, no lighting
// const material = new THREE.MeshBasicMaterial()
// material.map = doorColorTexture
// Color tints the texture; it must be a THREE.Color when set directly
// material.color = new THREE.Color('#ff0000')
// material.wireframe = true
// opacity only works once transparent is true
// material.transparent = true
// material.opacity = 0.5
// alphaMap: white areas visible, black areas invisible
// material.alphaMap = doorAlphaTexture
// DoubleSide renders both faces (twice the triangles, so use only when needed)
// material.side = THREE.DoubleSide

// MeshNormalMaterial: colors each face by the direction it points (its normal)
// const material = new THREE.MeshNormalMaterial()
// flatShading stops normals blending between vertices, giving a faceted look
// material.flatShading = true

// MeshMatcapMaterial: fakes lighting by sampling a picture of a lit sphere.
// Very fast, but the "light" never changes because there are no real lights.
// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// MeshDepthMaterial: white near the camera's near plane, black near far
// const material = new THREE.MeshDepthMaterial()

// MeshLambertMaterial: cheapest material that reacts to lights
// const material = new THREE.MeshLambertMaterial()

// MeshPhongMaterial: like Lambert but with a visible light reflection
// const material = new THREE.MeshPhongMaterial()
// material.shininess = 100
// material.specular = new THREE.Color(0x1188ff)

// MeshToonMaterial: cartoon-style shading.
// The gradient texture is tiny, so NearestFilter keeps its hard color bands
// instead of blending them; mipmaps are not needed with NearestFilter.
// const material = new THREE.MeshToonMaterial()
// gradientTexture.minFilter = THREE.NearestFilter
// gradientTexture.magFilter = THREE.NearestFilter
// gradientTexture.generateMipmaps = false
// material.gradientMap = gradientTexture

// MeshStandardMaterial with the full door texture set (PBR)
// const material = new THREE.MeshStandardMaterial()
// material.metalness = 0
// material.roughness = 1
// material.map = doorColorTexture
// aoMap darkens crevices; it needs the uv2 attribute created below
// material.aoMap = doorAmbientOcclusionTexture
// material.aoMapIntensity = 1
// displacementMap really moves vertices, which is why the geometries are subdivided
// material.displacementMap = doorHeightTexture
// material.displacementScale = 0.05
// metalness/roughness maps vary those values per pixel
// material.metalnessMap = doorMetalnessTexture
// material.roughnessMap = doorRoughnessTexture
// normalMap fakes small surface details without extra vertices
// material.normalMap = doorNormalTexture
// material.normalScale.set(0.5, 0.5)
// material.transparent = true
// material.alphaMap = doorAlphaTexture

// Active: MeshStandardMaterial reflecting the environment map.
// High metalness + low roughness makes a mirror-like surface.
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = environmentMapTexture

// Sliders to try different metalness / roughness values live
gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)

// The same material on 3 shapes; extra segments give displacementMap enough vertices
const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = - 1.5

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1, 1, 100, 100),
    material
)

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 64, 128),
    material
)
torus.position.x = 1.5

scene.add(sphere, plane, torus)

// uv2 for the aoMap
// The ambient occlusion map reads a second set of UV coordinates named uv2,
// so the existing uv attribute is simply duplicated
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

// Lights
// Lambert, Phong, Toon and Standard materials are black without lights.
// AmbientLight lights everything evenly; PointLight shines from one position.
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 0.5)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)

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

    // Update objects
    // Slow spin on two axes so every material is seen from different angles
    sphere.rotation.y = 0.1 * elapsedTime
    plane.rotation.y = 0.1 * elapsedTime
    torus.rotation.y = 0.1 * elapsedTime

    sphere.rotation.x = 0.15 * elapsedTime
    plane.rotation.x = 0.15 * elapsedTime
    torus.rotation.x = 0.15 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
