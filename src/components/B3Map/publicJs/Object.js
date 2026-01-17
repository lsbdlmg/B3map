import { mat4 } from 'gl-matrix'
const getMvpMatrix = (aspect, position, rotation, scale, eye, center, up) => {
  // 初始化矩阵
  const model = mat4.create()
  const view = mat4.create()
  const proj = mat4.create()
  const mvp = mat4.create()
  const vp = mat4.create() // ✅ 新增 VP 矩阵

  // 构建透视投影矩阵
  mat4.perspective(proj, Math.PI / 4, aspect, 0.1, 2000)

  // 构建View矩阵
  mat4.lookAt(view, [eye.x, eye.y, eye.z], [center.x, center.y, center.z], [up.x, up.y, up.z])

  // 构建Model矩阵
  mat4.identity(model)
  mat4.translate(model, model, [position.x, position.y, position.z])
  mat4.rotateX(model, model, rotation.x)
  mat4.rotateY(model, model, rotation.y)
  mat4.rotateZ(model, model, rotation.z)
  mat4.scale(model, model, [scale.x, scale.y, scale.z])

  // 组合MVP矩阵
  const temp = mat4.create()
  mat4.multiply(temp, view, model)
  mat4.multiply(mvp, proj, temp)

  // 组合 VP 矩阵（天空盒用，不包含平移）
  const viewNoTranslate = mat4.clone(view)
  viewNoTranslate[12] = 0
  viewNoTranslate[13] = 0
  viewNoTranslate[14] = 0
  mat4.multiply(vp, proj, viewNoTranslate)

  return {
    model,
    mvp,
    view,
    proj,
    vp,
  }
}
const getModelMatrix = (position, rotation, scale) => {
  // 初始化矩阵
  const model = mat4.create()
  // 构建Model矩阵
  mat4.identity(model)
  mat4.translate(model, model, [position.x, position.y, position.z])
  mat4.rotateX(model, model, rotation.x)
  mat4.rotateY(model, model, rotation.y)
  mat4.rotateZ(model, model, rotation.z)
  mat4.scale(model, model, [scale.x, scale.y, scale.z])
  return model
}
const getViewMatrix = (eye, center, up) => {
  const view = mat4.create()
  mat4.lookAt(view, [eye.x, eye.y, eye.z], [center.x, center.y, center.z], [up.x, up.y, up.z])
  return view
}
const getProjMatrix = (aspect) => {
  const proj = mat4.create()
  mat4.perspective(proj, Math.PI / 4, aspect, 0.1, 2000)
  return proj
}
const getVpMatrix = (eye, center, up, aspect) => {
  const view = getViewMatrix(eye, center, up)
  const proj = getProjMatrix(aspect)
  const vp = mat4.create()
  mat4.multiply(vp, proj, view)
  return vp
}
const getSkyVpMatrix = (eye, center, up, aspect) => {
  const view = getViewMatrix(eye, center, up)
  view[12] = 0
  view[13] = 0
  view[14] = 0
  const proj = getProjMatrix(aspect)
  const vp = mat4.create()
  mat4.multiply(vp, proj, view)
  return vp
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
//加载物体纹理
const loadTexture = async (device, url) => {
  const img = await fetch(url).then((r) => r.blob())
  const bitmap = await createImageBitmap(img)
  //创建纹理
  const tex = device.createTexture({
    size: [bitmap.width, bitmap.height, 1],
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
  })
  // 将图片复制到纹理
  device.queue.copyExternalImageToTexture({ source: bitmap }, { texture: tex }, [bitmap.width, bitmap.height])
  return tex
}

//生成刚体
// const createRigidBodies = (positionArray, scaleArray, rotationArray, world, RAPIER) => {
//   positionArray.forEach((pos, i) => {
//     const scale = scaleArray[i];
//     const rotation = rotationArray[i];
//     // 创建固定刚体
//     const pillarBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed());
//     //柱子 高度需要x2
//     const collider = RAPIER.ColliderDesc.cuboid(scale.x, scale.y, scale.z).setTranslation(pos.x, pos.y, pos.z);
//     // 如果柱子有旋转（绕某轴）
//     if (rotation) {
//       // 例如绕 X 轴
//       if (rotation.x) {
//         const angle = rotation.x;
//         collider.setRotation({ x: Math.sin(angle / 2), y: 0, z: 0, w: Math.cos(angle / 2) });
//       }
//       // 绕 Y 轴
//       if (rotation.y) {
//         const angle = rotation.y;
//         collider.setRotation({ x: 0, y: Math.sin(angle / 2), z: 0, w: Math.cos(angle / 2) });
//       }
//       // 绕 Z 轴
//       if (rotation.z) {
//         const angle = rotation.z;
//         collider.setRotation({ x: 0, y: 0, z: Math.sin(angle / 2), w: Math.cos(angle / 2) });
//       }
//     }
//     world.createCollider(collider, pillarBody);
//   });
// }
const extractPositions = (verts8) => {
  const count = verts8.length / 8
  const positions = new Float32Array(count * 3)
  for (let i = 0; i < count; i++) {
    positions[i * 3 + 0] = verts8[i * 8 + 0]
    positions[i * 3 + 1] = verts8[i * 8 + 1]
    positions[i * 3 + 2] = verts8[i * 8 + 2]
  }
  return positions
}

const scalePositions = (positions, sx, sy, sz) => {
  const out = new Float32Array(positions.length)
  for (let i = 0; i < positions.length / 3; i++) {
    out[i * 3 + 0] = positions[i * 3 + 0] * sx
    out[i * 3 + 1] = positions[i * 3 + 1] * sy
    out[i * 3 + 2] = positions[i * 3 + 2] * sz
  }
  return out
}

const quatFromEuler = (rot) => {
  if (!rot) return { x: 0, y: 0, z: 0, w: 1 }
  const cx = Math.cos((rot.x || 0) / 2)
  const sx = Math.sin((rot.x || 0) / 2)
  const cy = Math.cos((rot.y || 0) / 2)
  const sy = Math.sin((rot.y || 0) / 2)
  const cz = Math.cos((rot.z || 0) / 2)
  const sz = Math.sin((rot.z || 0) / 2)

  return {
    w: cx * cy * cz + sx * sy * sz,
    x: sx * cy * cz - cx * sy * sz,
    y: cx * sy * cz + sx * cy * sz,
    z: cx * cy * sz - sx * sy * cz,
  }
}

// 生成刚体（梯形凸体）
const createRigidBodies = (
  // geometry, // { vertices: Float32Array, indices?: Uint16Array }
  vertices,
  indices,
  positionArray,
  scaleArray,
  rotationArray,
  world,
  RAPIER,
) => {
  const basePositions = extractPositions(vertices)

  positionArray.forEach((pos, i) => {
    const scale = scaleArray[i] || { x: 1, y: 1, z: 1 }
    const rot = rotationArray[i]

    const scaledPositions = scalePositions(basePositions, scale.x, scale.y, scale.z)

    const bodyDesc = RAPIER.RigidBodyDesc.fixed().setTranslation(pos.x, pos.y, pos.z).setRotation(quatFromEuler(rot))

    const body = world.createRigidBody(bodyDesc)

    // 优先 convexHull（凸体更快）
    let colliderDesc = RAPIER.ColliderDesc.convexHull(scaledPositions)

    // fallback：如果 hull 失败，用 trimesh
    if (!colliderDesc && indices) {
      colliderDesc = RAPIER.ColliderDesc.trimesh(scaledPositions, indices)
    }

    if (!colliderDesc) {
      console.warn('collider creation failed')
      return
    }

    world.createCollider(colliderDesc, body)
  })
}
const createTextureArrayFromTextures = (device, textures) => {
  const width = textures[0].width
  const height = textures[0].height
  const layerCount = textures.length

  const textureArray = device.createTexture({
    size: {
      width,
      height,
      depthOrArrayLayers: layerCount,
    },
    format: 'rgba8unorm',
    usage: GPUTextureUsage.TEXTURE_BINDING | GPUTextureUsage.COPY_DST | GPUTextureUsage.COPY_SRC | GPUTextureUsage.RENDER_ATTACHMENT,
  })

  const encoder = device.createCommandEncoder()

  for (let i = 0; i < layerCount; i++) {
    encoder.copyTextureToTexture(
      { texture: textures[i] }, // source
      { texture: textureArray, origin: { z: i } }, // destination layer
      { width, height, depthOrArrayLayers: 1 },
    )
  }

  device.queue.submit([encoder.finish()])

  return textureArray.createView({
    dimension: '2d-array',
    baseArrayLayer: 0,
    arrayLayerCount: layerCount,
  })
}
export {
  getMvpMatrix,
  createGeometry,
  loadTexture,
  createRigidBodies,
  createTextureArrayFromTextures,
  getModelMatrix,
  getViewMatrix,
  getProjMatrix,
  getVpMatrix,
  getSkyVpMatrix,
}
