import { createSphere } from '@/components/B3Map/BasicShape/Sphere'
import Fragment from '@/components/B3Map/Render/Sun/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Sun/Shader/Vertex.wgsl?raw'
import { createGeometry } from '@/components/B3Map/publicJs/Object'
const BeforeRender = async (device, format) => {
  const Sun = createSphere(1, 32, 32)
  const sun = createGeometry(device, Sun.vertices, Sun.indices)

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

  const stride = 256
  const ObjectMatrixBuffer = device.createBuffer({
    label: '物体矩阵缓冲区', //VP + Model矩阵缓冲区
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
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // VP + Model矩阵缓冲区
    ],
  })
  // 片段着色器绑定组布局
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      // 物体纹理
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, // 物体属性缓冲区 目前只存放纹理
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
  const MainRenderSampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeV: 'repeat' })
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: ObjectMatrixBuffer } }],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      { binding: 0, resource: MainRenderSampler },
      { binding: 1, resource: { buffer: ObjectAttributeBuffer } },
    ],
  })
  return {
    //已经写入顶点缓冲区
    sun: sun,
    //缓冲区
    ObjectMatrixBuffer: ObjectMatrixBuffer, //物体MVP矩阵缓冲区
    //绑定组
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    //管线
    MainPipeline: MainPipeline, //主渲染管线
  }
}
export default BeforeRender
