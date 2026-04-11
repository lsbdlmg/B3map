import { mat4, vec3 } from 'gl-matrix'
// 根据时间计算太阳光位置和光照矩阵
const updateSunLightMatrix = (time, Steps, cameraPos = [0, 0, 0]) => {
  const center = vec3.fromValues(cameraPos[0], 0, cameraPos[2]) // 只跟随水平移动，高度固定或是0
  const R = 3000
  // 计算平面法向量 n = (A×C) × B
  const A = vec3.fromValues(-R, 0, 0)
  const B = vec3.fromValues(0, R * 0.6, R * 0.8)
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
  //计算太阳的角位置
  const t = ((time - 1) % Steps) / Steps // 0~1
  const theta = t * Math.PI * 2
  const tmp1 = vec3.create()
  const tmp2 = vec3.create()
  vec3.scale(tmp1, u, Math.cos(theta))
  vec3.scale(tmp2, v, Math.sin(theta))
  const lightPos = vec3.create()
  vec3.add(lightPos, tmp1, tmp2)
  vec3.scale(lightPos, lightPos, R)
  vec3.add(lightPos, lightPos, center)
  lightPos[1] = -10 // 夜晚位置调整
  // lightPos[0] = 0 // 白天位置调整
  // lightPos[1] = 1800 // 白天位置调整
  // lightPos[2] = 2400 // 白天位置调整
  //计算光强度
  const y = lightPos[1]
  const lightIntensity = y > 0 ? y / (R * 0.8) : 0
  // const lightIntensity =  0
  //光照矩阵
  const lightView = mat4.create()
  mat4.lookAt(lightView, lightPos, center, vec3.fromValues(0, 1, 0))
  // High Precision (0-200)
  const lightProjHigh = mat4.create()
  const sizeHigh = 200
  mat4.ortho(lightProjHigh, -sizeHigh, sizeHigh, -sizeHigh, sizeHigh, 0.1, 4000)
  const lightMatrixHigh = mat4.create()
  mat4.multiply(lightMatrixHigh, lightProjHigh, lightView)
  // Mid Precision (200-500)
  const lightProjMid = mat4.create()
  const sizeMid = 500
  mat4.ortho(lightProjMid, -sizeMid, sizeMid, -sizeMid, sizeMid, 0.1, 4000)
  const lightMatrixMid = mat4.create()
  mat4.multiply(lightMatrixMid, lightProjMid, lightView)
  // Low Precision (>500)
  const lightProjLow = mat4.create()
  const sizeLow = 2000 // 覆盖更大范围
  mat4.ortho(lightProjLow, -sizeLow, sizeLow, -sizeLow, sizeLow, 0.1, 4000)
  const lightMatrixLow = mat4.create()
  mat4.multiply(lightMatrixLow, lightProjLow, lightView)
  return {
    lightPos: [lightPos[0], lightPos[1], lightPos[2]],
    lightMatrixHigh,
    lightMatrixMid,
    lightMatrixLow,
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
export { updateSunLightMatrix, createSpotLightMatrix }
