import { createSphere } from '@/components/B3Map/BasicShape/Sphere'
// import { createRampTrapezoid } from '@/components/B3Map/BasicShape/createRampTrapezoid'
import Fragment from '@/components/B3Map/Render/Mainbuild/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Mainbuild/Shader/Vertex.wgsl?raw'
import Shadow from '@/components/B3Map/Render/Mainbuild/Shader/Shadow.wgsl?raw'
import { createGeometry, loadTexture, createTextureArrayFromTextures } from '@/components/B3Map/publicJs/Object'
import { createSpotLightMatrix } from '@/components/B3Map/publicJs/Light'

import FirstFloor_Staircase from '@/components/B3Map/Render/MainBuild/FirstFloor/Staircase'
import FirstFloor_Ground from '@/components/B3Map/Render/MainBuild/FirstFloor/Ground'
import FirstFloor_Gate from '@/components/B3Map/Render/MainBuild/FirstFloor/Gate'
import FirstFloor_Hall_LeftWall from '@/components/B3Map/Render/MainBuild/FirstFloor/Hall_LeftWall'
import FirstFloor_BackWall from '@/components/B3Map/Render/MainBuild/FirstFloor/BackWall'
import FirstFloor_Hall_RightRoom from '@/components/B3Map/Render/MainBuild/FirstFloor/Hall_RightRoom'
import FirstFloor_ElectricRoom from '@/components/B3Map/Render/MainBuild/FirstFloor/ElectricRoom'
import SecondFloor_Ground from '@/components/B3Map/Render/MainBuild/SecondFloor/Ground'
// const PI = Math.PI

