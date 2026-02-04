import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []

    // 生成8扇窗户结构
    for (let i = 0; i < 8; i++) {
      // 玻璃 Z位置
      const glassZ = 44 + i * 9
      // 玻璃 下 (1-7)
      Glass.positionArray.push({ x: -886, y: 4, z: glassZ })
      Glass.scaleArray.push({ x: 0.1, y: 3, z: 4 })
      // 玻璃 中 (8-18)
      Glass.positionArray.push({ x: -886, y: 13, z: glassZ })
      Glass.scaleArray.push({ x: 0.1, y: 5, z: 4 })
      // 玻璃 上 (19-25)
      Glass.positionArray.push({ x: -886, y: 22, z: glassZ })
      Glass.scaleArray.push({ x: 0.1, y: 3, z: 4 })
    }

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0) // 玻璃材质
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }

  // 外圈柱子间的玻璃 (X轴方向: -886 到 -754)
  {
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []

    const segments = [
      { startX: -884.5 },
      { startX: -818.5 }
    ]
    const step = 7.875
    const glassOffset = 3.9375 // 0.5 (FrameHalf) + 3.4375 (GlassHalf)

    segments.forEach(seg => {
      for (let i = 0; i < 8; i++) {
        const glassX = seg.startX + glassOffset + i * step
        // 下
        Glass.positionArray.push({ x: glassX, y: 4, z: 36 })
        Glass.scaleArray.push({ x: 3.4375, y: 3, z: 0.1 })
        // 中
        Glass.positionArray.push({ x: glassX, y: 13, z: 36 })
        Glass.scaleArray.push({ x: 3.4375, y: 5, z: 0.1 })
        // 上
        Glass.positionArray.push({ x: glassX, y: 22, z: 36 })
        Glass.scaleArray.push({ x: 3.4375, y: 3, z: 0.1 })
      }
    })

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }

  // 扩展区域：连接 -886 柱子与 4号房间墙壁 (X轴方向: -886 到 -922.5)
  // 连续4扇玻璃
  {
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []

    const startX = -889
    const step = 8.375
    const glassScaleX = 3.6875 // (8.375 / 2) - 0.5

    for (let i = 0; i < 4; i++) {
      // Center of the glass pane
      const glassX = startX - (i + 0.5) * step

      // 下
      Glass.positionArray.push({ x: glassX, y: 4, z: 115 })
      Glass.scaleArray.push({ x: glassScaleX, y: 3, z: 0.1 })
      // 中
      Glass.positionArray.push({ x: glassX, y: 13, z: 115 })
      Glass.scaleArray.push({ x: glassScaleX, y: 5, z: 0.1 })
      // 上
      Glass.positionArray.push({ x: glassX, y: 22, z: 115 })
      Glass.scaleArray.push({ x: glassScaleX, y: 3, z: 0.1 })
    }

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }

  // 后方窗户玻璃 (Z: -252)
  {
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []

    const segments = [
      { startX: -886 },
      { startX: -820 }
    ]
    const step = 8.25
    const glassOffset = 4.125

    segments.forEach(seg => {
      for (let i = 0; i < 8; i++) {
        const glassX = seg.startX + glassOffset + i * step
        // 下
        Glass.positionArray.push({ x: glassX, y: 4, z: -253 })
        Glass.scaleArray.push({ x: 4, y: 3, z: 0.1 })
        // 中
        Glass.positionArray.push({ x: glassX, y: 13, z: -253 })
        Glass.scaleArray.push({ x: 4, y: 5, z: 0.1 })
        // 上
        Glass.positionArray.push({ x: glassX, y: 22, z: -253 })
        Glass.scaleArray.push({ x: 4, y: 3, z: 0.1 })
      }
    })

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
}
export default create
