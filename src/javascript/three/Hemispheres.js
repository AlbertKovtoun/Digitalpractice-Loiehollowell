import * as THREE from "three"
import {
  angleFolder,
  colorVariationFolder,
  debugObject,
  getRandom,
  lights,
  loaders,
  pane,
  scene,
  sceneFolder,
} from "./Experience"

import hemisphereVertexShader from "../../shaders/hemisphere/vertex.glsl"
import hemisphereFragmentShader from "../../shaders/hemisphere/fragment.glsl"

import beamVertexShader from "../../shaders/beam/vertex.glsl"
import beamFragmentShader from "../../shaders/beam/fragment.glsl"

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
        uRing1Color1: { value: new THREE.Color(debugObject.outerRingColor) },
        uRing1Color2: { value: new THREE.Color("#592c28") },
        uRingScale: { value: 0.28 },
        uRingWidth: { value: 1.3 },
        uRingPosX: { value: 1.18 },
        uTime: { value: 0 },
      },
    })

    this.grainMaterial = new THREE.MeshStandardMaterial({
      color: debugObject.innerRingColor,
      normalMap: loaders.textureLoader.load("/assets/grainNormal.jpg"),
      side: THREE.DoubleSide,
    })

    this.beamMaterial = new THREE.ShaderMaterial({
      vertexShader: beamVertexShader,
      fragmentShader: beamFragmentShader,
      transparent: true,

      uniforms: {
        uBeamColor: { value: new THREE.Color(debugObject.beamColor) },
      },
    })

    loaders.gltfLoader.load("/assets/models/Hemisphere9.gltf", (gltf) => {
      this.hemispheres = gltf.scene

      //Find children
      this.hemisphere1 = this.hemispheres.getObjectByName("Hemisphere1")
      this.hemisphere1Clone = this.hemisphere1.clone()

      this.hemisphere2 = this.hemispheres.getObjectByName("Hemisphere2")
      this.hemisphere2Clone = this.hemisphere2.clone()

      this.ringInner = this.hemispheres.getObjectByName("RingInner")
      this.ringInnerClone = this.ringInner.clone()

      this.ringOuter = this.hemispheres.getObjectByName("RingOuter")
      this.ringOuterClone = this.ringOuter.clone()

      this.beam = this.hemispheres.getObjectByName("Beam")

      //Assign all the materials (will be generative in the future)
      this.hemisphere1.material = this.hemisphereMaterial
      this.hemisphere1Clone.material = this.hemisphereMaterial

      this.hemisphere2.material = this.hemisphereMaterial
      this.hemisphere2Clone.material = this.hemisphereMaterial

      this.ringInner.material = this.grainMaterial
      this.ringInnerClone.material = this.grainMaterial

      this.ringOuter.material = this.backgroundMaterial
      this.ringOuterClone.material = this.backgroundMaterial

      this.beam.material = this.beamMaterial

      //Mirror all meshes
      this.hemisphere1Clone.rotation.y = Math.PI
      this.hemisphere2Clone.rotation.y = Math.PI
      this.ringInnerClone.rotation.y = Math.PI
      this.ringOuterClone.rotation.y = Math.PI

      //Add to the scene
      scene.add(
        this.hemispheres,
        this.hemisphere1Clone,
        this.hemisphere2Clone,
        this.ringInnerClone,
        this.ringOuterClone
      )
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

    sceneFolder
      .addInput(debugObject, "innerRingColor", {
        label: "Inner Ring Color",
      })
      .on("change", (ev) => {
        this.grainMaterial.color = new THREE.Color(ev.value)
      })

    sceneFolder
      .addInput(debugObject, "outerRingColor", {
        label: "Outer Ring Color",
      })
      .on("change", (ev) => {
        this.backgroundMaterial.uniforms.uRing1Color1.value = new THREE.Color(
          ev.value
        )
      })

    colorVariationFolder
      .addInput(debugObject, "colorVariation", {
        label: "Color Variation",
        options: {
          0: 0,
          1: 1,
          2: 2,
        },
      })
      .on("change", (ev) => {
        if (ev.value === 0) {
          lights.pointLight2.color = new THREE.Color("#ff0000")
          this.beamMaterial.uniforms.uBeamColor.value = new THREE.Color(
            "#ff0000"
          )
          this.hemisphereMaterial.uniforms.uBottomColor.value = new THREE.Color(
            "#5f3e69"
          )
          this.hemisphereMaterial.uniforms.uTopColor.value = new THREE.Color(
            "#c89db1"
          )
          this.backgroundMaterial.uniforms.uRing1Color1.value = new THREE.Color(
            "#84413b"
          )
          this.grainMaterial.color = new THREE.Color("#d8c6b7")
        }

        if (ev.value === 1) {
          lights.pointLight2.color = new THREE.Color("#e4aea7")
          this.beamMaterial.uniforms.uBeamColor.value = new THREE.Color(
            "#e4aea7"
          )
          this.hemisphereMaterial.uniforms.uBottomColor.value = new THREE.Color(
            "#4f1524"
          )
          this.hemisphereMaterial.uniforms.uTopColor.value = new THREE.Color(
            "#ab8281"
          )
          this.backgroundMaterial.uniforms.uRing1Color1.value = new THREE.Color(
            "#6d3f41"
          )
          this.grainMaterial.color = new THREE.Color("#3b2527")
        }

        if (ev.value === 2) {
          lights.pointLight2.color = new THREE.Color("#ebd9c1")
          this.beamMaterial.uniforms.uBeamColor.value = new THREE.Color(
            "#ebd9c1"
          )
          this.hemisphereMaterial.uniforms.uBottomColor.value = new THREE.Color(
            "#b37f65"
          )
          this.hemisphereMaterial.uniforms.uTopColor.value = new THREE.Color(
            "#f0dac7"
          )
          this.backgroundMaterial.uniforms.uRing1Color1.value = new THREE.Color(
            "#b39998"
          )
          this.grainMaterial.color = new THREE.Color("#797761")
        }
      })

    // angleFolder
    //   .addInput(debugObject, "angle", {
    //     min: -0.2,
    //     max: 0,
    //     step: 0.01,
    //     label: "Angle",
    //   })
    //   .on("change", (ev) => {
    //     this.hemisphere1.rotation.z = ev.value
    //     this.hemisphere1Clone.rotation.z = ev.value

    //     this.hemisphere2.rotation.z = ev.value
    //     this.hemisphere2Clone.rotation.z = ev.value

    //     this.ringInner.rotation.z = ev.value
    //     this.ringInnerClone.rotation.z = ev.value

    //     this.ringOuter.rotation.z = ev.value
    //     this.ringOuterClone.rotation.z = ev.value
    //   })

    this.setAngleButton = angleFolder.addButton({
      title: "New Random Angle",
      label: "Angle", // optional
    })

    this.setAngleButton.on("click", () => {
      const angle = getRandom(-0.1, 0)

      this.hemisphere1.rotation.z = angle
      this.hemisphere1Clone.rotation.z = angle

      this.hemisphere2.rotation.z = angle
      this.hemisphere2Clone.rotation.z = angle

      this.ringInner.rotation.z = angle
      this.ringInnerClone.rotation.z = angle

      this.ringOuter.rotation.z = angle
      this.ringOuterClone.rotation.z = angle
    })
  }
}
