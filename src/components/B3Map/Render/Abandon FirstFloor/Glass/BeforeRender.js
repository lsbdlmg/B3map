import { createCube } from '@/components/B3Map/BasicShape/Cube'
import Fragment from '@/components/B3Map/Render/Abandon FirstFloor/Glass/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Abandon FirstFloor/Glass/Shader/Vertex.wgsl?raw'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const PI = Math.PI;

const BeforeRender = async (device, format, world, RAPIER) => {
  const Objects = []
  { //门口玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      //门口的玻璃 下侧长
      { x: 19, y: 9.5, z: -13 },
      { x: 10, y: 9.5, z: -13 },

      { x: -17, y: 9.5, z: -13 },
      { x: -26, y: 9.5, z: -13 },
      //门口的玻璃 上侧短
      { x: 19, y: 22, z: -13 },
      { x: 10, y: 22, z: -13 },
      { x: 1, y: 22, z: -13 },
      { x: -8, y: 22, z: -13 },
      { x: -17, y: 22, z: -13 },
      { x: -26, y: 22, z: -13 },

    ]
    Glass.scaleArray = [
      //门口的玻璃 下侧长
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      //门口的玻璃 上侧短
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
    ]
    Glass.rotationArray = [
      //门口的玻璃 下侧长
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      //门口的玻璃 上侧短
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
      { x: 0, y: -PI / 2, z: 0 },
    ]
    Glass.textureIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  { //左侧墙壁玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      //左侧墙壁玻璃 12块 下侧
      { x: 27, y: 9.5, z: -4.4 },
      { x: 27, y: 9.5, z: 4.6 },
      { x: 27, y: 9.5, z: 13.6 },
      { x: 27, y: 9.5, z: 22.6 },
      { x: 27, y: 9.5, z: 31.6 },
      { x: 27, y: 9.5, z: 40.6 },
      { x: 27, y: 9.5, z: 49.6 },
      { x: 27, y: 9.5, z: 58.6 },
      { x: 27, y: 9.5, z: 67.6 },
      { x: 27, y: 9.5, z: 76.6 },
      { x: 27, y: 9.5, z: 85.6 },
      { x: 27, y: 9.5, z: 94.6 },
      //左侧墙壁玻璃 12块 上侧
      { x: 27, y: 22, z: -4.4 },
      { x: 27, y: 22, z: 4.6 },
      { x: 27, y: 22, z: 13.6 },
      { x: 27, y: 22, z: 22.6 },
      { x: 27, y: 22, z: 31.6 },
      { x: 27, y: 22, z: 40.6 },
      { x: 27, y: 22, z: 49.6 },
      { x: 27, y: 22, z: 58.6 },
      { x: 27, y: 22, z: 67.6 },
      { x: 27, y: 22, z: 76.6 },
      { x: 27, y: 22, z: 85.6 },
      { x: 27, y: 22, z: 94.6 },

    ]
    Glass.scaleArray = [
      //左侧墙壁玻璃 12块 下侧
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      { x: 0.5, y: 8.5, z: 4 },
      //左侧墙壁玻璃 12块 上侧
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
      { x: 0.5, y: 3, z: 4 },
    ]
    Glass.rotationArray = [
      //左侧墙壁玻璃 12块 分下
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      //左侧墙壁玻璃 12块 下
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Glass.textureIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  { //后侧墙壁玻璃 2层
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: 19 - i * 9, y: 9.5, z: 102.6 })
    for (let i = 0; i < 8; i++) Glass.positionArray.push({ x: -42 - i * 9, y: 9.5, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: 19 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 8; i++) Glass.positionArray.push({ x: -42 - i * 9, y: 22, z: 102.6 })

    Glass.scaleArray = []
    for (let i = 0; i < 14; i++) Glass.scaleArray.push({ x: 4, y: 8.5, z: 0.5 })
    for (let i = 0; i < 14; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })

    Glass.rotationArray = new Array(28).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  { //后侧墙壁玻璃 上下3层
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //-182-61-5*9=-
    //下侧长
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -121 - i * 9, y: 13, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - i * 9, y: 13, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 61 - i * 9, y: 13, z: 102.6 })
    //上侧短
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -121 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 61 - i * 9, y: 22, z: 102.6 })
    //下侧短
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -121 - i * 9, y: 4, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - i * 9, y: 4, z: 102.6 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 61 - i * 9, y: 4, z: 102.6 })
    Glass.scaleArray = []
    //下侧长
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 5, z: 0.5 })
    //上侧短
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    //下侧短
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(54).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(54).fill(0)
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  { //右侧小房间窗户
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      //靠近大厅一侧
      { x: -59, y: 15, z: 4.6 },
      //靠近户外一侧
    ]
    //下侧长
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -75 + i * 9, y: 13, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -75 + i * 9, y: 22, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -75 + i * 9, y: 4, z: -13.4 })
    Glass.scaleArray = [
      //靠近大厅一侧
      { x: 0.5, y: 5, z: 4 },
      //靠近户外一侧
    ]
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 4, y: 5, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(7).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0]//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  const stride = 256
  let objectCount = 0//计算总物体数量
  for (let i = 0; i < Objects.length; i++) {
    objectCount += Objects[i].Object.positionArray.length
  }
  // 计算总实例数
  let instanceCount = 0;
  for (const { Object } of Objects) {
    instanceCount += Object.positionArray.length;
  }
  // 每个实例占用 64 bytes (mat4) + 4 bytes (f32) = 68 bytes，向 256 对齐方便
  const instanceStride = 256;
  const instanceBuffer = device.createBuffer({
    size: instanceCount * instanceStride,
    usage: GPUBufferUsage.STORAGE | GPUBufferUsage.COPY_DST,
  })

  // 创建缓冲区
  const ObjectVPMatrixBuffer = device.createBuffer({
    label: '物体VP矩阵缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
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
    depthWriteEnabled: false,
    depthCompare: 'less',
    format: 'depth32float',
  }

  // 创建缓冲区
  const ObjectMVPMatrixBuffer = device.createBuffer({
    label: '物体MVP矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ObjectModelMatrixBuffer = device.createBuffer({
    label: '物体模型矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ObjectAttributeBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })

  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'read-only-storage' } }, // 存储缓冲区
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // VP矩阵
    ],
  })

  // 主渲染管线
  const MainPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [vsBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Vertex }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    fragment: {
      module: device.createShaderModule({ code: Fragment }),
      entryPoint: 'main',
      targets: [
        {
          format: format,
          blend: {
            color: {
              srcFactor: 'src-alpha',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
            alpha: {
              srcFactor: 'one',
              dstFactor: 'one-minus-src-alpha',
              operation: 'add',
            },
          },
        },
      ],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: instanceBuffer } }, // 所有实例
      { binding: 1, resource: { buffer: ObjectVPMatrixBuffer } }, // VP矩阵
    ],
  })

  return {
    instanceCount: instanceCount,
    instanceBuffer: instanceBuffer,
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer,
    Objects: Objects,
    //缓冲区
    ObjectMVPMatrixBuffer: ObjectMVPMatrixBuffer,//物体MVP矩阵缓冲区
    ObjectModelMatrixBuffer: ObjectModelMatrixBuffer,//物体Model矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer,//物体属性缓冲区
    //管线和绑定组
    MainPipeline: MainPipeline,
    vsGroup: vsGroup,
  }
}
export default BeforeRender
