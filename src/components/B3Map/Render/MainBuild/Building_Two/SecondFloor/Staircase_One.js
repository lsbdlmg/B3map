import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createRampTrapezoid } from '@/components/B3Map/BasicShape/createRampTrapezoid'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const PI = Math.PI
const create = (Objects, device, world, RAPIER) => {

  // 创建楼梯 中间平台
  {
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -730, y: 50, z: 74.2 }]
    StairCase.rotationArray = [{ x: 0, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 20, y: 1, z: 8.75 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }

  {
    // 创建楼梯 下层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 15, hh: 1, slices: 20, angleLeftDeg: -30, angleRightDeg: -60, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -720, y: 42.08, z: 52 }]
    StairCase.rotationArray = [{ x: -PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 10, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }
  {
    // 创建楼梯 上层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 17, hh: 1, slices: 20, angleLeftDeg: -60, angleRightDeg: 60, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -740, y: 58.06, z: 51.22 }]
    StairCase.rotationArray = [{ x: PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 10, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
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
      { x: -750.5 , y: 49, z: 59.45 }  // Inner
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
