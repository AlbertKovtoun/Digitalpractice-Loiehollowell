import * as THREE from "three"
import { scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(this.ambientLight)

    this.pointLight1 = new THREE.PointLight(0xffffff, 0.5)
    this.pointLight1.position.set(0, -1, 5)
    scene.add(this.pointLight1)

    this.pointLight2 = new THREE.PointLight(0xff0000, 5)
    this.pointLight2.position.set(0, -1.5, -0.5)
    scene.add(this.pointLight2)
  }
}
