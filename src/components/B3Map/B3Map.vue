<script setup>
import { ref, onMounted } from 'vue'
import RAPIER from '@dimforge/rapier3d-compat'
import { updateCamera, initControls } from '@/components/B3Map/publicJs/CameraController'

import FirstFloorBeforeRender from '@/components/B3Map/Render/MainBuild/BeforeRender'
import FirstFloorMainRender from '@/components/B3Map/Render/MainBuild/MainRender'

import SunBeforeRender from '@/components/B3Map/Render/Sun/BeforeRender'
import SunMainRender from '@/components/B3Map/Render/Sun/MainRender'

import SkyBeforeRender from '@/components/B3Map/Render/Sky/BeforeRender'
import SkyMainRender from '@/components/B3Map/Render/Sky/MainRender'

import FirstFloorGlassBeforeRender from '@/components/B3Map/Render/Glass/BeforeRender'
import FirstFloorGlassMainRender from '@/components/B3Map/Render/Glass/MainRender'

import { updateSunLightMatrix } from '@/components/B3Map/publicJs/Light'
const canvas = ref()
const fps = ref(0)
const freeCamera = ref(true)
//相机位置 往里z正 左x正
const eye = { x: -760, y: 18, z: -160 }
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
  const firstFloorBeforeRender = await FirstFloorBeforeRender(device, format, world, RAPIER)
  const sunBeforeRender = await SunBeforeRender(device, format)
  const skyBeforeRender = await SkyBeforeRender(device, format)
  const firstFloorGlassBeforeRender = await FirstFloorGlassBeforeRender(device, format, world, RAPIER)

  const totalSteps = 7200
  let lastTime = performance.now()
  let frameCount = 0
  initControls(canvas, window, eye, center, freeCamera)
  const render = () => {
    updateCamera(eye, center, freeCamera, playerBody, world, RAPIER)
    const now = performance.now()
    // --- FPS 计算 ---
    frameCount++
    const delta = now - lastTime
    if (delta >= 1000) {
      // 每 1 秒更新一次 FPS
      fps.value = (frameCount * 1000) / delta
      frameCount = 0
      lastTime = now
    }
    //后面同步显示时间
    const time = (Math.floor(((now / 1000) * totalSteps) / 60) % totalSteps) + 1 // 每秒分 120 份，总共 7200 1分钟完成
    const { lightPos: sunLightPos, lightMatrix: sunLightMatrix, lightIntensity: sunLightIntensity } = updateSunLightMatrix(time, totalSteps)
    const commandEncoder = device.createCommandEncoder()
    // 天空渲染 先渲染天空盒
    SkyMainRender(commandEncoder, MainRenderDepthView, device, context, skyBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos)
    // 一楼渲染
    FirstFloorMainRender(commandEncoder, MainRenderDepthView, device, context, firstFloorBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos, sunLightMatrix, sunLightIntensity)
    // 一楼玻璃渲染
    FirstFloorGlassMainRender(commandEncoder, MainRenderDepthView, device, context, firstFloorGlassBeforeRender, eye, center, up, canvas.value.width, canvas.value.height)

    // 太阳渲染
    SunMainRender(commandEncoder, MainRenderDepthView, device, context, sunBeforeRender, eye, center, up, canvas.value.width, canvas.value.height, sunLightPos, sunLightMatrix, sunLightIntensity)
    device.queue.submit([commandEncoder.finish()])
    requestAnimationFrame(render)
  }
  render()
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="2500" height="1200"></canvas>
    <div class="fps">FPS: {{ fps.toFixed(2) }}</div>
    <div class="freeCamera">F2切换视角： {{ freeCamera ? '自由视角' : '跟随角色' }}</div>
    <div class="position">位置： {{ eye.x.toFixed(2) }}, {{ eye.y.toFixed(2) }}, {{ eye.z.toFixed(2) }}</div>
    <!-- <div class="lookAt">观察点： {{ center.x.toFixed(2) }}, {{ center.y.toFixed(2) }}, {{ center.z.toFixed(2) }}</div> -->
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
