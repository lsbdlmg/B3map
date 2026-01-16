//PublicModule.js
import { mat4 } from 'gl-matrix'
import { updateSunLightUniforms, updateSunShadowUniforms } from './LightsModule'
// import { createDepthTexture } from './Textures'
// =============创建矩阵区============
const getMvpMatrix = (aspect, position, rotation, scale, eye, center, up) => {

  // 初始化矩阵 角度为45度的视角 沿着y轴旋转的透视矩阵
  const model = mat4.create()
  const view = mat4.create()
  const proj = mat4.create()
  const mvp = mat4.create()

  // 构建proj透视投影矩阵
  mat4.perspective(proj, Math.PI / 4, aspect, 0.1, 500)

  // 构建View矩阵（相机） 目前相机视角在0 0 20 看向0 0 0 屏幕里看向屏幕外
  mat4.lookAt(view, [eye.x, eye.y, eye.z], [center.x, center.y, center.z], [up.x, up.y, up.z])

  // 构建Model矩阵
  mat4.identity(model)
  mat4.translate(model, model, [position.x, position.y, position.z])
  mat4.rotateX(model, model, rotation.x)
  mat4.rotateY(model, model, rotation.y)
  mat4.rotateZ(model, model, rotation.z)
  mat4.scale(model, model, [scale.x, scale.y, scale.z])

  // 组合MVP
  const temp = mat4.create()
  mat4.multiply(temp, view, model)
  mat4.multiply(mvp, proj, temp)
  return {
    model,
    mvp,
    view,
    proj
  }
}
//更新MVP矩阵uniform缓冲区
const updateMatUniforms = (
  device,
  uniformBuffer,
  mvp,
  model,
  view,
  proj,
  offset = 0,
) => {
  device.queue.writeBuffer(uniformBuffer, 0 + offset, mvp.buffer)
  device.queue.writeBuffer(uniformBuffer, 64 + offset, model.buffer)
  device.queue.writeBuffer(uniformBuffer, 128 + offset, view.buffer)
  device.queue.writeBuffer(uniformBuffer, 192 + offset, proj.buffer)
}
//更新模型矩阵uniform缓冲区
const updateModelUniforms = (device, uniformBuffer, model, offset = 0) => {
  device.queue.writeBuffer(uniformBuffer,offset, model.buffer)
}
//模块导出 export module.exports = { getMvpMatrix, updateMatUniforms }
// =============创建管线区============
// 创建几何体并写入缓冲区的函数
const createGeometry = (device, vertices, indices) => {
  const vertexBuffer = device.createBuffer({
    size: vertices.byteLength,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(vertexBuffer, 0, vertices)

  const indexBuffer = device.createBuffer({
    size: indices.byteLength,
    usage: GPUBufferUsage.INDEX | GPUBufferUsage.COPY_DST,
  })
  device.queue.writeBuffer(indexBuffer, 0, indices)

  return {
    vertexBuffer,
    indexBuffer,
    indexCount: indices.length,
  }
}
// 创建矩阵uniform缓冲区
const createUniformBuffer = (device, i) => {
  const UniformBuffer = device.createBuffer({
    size: 256 * i,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST | GPUBufferUsage.COPY_SRC,
  })
  return UniformBuffer
}
//创建自定义绑定组布局
const createBindGroupLayout = (device, isOffset = false) => {
  const BindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform', hasDynamicOffset: isOffset },
      },
    ],
  })
  return BindGroupLayout
}
//创建uniform绑定组 传入绑定组布局 矩阵uniform缓冲区
const createBindGroup = (device, layout, buffers) => {
  const BindGroup = device.createBindGroup({
    layout: layout,
    entries: [
      { binding: 0, resource: { buffer: buffers[0], offset: 0, size: 256 } },//矩阵
    ],
  })
  return BindGroup
}
//创建管线布局
const createPipelineLayout = (device, bindGroupLayouts) => {
  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: bindGroupLayouts,
  })
  return pipelineLayout
}
//创建物体管线
const createCubePipeline = (device, pipelineLayout, vertex, fragment, format) => {
  const Pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    vertex: {
      module: device.createShaderModule({ code: vertex }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: 8 * 4,
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x3' },
            { shaderLocation: 1, offset: 3 * 4, format: 'float32x3' },
            { shaderLocation: 2, offset: 6 * 4, format: 'float32x2' },
          ],
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({ code: fragment }),
      entryPoint: 'main',
      targets: [{ format }],
    },
    primitive: { topology: 'triangle-list', cullMode: 'back' },
    // 深度测试
    depthStencil: {
      format: 'depth32float',
      depthWriteEnabled: true,
      depthCompare: 'less', // 深度测试函数：靠近的像素覆盖远的
    },
  })
  return Pipeline
}
//创建所有直到物体管线
const createCubeEndToPipeline = (device, Geometry, Vertex, Fragment, format, textureBindGroupLayout, shadowBindGroupLayout, uniformBufferSize) => {
  const geometry = createGeometry(device, Geometry.vertices, Geometry.indices) //创建物体缓冲区
  // 创建矩阵uniform缓冲区
  const MatUniformBuffer = createUniformBuffer(device, uniformBufferSize) //创建物体矩阵uniform缓冲区 8个立柱
  const BindGroupLayout = createBindGroupLayout(device, true) //创建物体自定义绑定组布局 true 表示使用动态偏移
  const BindGroup = createBindGroup(device, BindGroupLayout, [MatUniformBuffer]) //创建立柱uniform绑定组
  // 创建太阳光uniform缓冲区
  const SunLightBuffer = createUniformBuffer(device, 1) //创建太阳光uniform缓冲区
  const SunLightBindGroupLayout = createBindGroupLayout(device, false) //创建太阳光自定义绑定组布局 false 表示不使用动态偏移
  const SunLightBindGroup = createBindGroup(device, SunLightBindGroupLayout, [SunLightBuffer]) //创建太阳光uniform绑定组

  // 创建管线布局 [绑定组布局,纹理绑定组布局,太阳光绑定组布局
  const PipelineLayout = createPipelineLayout(device, [BindGroupLayout, textureBindGroupLayout, SunLightBindGroupLayout, shadowBindGroupLayout]) //创建立柱管线布局 后续添加纹理
  const Pipeline = createCubePipeline(device, PipelineLayout, Vertex, Fragment, format) //创建立柱管线
  return {
    geometry,
    MatUniformBuffer,//矩阵uniform缓冲区
    BindGroup,//绑定组 矩阵
    SunLightBindGroup,//太阳光绑定组
    SunLightBuffer,//太阳光uniform缓冲区
    Pipeline,
  }
}
//创建物体渲染pass编码器
const createRenderPassEncoder = (commandEncoder, context, depthTexture) => {
  const renderPassEncoder = commandEncoder.beginRenderPass({
    // 渲染目标
    colorAttachments: [
      {
        view: context.getCurrentTexture().createView(),
        storeOp: 'store',
        loadOp: 'clear',
        clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
      },
    ],
    //   深度纹理
    depthStencilAttachment: {
      view: depthTexture.createView(),
      depthLoadOp: 'clear',
      depthClearValue: 1.0, // 远处是1.0
      depthStoreOp: 'store',
    },
  })
  return renderPassEncoder
}
//绘制几何体
const drawGemetry = (
  device, renderPassEncoder, pipeline,//设备、渲染pass编码器、管线
  Geometry, geometry,//几何体、几何体顶点和顶点索引缓冲区
  UniformBuffers,//绑定组、uniform缓冲区【矩阵、光源】
  canvas, eye, center, up,//画布、相机视角、相机中心、相机上方
  bindGroup, TextureBindGroup, SunLightBindGroup, shadowBindGroup,//矩阵绑定组、纹理绑定组、太阳光绑定组
  lightMatrix//光源矩阵
) => {
  renderPassEncoder.setPipeline(pipeline) // 设置管线
  updateSunLightUniforms(device, UniformBuffers[1], undefined, undefined, undefined, lightMatrix)//写入太阳光UniformBuffer
  renderPassEncoder.setBindGroup(1, TextureBindGroup) // 纹理
  renderPassEncoder.setBindGroup(2, SunLightBindGroup)//太阳光
  renderPassEncoder.setBindGroup(3, shadowBindGroup)//阴影Map
  for (let i = 0; i < 2; i++) {
    //地板的矩阵
    const {
      mvp: mvp,
      model: model,
      view: view,
      proj: proj,
    } = getMvpMatrix(canvas.value.width / canvas.value.height, Geometry.positionArray[i], { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, eye, center, up)
    updateMatUniforms(device, UniformBuffers[0], mvp, model, view, proj, i * 256) //写入矩阵UniformBuffer
    renderPassEncoder.setBindGroup(0, bindGroup, [i * 256]) // 设置绑定组
    renderPassEncoder.setVertexBuffer(0, geometry.vertexBuffer) // 设置顶点缓冲区
    renderPassEncoder.setIndexBuffer(geometry.indexBuffer, 'uint16') // 设置索引缓冲区
    renderPassEncoder.drawIndexed(geometry.indexCount) // 绘制索引缓冲区
  }
}

//创建阴影管线
const createShadowPipeline = (device, shadowPipelineLayout, shadowVertex) => {
  const shadowPipeline = device.createRenderPipeline({
    layout: shadowPipelineLayout,
    vertex: {
      module: device.createShaderModule({ code: shadowVertex }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: 3 * 4,
          attributes: [
            { shaderLocation: 0, offset: 0, format: 'float32x3' },
          ],
        },
      ],
    },
    fragment: undefined, // 只输出深度
    primitive: { topology: 'triangle-list', cullMode: 'back' },
    depthStencil: {
      format: 'depth32float',
      depthWriteEnabled: true,
      depthCompare: 'less',
    },
  });
  return shadowPipeline
}
//创建阴影   所有直到管线
const createShadowEndToPipeline = (device, Vertex, uniformBufferSize) => {
  // 创建模型矩阵uniform缓冲区
  const modelUniformBuffer = createUniformBuffer(device, uniformBufferSize) //创建物体矩阵uniform缓冲区 8个立柱
  const modelBindGroupLayout = createBindGroupLayout(device, true) //创建物体自定义绑定组布局 true 表示使用动态偏移
  const modelBindGroup = createBindGroup(device, modelBindGroupLayout, [modelUniformBuffer]) //创建立柱uniform绑定组
  // 创建阴影深度纹理 要传给主管线
  const shadowDepthTexture = device.createTexture({
    size: [2048, 2048],
    format: 'depth32float', // 深度纹理
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_SRC, // 🔹 添加 COPY_SRC, // ⚠️ 需要加 TEXTURE_BINDING
  });
  const shadowSampler = device.createSampler({
    compare: 'less', // depth comparison，用于 shadow map 阴影判断
  })
  const shadowBindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },
    ],
  })

  const shadowBindGroup = device.createBindGroup({
    layout: shadowBindGroupLayout,
    entries: [
      { binding: 0, resource: shadowSampler },
      { binding: 1, resource: shadowDepthTexture.createView() },
    ],
  })
  const SunlightMatrixBuffer = createUniformBuffer(device, 1) //创建太阳光uniform缓冲区
  const SunlightMatrixBindGroupLayout = createBindGroupLayout(device, false)//阴影绑定组布局
  const SunlightMatrixBindGroup = createBindGroup(device, SunlightMatrixBindGroupLayout, [SunlightMatrixBuffer])//光源矩阵
  const shadowPipelineLayout = createPipelineLayout(device, [modelBindGroupLayout, SunlightMatrixBindGroupLayout]) //创建立柱管线布局 后续添加纹理

  const shadowPipeline = createShadowPipeline(device, shadowPipelineLayout, Vertex)//阴影管线
  return {
    shadowDepthTexture,
    SunlightMatrixBindGroup,
    shadowPipeline,
    SunlightMatrixBuffer,
    modelBindGroup,
    modelUniformBuffer,
    shadowBindGroup,
    shadowBindGroupLayout,
  }
}
//创建阴影渲染pass编码器
const createShadowRenderPassEncoder = (commandEncoder, shadowDepthTexture) => {
  const renderPassEncoder = commandEncoder.beginRenderPass({
    colorAttachments: [],
    depthStencilAttachment: {
      view: shadowDepthTexture.createView(),//阴影深度纹理
      depthLoadOp: 'clear',
      depthClearValue: 1.0,
      depthStoreOp: 'store',
    },
  })
  return renderPassEncoder
}
//绘制阴影
const drawShadow = (
  device, renderPassEncoder, shadowPipeline,
  Geometry, geometry,
  UniformBuffers,//modelUniformBuffer,SunShadowBuffer
  canvas, eye, center, up,
  SunlightMatrixBindGroup, modelBindGroup,//光线矩阵绑定组、模型矩阵绑定组
  lightMatrix
) => {
  // console.log(lightMatrix);

  renderPassEncoder.setPipeline(shadowPipeline)
  updateSunShadowUniforms(device, UniformBuffers[1], lightMatrix)//静态偏移
  renderPassEncoder.setBindGroup(1, SunlightMatrixBindGroup)//光源矩阵绑定组
  for (let i = 0; i < Geometry.positionArray.length; i++) {
    const {
      model: model,
    } = getMvpMatrix(canvas.value.width / canvas.value.height, Geometry.positionArray[i], { x: 0, y: 0, z: 0 }, { x: 1, y: 1, z: 1 }, eye, center, up)
    //需要将物体的模型矩阵以及平行光源矩阵写入uniform缓冲区
    updateModelUniforms(device, UniformBuffers[0], model, i * 256)//动态偏移
    renderPassEncoder.setBindGroup(0, modelBindGroup, [i * 256])//模型矩阵绑定组
    renderPassEncoder.setVertexBuffer(0, geometry.vertexBuffer)//顶点缓冲区
    renderPassEncoder.setIndexBuffer(geometry.indexBuffer, 'uint16')
    renderPassEncoder.drawIndexed(geometry.indexCount)
  }
}
export {
  createCubeEndToPipeline,
  createRenderPassEncoder,
  drawGemetry,
  createShadowEndToPipeline,
  createShadowRenderPassEncoder,
  drawShadow
}
