//LightsModule.js
import { mat4 } from "gl-matrix";
// 太阳光模块 平行光（单个光源，不使用动态偏移）
const lDIR = [1, -1, 1]
const updateSunLightUniforms = (
  device,
  lightBuffer,
  lightDir = lDIR,
  lightColor = [1.0, 0.95, 0.8],
  lightIntensity = 1.0,
  lightMatrix
) => {
  const dirData = new Float32Array([lightDir[0], lightDir[1], lightDir[2], 0]);
  const colorData = new Float32Array([lightColor[0], lightColor[1], lightColor[2], lightIntensity]);
  device.queue.writeBuffer(lightBuffer, 0, dirData.buffer, 0, dirData.byteLength);
  device.queue.writeBuffer(lightBuffer, 16, colorData.buffer, 0, colorData.byteLength);
  device.queue.writeBuffer(lightBuffer, 32, lightMatrix.buffer, 0, lightMatrix.byteLength);
};
const updateSunShadowUniforms = (device, shadowBuffer, lightMatrix) => {
  device.queue.writeBuffer(shadowBuffer, 0, lightMatrix.buffer, 0, lightMatrix.byteLength);
}
//静态偏移
// 平行光矩阵生成工具
// lightDir: 平行光方向单位向量 [x, y, z]，不需要位置
// target: 世界中心点，一般是场景中心 [x, y, z]
// up: 上方向向量，一般 [0,1,0]
// left/right/bottom/top/near/far: 正交投影参数，覆盖场景区域
const createSunLightMatrix = (
  lightDir = lDIR,
  target = [0, 0, 0],
  up = [0, 1, 0],
  left = -100,
  right = 100,
  bottom = -100,
  top = 100,
  near = 0.1,
  far = 500
) => {
  // 1️⃣ 计算光源位置（从目标点沿光方向反向移动）
  const lightPos = [
    target[0] - lightDir[0] * 200, // 偏离目标一定距离 上面设置far 500 不要太远 不然照不到
    target[1] - lightDir[1] * 200,
    target[2] - lightDir[2] * 200
  ];

  // 2️⃣ 生成 view 矩阵（光源坐标系）
  const lightView = mat4.create();
  mat4.lookAt(lightView, lightPos, target, up);

  // 3️⃣ 生成正交投影矩阵（覆盖阴影区域）
  const lightProj = mat4.create();
  mat4.ortho(lightProj, left, right, bottom, top, near, far);

  // 4️⃣ 返回光源矩阵
  const lightMatrix = mat4.create();
  mat4.multiply(lightMatrix, lightProj, lightView); // lightProj * lightView

  return {
    lightView,
    lightProj,
    lightMatrix,
    lightPos,
    target
  };
};



//点光源模块
const updatePosLightUniforms = (
  device,
  lightBuffer,
  lightPos = [20, 200, 20],
  lightColor = [1.0, 0.95, 0.8],
  lightIntensity = 2.0
) => {
  // 8 个 float（32 bytes），占用缓冲区前 32 字节
  const data = new Float32Array([
    lightPos[0], lightPos[1], lightPos[2], 0,              // 位置填充 16 bytes
    lightColor[0], lightColor[1], lightColor[2], lightIntensity, // 颜色 + 强度 16 bytes
    // 剩余空间不写，缓冲区其余部分自动保留
  ]);
  device.queue.writeBuffer(
    lightBuffer,
    0,           // 固定从偏移 0 写入
    data.buffer,
    0,
    data.byteLength  // 32 bytes
  );
};

export { updatePosLightUniforms, createSunLightMatrix, updateSunLightUniforms, updateSunShadowUniforms };
