import * as THREE from 'three'

// Activity 1.3 - Transform Objects
// Every Object3D (Mesh, Camera, Group...) has position, scale, rotation and quaternion.
// The single-cube experiments are kept below as comments to show each step;
// the final result is the Group of three cubes.

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes Helper
// Draws the x (red), y (green) and z (blue) axes from the scene center, 2 units long.
// The blue z axis is invisible at first because it points straight at the camera.
const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

// Objects (step 1: single cube, replaced by the group below)
// const geometry = new THREE.BoxGeometry(1, 1, 1)
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// Position
// position is a Vector3: x goes right, y goes up, z goes toward the camera
// mesh.position.x = 0.7
// mesh.position.y = - 0.6
// mesh.position.z = 1
// Same thing in one call with set(x, y, z)
// mesh.position.set(0.7, - 0.6, 1)

// Scale
// Also a Vector3; 1 = original size, 2 = double, 0.5 = half (avoid negative values)
// mesh.scale.x = 2
// mesh.scale.y = 0.25
// mesh.scale.z = 0.5

// Rotation
// rotation is an Euler expressed in radians; Math.PI is half a turn,
// so Math.PI * 0.25 is an eighth of a full turn.
// Rotations apply in x, y, z order; reorder('YXZ') changes it to avoid gimbal lock issues.
// mesh.rotation.reorder('YXZ')
// mesh.rotation.x = Math.PI * 0.25
// mesh.rotation.y = Math.PI * 0.25

// Group (final step)
// A Group is a container: transforming it transforms every child inside it.
// Here the whole row of cubes is stretched on y and turned slightly on y at once.
const group = new THREE.Group()
group.scale.y = 2
group.rotation.y = 0.2
scene.add(group)

// Each cube gets its own position inside the group, spaced 1.5 units apart on x
const cube1 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube1.position.x = - 1.5
group.add(cube1)

const cube2 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube2.position.x = 0
group.add(cube2)

const cube3 = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: 0xff0000 })
)
cube3.position.x = 1.5
group.add(cube3)

// Sizes
const sizes = {
    width: 800,
    height: 600
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
scene.add(camera)

// Vector3 helpers (used with the single cube, must run after the camera exists)
// Length of the vector from the scene center to the mesh
// console.log(mesh.position.length())
// Distance between the mesh and the camera
// console.log(mesh.position.distanceTo(camera.position))
// Shrinks the vector to a length of 1 while keeping its direction
// console.log(mesh.position.normalize())

// lookAt
// Rotates the camera so its -z axis points at the given Vector3 target
// camera.lookAt(new THREE.Vector3(0, - 1, 0))
// camera.lookAt(mesh.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Render after every transform so the final state is what appears on screen
renderer.render(scene, camera)
