import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"
import { Ball, Hemispheres } from "./Hemispheres"
import { Pane } from "tweakpane"
import { Lights } from "./Lights"

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const debugObject = {
  lightColor: "#ff0000",
  hemisphereTopColor: "#c89db1",
  hemisphereBottomColor: "#5f3e69",
  // innerRingColor: 
}

export const pane = new Pane()

export const sceneFolder = pane.addFolder({
  title: "Scene",
})

export const lightsFolder = pane.addFolder({
  title: "Lights",
})

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

export const sizes = new Sizes()

export const lights = new Lights()

export const hemispheres = new Hemispheres()

export const camera = new Camera()

export const renderer = new Renderer()

//Animate
const clock = new THREE.Clock()
let time = Date.now()

const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  const currentTime = Date.now()
  const deltaTime = currentTime - time
  time = currentTime

  hemispheres.backgroundMaterial.uniforms.uTime.value = elapsedTime

  // Update controls
  camera.controls.update()

  // Render
  renderer.renderer.render(scene, camera.camera)

  setTimeout(() => {
    window.requestAnimationFrame(tick)
  }, 1000 / 60)

  stats.end()
}

tick()
