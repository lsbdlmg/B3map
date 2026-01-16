<script setup>
import { Ground } from './Ground'
import { Pillar } from './Pillar'
import { Wall } from './Wall'
import { SpotLight } from './SpotLight'
import MainFragment from './MainFragment.wgsl?raw'
import MainVertex from './MainVertex.wgsl?raw'
import spotLightShadow from './SpotLightShadow.wgsl?raw'
import { initControls, updateCamera } from './CameraController'
import { mat4, vec3 } from 'gl-matrix'
import { onMounted, ref } from 'vue'
const canvas = ref()
const textures = {}
let fps = ref(0)
onMounted(async () => {
  const gpu = await navigator.gpu.requestAdapter() //获取gpu
  const device = await gpu.requestDevice() //获取设备
  const context = canvas.value.getContext('webgpu') //获取canvas上下文
  const format = navigator.gpu.getPreferredCanvasFormat() //获取默认格式
  context.configure({ device: device, format: format }) //配置canvas上下文
  // 更新光源矩阵
  // const updateSunLightMatrix = (time, Steps) => {
  //   const center = [0, 0, 0] // 圆心
  //   const R = 800 // 半径
  //   let lightIntensity = 0
  //   // 计算平面法向量 n = (A×C) × B 来保证方向正确
  //   const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
  //   const normalize = (v) => {
  //     const len = Math.hypot(v[0], v[1], v[2])
  //     return [v[0] / len, v[1] / len, v[2] / len]
  //   }
  //   // 平面法向量 n
  //   const n = normalize(cross([-400, 0, 0], [0, 240, 320])) // 法向量
  //   // 平面内两个正交单位向量 u,v
  //   const u = normalize([-400, 0, 0]) // 从圆心到 C 的方向
  //   const v = normalize(cross(n, u)) // 平面内垂直方向
  //   const totalSteps = Steps //控制速度 默认1分钟一圈
  //   const t = ((time - 1) % totalSteps) / totalSteps // 0~1
  //   //黄色光 [1,1,0]
  //   const theta = t * Math.PI * 2 // 0~2π
  //   const x = center[0] + R * (Math.cos(theta) * u[0] + Math.sin(theta) * v[0])
  //   const y = center[1] + R * (Math.cos(theta) * u[1] + Math.sin(theta) * v[1])
  //   const z = center[2] + R * (Math.cos(theta) * u[2] + Math.sin(theta) * v[2])
  //   // 控制光强度 当太阳在天空时 光强度为1 当太阳在地面时 光强度为0
  //   // if (y < 320 && y >= 0) {
  //   //   lightIntensity = y / 1280 + 0.2
  //   // } else if (y >= 320) {
  //   //   lightIntensity = y / 640
  //   // }
  //   if (y > 0) {
  //     lightIntensity = y / 640
  //   } else {
  //     lightIntensity = 0
  //   }
  //   // 圆上位置 = center + R*(cosθ*u + sinθ*v)
  //   // const lightPos = [100, 300, 400]
  //   const lightPos = [x, y, z]

  //   // --- 生成光源矩阵 ---
  //   const target = [0, 0, 0]
  //   const up = [0, 1, 0]
  //   const lightView = mat4.create()
  //   mat4.lookAt(lightView, lightPos, target, up)
  //   const lightProj = mat4.create()
  //   mat4.ortho(lightProj, -500, 500, -500, 500, 0.1, 1200)
  //   const lightMatrix = mat4.create()
  //   mat4.multiply(lightMatrix, lightProj, lightView)
  //   return {
  //     lightPos,
  //     lightMatrix,
  //     lightIntensity,
  //   }
  // }
  const updateSunLightMatrix = (time, Steps) => {
    const center = vec3.fromValues(0, 0, 0)
    const R = 800

    // 计算平面法向量 n = (A×C) × B
    const A = vec3.fromValues(-800, 0, 0)
    const B = vec3.fromValues(0, 480, 640)

    const n = vec3.create()
    vec3.cross(n, A, B)
    vec3.normalize(n, n)

    // u = normalize(A)
    const u = vec3.create()
    vec3.normalize(u, A)

    // v = normalize(n × u)
    const v = vec3.create()
    vec3.cross(v, n, u)
    vec3.normalize(v, v)

    // ============================
    //      计算太阳的角位置
    // ============================
    const t = ((time - 1) % Steps) / Steps // 0~1
    const theta = t * Math.PI * 2

    // pos = center + R * (cosθ * u + sinθ * v)
    const tmp1 = vec3.create()
    const tmp2 = vec3.create()
    vec3.scale(tmp1, u, Math.cos(theta))
    vec3.scale(tmp2, v, Math.sin(theta))

    const lightPos = vec3.create()
    vec3.add(lightPos, tmp1, tmp2)
    vec3.scale(lightPos, lightPos, R)
    vec3.add(lightPos, lightPos, center)

    // ============================
    //         计算光强度
    // ============================
    const y = lightPos[1]
    const lightIntensity = y > 0 ? y / 640 : 0

    // ============================
    //         光照矩阵
    // ============================
    const lightView = mat4.create()
    mat4.lookAt(lightView, lightPos, center, vec3.fromValues(0, 1, 0))

    const lightProj = mat4.create()
    mat4.ortho(lightProj, -500, 500, -500, 500, 0.1, 1200)

    const lightMatrix = mat4.create()
    mat4.multiply(lightMatrix, lightProj, lightView)

    return {
      lightPos: [lightPos[0], lightPos[1], lightPos[2]],
      lightMatrix,
      lightIntensity,
    }
  }
  //创建聚光灯矩阵
  const createSpotLightMatrix = (position, direction, outerAngle, near = 0.1, far = 200.0) => {
    const lightView = mat4.create()
    const target = vec3.add([], position, direction)
    const up = Math.abs(direction[1]) > 0.99 ? [0, 0, 1] : [0, 1, 0]
    mat4.lookAt(lightView, position, target, up)
    const lightProj = mat4.create()
    const fov = outerAngle * 2 // 视锥角 = 外角*2（完整开口） fov 控制灯的视角 视角以外灯就看不见了 但光源不受影响 阴影受影响 *2可以对齐
    const aspect = 1.0 // shadow map 一般正方形
    mat4.perspective(lightProj, fov, aspect, near, far)
    const lightMatrix = mat4.create()
    mat4.multiply(lightMatrix, lightProj, lightView)
    return lightMatrix
  }
  //获取物体的MVP矩阵
  const getMvpMatrix = (aspect, position, rotation, scale, eye, center, up) => {
    // 初始化矩阵 角度为45度的视角 沿着y轴旋转的透视矩阵
    const model = mat4.create()
    const view = mat4.create()
    const proj = mat4.create()
    const mvp = mat4.create()

    // 构建proj透视投影矩阵
    mat4.perspective(proj, Math.PI / 4, aspect, 0.1, 2000)

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
      proj,
    }
  }
  //创建几何体 返回顶点缓冲区 索引缓冲区 索引数量
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
  //加载纹理
  async function loadTexture(url) {
    const img = await fetch(url).then((r) => r.blob())
    const bitmap = await createImageBitmap(img)
    //创建纹理
    const tex = device.createTexture({
      size: [bitmap.width, bitmap.height, 1],
      format: 'rgba8unorm',
      usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.RENDER_ATTACHMENT,
    })
    // 将图片复制到纹理
    device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: tex }, [bitmap.width, bitmap.height])
    return tex
  }

  // 加载所有纹理
  textures.wood = await loadTexture('/wood.jpg')
  textures.brick = await loadTexture('/brickOne.jpg')
  const groud = createGeometry(device, Ground.vertices, Ground.indices)
  const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
  const wall = createGeometry(device, Wall.vertices, Wall.indices)
  const spotLight = createGeometry(device, SpotLight.vertices, SpotLight.indices)
  const stride = 256
  const groundCount = Ground.positionArray.length
  const pillarCount = Pillar.positionArray.length
  const wallCount = Wall.positionArray.length
  const objectCount = groundCount + pillarCount + wallCount + 3 // 2 个聚光灯 1 个太阳

  const lightPos = [0, 60, 0]
  // const lightDir = vec3.normalize([], [1, 0, 0])
  const lightDir = vec3.normalize([], [0, -1, 0])
  const outerAngle = Math.PI / (180 / 60) // 120° 聚光灯角度 最大120° 以外无光 会有阴影
  const innerAngle = Math.PI / 180 // 30° 内角
  const innerCone = Math.cos(innerAngle)
  const outerCone = Math.cos(outerAngle)
  const spotlightMatrix = createSpotLightMatrix(lightPos, lightDir, outerAngle)

  const spotLightPos2 = [-20, 60, 0]
  const spotLightDir2 = vec3.normalize([], [0, -1, 0])
  // const spotLightDir = vec3.normalize([], [-1, 0, 0])
  const spotLightOuterAngle2 = Math.PI / (180 / 60) // 120°
  const spotLightInnerAngle2 = Math.PI / 180 // 30°
  const spotLightInnerCone2 = Math.cos(spotLightInnerAngle2)
  const spotLightOuterCone2 = Math.cos(spotLightOuterAngle2)
  const spotLightMatrix2 = createSpotLightMatrix(spotLightPos2, spotLightDir2, spotLightOuterAngle2)

  //创建MVP缓冲区2
  const MVPBuffer = device.createBuffer({
    label: '物体MVP矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ModelBuffer = device.createBuffer({
    label: '物体模型矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const objectBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const spotLightMatrixBuffer = device.createBuffer({
    label: '光源矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const spotLightMatrixBuffer2 = device.createBuffer({
    label: '光源2矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const sunlightMatrixBuffer = device.createBuffer({
    label: '光源3矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  // 点光源缓冲区
  const lightBuffer = device.createBuffer({
    label: '点光源缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const lightBuffer2 = device.createBuffer({
    label: '点光源缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const sunLightBuffer = device.createBuffer({
    label: '光源属性缓冲区',
    size: 256,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } }, // MVP
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } }, // Model
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 光源矩阵1
      { binding: 3, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 光源矩阵2
      { binding: 4, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 光源矩阵3
    ],
  })
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源属性
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影纹理
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影采样器
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      //物体属性 目前只用纹理索引
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 4 } }, // 物体属性缓冲区 目前只存放纹理
      { binding: 5, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 木头纹理
      { binding: 6, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块纹理
      { binding: 7, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源2属性
      { binding: 8, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影2纹理
      { binding: 9, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影2采样器
      { binding: 10, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源3属性
      { binding: 11, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影3纹理
      { binding: 12, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影3采样器
    ],
  })
  const spotLightShadowBindGroupLayout = device.createBindGroupLayout({
    label: '聚光灯阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  const spotLightShadowBindGroupLayout2 = device.createBindGroupLayout({
    label: '聚光灯2阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  const sunShadowBindGroupLayout = device.createBindGroupLayout({
    label: '阴影着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  const spotLightShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [spotLightShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({
        code: spotLightShadow,
      }),
      entryPoint: 'main',
      buffers: [
        {
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
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    },
  })
  const spotLightShadowDepthTexture = device.createTexture({
    size: [1024, 1024], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const spotLightShadowPipeline2 = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [spotLightShadowBindGroupLayout2] }),
    vertex: {
      module: device.createShaderModule({
        code: spotLightShadow,
      }),
      entryPoint: 'main',
      buffers: [
        {
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
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    },
  })
  const spotLightShadowDepthTexture2 = device.createTexture({
    size: [1024, 1024],
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const sunShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [sunShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({
        code: spotLightShadow,
      }),
      entryPoint: 'main',
      buffers: [
        {
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
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    },
  })
  const sunShadowDepthTexture = device.createTexture({
    size: [8192, 8192], //调到8192 不会有阴影失真 只看太阳180帧左右
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [vsBindGroupLayout, fsBindGroupLayout],
    }),
    vertex: {
      module: device.createShaderModule({
        code: MainVertex,
      }),
      entryPoint: 'main',
      buffers: [
        {
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
        },
      ],
    },
    fragment: {
      module: device.createShaderModule({
        code: MainFragment,
      }),
      entryPoint: 'main',
      targets: [
        {
          format: format,
        },
      ],
    },
    primitive: {
      topology: 'triangle-list',
      cullMode: 'back',
    },
    depthStencil: {
      depthWriteEnabled: true,
      depthCompare: 'less',
      format: 'depth32float',
    },
  })
  const renderDepthTexture = device.createTexture({
    size: [canvas.value.width, canvas.value.height],
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  })
  const spotLightShadowDepthView = spotLightShadowDepthTexture.createView()
  const spotLightShadowDepthView2 = spotLightShadowDepthTexture2.createView()
  const sunShadowDepthView = sunShadowDepthTexture.createView()
  const renderDepthView = renderDepthTexture.createView()
  // 创建采样器
  const spotLightShadowSampler = device.createSampler({
    compare: 'less',
  })
  const spotLightShadowSampler2 = device.createSampler({
    compare: 'less',
  })
  const renderSampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    addressModeV: 'repeat', // 垂直重复
  })
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: MVPBuffer, size: 64 } },
      { binding: 1, resource: { buffer: ModelBuffer, size: 64 } },
      { binding: 2, resource: { buffer: spotLightMatrixBuffer } },
      { binding: 3, resource: { buffer: spotLightMatrixBuffer2 } },
      { binding: 4, resource: { buffer: sunlightMatrixBuffer } },
    ],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: lightBuffer } },
      { binding: 1, resource: spotLightShadowDepthView },
      { binding: 2, resource: spotLightShadowSampler },
      { binding: 3, resource: renderSampler },
      { binding: 4, resource: { buffer: objectBuffer, size: 4 } },
      { binding: 5, resource: textures['wood'].createView() },
      { binding: 6, resource: textures['brick'].createView() },
      { binding: 7, resource: { buffer: lightBuffer2 } },
      { binding: 8, resource: spotLightShadowDepthView2 },
      { binding: 9, resource: spotLightShadowSampler2 },
      { binding: 10, resource: { buffer: sunLightBuffer } },
      { binding: 11, resource: sunShadowDepthView },
      { binding: 12, resource: spotLightShadowSampler2 },
    ],
  })
  const spotLightShadowGroup = device.createBindGroup({
    label: '聚光灯阴影绑定组1',
    layout: spotLightShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ModelBuffer, size: 64 } },
      { binding: 1, resource: { buffer: spotLightMatrixBuffer } },
    ],
  })
  const spotLightShadowGroup2 = device.createBindGroup({
    label: '聚光灯阴影绑定组2',
    layout: spotLightShadowBindGroupLayout2,
    entries: [
      { binding: 0, resource: { buffer: ModelBuffer, size: 64 } },
      { binding: 1, resource: { buffer: spotLightMatrixBuffer2 } },
    ],
  })
  const sunShadowGroup = device.createBindGroup({
    label: '太阳阴影着色器绑定组',
    layout: sunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ModelBuffer, size: 64 } },
      { binding: 1, resource: { buffer: sunlightMatrixBuffer } },
    ],
  })
  //相机位置 往里z正 左x正
  const eye = { x: -130, y: 20, z: 0 }
  const center = { x: 80, y: 0, z: 0 }
  const up = { x: 0, y: 1, z: 0 }
  const totalSteps = 7200
  let lastTime = performance.now()
  let frameCount = 0

  initControls(canvas, window)
  const render = () => {
    updateCamera(eye, center)
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
    const time = (Math.floor(((now / 1000) * totalSteps) / 60) % totalSteps) + 1 // 每秒分 120 份，总共 7200 1分钟完成
    const { lightPos: sunLightPos, lightMatrix: sunLightMatrix, lightIntensity: sunLightIntensity } = updateSunLightMatrix(time, totalSteps)
    const commandEncoder = device.createCommandEncoder()
    // 绘制聚光灯阴影
    {
      // device.queue.writeBuffer(spotLightMatrixBuffer, 0, sunLightMatrix)
      device.queue.writeBuffer(spotLightMatrixBuffer, 0, spotlightMatrix)

      const spotLightShadowPass = commandEncoder.beginRenderPass({
        colorAttachments: [],
        depthStencilAttachment: {
          view: spotLightShadowDepthView,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
          depthClearValue: 1.0,
        },
      })
      spotLightShadowPass.setPipeline(spotLightShadowPipeline)
      // 1) 写入 ground 的 model 矩阵到对应偏移
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        const { model: groundModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Ground.positionArray[gi],
          { x: 0, y: 0, z: 0 },
          Ground.scaleArray[gi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, groundModel)
      }
      // 2) 绘制 ground（每次 bind 都带动态偏移）
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup, [offset]) // shadowGroup expects 1 dynamic offset
        spotLightShadowPass.setVertexBuffer(0, groud.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(groud.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(groud.indexCount)
      }
      // 3) 写入 pillar 的 model 矩阵到后续 slot（offset: groundCount + pi）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        const { model: pillarModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Pillar.positionArray[pi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          Pillar.scaleArray[pi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, pillarModel)
        // console.log(pillarModel)
      }
      // 4) 绘制 pillar（注意使用与写入同样的 slot）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup, [offset])
        spotLightShadowPass.setVertexBuffer(0, pillar.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(pillar.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(pillar.indexCount)
      }
      // 3) 写入 wall 的 model 矩阵到后续 slot（offset: groundCount + pillarCount + wi）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        const { model: wallModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Wall.positionArray[wi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          Wall.scaleArray[wi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, wallModel)
      }
      // 4) 绘制 wall（注意使用与写入同样的 slot）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup, [offset])
        spotLightShadowPass.setVertexBuffer(0, wall.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(wall.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(wall.indexCount)
      }

      spotLightShadowPass.end()
    }
    // 绘制聚光灯2阴影
    {
      // device.queue.writeBuffer(spotLightMatrixBuffer, 0, sunLightMatrix)
      device.queue.writeBuffer(spotLightMatrixBuffer2, 0, spotLightMatrix2)

      const spotLightShadowPass = commandEncoder.beginRenderPass({
        colorAttachments: [],
        depthStencilAttachment: {
          view: spotLightShadowDepthView2, // 注意使用第二个阴影纹理
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
          depthClearValue: 1.0,
        },
      })
      spotLightShadowPass.setPipeline(spotLightShadowPipeline2)
      // 1) 写入 ground 的 model 矩阵到对应偏移
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        const { model: groundModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Ground.positionArray[gi],
          { x: 0, y: 0, z: 0 },
          Ground.scaleArray[gi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, groundModel)
      }
      // 2) 绘制 ground（每次 bind 都带动态偏移）
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup2, [offset]) // shadowGroup expects 1 dynamic offset
        spotLightShadowPass.setVertexBuffer(0, groud.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(groud.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(groud.indexCount)
      }
      // 3) 写入 pillar 的 model 矩阵到后续 slot（offset: groundCount + pi）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        const { model: pillarModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Pillar.positionArray[pi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          Pillar.scaleArray[pi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, pillarModel)
      }
      // 4) 绘制 pillar（注意使用与写入同样的 slot）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup2, [offset])
        spotLightShadowPass.setVertexBuffer(0, pillar.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(pillar.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(pillar.indexCount)
      }
      // 3) 写入 wall 的 model 矩阵到后续 slot（offset: groundCount + pillarCount + wi）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        const { model: wallModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Wall.positionArray[wi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          Wall.scaleArray[wi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, wallModel)
      }
      // 4) 绘制 wall（注意使用与写入同样的 slot）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        spotLightShadowPass.setBindGroup(0, spotLightShadowGroup2, [offset])
        spotLightShadowPass.setVertexBuffer(0, wall.vertexBuffer)
        spotLightShadowPass.setIndexBuffer(wall.indexBuffer, 'uint16')
        spotLightShadowPass.drawIndexed(wall.indexCount)
      }

      spotLightShadowPass.end()
    }
    // 绘制太阳阴影
    {
      device.queue.writeBuffer(sunlightMatrixBuffer, 0, sunLightMatrix)

      const sunShadowPass = commandEncoder.beginRenderPass({
        colorAttachments: [],
        depthStencilAttachment: {
          view: sunShadowDepthView,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
          depthClearValue: 1.0,
        },
      })
      sunShadowPass.setPipeline(sunShadowPipeline)
      // 1) 写入 ground 的 model 矩阵到对应偏移
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        const { model: groundModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Ground.positionArray[gi],
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1 },
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, groundModel)
      }
      // 2) 绘制 ground（每次 bind 都带动态偏移）
      for (let gi = 0; gi < groundCount; gi++) {
        const offset = gi * stride
        sunShadowPass.setBindGroup(0, sunShadowGroup, [offset]) // shadowGroup expects 1 dynamic offset
        sunShadowPass.setVertexBuffer(0, groud.vertexBuffer)
        sunShadowPass.setIndexBuffer(groud.indexBuffer, 'uint16')
        sunShadowPass.drawIndexed(groud.indexCount)
      }
      // 3) 写入 pillar 的 model 矩阵到后续 slot（offset: groundCount + pi）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        const { model: pillarModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Pillar.positionArray[pi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          { x: 1, y: 1, z: 1 },
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, pillarModel)
      }
      // 4) 绘制 pillar（注意使用与写入同样的 slot）
      for (let pi = 0; pi < pillarCount; pi++) {
        const slot = groundCount + pi
        const offset = slot * stride
        sunShadowPass.setBindGroup(0, sunShadowGroup, [offset])
        sunShadowPass.setVertexBuffer(0, pillar.vertexBuffer)
        sunShadowPass.setIndexBuffer(pillar.indexBuffer, 'uint16')
        sunShadowPass.drawIndexed(pillar.indexCount)
      }
      // 3) 写入 wall 的 model 矩阵到后续 slot（offset: groundCount + pillarCount + wi）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        const { model: wallModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          Wall.positionArray[wi], // use pi starting from 0
          { x: 0, y: 0, z: 0 },
          Wall.scaleArray[wi],
          eye,
          center,
          up,
        )
        device.queue.writeBuffer(ModelBuffer, offset, wallModel)
      }
      // 4) 绘制 wall（注意使用与写入同样的 slot）
      for (let wi = 0; wi < wallCount; wi++) {
        const slot = groundCount + pillarCount + wi
        const offset = slot * stride
        sunShadowPass.setBindGroup(0, sunShadowGroup, [offset])
        sunShadowPass.setVertexBuffer(0, wall.vertexBuffer)
        sunShadowPass.setIndexBuffer(wall.indexBuffer, 'uint16')
        sunShadowPass.drawIndexed(wall.indexCount)
      }
      sunShadowPass.end()
    }
    // 主渲染通道
    {
      const renderPass = commandEncoder.beginRenderPass({
        colorAttachments: [
          {
            view: context.getCurrentTexture().createView(),
            storeOp: 'store',
            loadOp: 'clear',
            clearValue: { r: 0, g: 0, b: 0, a: 1.0 },
          },
        ],
        depthStencilAttachment: {
          view: renderDepthView,
          depthLoadOp: 'clear',
          depthClearValue: 1.0,
          depthStoreOp: 'store',
        },
      })

      renderPass.setPipeline(pipeline)
      // 绘制 ground
      {
        for (let gi = 0; gi < groundCount; gi++) {
          const offset = gi * stride
          const { mvp: groundMVP, model: groundModel } = getMvpMatrix(
            canvas.value.width / canvas.value.height,
            Ground.positionArray[gi],
            { x: 0, y: 0, z: 0 },
            Ground.scaleArray[gi],
            eye,
            center,
            up,
          )
          device.queue.writeBuffer(MVPBuffer, offset, groundMVP)
          device.queue.writeBuffer(ModelBuffer, offset, groundModel)
          device.queue.writeBuffer(objectBuffer, offset, new Float32Array([0])) // 0: 木头材质
        }
        // 绘制
        for (let gi = 0; gi < groundCount; gi++) {
          const offset = gi * stride
          renderPass.setBindGroup(0, vsGroup, [offset, offset])
          renderPass.setBindGroup(1, fsGroup, [offset])
          renderPass.setVertexBuffer(0, groud.vertexBuffer)
          renderPass.setIndexBuffer(groud.indexBuffer, 'uint16')
          renderPass.drawIndexed(groud.indexCount)
        }
      }
      // 绘制 pillar
      {
        for (let pi = 0; pi < pillarCount; pi++) {
          const slot = groundCount + pi
          const offset = slot * stride
          const { mvp: pillarMVP, model: pillarModel } = getMvpMatrix(
            canvas.value.width / canvas.value.height,
            Pillar.positionArray[pi],
            { x: 0, y: 0, z: 0 },
            Pillar.scaleArray[pi],
            eye,
            center,
            up,
          )
          device.queue.writeBuffer(MVPBuffer, offset, pillarMVP)
          device.queue.writeBuffer(ModelBuffer, offset, pillarModel)
          device.queue.writeBuffer(objectBuffer, offset, new Float32Array([1])) // 1: 砖块材质
        }
        // 绘制 pillar
        for (let pi = 0; pi < pillarCount; pi++) {
          const slot = groundCount + pi
          const offset = slot * stride
          renderPass.setBindGroup(0, vsGroup, [offset, offset])
          renderPass.setBindGroup(1, fsGroup, [offset])
          renderPass.setVertexBuffer(0, pillar.vertexBuffer)
          renderPass.setIndexBuffer(pillar.indexBuffer, 'uint16')
          renderPass.drawIndexed(pillar.indexCount)
        }
      }
      // 绘制 wall
      {
        for (let wi = 0; wi < wallCount; wi++) {
          const slot = groundCount + pillarCount + wi
          const offset = slot * stride
          const { mvp: wallMVP, model: wallModel } = getMvpMatrix(
            canvas.value.width / canvas.value.height,
            Wall.positionArray[wi],
            { x: 0, y: 0, z: 0 },
            Wall.scaleArray[wi],
            eye,
            center,
            up,
          )
          device.queue.writeBuffer(MVPBuffer, offset, wallMVP)
          device.queue.writeBuffer(ModelBuffer, offset, wallModel)
          device.queue.writeBuffer(objectBuffer, offset, new Float32Array([0])) // 1: 砖块材质
        }
        // 绘制 wall
        for (let wi = 0; wi < wallCount; wi++) {
          const slot = groundCount + pillarCount + wi
          const offset = slot * stride
          renderPass.setBindGroup(0, vsGroup, [offset, offset])
          renderPass.setBindGroup(1, fsGroup, [offset])
          renderPass.setVertexBuffer(0, wall.vertexBuffer)
          renderPass.setIndexBuffer(wall.indexBuffer, 'uint16')
          renderPass.drawIndexed(wall.indexCount)
        }
      }
      // 绘制 聚光灯 可视化模型
      {
        device.queue.writeBuffer(lightBuffer, 0, new Float32Array(lightPos)) // vec3
        device.queue.writeBuffer(lightBuffer, 16, new Float32Array(lightDir)) // vec3
        device.queue.writeBuffer(lightBuffer, 32, new Float32Array([innerCone])) // f32
        device.queue.writeBuffer(lightBuffer, 36, new Float32Array([outerCone])) // f32
        const slot = groundCount + pillarCount + wallCount
        const offset = slot * stride
        const { mvp: sunMVP, model: sunModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          { x: lightPos[0], y: lightPos[1], z: lightPos[2] },
          { x: 0, y: 0, z: 0 },
          { x: 2, y: 2, z: 2 },
          eye,
          center,
          up,
        )
        // console.log(sunMVP)
        device.queue.writeBuffer(MVPBuffer, offset, sunMVP)
        device.queue.writeBuffer(ModelBuffer, offset, sunModel)
        device.queue.writeBuffer(objectBuffer, offset, new Float32Array([3]))
        renderPass.setBindGroup(0, vsGroup, [offset, offset])
        renderPass.setBindGroup(1, fsGroup, [offset])
        renderPass.setVertexBuffer(0, spotLight.vertexBuffer)
        renderPass.setIndexBuffer(spotLight.indexBuffer, 'uint16')
        renderPass.drawIndexed(spotLight.indexCount)
      }
      // 绘制 聚光灯2 可视化模型
      {
        device.queue.writeBuffer(lightBuffer2, 0, new Float32Array(spotLightPos2)) // vec3
        device.queue.writeBuffer(lightBuffer2, 16, new Float32Array(spotLightDir2)) // vec3
        device.queue.writeBuffer(lightBuffer2, 32, new Float32Array([spotLightInnerCone2])) // f32
        device.queue.writeBuffer(lightBuffer2, 36, new Float32Array([spotLightOuterCone2])) // f32
        const slot = groundCount + pillarCount + wallCount + 1
        const offset = slot * stride
        const { mvp: sunMVP, model: sunModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          { x: spotLightPos2[0], y: spotLightPos2[1], z: spotLightPos2[2] },
          { x: 0, y: 0, z: 0 },
          { x: 2, y: 2, z: 2 },
          eye,
          center,
          up,
        )
        // console.log(sunMVP)
        device.queue.writeBuffer(MVPBuffer, offset, sunMVP)
        device.queue.writeBuffer(ModelBuffer, offset, sunModel)
        device.queue.writeBuffer(objectBuffer, offset, new Float32Array([3]))
        renderPass.setBindGroup(0, vsGroup, [offset, offset])
        renderPass.setBindGroup(1, fsGroup, [offset])
        renderPass.setVertexBuffer(0, spotLight.vertexBuffer)
        renderPass.setIndexBuffer(spotLight.indexBuffer, 'uint16')
        renderPass.drawIndexed(spotLight.indexCount)
      }
      // 绘制 sun
      {
        device.queue.writeBuffer(sunLightBuffer, 0, new Float32Array([...sunLightPos, 1]))
        device.queue.writeBuffer(sunLightBuffer, 16, new Float32Array([sunLightIntensity]))
        const slot = groundCount + pillarCount + wallCount + 2
        const offset = slot * stride
        const { mvp: sunMVP, model: sunModel } = getMvpMatrix(
          canvas.value.width / canvas.value.height,
          { x: sunLightPos[0], y: sunLightPos[1], z: sunLightPos[2] },
          { x: 0, y: 0, z: 0 },
          { x: 10, y: 10, z: 10 },
          eye,
          center,
          up,
        )
        // console.log(sunMVP)
        device.queue.writeBuffer(MVPBuffer, offset, sunMVP)
        device.queue.writeBuffer(ModelBuffer, offset, sunModel)
        device.queue.writeBuffer(objectBuffer, offset, new Float32Array([2]))
        renderPass.setBindGroup(0, vsGroup, [offset, offset])
        renderPass.setBindGroup(1, fsGroup, [offset])
        renderPass.setVertexBuffer(0, spotLight.vertexBuffer)
        renderPass.setIndexBuffer(spotLight.indexBuffer, 'uint16')
        renderPass.drawIndexed(spotLight.indexCount)
      }
      renderPass.end()
    }

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
  </div>
</template>

<style scoped lang="less">
canvas {
  display: block;
  margin: 0 auto;
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
</style>
