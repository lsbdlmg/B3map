import Fragment from '@/components/B3Map/Render/Mainbuild/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Mainbuild/Shader/Vertex.wgsl?raw'
import Shadow from '@/components/B3Map/Render/Mainbuild/Shader/Shadow.wgsl?raw'
import { loadTexture, createTextureArrayFromTextures } from '@/components/B3Map/publicJs/Object'
import { createSpotLightMatrix } from '@/components/B3Map/publicJs/Light'

import All_Spotlight from '@/components/B3Map/Render/MainBuild/Spotlight/Spotlight'

import Building_One_FirstFloor_Staircase from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Staircase'
import Building_One_FirstFloor_Ground from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Ground'
import Building_One_FirstFloor_Gate from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Gate'
import Building_One_FirstFloor_Hall_LeftWall from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Hall_LeftWall'
import Building_One_FirstFloor_BackWall from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/BackWall'
import Building_One_FirstFloor_Hall_RightRoom from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Hall_RightRoom'
import Building_One_FirstFloor_ElectricRoom from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/ElectricRoom'
import Building_One_FirstFloor_Toilet from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Toilet'
import Building_One_FirstFloor_ConferenceRoom from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/ConferenceRoom'
import Building_One_FirstFloor_Outdoor_Corridor from '@/components/B3Map/Render/MainBuild/Building_One/FirstFloor/Outdoor_Corridor'

import Building_One_SecondFloor_Ground from '@/components/B3Map/Render/MainBuild/Building_One/SecondFloor/Ground'

import Building_Two_FirstFloor_Corridor from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/Corridor'
import Building_Two_FirstFloor_CounselorOffice from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/CounselorOffice'
import Building_Two_FirstFloor_Staircase_One from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/Staircase_One'
import Building_Two_FirstFloor_FirstRoom from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/FirstRoom'
import Building_Two_FirstFloor_SecondRoom from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/SecondRoom'
import Building_Two_FirstFloor_ThirdRoom from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/ThirdRoom'
import Building_Two_FirstFloor_Toilet from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/Toilet'
import Building_Two_FirstFloor_FourthRoom from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/FourthRoom'
import Building_Two_FirstFloor_Staircase_Two from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/Staircase_Two'
import Building_Two_FirstFloor_FifthRoom from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/FifthRoom'
import Building_Two_FirstFloor_Elevator from '@/components/B3Map/Render/MainBuild/Building_Two/FirstFloor/Elevator'

import Building_Two_SecondeFloor_Corridor from '@/components/B3Map/Render/MainBuild/Building_Two/SecondFloor/Corridor'

const outerAngle = Math.PI / (180 / 80) // 160° 聚光灯角度 最大160° 以外无光 会有阴影
const innerAngle = Math.PI / (180 / 30) // 60° 内全亮

