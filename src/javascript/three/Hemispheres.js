import * as THREE from "three"
import { debugObject, loaders, pane, scene, sceneFolder } from "./Experience"

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
      side: THREE.DoubleSide,

      uniforms: {
        uTopColor: { value: new THREE.Color(debugObject.hemisphereTopColor) },
        uBottomColor: {
          value: new THREE.Color(debugObject.hemisphereBottomColor),
        },
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

    loaders.gltfLoader.load("/assets/models/Hemisphere7.gltf", (gltf) => {
      this.hemispheres = gltf.scene

      //Find children
      this.hemisphere1 = this.hemispheres.getObjectByName("Hemisphere1")
      this.hemisphere2 = this.hemispheres.getObjectByName("Hemisphere2")
      this.ring1 = this.hemispheres.getObjectByName("Ring1")
      this.ring2 = this.hemispheres.getObjectByName("Ring2")
      this.ring3 = this.hemispheres.getObjectByName("Ring3")
      this.ring4 = this.hemispheres.getObjectByName("Ring4")

      this.hemisphere1.material = this.hemisphereMaterial
      this.hemisphere2.material = this.hemisphereMaterial
      this.ring1.material = this.grainMaterial
      this.ring2.material = this.backgroundMaterial
      this.ring3.material = this.grainMaterial
      this.ring4.material = this.backgroundMaterial

      // console.log(this.hemispheres.children)
      scene.add(this.hemispheres)
    })
  }

  setTweaks() {
    sceneFolder
      .addInput(debugObject, "hemisphereTopColor", {
        label: "Top Color of Spheres",
      })
      .on("change", (ev) => {
        this.hemisphereMaterial.uniforms.uTopColor.value = new THREE.Color(
          ev.value
        )
      })

    sceneFolder
      .addInput(debugObject, "hemisphereBottomColor", {
        label: "Bottom Color of Spheres",
      })
      .on("change", (ev) => {
        this.hemisphereMaterial.uniforms.uBottomColor.value = new THREE.Color(
          ev.value
        )
      })
  }
}
