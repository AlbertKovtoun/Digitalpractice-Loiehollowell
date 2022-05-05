import * as THREE from "three"
import { loaders, pane, scene } from "./Experience"

import hemisphereVertexShader from "../../shaders/hemisphere/vertex.glsl"
import hemisphereFragmentShader from "../../shaders/hemisphere/fragment.glsl"

import backgroundVertexShader from "../../shaders/background/vertex.glsl"
import backgroundFragmentShader from "../../shaders/background/fragment.glsl"

export class Hemispheres {
  constructor() {
    this.setHemiSpheres()
    this.setTweaks()
  }

  setHemiSpheres() {
    this.hemisphereMaterial = new THREE.ShaderMaterial({
      vertexShader: hemisphereVertexShader,
      fragmentShader: hemisphereFragmentShader,

      uniforms: {
        uTopColor: { value: new THREE.Color("#c89db1") },
        uBottomColor: { value: new THREE.Color("#5f3e69") },
      },
    })

    this.backgroundMaterial = new THREE.ShaderMaterial({
      vertexShader: backgroundVertexShader,
      fragmentShader: backgroundFragmentShader,
      side: THREE.DoubleSide,

      uniforms: {
        uRing1Color1: { value: new THREE.Color("#84413b") },
        uRing1Color2: { value: new THREE.Color("#592c28") },
        uRingScale: { value: 0.28 },
        uRingWidth: { value: 1.3 },
        uRingPosX: { value: 1.18 },
        uTime: { value: 0 },
      },
    })

    this.grainMaterial = new THREE.MeshStandardMaterial({
      color: "#d8c6b7",
      normalMap: loaders.textureLoader.load("/assets/grainNormal.jpg"),
      side: THREE.DoubleSide,
    })

    loaders.gltfLoader.load("/assets/models/Hemisphere5.gltf", (gltf) => {
      this.hemispheres = gltf.scene

      //Find children
      this.hemisphere = this.hemispheres.getObjectByName("Hemisphere")
      this.ring1 = this.hemispheres.getObjectByName("Ring1")
      this.ring2 = this.hemispheres.getObjectByName("Ring2")

      this.hemisphere.material = this.hemisphereMaterial
      this.ring1.material = this.grainMaterial
      this.ring2.material = this.backgroundMaterial

      // console.log(this.hemispheres.children)
      scene.add(this.hemispheres)
    })
  }

  setTweaks() {}
}
