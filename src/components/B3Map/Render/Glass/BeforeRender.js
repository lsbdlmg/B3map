
import Fragment from '@/components/B3Map/Render/Glass/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Glass/Shader/Vertex.wgsl?raw'
//导入各个部分
import Building_One_FirstFloor_Glass_Gate from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/Gate'
import Building_One_FirstFloor_Glass_Hall_LeftWall from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/Hall_LeftWall'
import Building_One_FirstFloor_Glass_BackWall from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/BackWall'
import Building_One_FirstFloor_Glass_Hall_RightRoom from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/Hall_RightRoom'
import Building_One_FirstFloor_Glass_Staircase from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/Staircase'
import Building_One_FirstFloor_Glass_Toilet from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/Toilet'
import Building_One_FirstFloor_Glass_ConferenceRoom from '@/components/B3Map/Render/Glass/Building_One/FirstFloor/ConferenceRoom'

import Building_Two_FirstFloor_Glass_CounselorOffice from '@/components/B3Map/Render/Glass/Building_Two/CounselorOffice'
import Building_Two_FirstFloor_Glass_FisrtRoom from '@/components/B3Map/Render/Glass/Building_Two/FirstRoom'
import Building_Two_FirstFloor_Glass_SecondRoom from '@/components/B3Map/Render/Glass/Building_Two/SecondRoom'
import Building_Two_FirstFloor_Glass_ThirdRoom from '@/components/B3Map/Render/Glass/Building_Two/ThirdRoom'
const BeforeRender = async (device, format, world, RAPIER) => {
  const Objects = []
  { //一楼玻璃部分
    Building_One_FirstFloor_Glass_Gate(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_Hall_LeftWall(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_BackWall(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_Hall_RightRoom(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_Staircase(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_Toilet(Objects, device, world, RAPIER)
    Building_One_FirstFloor_Glass_ConferenceRoom(Objects, device, world, RAPIER)
  }
  {
    //建筑二 一楼 玻璃部分
    Building_Two_FirstFloor_Glass_CounselorOffice(Objects, device, world, RAPIER)
    Building_Two_FirstFloor_Glass_FisrtRoom(Objects, device, world, RAPIER)
    Building_Two_FirstFloor_Glass_SecondRoom(Objects, device, world, RAPIER)
    Building_Two_FirstFloor_Glass_ThirdRoom(Objects, device, world, RAPIER)
  }

  const stride = 256
  // 计算总实例数
  let instanceCount = 0;
  for (const { Object } of Objects) {
    instanceCount += Object.positionArray.length;
  }
  console.log('玻璃总实例数:', instanceCount)
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
    //物体数量和数组
    instanceCount: instanceCount,
    Objects: Objects,
    //缓冲区
    instanceBuffer: instanceBuffer,
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer,
    //管线和绑定组
    MainPipeline: MainPipeline,
    vsGroup: vsGroup,
  }
}
export default BeforeRender
