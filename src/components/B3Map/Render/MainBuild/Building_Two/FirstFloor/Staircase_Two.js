import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createRampTrapezoid } from '@/components/B3Map/BasicShape/createRampTrapezoid'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const PI = Math.PI
const create = (Objects, device, world, RAPIER) => {

  // 创建楼梯 中间平台
  {
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -866 - 43, y: 16, z: -290.2 }]
    StairCase.rotationArray = [{ x: 0, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 20, y: 1, z: 8.75 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }

  {
    // 创建楼梯 上层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 17, hh: 1, slices: 20, angleLeftDeg: 60, angleRightDeg: -60, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -876 - 43, y: 24.06, z: -267.2 }]
    StairCase.rotationArray = [{ x: -PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 10, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }
  {
    // 创建楼梯 下层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 15, hh: 1, slices: 20, angleLeftDeg: -60, angleRightDeg: -30, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -856 - 43, y: 8.08, z: -268 }]
    StairCase.rotationArray = [{ x: PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 10, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }

  // 楼梯周围墙体 (左、右、后)
  {
    // 左墙 (Upper Ramp Side)
    // Adjusted to end at Z -252 (Corridor Edge) instead of -247
    const WallLeft = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wallLeft = createGeometry(device, WallLeft.vertices, WallLeft.indices)
    WallLeft.positionArray = [{ x: -929.5, y: 16, z: -276.5 }]
    WallLeft.scaleArray = [{ x: 0.5, y: 16, z: 24.5 }]
    WallLeft.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallLeft.textureIndex = [5.1]
    createRigidBodies(WallLeft.vertices, WallLeft.indices, WallLeft.positionArray, WallLeft.scaleArray, WallLeft.rotationArray, world, RAPIER)
    Objects.push({ Object: WallLeft, object: wallLeft })

    // 右墙 (Lower Ramp Side)
    // Adjusted to end at Z -252 (Corridor Edge) instead of -247
    const WallRight = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wallRight = createGeometry(device, WallRight.vertices, WallRight.indices)
    WallRight.positionArray = [{ x: -887.5, y: 16, z: -276.5 }]
    WallRight.scaleArray = [{ x: 1.5, y: 16, z: 24.5 }]
    WallRight.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallRight.textureIndex = [5.1]
    createRigidBodies(WallRight.vertices, WallRight.indices, WallRight.positionArray, WallRight.scaleArray, WallRight.rotationArray, world, RAPIER)
    Objects.push({ Object: WallRight, object: wallRight })

    // 后墙 (Platform Side)
    const WallBack = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wallBack = createGeometry(device, WallBack.vertices, WallBack.indices)
    WallBack.positionArray = [{ x: -909, y: 16, z: -300 }]
    WallBack.scaleArray = [{ x: 20, y: 16, z: 1 }] // Width 43
    WallBack.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallBack.textureIndex = [5.1]
    createRigidBodies(WallBack.vertices, WallBack.indices, WallBack.positionArray, WallBack.scaleArray, WallBack.rotationArray, world, RAPIER)
    Objects.push({ Object: WallBack, object: wallBack })
  }
}
export default create
