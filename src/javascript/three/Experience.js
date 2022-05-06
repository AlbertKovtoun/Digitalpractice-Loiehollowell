import * as THREE from "three"
import Stats from "stats.js"

import { Camera } from "./Camera"
import { Renderer } from "./Renderer"
import { Sizes } from "./Sizes"
import { Loaders } from "./Loaders"
import { Ball, Hemispheres } from "./Hemispheres"
import { Pane } from "tweakpane"
import { Lights } from "./Lights"

export function getRandom(min, max) {
  return Math.random() * (max - min) + min
}

const stats = new Stats()
stats.showPanel(0) // 0: fps, 1: ms, 2: mb, 3+: custom
document.body.appendChild(stats.dom)

export const debugObject = {
  lightColor: "#ff0000",
  beamColor: "#ff0000",
  hemisphereTopColor: "#c89db1",
  hemisphereBottomColor: "#5f3e69",
  innerRingColor: "#d8c6b7",
  outerRingColor: "#84413b",

  colorVariation: 0,

  angle: 0,
}

export const pane = new Pane()

export const sceneFolder = pane.addFolder({
  title: "Scene",
})

export const lightsFolder = pane.addFolder({
  title: "Lights",
})

export const colorVariationFolder = pane.addFolder({
  title: "Color Variations",
})

export const angleFolder = pane.addFolder({
  title: "Angle",
})

export const canvas = document.querySelector("canvas.webgl")

export const scene = new THREE.Scene()

export const loaders = new Loaders()

export const sizes = new Sizes()

export const hemispheres = new Hemispheres()

export const lights = new Lights()

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

  // setTimeout(() => {
  window.requestAnimationFrame(tick)
  // }, 1000 / 60)

  stats.end()
}

tick()
