import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createSemiCylinder } from '@/components/B3Map/BasicShape/SemiCylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

// 沙发组件
const create = (
  {
    Objects,
    device,
    world,
    RAPIER,
    SofaAttribute = {
      position: { x: 0, y: 2, z: 0 }
    },
    SeatAttribute = {
      length: 30, // 底座长度
      width: 14, // 底座宽度
      height: 4, // 底座高度
      textureIndex: 100, // 纹理索引
    },
    LeftRestAttribute = {
      //对应scale
      length: 12, //对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 102, // 纹理索引
    },
    RightRestAttribute = {
      //对应scale
      length: 12,//对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 102, // 纹理索引
    },
    BackRestAttribute = {
      //对应scale
      length: 30.2, //对应y
      width: 3,     //对应x
      height: 4,    //对应z
      textureIndex: 101, // 纹理索引
    },
    Direction = 'x-',
  }
) => {
  if (Direction == 'x-') createSofaAtXNegative(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute)
  // else if (Direction == 'x+') createSofaAtXPositive()
  else if (Direction == 'z-') createSofaAtZNegative(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute)
  // else if (Direction == 'z+') createSofaAtZPositive()
}
export default create

const createSofaAtXNegative = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute
) => {
  {
    //底座
    const Seat = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
    const seatGeo = createGeometry(device, Seat.vertices, Seat.indices)
    Seat.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z
      },
    ]
    Seat.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Seat.scaleArray = [
      {
        x: SeatAttribute.width / 2,
        y: SeatAttribute.height / 2,
        z: SeatAttribute.length / 2
      },
    ]
    Seat.textureIndex = [SeatAttribute.textureIndex]
    createRigidBodies(Seat.vertices, Seat.indices, Seat.positionArray, Seat.scaleArray, Seat.rotationArray, world, RAPIER)
    Objects.push({ Object: Seat, object: seatGeo })
  }
  {
    //沙发左侧 在底座左侧
    const LeftRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: 0
    })
    const leftRest = createGeometry(device, LeftRest.vertices, LeftRest.indices)
    LeftRest.positionArray = [
      {
        x: SofaAttribute.position.x - (SeatAttribute.width - LeftRestAttribute.length) / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z - SeatAttribute.length / 2
      },
    ]
    LeftRest.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    LeftRest.scaleArray = [
      {
        x: LeftRestAttribute.width,
        y: LeftRestAttribute.length,
        z: LeftRestAttribute.height
      },
    ]
    LeftRest.textureIndex = [LeftRestAttribute.textureIndex]
    createRigidBodies(LeftRest.vertices, LeftRest.indices, LeftRest.positionArray, LeftRest.scaleArray, LeftRest.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftRest, object: leftRest })
  }
  {
    //沙发右侧 在底座右侧
    const RightRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: Math.PI / 2
    })
    const rightRest = createGeometry(device, RightRest.vertices, RightRest.indices)
    RightRest.positionArray = [
      {
        x: SofaAttribute.position.x - (SeatAttribute.width - RightRestAttribute.length) / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z + SeatAttribute.length / 2
      }, // 放在底座后面
    ]
    RightRest.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    RightRest.scaleArray = [
      {
        x: RightRestAttribute.width,
        y: RightRestAttribute.length,
        z: RightRestAttribute.height
      },
    ]
    RightRest.textureIndex = [RightRestAttribute.textureIndex]
    createRigidBodies(RightRest.vertices, RightRest.indices, RightRest.positionArray, RightRest.scaleArray, RightRest.rotationArray, world, RAPIER)
    Objects.push({ Object: RightRest, object: rightRest })
  }
  {
    //靠背
    const BackRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: -Math.PI
    })
    const backRest = createGeometry(device, BackRest.vertices, BackRest.indices)
    BackRest.positionArray = [
      {
        x: SofaAttribute.position.x + SeatAttribute.width / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    BackRest.rotationArray = [
      { x: Math.PI / 2, y: 0, z: 0 },
    ]
    BackRest.scaleArray = [
      {
        x: BackRestAttribute.width,
        y: BackRestAttribute.length,
        z: BackRestAttribute.height
      },
    ]
    BackRest.textureIndex = [BackRestAttribute.textureIndex]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
}
const createSofaAtZNegative = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute
) => {
  {
    //底座
    const Seat = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
    const seatGeo = createGeometry(device, Seat.vertices, Seat.indices)
    Seat.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z
      },
    ]
    Seat.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Seat.scaleArray = [
      {
        x: SeatAttribute.length / 2,
        y: SeatAttribute.height / 2,
        z: SeatAttribute.width / 2
      },
    ]
    Seat.textureIndex = [SeatAttribute.textureIndex]
    createRigidBodies(Seat.vertices, Seat.indices, Seat.positionArray, Seat.scaleArray, Seat.rotationArray, world, RAPIER)
    Objects.push({ Object: Seat, object: seatGeo })
  }
  {
    //沙发左侧 在底座左侧
    const LeftRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: -Math.PI / 2
    })
    const leftRest = createGeometry(device, LeftRest.vertices, LeftRest.indices)
    LeftRest.positionArray = [
      {
        x: SofaAttribute.position.x + SeatAttribute.length / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z - (SeatAttribute.width - LeftRestAttribute.length) / 2
      },
    ]
    LeftRest.rotationArray = [
      { x: -Math.PI / 2, y: 0, z: 0 },
    ]
    LeftRest.scaleArray = [
      {
        x: LeftRestAttribute.width,
        y: LeftRestAttribute.length,
        z: LeftRestAttribute.height
      },
    ]
    LeftRest.textureIndex = [LeftRestAttribute.textureIndex]
    createRigidBodies(LeftRest.vertices, LeftRest.indices, LeftRest.positionArray, LeftRest.scaleArray, LeftRest.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftRest, object: leftRest })
  }
  {
    //沙发右侧 在底座右侧
    const RightRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: Math.PI / 2
    })
    const rightRest = createGeometry(device, RightRest.vertices, RightRest.indices)
    RightRest.positionArray = [
      {
        x: SofaAttribute.position.x - SeatAttribute.length / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z - (SeatAttribute.width - RightRestAttribute.length) / 2
      }, // 放在底座后面
    ]
    RightRest.rotationArray = [
      { x: Math.PI / 2, y: 0, z: 0 },
    ]
    RightRest.scaleArray = [
      {
        x: RightRestAttribute.width,
        y: RightRestAttribute.length,
        z: RightRestAttribute.height
      },
    ]
    RightRest.textureIndex = [RightRestAttribute.textureIndex]
    createRigidBodies(RightRest.vertices, RightRest.indices, RightRest.positionArray, RightRest.scaleArray, RightRest.rotationArray, world, RAPIER)
    Objects.push({ Object: RightRest, object: rightRest })
  }
  {
    //靠背
    const BackRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: Math.PI
    })
    const backRest = createGeometry(device, BackRest.vertices, BackRest.indices)
    BackRest.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z + SeatAttribute.width / 2
      },
    ]
    BackRest.rotationArray = [
      { x: 0, y: 0, z: -Math.PI / 2 },
    ]
    BackRest.scaleArray = [
      {
        x: BackRestAttribute.height,
        y: BackRestAttribute.length,
        z: BackRestAttribute.width
      },
    ]
    BackRest.textureIndex = [101]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
}
