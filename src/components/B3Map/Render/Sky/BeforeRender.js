import { createCube } from '@/components/B3Map/BasicShape/Cube'
import Fragment from '@/components/B3Map/Render/Sky/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Sky/Shader/Vertex.wgsl?raw'
import { createGeometry } from '@/components/B3Map/publicJs/Object'
const BeforeRender = async (device, format) => {
  const Sky = createCube({
    hw: 1,
    hh: 1,
    hd: 1,
    repeatU: 10,
    repeatV: 10,
    slices: 40,
  })
  // const Sky = createSphere(1200, 32, 32)
  Sky.positionArray = [{ x: 0, y: 0, z: 0 }]
  Sky.rotationArray = [{ x: 0, y: 0, z: 0 }]
  Sky.scaleArray = [{ x: 1, y: 100, z: 1 }]
  const sky = createGeometry(device, Sky.vertices, Sky.indices)
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
    cullMode: 'front', // 因为在立方体内部
  }

  // 深度模板属性
  const commonDepthStencil = {
    depthWriteEnabled: false, // ❗不写深度
    depthCompare: 'less-equal', // ❗允许最远
    format: 'depth32float',
  }
  const stride = 256
  const ObjectVPMatrixBuffer = device.createBuffer({
    label: '物体VP矩阵缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })

  const ObjectAttributeBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 物体VP
    ],
  })

  async function loadImageBitmap(url) {
    const res = await fetch(url)
    const blob = await res.blob()
    return await createImageBitmap(blob)
  }

  const skybox_daytime_right = await loadImageBitmap('/sky-daytime/sky-right.png')
  const skybox_daytime_left = await loadImageBitmap('/sky-daytime/sky-left.png')
  const skybox_daytime_top = await loadImageBitmap('/sky-daytime/sky-top.png')
  const skybox_daytime_bottom = await loadImageBitmap('/sky-daytime/sky-bottom.png')
  const skybox_daytime_front = await loadImageBitmap('/sky-daytime/sky-front.png')
  const skybox_daytime_back = await loadImageBitmap('/sky-daytime/sky-back.png')
  
  const skybox_night_right = await loadImageBitmap('/sky-night/right.bmp')
  const skybox_night_left = await loadImageBitmap('/sky-night/left.bmp')
  const skybox_night_top = await loadImageBitmap('/sky-night/top.bmp')
  const skybox_night_bottom = await loadImageBitmap('/sky-night/bottom.bmp')
  const skybox_night_front = await loadImageBitmap('/sky-night/front.bmp')
  const skybox_night_back = await loadImageBitmap('/sky-night/back.bmp')

  const skybox_daytime_images = [
    //右、左、上、下、前、后
    skybox_daytime_right,
    skybox_daytime_left,
    skybox_daytime_top,
    skybox_daytime_bottom,
    skybox_daytime_front,
    skybox_daytime_back,
  ]
  const skybox_night_images = [
    //右、左、上、下、前、后
    skybox_night_right,
    skybox_night_left,
    skybox_night_top,
    skybox_night_bottom,
    skybox_night_front,
    skybox_night_back,
  ]

  const cubeSize = 512
  const cubeCount = 2

  const skyCubeArray = device.createTexture({
    size: [cubeSize, cubeSize, 6 * cubeCount],
    format: 'rgba8unorm',
    dimension: '2d',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
  })

  // daytime 写到 layer 0~5
  for (let i = 0; i < 6; i++) {
    device.queue.copyExternalImageToTexture(
      { source: skybox_daytime_images[i] },
      { texture: skyCubeArray, origin: { x: 0, y: 0, z: i } },
      { width: cubeSize, height: cubeSize },
    )
  }

  // night 写到 layer 6~11
  for (let i = 0; i < 6; i++) {
    device.queue.copyExternalImageToTexture(
      { source: skybox_night_images[i] },
      { texture: skyCubeArray, origin: { x: 0, y: 0, z: i + 6 } },
      { width: cubeSize, height: cubeSize },
    )
  }
  // 片段着色器绑定组布局
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      // 物体纹理
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, // 物体属性缓冲区 目前只存放纹理
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float', viewDimension: 'cube-array' } }, // 天空立方体数组
    ],
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
  // 主渲染深度纹理
  const MainRenderSampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    addressModeU: 'repeat',
    addressModeV: 'repeat',
  })
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: ObjectVPMatrixBuffer } }],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      { binding: 0, resource: MainRenderSampler },
      { binding: 1, resource: { buffer: ObjectAttributeBuffer } },
      { binding: 2, resource: skyCubeArray.createView({ dimension: 'cube-array' }) },
    ],
  })
  return {
    Sky: Sky,
    //已经写入顶点缓冲区
    sky: sky,
    //缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer, //物体MVP矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer, //物体属性缓冲区
    //管线和绑定组
    MainPipeline: MainPipeline,
    vsGroup: vsGroup,
    fsGroup: fsGroup,
  }
}
export default BeforeRender
