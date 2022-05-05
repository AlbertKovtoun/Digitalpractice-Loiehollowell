import * as THREE from "three"
import { debugObject, pane, scene } from "./Experience"

export class Lights {
  constructor() {
    this.setLights()
    this.setTweaks()
  }

  setLights() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 0.4)
    scene.add(this.ambientLight)

    this.pointLight1 = new THREE.PointLight(0xffffff, 0.5)
    this.pointLight1.position.set(0, -1, 5)
    scene.add(this.pointLight1)

    this.pointLight2 = new THREE.PointLight(debugObject.lightColor, 5)
    this.pointLight2.position.set(0, -3, -0.5)
    scene.add(this.pointLight2)
  }

  setTweaks() {
    pane
      .addInput(debugObject, "lightColor", {
        label: "Color of Light",
      })
      .on("change", (ev) => {
        this.pointLight2.color = new THREE.Color(ev.value)
      })

    pane.addInput(this.pointLight2, "intensity", {
      label: "Light Intensity",
      min: 0,
      max: 20,
    })
  }
}
