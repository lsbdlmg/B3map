<script setup>
import { Ground } from './Ground'
import { Pillar } from './Pillar'
import { Sun } from './Sun'
import { onMounted, ref } from 'vue'
import ShadowVertex from './ShadowVertex.wgsl?raw'
import ShadowFragment from './ShadowFragment.wgsl?raw'
import sunShadow from './sunShadow.wgsl?raw'
import { initControls, updateCamera } from './CameraController'
import { mat4 } from 'gl-matrix'
const canvas = ref()
const textures = {}
onMounted(async () => {
  const gpu = await navigator.gpu.requestAdapter() //获取gpu
  const device = await gpu.requestDevice() //获取设备
  const context = canvas.value.getContext('webgpu') //获取canvas上下文
  const format = navigator.gpu.getPreferredCanvasFormat() //获取默认格式
  context.configure({ device: device, format: format }) //配置canvas上下文
  //更新光源矩阵
  const updateSunLightMatrix = (time, Steps) => {
    const center = [0, 0, 0] // 圆心
    const R = 800 // 半径
    let lightIntensity = 1
    // 计算平面法向量 n = (A×C) × B 来保证方向正确
    const cross = (u, v) => [u[1] * v[2] - u[2] * v[1], u[2] * v[0] - u[0] * v[2], u[0] * v[1] - u[1] * v[0]]
    const normalize = (v) => {
      const len = Math.hypot(v[0], v[1], v[2])
      return [v[0] / len, v[1] / len, v[2] / len]
    }
    // 平面法向量 n
    const n = normalize(cross([-400, 0, 0], [0, 240, 320])) // 法向量
    // 平面内两个正交单位向量 u,v
    const u = normalize([-400, 0, 0]) // 从圆心到 C 的方向
    const v = normalize(cross(n, u)) // 平面内垂直方向
    const totalSteps = Steps / 6 //控制速度 默认1分钟一圈
    const t = ((time - 1) % totalSteps) / totalSteps // 0~1
    //黄色光 [1,1,0]
    const theta = t * Math.PI * 2 // 0~2π
    const x = center[0] + R * (Math.cos(theta) * u[0] + Math.sin(theta) * v[0])
    const y = center[1] + R * (Math.cos(theta) * u[1] + Math.sin(theta) * v[1])
    const z = center[2] + R * (Math.cos(theta) * u[2] + Math.sin(theta) * v[2])
    // 控制光强度 当太阳在天空时 光强度为1 当太阳在地面时 光强度为0
    if (y < 0) {
      lightIntensity = 0
    }
    // 圆上位置 = center + R*(cosθ*u + sinθ*v)
    // const lightPos = [0, 640, 480]
    const lightPos = [x, y, z]

    // --- 生成光源矩阵 ---
    const target = [0, 0, 0]
    const up = [0, 1, 0]
    const lightView = mat4.create()
    mat4.lookAt(lightView, lightPos, target, up)
    const lightProj = mat4.create()
    mat4.ortho(lightProj, -200, 200, -200, 200, 0.1, 1200)
    const lightMatrix = mat4.create()
    mat4.multiply(lightMatrix, lightProj, lightView)
    return {
      lightPos,
      lightMatrix,
      lightIntensity,
    }
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
  textures.brick = await loadTexture('/brick.jpg')
  const groud = createGeometry(device, Ground.vertices, Ground.indices)
  const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
  const sun = createGeometry(device, Sun.vertices, Sun.indices)
  const stride = 256
  const groundCount = Ground.positionArray.length
  const pillarCount = Pillar.positionArray.length
  const sunCount = 1 //太阳位置由updateSunLightMatrix控制
  const objectCount = groundCount + pillarCount + sunCount
  //创建MVP缓冲区
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
  const sunlightMatrixBuffer = device.createBuffer({
    label: '光源矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const sunLightBuffer = device.createBuffer({
    label: '光源属性缓冲区',
    size: 256,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const objectBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })

  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } },
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } },
      //正常采样器
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      //物体属性 目前只用纹理索引
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 4 } },
      { binding: 5, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
      { binding: 6, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
    ],
  })
  const sunShadowBindGroupLayout = device.createBindGroupLayout({
    label: '阴影着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  const sunShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [sunShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({
        code: sunShadow,
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
    size: [2048, 2048],
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  const pipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({
      bindGroupLayouts: [vsBindGroupLayout, fsBindGroupLayout],
    }),
    vertex: {
      module: device.createShaderModule({
        code: ShadowVertex,
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
        code: ShadowFragment,
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
  // 创建阴影深度纹理的视图
  const sunShadowDepthView = sunShadowDepthTexture.createView()
  const renderDepthView = renderDepthTexture.createView()
  const shadowSampler = device.createSampler({
    compare: 'less',
  })
  // 创建采样器
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
      { binding: 2, resource: { buffer: sunlightMatrixBuffer } },
    ],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: sunLightBuffer } },
      { binding: 1, resource: sunShadowDepthView },
      { binding: 2, resource: shadowSampler },
      { binding: 3, resource: renderSampler },
      { binding: 4, resource: { buffer: objectBuffer, size: 4 } },
      { binding: 5, resource: textures['wood'].createView() },
      { binding: 6, resource: textures['brick'].createView() },
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
  const eye = { x: 0, y: 20, z: -80 }
  const center = { x: 0, y: 0, z: 0 }
  const up = { x: 0, y: 1, z: 0 }
  const totalSteps = 7200
  initControls(canvas, window)

  // const lightPos = [10, 11, -10]
  // const pointShadowMatrices = getPointLightShadowMatrices(lightPos)
  const render = () => {
    const now = performance.now()
    const time = (Math.floor(((now / 1000) * totalSteps) / 60) % totalSteps) + 1 // 每秒分 120 份，总共 7200 1分钟完成
    const { lightPos: sunLightPos, lightMatrix: sunLightMatrix, lightIntensity: sunLightIntensity } = updateSunLightMatrix(time, totalSteps)
    updateCamera(eye, center)

    const commandEncoder = device.createCommandEncoder()

    // ================= sunShadow pass =================
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
      sunShadowPass.end()
    }
    // ================= main render pass =================
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
            { x: 1, y: 1, z: 1 },
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
            { x: 1, y: 1, z: 1 },
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
      // 绘制 sun
      {
        device.queue.writeBuffer(sunLightBuffer, 0, new Float32Array([...sunLightPos, 1]))
        device.queue.writeBuffer(sunLightBuffer, 16, new Float32Array([sunLightIntensity]))
        const slot = groundCount + pillarCount
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
        renderPass.setVertexBuffer(0, sun.vertexBuffer)
        renderPass.setIndexBuffer(sun.indexBuffer, 'uint16')
        renderPass.drawIndexed(sun.indexCount)
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
  </div>
</template>

<style scoped lang="less">
canvas {
  display: block;
  margin: 0 auto;
}
</style>
