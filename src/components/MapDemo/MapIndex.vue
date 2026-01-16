<!-- MapIndex.vue -->
<script setup>
import { Ground } from './Ground/Ground'
import { Pillar } from './Ground/Pillar'
import { onMounted, ref } from 'vue'
import CubeVertex from './Ground/CubeVertex.wgsl?raw'
import CubeFragment from './Ground/CubeFragment.wgsl?raw'
import ShadowVertex from './Ground/ShadowVertex.wgsl?raw'
import { getTexture, createDepthTexture, createSampler, createTextureBindGroupLayout, createTextureBindGroup } from './Textures'
import {
  createCubeEndToPipeline,
  createRenderPassEncoder,
  drawGemetry,
  createShadowEndToPipeline,
  createShadowRenderPassEncoder,
  drawShadow,
} from './PublicModule'
import { updateCamera, initControls } from './CameraController'
import { createSunLightMatrix } from './LightsModule'
const canvas = ref()
onMounted(async () => {
  const gpu = await navigator.gpu.requestAdapter() //获取gpu
  const device = await gpu.requestDevice() //获取设备
  const context = canvas.value.getContext('webgpu') //获取canvas上下文
  const format = navigator.gpu.getPreferredCanvasFormat() //获取默认格式
  context.configure({ device: device, format: format }) //配置canvas上下文
  const textures = await getTexture(device) // 获取纹理
  const depthTexture = createDepthTexture(device, [canvas.value.width, canvas.value.height]) // 创建深度纹理
  const sampler = createSampler(device) // 创建采样器
  const textureBindGroupLayout = createTextureBindGroupLayout(device) //创建纹理绑定组布局
  const groundTextureBindGroup = createTextureBindGroup(device, textureBindGroupLayout, sampler, textures['wood']) //创建地板纹理绑定组
  const pillarTextureBindGroup = createTextureBindGroup(device, textureBindGroupLayout, sampler, textures['brick']) //创建立柱纹理绑定组
  const lightDir = [0.1, -1, 0.1] // 太阳光方向
  const { lightMatrix } = createSunLightMatrix(lightDir)
  const {
    shadowDepthTexture,
    SunlightMatrixBindGroup,
    shadowPipeline,
    SunlightMatrixBuffer,
    modelUniformBuffer,
    modelBindGroup,
    shadowBindGroup,
    shadowBindGroupLayout,
  } = createShadowEndToPipeline(device, ShadowVertex, Ground.positionArray.length) //创建阴影管线
  const {
    geometry: ground,
    MatUniformBuffer: groundMatUniformBuffer,
    BindGroup: groundBindGroup,
    SunLightBindGroup: sunLightBindGroup,
    SunLightBuffer: sunLightBuffer,
    Pipeline: groundPipeline,
  } = createCubeEndToPipeline(device, Ground, CubeVertex, CubeFragment, format, textureBindGroupLayout, shadowBindGroupLayout, 8) //创建地板管线
  const {
    geometry: pillar,
    MatUniformBuffer: pillarMatUniformBuffer,
    BindGroup: pillarBindGroup,
    Pipeline: pillarPipeline,
  } = createCubeEndToPipeline(device, Pillar, CubeVertex, CubeFragment, format, textureBindGroupLayout, shadowBindGroupLayout, 8) //创建柱子管线

  const eye = { x: 0, y: 20, z: -80 }
  const center = { x: 0, y: 0, z: 0 }
  const up = { x: 0, y: 1, z: 0 }
  initControls(canvas, window)
  // const depthBuffer = device.createBuffer({
  //   size: 2048 * 2048 * 4, // depth32float 每个像素 4 字节
  //   usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  // })
  // const staging = device.createBuffer({
  //   size: 64,
  //   usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  // })
  // const staging2 = device.createBuffer({
  //   size: 64,
  //   usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
  // })
  const render = async () => {
    updateCamera(eye, center)
    // 创建命令编码器
    const commandEncoder = device.createCommandEncoder()

    //绘制阴影
    const shadowRenderPassEncoder = createShadowRenderPassEncoder(commandEncoder, shadowDepthTexture)
    drawShadow(
      device,
      shadowRenderPassEncoder,
      shadowPipeline,
      Ground,
      ground,
      [modelUniformBuffer, SunlightMatrixBuffer], //modelUniformBuffer,SunShadowBuffer
      canvas,
      eye,
      center,
      up,
      SunlightMatrixBindGroup,
      modelBindGroup, //阴影绑定组、模型矩阵绑定组
      lightMatrix,
    )
    shadowRenderPassEncoder.end()
    // commandEncoder.copyTextureToBuffer({ texture: shadowDepthTexture }, { buffer: depthBuffer, bytesPerRow: 2048 * 4 }, [2048, 2048, 1])
    // commandEncoder.copyBufferToBuffer(SunlightMatrixBuffer, 0, staging, 0, 64) // copy lightBuffer -> staging
    // commandEncoder.copyBufferToBuffer(modelUniformBuffer, 0, staging2, 0, 64) // copy lightBuffer -> staging
    const renderPassEncoder = createRenderPassEncoder(commandEncoder, context, depthTexture)
    //绘制地板
    drawGemetry(
      device,
      renderPassEncoder,
      groundPipeline,
      Ground,
      ground,
      [groundMatUniformBuffer, sunLightBuffer],
      canvas,
      eye,
      center,
      up,
      groundBindGroup,
      groundTextureBindGroup,
      sunLightBindGroup,
      shadowBindGroup,
      lightMatrix,
    )
    // //绘制柱子
    drawGemetry(
      device,
      renderPassEncoder,
      pillarPipeline,
      Pillar,
      pillar,
      [pillarMatUniformBuffer, sunLightBuffer],
      canvas,
      eye,
      center,
      up,
      pillarBindGroup,
      pillarTextureBindGroup,
      sunLightBindGroup,
      shadowBindGroup,
      lightMatrix,
    )
    renderPassEncoder.end()

    device.queue.submit([commandEncoder.finish()])

    // // 这里可以遍历 depthArray，查看是否全 1 或有变化
    // await depthBuffer.mapAsync(GPUMapMode.READ)
    // const arrayBuffer = depthBuffer.getMappedRange()
    // const depthArray = new Float32Array(arrayBuffer)

    // // 检查一些像素值
    // console.log(depthArray)
    // await staging.mapAsync(GPUMapMode.READ)
    // const data = new Float32Array(staging.getMappedRange().slice(0))
    // console.log('light buffer on GPU:', data)
    // await staging2.mapAsync(GPUMapMode.READ)
    // const data2 = new Float32Array(staging2.getMappedRange().slice(0))
    // console.log('model buffer on GPU:', data2)
    // depthBuffer.unmap()
    requestAnimationFrame(render)
  }
  render()
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="2500" height="1200"></canvas>
  </div>
</template>

<style scoped lang="less">
canvas {
  display: block;
  margin: 0 auto;
}
</style>
