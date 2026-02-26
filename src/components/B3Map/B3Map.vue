<script setup>
import { ref, onMounted, watch } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { updateCamera, initControls } from '@/components/B3Map/publicJs/CameraController'

import LightShadowRender from '@/components/B3Map/Render/MainBuild/LightShadowRender'

import MainBuildBeforeRender from '@/components/B3Map/Render/MainBuild/BeforeRender'
import MainBuildRender from '@/components/B3Map/Render/MainBuild/MainRender'

import SunBeforeRender from '@/components/B3Map/Render/Sun/BeforeRender'
import SunMainRender from '@/components/B3Map/Render/Sun/MainRender'

import SkyBeforeRender from '@/components/B3Map/Render/Sky/BeforeRender'
import SkyMainRender from '@/components/B3Map/Render/Sky/MainRender'

import MainBuildGlassBeforeRender from '@/components/B3Map/Render/Glass/BeforeRender'
import MainBuildGlassRender from '@/components/B3Map/Render/Glass/MainRender'

import { updateSunLightMatrix } from '@/components/B3Map/publicJs/Light'
const canvas = ref()
const fps = ref(0)
const freeCamera = ref(true)

// 读取本地存储或使用默认值
const savedFps = localStorage.getItem('fpsLimit')
const currentFpsLimit = ref(savedFps ? Number(savedFps) : 180)

const savedLights = localStorage.getItem('maxLights')
const currentMaxLights = ref(savedLights ? Number(savedLights) : 8)

// 监听变化并保存到本地存储
watch(currentFpsLimit, (newVal) => {
  localStorage.setItem('fpsLimit', newVal)
})

watch(currentMaxLights, (newVal) => {
  localStorage.setItem('maxLights', newVal)
})

//相机位置 往里z正 左x正
const eye = { x: -615, y: 18, z: 18 }
const center = { x: 0, y: 0, z: 0 }
const up = { x: 0, y: 1, z: 0 }
onMounted(async () => {
  const gpu = await navigator.gpu.requestAdapter() //获取gpu
  const device = await gpu.requestDevice() //获取设备

  const context = canvas.value.getContext('webgpu') //获取canvas上下文
  const format = navigator.gpu.getPreferredCanvasFormat() //获取默认格式
  context.configure({ device: device, format: format }) //配置canvas上下文
  await RAPIER.init()
  const world = new RAPIER.World({ x: 0, y: -9.8, z: 0 })
  const playerBody = world.createRigidBody(
    RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(eye.x, eye.y, eye.z) // 初始位置 控制初始相机方向的在相机控制器的yaw参数
      .lockRotations(false),
  )

  let playerCollider = RAPIER.ColliderDesc.capsule(5, 2) // 高度 / 半径
  world.createCollider(playerCollider, playerBody)

  // 主渲染深度纹理
  const MainRenderDepthTexture = device.createTexture({
    size: [canvas.value.width, canvas.value.height],
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  })
  // 主渲染深度纹理视图 共用一个
  const MainRenderDepthView = MainRenderDepthTexture.createView()
  // 渲染准备
  const mainBuildBeforeRender = await MainBuildBeforeRender(device, format, world, RAPIER)
  const sunBeforeRender = await SunBeforeRender(device, format)
  const skyBeforeRender = await SkyBeforeRender(device, format)
  const mainBuildGlassBeforeRender = await MainBuildGlassBeforeRender(device, format, world, RAPIER)

  const totalSteps = 7200
  let lastFpsTime = performance.now()
  let frameCount = 0

  // 帧率限制
  let lastRenderTime = performance.now()

  initControls(canvas, window, eye, center, freeCamera)
  const render = () => {
    requestAnimationFrame(render)

    const now = performance.now()
    const frameInterval = 1000 / currentFpsLimit.value
    const elapsed = now - lastRenderTime

    if (elapsed < frameInterval) return

    lastRenderTime = now - (elapsed % frameInterval)

    updateCamera(eye, center, freeCamera, playerBody, world, RAPIER)

    // --- FPS 计算 ---
    frameCount++
    const delta = now - lastFpsTime
    if (delta >= 1000) {
      // 每 1 秒更新一次 FPS
      fps.value = (frameCount * 1000) / delta
      frameCount = 0
      lastFpsTime = now
    }
    //后面同步显示时间
    const time = (Math.floor(((now / 1000) * totalSteps) / 20) % totalSteps) + 1 // 每秒分 120 份，总共 7200 1分钟完成
    const { lightPos: sunLightPos, lightMatrixHigh, lightMatrixMid, lightMatrixLow, lightIntensity: sunLightIntensity } = updateSunLightMatrix(time, totalSteps, [eye.x, eye.y, eye.z])
    const commandEncoder = device.createCommandEncoder()

    // 天空渲染 先渲染天空盒
    SkyMainRender(commandEncoder, MainRenderDepthView, device, context, skyBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos)

    // 光照和阴影渲染
    LightShadowRender(commandEncoder, MainRenderDepthView, device, context, mainBuildBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos, { high: lightMatrixHigh, mid: lightMatrixMid, low: lightMatrixLow }, sunLightIntensity, currentMaxLights.value)
    // 一楼渲染
    MainBuildRender(commandEncoder, MainRenderDepthView, device, context, mainBuildBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos, { high: lightMatrixHigh, mid: lightMatrixMid, low: lightMatrixLow }, sunLightIntensity)
    // 一楼玻璃渲染
    MainBuildGlassRender(commandEncoder, MainRenderDepthView, device, context, mainBuildGlassBeforeRender, eye, center, up, canvas.value.width, canvas.value.height)

    // 太阳渲染
    SunMainRender(commandEncoder, MainRenderDepthView, device, context, sunBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos, lightMatrixHigh, sunLightIntensity)
    device.queue.submit([commandEncoder.finish()])
  }
  render()
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="2500" height="1200"></canvas>
    <div class="fps">FPS: {{ fps.toFixed(2) }}</div>
    <select class="fps-select" v-model="currentFpsLimit">
      <option :value="30">30 FPS</option>
      <option :value="60">60 FPS</option>
      <option :value="90">90 FPS</option>
      <option :value="120">120 FPS</option>
      <option :value="144">144 FPS</option>
      <option :value="180">180 FPS</option>
      <option :value="999">No Limit</option>
    </select>
    <select class="light-select" v-model="currentMaxLights">
      <option :value="0">0 Lights</option>
      <option :value="4">4 Lights</option>
      <option :value="8">8 Lights</option>
      <option :value="16">16 Lights</option>
      <option :value="32">32 Lights</option>
      <option :value="64">64 Lights</option>
    </select>
    <div class="freeCamera">F2切换视角： {{ freeCamera ? '自由视角' : '跟随角色' }}</div>
    <div class="position">位置： {{ eye.x.toFixed(2) }}, {{ eye.y.toFixed(2) }}, {{ eye.z.toFixed(2) }}</div>
  </div>
</template>

<style scoped lang="less">
canvas {
  display: block;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
}

.fps {
  position: absolute;
  top: 10px;
  left: 10px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.fps-select {
  position: absolute;
  top: 60px;
  left: 10px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.light-select {
  position: absolute;
  top: 60px;
  left: 130px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 6px 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  cursor: pointer;
}

.freeCamera {
  position: absolute;
  top: 10px;
  left: 130px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.position {
  position: absolute;
  top: 10px;
  left: 330px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}

.lookAt {
  position: absolute;
  top: 10px;
  left: 545px;
  color: #000000;
  font-size: 16px;
  background-color: #ffffff;
  padding: 5px 10px;
  border-radius: 5px;
}
</style>