const BeforeRender = async (device, format, world, RAPIER) => {
  const Objects = [] // 存放所有物体数据的数组
  const spotLightsData = []// 存放所有聚光灯数据的数组
  {
    {
      Building_One_FirstFloor_Staircase(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Ground(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Gate(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Hall_LeftWall(Objects, device, world, RAPIER)
      Building_One_FirstFloor_BackWall(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Hall_RightRoom(Objects, device, world, RAPIER)
      Building_One_FirstFloor_ElectricRoom(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Toilet(Objects, device, world, RAPIER)
      Building_One_FirstFloor_ConferenceRoom(Objects, device, world, RAPIER)
      Building_One_FirstFloor_Outdoor_Corridor(Objects, device, world, RAPIER)
    }
    {
      Building_One_SecondFloor_Ground(Objects, device, world, RAPIER)
    }
    {
      Building_Two_FirstFloor_Corridor(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_CounselorOffice(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_Staircase_One(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_FirstRoom(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_SecondRoom(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_ThirdRoom(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_Toilet(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_FourthRoom(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_Staircase_Two(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_FifthRoom(Objects, device, world, RAPIER)
      Building_Two_FirstFloor_Elevator(Objects, device, world, RAPIER)
    }
    {
      Building_Two_SecondeFloor_Corridor(Objects, device, world, RAPIER)
    }
    // 放到最后 最后的灯不参与阴影计算
    All_Spotlight(Objects, spotLightsData, device, innerAngle, outerAngle)

  }
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
  textures.corridor = await loadTexture(device, '/corridor.jpg')
  const textureList = [
    textures.wood, // index 0
    textures.brickOne, // index 1
    textures.brickTwo, // index 2
    textures.grass, // index 3
    textures.outsideBrick, // index 4
    textures.insideBrick, // index 5
    textures.worldGroud, // index 6
    textures.corridor, // index 7
  ]
  const textureArrayView = createTextureArrayFromTextures(device, textureList)


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

  // 聚光灯 Storage Buffer
  // 头部信息：光源数量 (4 bytes) + 填充 (12 bytes) + 光源数据 (128 bytes * 光源数量)
  const spotLightsBufferSize = 16 + spotLightsData.length * 128
  const SpotLightsStorageBuffer = device.createBuffer({
    label: '聚光灯列表存储缓冲区',
    size: spotLightsBufferSize,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  })

  const SunLightAttributeBuffer = device.createBuffer({
    label: '光源属性缓冲区',
    size: 256,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightMatrixBufferHigh = device.createBuffer({
    label: '太阳光矩阵缓冲区High',
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightMatrixBufferMid = device.createBuffer({
    label: '太阳光矩阵缓冲区Mid',
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightMatrixBufferLow = device.createBuffer({
    label: '太阳光矩阵缓冲区Low',
    size: 64,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })


  //=================================================================
  // 顶点着色器绑定组布局
  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // VP矩阵
    ],
  })
  // 片段着色器绑定组布局
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      // 物体相关
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array', sampleType: 'float' } },// 物体纹理数组
      //阴影采样器 太阳光和聚光灯共用
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } },//阴影采样器
      // 太阳光 光照相关
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },// 太阳光 属性
      { binding: 5, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },// 太阳光阴影 High
      { binding: 6, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },// 太阳光阴影 Mid
      { binding: 7, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },// 太阳光阴影 Low
      { binding: 8, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, // 太阳光矩阵High
      { binding: 9, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, // 太阳光矩阵Mid
      { binding: 10, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, // 太阳光矩阵Low
      // 聚光灯 光照相关
      { binding: 11, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'read-only-storage' } }, // 聚光灯存储缓冲区
      { binding: 12, visibility: GPUShaderStage.FRAGMENT, texture: { viewDimension: '2d-array', sampleType: 'depth' } }, // 聚光灯阴影纹理数组
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
  const SunShadowDepthTextureHigh = device.createTexture({
    size: [ShadowSize, ShadowSize], // High
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const SunShadowDepthTextureMid = device.createTexture({
    size: [2048, 2048], // Mid
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const SunShadowDepthTextureLow = device.createTexture({
    size: [2048, 2048], // Low
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 创建太阳光阴影视图
  const SunShadowDepthViewHigh = SunShadowDepthTextureHigh.createView()
  const SunShadowDepthViewMid = SunShadowDepthTextureMid.createView()
  const SunShadowDepthViewLow = SunShadowDepthTextureLow.createView()


  // 聚光灯阴影纹理数组
  const SpotLightShadowMapArray = device.createTexture({
    label: '聚光灯阴影纹理数组',
    size: { width: 2048, height: 2048, depthOrArrayLayers: spotLightsData.length }, // 每个聚光灯一个层
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })

  // 聚光灯阴影纹理数组视图
  const SpotLightShadowMapArrayView = SpotLightShadowMapArray.createView({
    label: '聚光灯阴影纹理数组视图',
    dimension: '2d-array',
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

  // 阴影采样器 聚光灯和太阳光共用
  const ShadowSampler = device.createSampler({ compare: 'less' })
  // 普通采样器 物体纹理
  const MainRenderSampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeV: 'repeat', addressModeU: 'repeat' })
  // 创建绑定组
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: ObjectVPMatrixBuffer } }, // VP矩阵
    ],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      //物体相关
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: MainRenderSampler },//普通采样器
      { binding: 2, resource: textureArrayView },// 物体纹理数组
      // 太阳光 光照相关
      { binding: 3, resource: ShadowSampler },// 阴影采样器
      { binding: 4, resource: { buffer: SunLightAttributeBuffer } },// 太阳光 属性
      { binding: 5, resource: SunShadowDepthViewHigh }, //太阳光阴影 High
      { binding: 6, resource: SunShadowDepthViewMid }, // 太阳光阴影 Mid
      { binding: 7, resource: SunShadowDepthViewLow }, // 太阳光阴影 Low
      { binding: 8, resource: { buffer: SunLightMatrixBufferHigh } },// 太阳光矩阵High
      { binding: 9, resource: { buffer: SunLightMatrixBufferMid } },// 太阳光矩阵Mid
      { binding: 10, resource: { buffer: SunLightMatrixBufferLow } },// 太阳光矩阵Low
      //聚光灯 光照相关
      { binding: 11, resource: { buffer: SpotLightsStorageBuffer } },//聚光灯存储缓冲区
      { binding: 12, resource: SpotLightShadowMapArrayView },// 聚光灯阴影纹理数组

    ],
  })

  // 太阳光阴影绑定组 High
  const SunShadowGroupHigh = device.createBindGroup({
    label: '太阳光阴影绑定组High',
    layout: SunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SunLightMatrixBufferHigh } },
    ],
  })
  // 太阳光阴影绑定组 Mid
  const SunShadowGroupMid = device.createBindGroup({
    label: '太阳光阴影绑定组Mid',
    layout: SunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SunLightMatrixBufferMid } },
    ],
  })
  // 太阳光阴影绑定组 Low
  const SunShadowGroupLow = device.createBindGroup({
    label: '太阳光阴影绑定组Low',
    layout: SunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: SunLightMatrixBufferLow } },
    ],
  })

  const {
    SpotLightShadowGroups,
    SpotLightShadowPipelines,
    SpotLightArrayLayerViews,
    SpotLightMatrices,
  } = prepareSpotLight(
    device, commonBufferAttribute, commonPrimitive, commonDepthStencil,
    outerAngle, SpotLightShadowMapArray, instanceBuffer, spotLightsData
  )

  // [新增] 写入 Storage Buffer
  {
    const lightHeader = new Uint32Array([spotLightsData.length, 0, 0, 0]);
    // 每个光源 128 字节 = 32 个 float
    // 基础数据 64 bytes (16 floats) + 矩阵 64 bytes (16 floats)
    const lightData = new Float32Array(4 + spotLightsData.length * 32);

    // Header
    lightData.set(new Float32Array(lightHeader.buffer), 0);

    // Body
    spotLightsData.forEach((light, i) => {
      const baseIndex = 4 + i * 32; // float index (Stride = 32)
      lightData.set(light.position, baseIndex + 0);
      lightData[baseIndex + 3] = light.range;
      lightData.set(light.direction, baseIndex + 4);
      lightData[baseIndex + 7] = light.intensity;
      lightData.set(light.color, baseIndex + 8);
      lightData[baseIndex + 11] = light.innerCone;
      lightData[baseIndex + 12] = light.outerCone;
      lightData[baseIndex + 13] = light.shadowIndex;
      lightData[baseIndex + 14] = 0;
      lightData[baseIndex + 15] = 0;

      // 写入矩阵 (16 floats)
      if (SpotLightMatrices[i]) {
        lightData.set(SpotLightMatrices[i], baseIndex + 16);
      }
    });

    device.queue.writeBuffer(SpotLightsStorageBuffer, 0, lightData);
  }



  return {
    //物体相关
    instanceCount: instanceCount, //实例数量
    Objects: Objects, //物体集合
    instanceBuffer: instanceBuffer, //实例缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer, //VP矩阵缓冲区
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    MainPipeline: MainPipeline, //主渲染管线
    //太阳光相关
    SunLightMatrixBufferHigh: SunLightMatrixBufferHigh, //太阳光矩阵缓冲区 High
    SunLightMatrixBufferMid: SunLightMatrixBufferMid,//太阳光矩阵缓冲区 Mid
    SunLightMatrixBufferLow: SunLightMatrixBufferLow,//太阳光矩阵缓冲区 Low
    SunLightAttributeBuffer: SunLightAttributeBuffer, //太阳光属性缓冲区
    SunShadowGroupHigh: SunShadowGroupHigh, //太阳光阴影绑定组 High
    SunShadowGroupMid: SunShadowGroupMid,//太阳光阴影绑定组 Mid
    SunShadowGroupLow: SunShadowGroupLow,//太阳光阴影绑定组 Low
    SunShadowDepthViewHigh: SunShadowDepthViewHigh, //太阳光阴影深度视图 High
    SunShadowDepthViewMid: SunShadowDepthViewMid, //太阳光阴影深度视图 Mid
    SunShadowDepthViewLow: SunShadowDepthViewLow, //太阳光阴影深度视图 Low
    SunShadowPipeline: SunShadowPipeline, //太阳光阴影渲染管线
    //聚光灯相关
    SpotLightsStorageBuffer: SpotLightsStorageBuffer,
    spotLightsData: spotLightsData,
    SpotLightShadowPipelines: SpotLightShadowPipelines, // 聚光灯阴影渲染管线列表
    SpotLightShadowGroups: SpotLightShadowGroups, // 聚光灯阴影绑定组列表
    SpotLightArrayLayerViews: SpotLightArrayLayerViews, // 聚光灯阴影纹理数组 各层视图列表
    SpotLightMatrices: SpotLightMatrices, // 聚光灯矩阵列表
  }
}

export default BeforeRender

const prepareSpotLight = (
  device, commonBufferAttribute, commonPrimitive, commonDepthStencil,
  outerAngle, SpotLightShadowMapArray, instanceBuffer, spotLightsData
) => {
  const SpotLightShadowGroups = []// 聚光灯阴影绑定组
  const SpotLightShadowPipelines = []// 聚光灯阴影渲染管线
  const SpotLightArrayLayerViews = []// 聚光灯阴影纹理数组 各层视图
  const SpotLightMatrices = []// 聚光灯矩阵列表
  for (const light of spotLightsData) {
    // 创建聚光灯矩阵缓冲区
    const SpotLightMatrixBuffer = device.createBuffer({
      label: '聚光灯矩阵缓冲区',
      size: 64,
      usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
    })
    // 聚光灯阴影绑定组布局
    const SpotLightShadowBindGroupLayout = device.createBindGroupLayout({
      label: '聚光灯阴影绑定组布局',
      entries: [
        { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
        { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
      ],
    })
    // 聚光灯阴影绑定组
    const SpotLightShadowGroup = device.createBindGroup({
      label: '聚光灯阴影绑定组',
      layout: SpotLightShadowBindGroupLayout,
      entries: [
        { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
        { binding: 1, resource: { buffer: SpotLightMatrixBuffer } },
      ],
    })
    // 聚光灯阴影渲染管线
    const SpotLightShadowPipeline = device.createRenderPipeline({
      layout: device.createPipelineLayout({ bindGroupLayouts: [SpotLightShadowBindGroupLayout] }),
      vertex: {
        module: device.createShaderModule({ code: Shadow }),
        entryPoint: 'main',
        buffers: [commonBufferAttribute],
      },
      primitive: commonPrimitive,
      depthStencil: commonDepthStencil,
    })
    // 聚光灯阴影纹理数组 各层视图
    const SpotLightArrayLayerView = SpotLightShadowMapArray.createView({
      baseArrayLayer: light.shadowIndex,
      arrayLayerCount: 1,
      dimension: '2d',
    })
    const spotlightMatrix = createSpotLightMatrix(light.position, [0, -1, 0], outerAngle)
    device.queue.writeBuffer(SpotLightMatrixBuffer, 0, spotlightMatrix)

    SpotLightShadowGroups.push(SpotLightShadowGroup)
    SpotLightShadowPipelines.push(SpotLightShadowPipeline)
    SpotLightArrayLayerViews.push(SpotLightArrayLayerView)
    SpotLightMatrices.push(spotlightMatrix)
  }


  return {
    SpotLightShadowGroups,
    SpotLightShadowPipelines,
    SpotLightArrayLayerViews,
    SpotLightMatrices,
  }
}
