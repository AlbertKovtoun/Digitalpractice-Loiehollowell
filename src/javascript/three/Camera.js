import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"
import { canvas, scene, sizes } from "./Experience"

export class Camera {
  constructor() {
    this.camera
    this.controls

    this.setCamera()
    this.setCameraControls()
  }

  setCamera() {
    this.camera = new THREE.PerspectiveCamera(
      10,
      sizes.width / sizes.height,
      0.1,
      1000
    )
    this.camera.position.set(0, 0, 40)
    scene.add(this.camera)
  }

  setCameraControls() {
    this.controls = new OrbitControls(this.camera, canvas)
    this.controls.enableDamping = true
    this.controls.enableRotate = false

    this.controls.mouseButtons = {
      LEFT: THREE.MOUSE.PAN,
    }
  }
}