const BeforeRender = async (device, format, world, RAPIER) => {
  const Objects = [] // 存放所有物体数据的数组
  {
    FirstFloor_Staircase(Objects, device, world, RAPIER)
    FirstFloor_Ground(Objects, device, world, RAPIER)
    FirstFloor_Gate(Objects, device, world, RAPIER)
    FirstFloor_Hall_LeftWall(Objects, device, world, RAPIER)
    FirstFloor_BackWall(Objects, device, world, RAPIER)
    FirstFloor_Hall_RightRoom(Objects, device, world, RAPIER)
    FirstFloor_ElectricRoom(Objects, device, world, RAPIER)
  }
  {
    SecondFloor_Ground(Objects, device, world, RAPIER)
  }
  // 把灯放到最后 因为阴影渲染 灯不要渲染
  // 创建聚光灯球体几何体数据
  const SpotLight = createSphere(1, 32, 32)
  const spotLight = createGeometry(device, SpotLight.vertices, SpotLight.indices)
  SpotLight.positionArray = [
    { x: 0, y: 30, z: 40 },
    { x: -30, y: 30, z: 40 },
  ]
  SpotLight.rotationArray = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ]
  SpotLight.scaleArray = [
    { x: 0.7, y: 0.7, z: 0.7 },
    { x: 0.7, y: 0.7, z: 0.7 },
  ]
  SpotLight.textureIndex = [102, 102]
  Objects.push({ Object: SpotLight, object: spotLight })

  const stride = 256

  // 计算总实例数
  let instanceCount = 0
  for (const { Object } of Objects) {
    instanceCount += Object.positionArray.length
  }
  console.log('建筑总实例数:', instanceCount)
  // 纹理
  const textures = {}
  textures.wood = await loadTexture(device, '/wood.jpg')
  textures.brickOne = await loadTexture(device, '/brickTwo.jpg')
  textures.brickTwo = await loadTexture(device, '/brickTwo.jpg')
  textures.grass = await loadTexture(device, '/grass.jpg')
  textures.outsideBrick = await loadTexture(device, '/outsideBrick.jpg')
  textures.insideBrick = await loadTexture(device, '/insideBrick.jpg')
  textures.worldGroud = await loadTexture(device, '/worldGroud.jpg')
  const textureList = [
    textures.wood, // index 0
    textures.brickOne, // index 1
    textures.brickTwo, // index 2
    textures.grass, // index 3
    textures.outsideBrick, // index 4
    textures.insideBrick, // index 5
    textures.worldGroud, // index 6
  ]

  const textureArrayView = createTextureArrayFromTextures(device, textureList)

  // 聚光灯参数
  const outerAngle = Math.PI / (180 / 80) // 160° 聚光灯角度 最大160° 以外无光 会有阴影
  const innerAngle = Math.PI / (180 / 30) // 60° 内全亮
  const innerCone = Math.cos(innerAngle)
  const outerCone = Math.cos(outerAngle)
  // 聚光灯1
  const spotLightOne = {
    position: [SpotLight.positionArray[0].x, SpotLight.positionArray[0].y, SpotLight.positionArray[0].z],
    direction: [0, -1, 0],
    color: [1.0, 1.0, 1.0],
    intensity: 1.5,
  }
  const spotlightOneMatrix = createSpotLightMatrix(spotLightOne.position, spotLightOne.direction, outerAngle)

  // 聚光灯2
  const spotLightTwo = {
    position: [SpotLight.positionArray[1].x, SpotLight.positionArray[1].y, SpotLight.positionArray[1].z],
    direction: [0, -1, 0],
    color: [1.0, 1.0, 1.0],
    intensity: 1.5,
  }
  const spotlightTwoMatrix = createSpotLightMatrix(spotLightTwo.position, spotLightTwo.direction, outerAngle)

  //公共属性
  // 缓冲区属性
  const commonBufferAttribute = {
    arrayStride: 8 * 4,
    attributes: [
      {
        shaderLocation: 0,
        offset: 0,
        format: 'float32x3',
      },
      {
        shaderLocation: 1,
        offset: 3 * 4,
        format: 'float32x3',
      },
      {
        shaderLocation: 2,
        offset: 6 * 4,
        format: 'float32x2',
      },
    ],
  }
  // 图元属性
  const commonPrimitive = {
    topology: 'triangle-list',
    cullMode: 'back',
  }
  // 深度模板属性
  const commonDepthStencil = {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth32float',
  }
  const ShadowSize = 8192

  // 创建缓冲区
  // 每个实例占用 64 bytes (mat4) + 4 bytes (f32) = 68 bytes，
  const instanceBuffer = device.createBuffer({
    size: instanceCount * stride,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  })

  const ObjectVPMatrixBuffer = device.createBuffer({
    label: '物体VP矩阵缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ObjectAttributeBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride * instanceCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  // 传给主渲染Vertex着色器、阴影渲染Vertex着色器
  const SpotLightOneMatrixBuffer = device.createBuffer({
    label: '聚光灯1矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SpotLightTwoMatrixBuffer = device.createBuffer({
    label: '聚光灯2矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightMatrixBuffer = device.createBuffer({
    label: '太阳光矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  // 聚光灯属性缓冲区 传给主渲染Fragment着色器
  const SpotLightOneAttributeBuffer = device.createBuffer({
    label: '聚光灯1属性缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SpotLightTwoAttributeBuffer = device.createBuffer({
    label: '聚光灯2属性缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightAttributeBuffer = device.createBuffer({
    label: '光源属性缓冲区',
    size: 256,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  //=================================================================
  // 顶点着色器绑定组布局
  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // VP矩阵
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 聚光灯1矩阵
      { binding: 3, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 聚光灯2矩阵
      { binding: 4, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 太阳光矩阵
    ],
  })
  // 片段着色器绑定组布局
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      // 聚光灯
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源属性
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影纹理
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影采样器
      // 聚光灯2
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源2属性
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影2纹理
      { binding: 5, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影2采样器
      // 太阳光
      { binding: 6, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源3属性
      { binding: 7, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影3纹理
      { binding: 8, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影3采样器
      // 物体纹理
      { binding: 9, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      { binding: 10, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 4 } }, // 物体属性缓冲区 目前只存放纹理
      { binding: 11, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 木头纹理
      { binding: 12, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块纵向纹理
      { binding: 13, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 草地纹理
      { binding: 14, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块横向纹理
      { binding: 15, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块横向纹理
      { binding: 16, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array', sampleType: 'float' } },
      { binding: 17, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
    ],
  })
  // 聚光灯1阴影绑定组布局
  const SpotLightOneShadowBindGroupLayout = device.createBindGroupLayout({
    label: '聚光灯1阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 聚光灯2阴影绑定组布局
  const SpotLightTwoShadowBindGroupLayout = device.createBindGroupLayout({
    label: '聚光灯2阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 太阳光阴影绑定组布局
  const SunShadowBindGroupLayout = device.createBindGroupLayout({
    label: '太阳光阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 聚光灯1阴影渲染管线
  const SpotLightOneShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SpotLightOneShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 聚光灯1阴影深度纹理
  const SpotLightOneShadowDepthTexture = device.createTexture({
    size: [2048, 2048], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 聚光灯2阴影渲染管线
  const SpotLightTwoShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SpotLightTwoShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 聚光灯2阴影深度纹理
  const SpotLightTwoShadowDepthTexture = device.createTexture({
    size: [2048, 2048], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 太阳光阴影渲染管线
  const SunShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SunShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 太阳光阴影深度纹理
  const SunShadowDepthTexture = device.createTexture({
    size: [ShadowSize, ShadowSize], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 主渲染管线
  const MainPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [vsBindGroupLayout, fsBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Vertex }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    fragment: {
      module: device.createShaderModule({ code: Fragment }),
      entryPoint: 'main',
      targets: [{ format: format }],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 创建视图
  const SpotLightOneShadowDepthView = SpotLightOneShadowDepthTexture.createView()
  const SpotLightTwoShadowDepthView = SpotLightTwoShadowDepthTexture.createView()
  const SunShadowDepthView = SunShadowDepthTexture.createView()
  //创建采样器
  const SpotLightOneShadowSampler = device.createSampler({ compare: 'less' })
  const SpotLightTwoShadowSampler = device.createSampler({ compare: 'less' })
  const SunShadowSampler = device.createSampler({ compare: 'less' })
  // 水平重复
  const MainRenderSampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeV: 'repeat', addressModeU: 'repeat' })
  // 创建绑定组
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: ObjectVPMatrixBuffer } }, // VP矩阵
      { binding: 2, resource: { buffer: SpotLightOneMatrixBuffer } },
      { binding: 3, resource: { buffer: SpotLightTwoMatrixBuffer } },
      { binding: 4, resource: { buffer: SunLightMatrixBuffer } },
    ],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      // 聚光灯1
      { binding: 0, resource: { buffer: SpotLightOneAttributeBuffer } },
      { binding: 1, resource: SpotLightOneShadowDepthView },
      { binding: 2, resource: SpotLightOneShadowSampler },
      // 聚光灯2
      { binding: 3, resource: { buffer: SpotLightTwoAttributeBuffer } },
      { binding: 4, resource: SpotLightTwoShadowDepthView },
      { binding: 5, resource: SpotLightTwoShadowSampler },
      // 太阳光
      { binding: 6, resource: { buffer: SunLightAttributeBuffer } },
      { binding: 7, resource: SunShadowDepthView },
      { binding: 8, resource: SunShadowSampler },
      // 物体纹理
      { binding: 9, resource: MainRenderSampler },
      { binding: 10, resource: { buffer: ObjectAttributeBuffer, size: 4 } },
      { binding: 11, resource: textures['wood'].createView() },
      { binding: 12, resource: textures['outsideBrick'].createView() },
      { binding: 13, resource: textures['grass'].createView() },
      { binding: 14, resource: textures['insideBrick'].createView() },
      { binding: 15, resource: textures['worldGroud'].createView() },
      { binding: 16, resource: textureArrayView },
      { binding: 17, resource: { buffer: instanceBuffer } }, // 所有实例
    ],
  })
  // 聚光灯1阴影绑定组
  const SpotLightOneShadowGroup = device.createBindGroup({
    label: '聚光灯1阴影绑定组',
    layout: SpotLightOneShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SpotLightOneMatrixBuffer } },
    ],
  })
  // 聚光灯2阴影绑定组
  const SpotLightTwoShadowGroup = device.createBindGroup({
    label: '聚光灯2阴影绑定组',
    layout: SpotLightTwoShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SpotLightTwoMatrixBuffer } },
    ],
  })
  // 太阳光阴影绑定组
  const SunShadowGroup = device.createBindGroup({
    label: '太阳光阴影绑定组',
    layout: SunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SunLightMatrixBuffer } },
    ],
  })
  device.queue.writeBuffer(SpotLightOneMatrixBuffer, 0, spotlightOneMatrix)
  device.queue.writeBuffer(SpotLightOneAttributeBuffer, 0, new Float32Array(spotLightOne.position)) // vec3
  device.queue.writeBuffer(SpotLightOneAttributeBuffer, 16, new Float32Array(spotLightOne.direction)) // vec3
  device.queue.writeBuffer(SpotLightOneAttributeBuffer, 32, new Float32Array([innerCone])) // f32
  device.queue.writeBuffer(SpotLightOneAttributeBuffer, 36, new Float32Array([outerCone])) // f32

  device.queue.writeBuffer(SpotLightTwoMatrixBuffer, 0, spotlightTwoMatrix)
  device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 0, new Float32Array(spotLightTwo.position)) // vec3
  device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 16, new Float32Array(spotLightTwo.direction)) // vec3
  device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 32, new Float32Array([innerCone])) // f32
  device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 36, new Float32Array([outerCone])) // f32
  return {
    instanceCount: instanceCount,
    Objects: Objects, //物体集合
    //缓冲区
    instanceBuffer: instanceBuffer,
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer,
    ObjectAttributeBuffer: ObjectAttributeBuffer,
    SunLightMatrixBuffer: SunLightMatrixBuffer, //太阳光矩阵缓冲区
    SunLightAttributeBuffer: SunLightAttributeBuffer, //太阳光属性缓冲区
    //绑定组
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    SpotLightOneShadowGroup: SpotLightOneShadowGroup, //聚光灯1阴影绑定组
    SpotLightTwoShadowGroup: SpotLightTwoShadowGroup, //聚光灯2阴影绑定组
    SunShadowGroup: SunShadowGroup, //太阳光阴影绑定组
    //管线
    SpotLightOneShadowPipeline: SpotLightOneShadowPipeline, //聚光灯1阴影渲染管线
    SpotLightTwoShadowPipeline: SpotLightTwoShadowPipeline, //聚光灯2阴影渲染管线
    SunShadowPipeline: SunShadowPipeline, //太阳光阴影渲染管线
    MainPipeline: MainPipeline, //主渲染管线
    //视图
    SpotLightOneShadowDepthView: SpotLightOneShadowDepthView, //聚光灯1阴影深度视图
    SpotLightTwoShadowDepthView: SpotLightTwoShadowDepthView, //聚光灯2阴影深度视图
    SunShadowDepthView: SunShadowDepthView, //太阳光阴影深度视图
  }
}

export default BeforeRender
