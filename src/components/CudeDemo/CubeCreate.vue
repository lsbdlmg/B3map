<script setup>
import { CubeRenderStore } from '@/stores/Cube'
import { storeToRefs } from 'pinia'
import { onMounted, ref, watch } from 'vue'
import { vertex, fragment } from '@/js/CubeShader'
import { getMvpMatrix } from '@/js/GetMvpMatrix'
import { updateUniforms } from '@/js/UpdateUniforms'
const renderStore = CubeRenderStore()
const { colorRGB, material, intensity, bgcolorRGB, speed, running, shape, lightOff, lightPos, scale, objectCount, fps } = storeToRefs(renderStore)

//位置组
const positionArray = ref([{ x: 0, y: 0, z: 0 }])
//旋转组
const rotationArray = ref([{ x: 0, y: 1, z: 0 }])
//buffer
const uniformBuffer = ref(null)
//bindgroup
const bindGroup = ref(null)
const canvas = ref()
// 物体旋转
const rotation = { x: 0, y: 0, z: 0 }
// 物体缩放
// const scale = { x: 1, y: 1, z: 1 }
// 拖拽状态
let dragging = false
// 上一次鼠标位置
let lastX = 0
let lastY = 0

// 保存所有纹理
const textures = {}
//
let isRGBTex = 1
let isColorTex = 1
// 每个顶点：位置(x,y,z) + 法线(nx,ny,nz) + UV(u,v)
//法线用作光照 uv负责问纹理
// 创建球形 64x64 会卡
const createSphere = (radius = 1, latSegments = 32, lonSegments = 32) => {
  //latSegments 纬线段数 lonSegments 经线段数
  const vertices = []
  const indices = []

  for (let y = 0; y <= latSegments; y++) {
    const v = y / latSegments
    const theta = v * Math.PI
    const sinTheta = Math.sin(theta)
    const cosTheta = Math.cos(theta)

    for (let x = 0; x <= lonSegments; x++) {
      const u = x / lonSegments
      const phi = u * Math.PI * 2
      const sinPhi = Math.sin(phi)
      const cosPhi = Math.cos(phi)

      const vx = radius * sinTheta * cosPhi
      const vy = radius * cosTheta
      const vz = radius * sinTheta * sinPhi

      // pos + normal + uv
      vertices.push(
        vx,
        vy,
        vz, // position
        vx / radius,
        vy / radius,
        vz / radius, // normal (球心指向顶点)
        u,
        v, // uv
      )
    }
  }

  for (let y = 0; y < latSegments; y++) {
    for (let x = 0; x < lonSegments; x++) {
      const a = y * (lonSegments + 1) + x
      const b = a + lonSegments + 1
      indices.push(a, b, a + 1)
      indices.push(b, b + 1, a + 1)
    }
  }

  return {
    vertices: new Float32Array(vertices),
    indices: new Uint16Array(indices),
  }
}
// 创建立方体
const createCube = () => {
  return {
    vertices: new Float32Array([
      // 前面 (Z = +1)
      -1, -1, 1, 0, 0, 1, 0, 0, 1, -1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 1, 1, -1, 1, 1, 0, 0, 1, 0, 1,

      // 后面 (Z = -1)
      1, -1, -1, 0, 0, -1, 0, 0, -1, -1, -1, 0, 0, -1, 1, 0, -1, 1, -1, 0, 0, -1, 1, 1, 1, 1, -1, 0, 0, -1, 0, 1,

      // 顶面 (Y = +1)
      -1, 1, 1, 0, 1, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 1, -1, 0, 1, 0, 1, 1, -1, 1, -1, 0, 1, 0, 0, 1,

      // 底面 (Y = -1)
      -1, -1, -1, 0, -1, 0, 0, 0, 1, -1, -1, 0, -1, 0, 1, 0, 1, -1, 1, 0, -1, 0, 1, 1, -1, -1, 1, 0, -1, 0, 0, 1,

      // 右面 (X = +1)
      1, -1, 1, 1, 0, 0, 0, 0, 1, -1, -1, 1, 0, 0, 1, 0, 1, 1, -1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 1,

      // 左面 (X = -1)
      -1, -1, -1, -1, 0, 0, 0, 0, -1, -1, 1, -1, 0, 0, 1, 0, -1, 1, 1, -1, 0, 0, 1, 1, -1, 1, -1, -1, 0, 0, 0, 1,
    ]),
    // 每个面两个三角形 (共36个索引)
    indices: new Uint16Array([
      // 前
      0, 1, 2, 2, 3, 0,
      // 后
      4, 5, 6, 6, 7, 4,
      // 上
      8, 9, 10, 10, 11, 8,
      // 下
      12, 13, 14, 14, 15, 12,
      // 右
      16, 17, 18, 18, 19, 16,
      // 左
      20, 21, 22, 22, 23, 20,
    ]),
  }
}
onMounted(async () => {
  // -------------------- WebGPU 初始化 --------------------
  //获取gpu
  const gpu = await navigator.gpu.requestAdapter()
  //获取设备
  const device = await gpu.requestDevice()
  //获取canvas上下文
  const context = canvas.value.getContext('webgpu')
  //获取默认格式
  const format = navigator.gpu.getPreferredCanvasFormat()
  //配置canvas上下文
  context.configure({
    device: device,
    format: format, //颜色格式
  })
  // -------------------- 获取纹理 --------------------
  //获取纹理图片 并创建纹理
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
  textures.metal = await loadTexture('/metal.jpg')
  textures.glass = await loadTexture('/glass.jpg')
  textures.grass = await loadTexture('/grass.webp')
  textures.jupiter = await loadTexture('/jupitermap.jpg')

  // -------------------- 创建几何体 --------------------
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
  // 创建两种形状 球和立方体
  const sphere = createSphere(1, 32, 32)
  const cube = createCube() // 你已有 cube 顶点、索引数据
  // 创建创建字典保存几何体和对应缓冲区
  const geometries = {
    sphere: createGeometry(device, sphere.vertices, sphere.indices),
    cube: createGeometry(device, cube.vertices, cube.indices),
  }
  // -------------------- 创建其他 --------------------
  // 创建深度纹理
  const depthTexture = device.createTexture({
    size: [canvas.value.width, canvas.value.height],
    format: 'depth24plus',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  })
  // 创建采样器
  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
  })
  //创建uniform缓冲区
  uniformBuffer.value = device.createBuffer({
    size: 256 * objectCount.value, // 一般256 对齐
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  //创建绑定组布局
  const bindGroupLayout = device.createBindGroupLayout({
    entries: [
      {
        binding: 0,
        visibility: GPUShaderStage.VERTEX | GPUShaderStage.FRAGMENT,
        buffer: { type: 'uniform', hasDynamicOffset: true },
      },
    ],
  })
  //创建纹理绑定组布局
  const textureBindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
    ],
  })

  //创建管线布局
  const pipelineLayout = device.createPipelineLayout({
    bindGroupLayouts: [
      bindGroupLayout, // group 0
      textureBindGroupLayout, // group 1
    ],
  })

  //创建管线
  const pipeline = device.createRenderPipeline({
    layout: pipelineLayout,
    //顶点缓冲区 绘制顶点用的
    vertex: {
      module: device.createShaderModule({ code: vertex }),
      entryPoint: 'main',
      buffers: [
        {
          arrayStride: 8 * 4,
          attributes: [
            //顶点缓冲区的属性 位置和法线
            { shaderLocation: 0, offset: 0, format: 'float32x3' }, //position 位置
            { shaderLocation: 1, offset: 12, format: 'float32x3' }, //normal 法线
            { shaderLocation: 2, offset: 24, format: 'float32x2' }, //uv 纹理
          ],
        },
      ],
    },
    //片元缓冲区 填色用的
    fragment: {
      module: device.createShaderModule({
        code: fragment,
      }),
      entryPoint: 'main',
      targets: [{ format: format }],
    },
    // primitive 连线
    primitive: { topology: 'triangle-list', cullMode: 'back' },
    // 深度测试
    depthStencil: {
      format: 'depth24plus',
      depthWriteEnabled: true,
      depthCompare: 'less', // 深度测试函数：靠近的像素覆盖远的
    },
  })
  //创建uniform绑定组 放mvp矩阵 光照参数 相机视角 世界坐标
  bindGroup.value = device.createBindGroup({
    layout: bindGroupLayout,
    entries: [{ binding: 0, resource: { buffer: uniformBuffer.value, offset: 0, size: 256 } }],
  })

  //创建纹理绑定组 纹理使用默认木头
  let textureBindGroup = device.createBindGroup({
    layout: textureBindGroupLayout,
    entries: [
      // 采样器 纹理
      { binding: 0, resource: sampler },
      { binding: 1, resource: textures['wood'].createView() },
    ],
  })
  // 监听 material 改变，更新 bindGroup更换纹理
  watch(material, (newMat) => {
    // 如果是 rgb 或 color 材质，则更新 isRGBTex 和 isColorTex
    if (newMat === 'rgb' || newMat === 'color') {
      isRGBTex = newMat === 'rgb' ? 1 : 0
      isColorTex = newMat === 'color' ? 1 : 0
      return
    }
    isRGBTex = 0
    isColorTex = 0
    // 只有是纹理材质时才更新
    textureBindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(1),
      entries: [
        { binding: 0, resource: sampler },
        { binding: 1, resource: textures[newMat].createView() },
      ],
    })
  })
  // 监听 count 变化，位置数组和旋转数组也需要变化
  {
    const updateArrays = (count) => {
      const curCount = positionArray.value.length

      if (count > curCount) {
        // 需要新增元素
        for (let i = curCount; i < count; i++) {
          positionArray.value.push({
            x: Math.random() * 30 - 15,
            y: Math.random() * 30 - 15,
            z: Math.random() * 40 - 15,
          })
          rotationArray.value.push({
            x: Math.random() * 360,
            y: Math.random() * 360,
            z: Math.random() * 360,
          })
        }
      } else if (count < curCount) {
        // 需要删除多余元素
        positionArray.value.splice(count)
        rotationArray.value.splice(count)
      }
      // count === curCount 就不做任何操作
    }

    // 监听 count 变化，重新生成数组
    watch(objectCount, (newCount) => {
      updateArrays(newCount)
      uniformBuffer.value = device.createBuffer({
        size: 256 * newCount, // 每个物体 256 bytes
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
      })
      bindGroup.value = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [{ binding: 0, resource: { buffer: uniformBuffer.value, offset: 0, size: 256 } }],
      })
    })
  }
  const eye = { x: 0, y: 0, z: 5 }
  const center = { x: 0, y: 0, z: 0 }
  const up = { x: 0, y: 1, z: 0 }
  let yaw = -90 // 水平角度，初始看向 -Z
  let pitch = 0 // 垂直角度
  const sensitivity = 0.1 // 灵敏度
  // -------------------- 鼠标控制 --------------------
  {
    //视角移动
    canvas.value.addEventListener('mousedown', (e) => {
      dragging = true
      lastX = e.clientX
      lastY = e.clientY
    })
    window.addEventListener('mouseup', () => (dragging = false))
    window.addEventListener('mousemove', (e) => {
      if (!dragging) return

      let dx = e.clientX - lastX
      let dy = lastY - e.clientY // y 方向反向

      dx *= sensitivity
      dy *= sensitivity

      yaw += dx
      pitch += dy

      // 限制pitch避免翻转
      pitch = Math.max(Math.min(pitch, 89), -89)

      // 更新 center
      const radYaw = (yaw * Math.PI) / 180
      const radPitch = (pitch * Math.PI) / 180

      const frontX = Math.cos(radYaw) * Math.cos(radPitch)
      const frontY = Math.sin(radPitch)
      const frontZ = Math.sin(radYaw) * Math.cos(radPitch)

      center.x = eye.x + frontX
      center.y = eye.y + frontY
      center.z = eye.z + frontZ

      lastX = e.clientX
      lastY = e.clientY
    })
    //放大缩小 不是物体被缩小 是物体远离观测点
    canvas.value.addEventListener('wheel', (e) => {
      const move = -e.deltaY * 0.05 // 正值后退，负值前进

      // 相机前方向
      const frontX = center.x - eye.x
      const frontY = center.y - eye.y
      const frontZ = center.z - eye.z

      let newEyeZ = eye.z + frontZ * move

      // 限制 z 轴在 [-20, 100]
      newEyeZ = Math.min(Math.max(newEyeZ, -40), 100)

      // 更新 eye 和 center
      const deltaZ = newEyeZ - eye.z
      const ratio = deltaZ / frontZ // 按比例缩放前方向
      eye.x += frontX * ratio
      eye.y += frontY * ratio
      eye.z = newEyeZ
      center.x = eye.x + frontX
      center.y = eye.y + frontY
      center.z = eye.z + frontZ
    })
  }

  // -------------------- 渲染循环 --------------------
  let prev = performance.now()
  let frameCount = 0
  let lastTime = performance.now()
  //render循环渲染
  const render = () => {
    const now = performance.now()
    const dt = now - prev
    prev = now

    frameCount++

    if (now - lastTime >= 1000) {
      fps.value = frameCount
      frameCount = 0
      lastTime = now
    }
    //控制旋转
    if (running.value) {
      rotation.y -= 0.0005 * speed.value * dt
      rotation.x -= 0.0005 * speed.value * dt
      rotation.z -= 0.0005 * speed.value * dt
      for (let i = 0; i < objectCount.value; i++) {
        rotationArray.value[i].x -= 0.0005 * speed.value * dt
        rotationArray.value[i].y -= 0.0005 * speed.value * dt
        rotationArray.value[i].z -= 0.0005 * speed.value * dt
      }
    }
    const aspect = canvas.value.width / canvas.value.height
    //画布背景颜色
    const [r, g, b] = bgcolorRGB.value
    // 创建命令编码器
    const commandEncoder = device.createCommandEncoder()
    const renderPassEncoder = commandEncoder.beginRenderPass({
      // 渲染目标
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          storeOp: 'store',
          loadOp: 'clear',
          clearValue: { r, g, b, a: 1.0 },
        },
      ],
      // 深度纹理
      depthStencilAttachment: {
        view: depthTexture.createView(),
        depthLoadOp: 'clear',
        depthClearValue: 1.0, // 远处是1.0
        depthStoreOp: 'store',
      },
    })

    // 绘制
    const geo = geometries[shape.value] // 获取几何体
    renderPassEncoder.setPipeline(pipeline) // 设置管线

    renderPassEncoder.setBindGroup(1, textureBindGroup) // 纹理
    renderPassEncoder.setVertexBuffer(0, geo.vertexBuffer) // 设置顶点缓冲区
    const cameraPos = new Float32Array([0, 0, 5, 0])
    for (let i = 0; i < objectCount.value; i++) {
      const { mvp: mvp, model: model } = getMvpMatrix(aspect, positionArray.value[i], rotationArray.value[i], scale.value, eye, center, up)
      updateUniforms({
        device,
        uniformBuffer: uniformBuffer.value,
        mvp,
        model,
        cameraPos,
        colorRGB: colorRGB.value,
        lightPos: lightPos.value,
        intensity: intensity.value,
        lightOff: lightOff.value,
        isRGBTex: isRGBTex,
        isColorTex: isColorTex,
        offset: i,
      })
      renderPassEncoder.setBindGroup(0, bindGroup.value, [i * 256])
      renderPassEncoder.setIndexBuffer(geo.indexBuffer, 'uint16')
      renderPassEncoder.drawIndexed(geo.indexCount)
    }
    renderPassEncoder.end() // 结束渲染
    device.queue.submit([commandEncoder.finish()]) // 提交
    requestAnimationFrame(render) // 继续渲染
  }
  render()
})
</script>

<template>
  <div>
    <canvas ref="canvas" width="600" height="600"></canvas>
  </div>
</template>

<style scoped lang="less">
canvas {
  display: block;
  border-radius: 1vh;
  cursor: grab;
  transition: all 0.2s ease;
  &:active {
    cursor: grabbing;
  }
}
</style>
