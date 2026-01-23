import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createRampTrapezoid } from '@/components/B3Map/BasicShape/createRampTrapezoid'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const PI = Math.PI
const create = (Objects, device, world, RAPIER) => {
  {
    //地板 靠近辅导员办公室
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 31, y: 1, z: 3 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -737, y: 32, z: 18 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 185, y: 2, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  // 创建楼梯 中间平台
  {
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -730, y: 16, z: 74.2 }]
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
    StairCase.positionArray = [{ x: -720, y: 8.08, z: 52 }]
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
    StairCase.positionArray = [{ x: -740, y: 24.06, z: 51.22 }]
    StairCase.rotationArray = [{ x: PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 10, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }
}
export default create
