import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 楼梯
  {
    const offsetY = 34
    {
      // 创建楼梯 中间平台
      const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
      const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
      StairCase.positionArray = [{ x: -730, y: 16 + offsetY, z: 73.8 }]
      StairCase.rotationArray = [{ x: 0, y: 0, z: 0 }]
      StairCase.scaleArray = [{ x: 20, y: 2, z: 9 }]
      StairCase.textureIndex = [7.1]
      createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
      Objects.push({ Object: StairCase, object: stairCase })
    }
    {
      //楼梯
      const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
      StairCase.positionArray = []
      //下台阶
      for (let i = 0; i < 8; i++) StairCase.positionArray.push({ x: -720, y: offsetY + 1 + 2 * i, z: 37.8 + 3.6 * i })
      //上台阶
      for (let i = 0; i < 8; i++) StairCase.positionArray.push({ x: -740, y: offsetY + 31 - 2 * i, z: 37.8 + 3.6 * i })
      StairCase.scaleArray = new Array(16).fill({ x: 10, y: 1, z: 1.8 },)
      StairCase.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
      StairCase.textureIndex = new Array(16).fill(7.1)
      createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
      Objects.push({ Object: StairCase, object: stairCase })
    }
    {

      // 楼梯栏杆 - 竖柱
      const Railing = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
      const railing = createGeometry(device, Railing.vertices, Railing.indices)
      Railing.positionArray = []
      Railing.scaleArray = []
      Railing.rotationArray = []
      Railing.textureIndex = []
      const postIndices = [0, 2, 5, 7]
      const xPosInner = -730 + 0.6
      const xPosOuter = -730 - 0.6
      // 下面台阶的柱子
      postIndices.forEach(i => {
        const yBase = 2 + 2 * i + offsetY
        const zPos = 37.8 + 3.6 * i
        Railing.positionArray.push({ x: xPosInner, y: yBase + 5, z: zPos })
        Railing.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        Railing.rotationArray.push({ x: 0, y: 0, z: 0 })
        Railing.textureIndex.push(103)
      })

      // 上面台阶的柱子
      postIndices.forEach(i => {
        const yBase = 31 - 2 * i + offsetY
        const zPos = 37.8 + 3.6 * i
        Railing.positionArray.push({ x: xPosOuter, y: yBase + 5, z: zPos })
        Railing.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        Railing.rotationArray.push({ x: 0, y: 0, z: 0 })
        Railing.textureIndex.push(103)
      })

      createRigidBodies(Railing.vertices, Railing.indices, Railing.positionArray, Railing.scaleArray, Railing.rotationArray, world, RAPIER)
      Objects.push({ Object: Railing, object: railing })
    }

    {

      // 楼梯栏杆 - 横栏
      const RailingPipe = createCylinder({ radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 10 })
      const railingPipe = createGeometry(device, RailingPipe.vertices, RailingPipe.indices)
      RailingPipe.positionArray = []
      RailingPipe.scaleArray = []
      RailingPipe.rotationArray = []
      RailingPipe.textureIndex = []
      const railHeights = [2.5, 4.5, 6.5, 8.5, 10.5]
      const dz = -25
      const dy = 14
      const railLength = Math.sqrt(dy * dy + dz * dz) + 1
      const angle = Math.atan2(dy, dz)
      const xPosInner = -730 + 0.6
      const xPosOuter = -730 - 0.6

      //下面台阶
      {
        const centerZ = (37.8 + (37.8 + 25.2)) / 2
        const centerY = (2 + (2 + 14)) / 2 + offsetY
        railHeights.forEach((h, idx) => {
          const isTop = idx === railHeights.length - 1
          const thick = isTop ? 1 : 0.4
          RailingPipe.positionArray.push({ x: xPosInner, y: centerY + h, z: centerZ })
          RailingPipe.rotationArray.push({ x: -(Math.PI / 2) + angle, y: 0, z: 0 })
          RailingPipe.scaleArray.push({ x: thick, y: railLength, z: thick })
          RailingPipe.textureIndex.push(104)
        })
      }

      //上面台阶
      {
        const centerZ = (37.8 + (37.8 + 25.2)) / 2
        const centerY = (31 + (31 - 14)) / 2 + offsetY
        railHeights.forEach((h, idx) => {
          const isTop = idx === railHeights.length - 1
          const thick = isTop ? 1 : 0.4
          RailingPipe.positionArray.push({ x: xPosOuter, y: centerY + h, z: centerZ })
          RailingPipe.rotationArray.push({ x: (Math.PI / 2) - angle, y: 0, z: 0 })
          RailingPipe.scaleArray.push({ x: thick, y: railLength, z: thick })
          RailingPipe.textureIndex.push(104)
        })
      }

      createRigidBodies(RailingPipe.vertices, RailingPipe.indices, RailingPipe.positionArray, RailingPipe.scaleArray, RailingPipe.rotationArray, world, RAPIER)
      Objects.push({ Object: RailingPipe, object: railingPipe })
    }
  }
  // 楼梯周围墙体 (左、右、后)
  {
    // 左墙 (Upper Ramp Side) - 分为内外两层
    const WallLeft = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wallLeft = createGeometry(device, WallLeft.vertices, WallLeft.indices)

    // Original Center: -750.5, Scale X: 0.5
    // Split into Outer (-750.75) and Inner (-750.25)
    WallLeft.positionArray = [
      { x: -751.25, y: 49, z: 59.45 }, // Outer
      { x: -750.5, y: 49, z: 59.45 }  // Inner
    ]
    WallLeft.scaleArray = [
      { x: 0.25, y: 17, z: 23.5 },
      { x: 0.5, y: 17, z: 23.5 }
    ]
    WallLeft.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    // Outer: 4.1, Inner: 5.1 (Matching reference logic where closer to room is 5.1)
    WallLeft.textureIndex = [4.1, 5.1]

    createRigidBodies(WallLeft.vertices, WallLeft.indices, WallLeft.positionArray, WallLeft.scaleArray, WallLeft.rotationArray, world, RAPIER)
    Objects.push({ Object: WallLeft, object: wallLeft })

    // 右墙 (Lower Ramp Side)
    const WallRight = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wallRight = createGeometry(device, WallRight.vertices, WallRight.indices)
    WallRight.positionArray = [{ x: -709.5, y: 49, z: 59.45 }]
    WallRight.scaleArray = [{ x: 0.5, y: 17, z: 23.5 }]
    WallRight.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallRight.textureIndex = [5.1]
    createRigidBodies(WallRight.vertices, WallRight.indices, WallRight.positionArray, WallRight.scaleArray, WallRight.rotationArray, world, RAPIER)
    Objects.push({ Object: WallRight, object: wallRight })

    // 后墙 (Platform Side)
    const WallBack = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wallBack = createGeometry(device, WallBack.vertices, WallBack.indices)
    WallBack.positionArray = [{ x: -730, y: 49, z: 83.45 }]
    WallBack.scaleArray = [{ x: 20, y: 17, z: 0.5 }]
    WallBack.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallBack.textureIndex = [5.1]
    createRigidBodies(WallBack.vertices, WallBack.indices, WallBack.positionArray, WallBack.scaleArray, WallBack.rotationArray, world, RAPIER)
    Objects.push({ Object: WallBack, object: wallBack })
  }
}
export default create
