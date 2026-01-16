//Textures.js
// 加载纹理
const getTexture = async (device) => {
  const textures = {}
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
  textures.brick = await loadTexture('/brick.webp')
  textures.metal = await loadTexture('/metal.jpg')
  textures.glass = await loadTexture('/glass.jpg')
  textures.grass = await loadTexture('/grass.webp')
  textures.jupiter = await loadTexture('/jupitermap.jpg')
  return textures
}
// 创建深度纹理
const createDepthTexture = (device, [width, height]) => {
  const depthTexture = device.createTexture({
    size: [width, height],
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT,
  })
  return depthTexture
}
// 创建采样器
const createSampler = (device) => {
  const sampler = device.createSampler({
    magFilter: 'linear',
    minFilter: 'linear',
    // addressModeU: 'repeat', // 水平重复
    addressModeV: 'repeat', // 垂直重复
  })
  return sampler
}
//创建纹理绑定组布局
const createTextureBindGroupLayout = (device) => {
  const textureBindGroupLayout = device.createBindGroupLayout({
    entries: [
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, sampler: {} },
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } },
    ],
  })
  return textureBindGroupLayout
}
//创建纹理绑定组
const createTextureBindGroup = (device, layout, sampler, texture) => {
  const TextureBindGroup = device.createBindGroup({
    layout: layout,
    entries: [
      // 采样器 纹理
      { binding: 0, resource: sampler },
      { binding: 1, resource: texture.createView() },
    ],
  })
  return TextureBindGroup
}
export {
  getTexture,
  createDepthTexture,
  createSampler,
  createTextureBindGroupLayout,
  createTextureBindGroup
}
