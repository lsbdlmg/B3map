// updateUniforms.js

/**
 * 更新 WebGPU uniform 缓冲区内容
 * @param {Object} params 参数对象
 * @param {GPUDevice} params.device WebGPU 设备对象
 * @param {GPUBuffer} params.uniformBuffer 要写入的 uniform 缓冲区
 * @param {Float32Array} params.mvp 模型视图投影矩阵
 * @param {Float32Array} params.model 模型矩阵
 * @param {Array<number>} params.cameraPos 相机位置 [x, y, z]
 * @param {Array<number>} params.colorRGB 颜色 [r, g, b]
 * @param {Object} params.lightPos 光源位置 {x, y, z}
 * @param {number} params.intensity 光强
 * @param {boolean} params.lightOff 光源是否关闭
 * @param {number} params.offset 偏移量
 */
const updateUniforms = ({
  device,
  uniformBuffer,
  mvp,
  model,
  cameraPos,
  colorRGB,
  lightPos,
  intensity,
  lightOff,
  offset = 0,
  isRGBTex,
  isColorTex,
}) => {
  // === 构造 Float32Array 数据 ===
  const lightPosUniform = new Float32Array([lightPos.x, lightPos.y, lightPos.z])
  const color = new Float32Array([...colorRGB, 1]) // 加上alpha
  const camera = new Float32Array([...cameraPos, 0]) // 补齐4分量

  // === 写入 uniform ===
  device.queue.writeBuffer(uniformBuffer, 0 + offset * 256, mvp.buffer)
  device.queue.writeBuffer(uniformBuffer, 64 + offset * 256, camera)
  device.queue.writeBuffer(uniformBuffer, 80 + offset * 256, color)
  device.queue.writeBuffer(uniformBuffer, 96 + offset * 256, lightPosUniform)
  device.queue.writeBuffer(uniformBuffer, 112 + offset * 256, model)
  device.queue.writeBuffer(uniformBuffer, 176 + offset * 256, new Float32Array([intensity]))
  device.queue.writeBuffer(uniformBuffer, 180 + offset * 256, new Float32Array([lightOff ? 1.0 : 0.0]))
  device.queue.writeBuffer(uniformBuffer, 184 + offset * 256, new Float32Array([isRGBTex]))
  device.queue.writeBuffer(uniformBuffer, 188 + offset * 256, new Float32Array([isColorTex]))
}
export { updateUniforms }
