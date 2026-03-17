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
      textureIndex: 105, // 纹理索引
    },
    LeftRestAttribute = {
      //对应scale
      length: 12, //对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 107, // 纹理索引
    },
    RightRestAttribute = {
      //对应scale
      length: 12,//对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 107, // 纹理索引
    },
    BackRestAttribute = {
      //对应scale
      width: 3,     //对应x
      height: 5,    //对应z
      textureIndex: 105, // 纹理索引
    },
    FootRestAttribute = {
      //对应scale
      height: 0.5,//对应z
      textureIndex: 105, // 纹理索引
    },
    SeatTopAttribute = {
      //对应scale
      height: 0.5,//对应z
      textureIndex: 105 // 纹理索引
    },
    Direction = 'x-',
  }
) => {
  if (Direction == 'x-') createSofaAtXNegative(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute, FootRestAttribute, SeatTopAttribute)
  else if (Direction == 'x+') createSofaAtXPositive(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute, FootRestAttribute, SeatTopAttribute)
  else if (Direction == 'z-') createSofaAtZNegative(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute, FootRestAttribute, SeatTopAttribute)
  else if (Direction == 'z+') createSofaAtZPositive(Objects, device, world, RAPIER, SofaAttribute, SeatAttribute, LeftRestAttribute, RightRestAttribute, BackRestAttribute, FootRestAttribute, SeatTopAttribute)
}
export default create
// 沙发组件创建函数，根据不同的朝向创建沙发
// x负半轴朝向
const createSofaAtXNegative = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute,
  FootRestAttribute,
  SeatTopAttribute
) => {
  //底座
  {
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
  //沙发左侧 在底座左侧
  {
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
  //沙发右侧 在底座右侧
  {

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
  //靠背
  {
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
        y: SeatAttribute.length * 0.99,
        z: BackRestAttribute.height
      },
    ]
    BackRest.textureIndex = [BackRestAttribute.textureIndex]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
  //沙发前底
  {

    const FootRest = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: Math.PI
    })
    const footRest = createGeometry(device, FootRest.vertices, FootRest.indices)
    FootRest.positionArray = [
      {
        x: SofaAttribute.position.x - SeatAttribute.width / 2,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z
      },
    ]
    FootRest.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    FootRest.scaleArray = [
      {
        x: FootRestAttribute.height,
        y: SeatAttribute.height,
        z: SeatAttribute.length / 2
      },
    ]
    FootRest.textureIndex = [FootRestAttribute.textureIndex]
    createRigidBodies(FootRest.vertices, FootRest.indices, FootRest.positionArray, FootRest.scaleArray, FootRest.rotationArray, world, RAPIER)
    Objects.push({ Object: FootRest, object: footRest })
  }
  //底座上侧 坐的地方
  {
    const SeatTop = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: 0
    })
    const seatTop = createGeometry(device, SeatTop.vertices, SeatTop.indices)
    SeatTop.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    SeatTop.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    SeatTop.scaleArray = [
      {
        x: SeatTopAttribute.height,
        y: SeatAttribute.width - 0.1,
        z: SeatAttribute.length / 2
      },
    ]
    SeatTop.textureIndex = [SeatTopAttribute.textureIndex]
    createRigidBodies(SeatTop.vertices, SeatTop.indices, SeatTop.positionArray, SeatTop.scaleArray, SeatTop.rotationArray, world, RAPIER)
    Objects.push({ Object: SeatTop, object: seatTop })
  }
}
// x正半轴朝向
const createSofaAtXPositive = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute,
  FootRestAttribute,
  SeatTopAttribute

) => {
  //底座
  {
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
  //沙发左侧 在底座左侧
  {
    const LeftRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: -Math.PI
    })
    const leftRest = createGeometry(device, LeftRest.vertices, LeftRest.indices)
    LeftRest.positionArray = [
      {
        x: SofaAttribute.position.x + (SeatAttribute.width - LeftRestAttribute.length) / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z + SeatAttribute.length / 2
      },
    ]
    LeftRest.rotationArray = [
      { x: 0, y: 0, z: -Math.PI / 2 },
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
  //沙发右侧 在底座右侧
  {
    const RightRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: -Math.PI / 2
    })
    const rightRest = createGeometry(device, RightRest.vertices, RightRest.indices)
    RightRest.positionArray = [
      {
        x: SofaAttribute.position.x + (SeatAttribute.width - RightRestAttribute.length) / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z - SeatAttribute.length / 2
      }, // 放在底座后面
    ]
    RightRest.rotationArray = [
      { x: 0, y: 0, z: -Math.PI / 2 },
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
  //靠背
  {
    const BackRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: 0
    })
    const backRest = createGeometry(device, BackRest.vertices, BackRest.indices)
    BackRest.positionArray = [
      {
        x: SofaAttribute.position.x - SeatAttribute.width / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    BackRest.rotationArray = [
      { x: -Math.PI / 2, y: 0, z: 0 },
    ]
    BackRest.scaleArray = [
      {
        x: BackRestAttribute.width,
        y: SeatAttribute.length * 0.99,
        z: BackRestAttribute.height
      },
    ]
    BackRest.textureIndex = [BackRestAttribute.textureIndex]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
  //沙发前底
  {

    const FootRest = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: Math.PI
    })
    const footRest = createGeometry(device, FootRest.vertices, FootRest.indices)
    FootRest.positionArray = [
      {
        x: SofaAttribute.position.x + SeatAttribute.width / 2,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z
      },
    ]
    FootRest.rotationArray = [
      { x: 0, y: Math.PI , z: 0 },
    ]
    FootRest.scaleArray = [
      {
        x: FootRestAttribute.height,
        y: SeatAttribute.height,
        z: SeatAttribute.length / 2
      },
    ]
    FootRest.textureIndex = [FootRestAttribute.textureIndex]
    createRigidBodies(FootRest.vertices, FootRest.indices, FootRest.positionArray, FootRest.scaleArray, FootRest.rotationArray, world, RAPIER)
    Objects.push({ Object: FootRest, object: footRest })
  }
  //底座上侧 坐的地方
  {
    const SeatTop = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: 0
    })
    const seatTop = createGeometry(device, SeatTop.vertices, SeatTop.indices)
    SeatTop.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    SeatTop.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    SeatTop.scaleArray = [
      {
        x: SeatTopAttribute.height,
        y: SeatAttribute.width - 0.1,
        z: SeatAttribute.length / 2
      },
    ]
    SeatTop.textureIndex = [SeatTopAttribute.textureIndex]
    createRigidBodies(SeatTop.vertices, SeatTop.indices, SeatTop.positionArray, SeatTop.scaleArray, SeatTop.rotationArray, world, RAPIER)
    Objects.push({ Object: SeatTop, object: seatTop })
  }
}
// z负半轴朝向
const createSofaAtZNegative = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute,
  FootRestAttribute,
  SeatTopAttribute
) => {
  //底座
  {
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
  //沙发左侧 在底座左侧
  {
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
  //沙发右侧 在底座右侧
  {
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
  //靠背
  {
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
        y: SeatAttribute.length * 0.99,
        z: BackRestAttribute.width
      },
    ]
    BackRest.textureIndex = [BackRestAttribute.textureIndex]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
  //底座上侧 坐的地方
  {
    const SeatTop = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: 0,
      axis: 'z'
    })
    const seatTop = createGeometry(device, SeatTop.vertices, SeatTop.indices)
    SeatTop.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    SeatTop.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    SeatTop.scaleArray = [
      {
        x: SeatTopAttribute.height,
        y: SeatAttribute.length / 2,
        z: SeatAttribute.width - 0.1
      },
    ]
    SeatTop.textureIndex = [SeatTopAttribute.textureIndex]
    createRigidBodies(SeatTop.vertices, SeatTop.indices, SeatTop.positionArray, SeatTop.scaleArray, SeatTop.rotationArray, world, RAPIER)
    Objects.push({ Object: SeatTop, object: seatTop })
  }
  //沙发前底
  {

    const FootRest = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: Math.PI
    })
    const footRest = createGeometry(device, FootRest.vertices, FootRest.indices)
    FootRest.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z - SeatAttribute.width / 2
      },
    ]
    FootRest.rotationArray = [
      { x: 0, y: -Math.PI / 2, z: 0 },
    ]
    FootRest.scaleArray = [
      {
        x: FootRestAttribute.height,
        y: SeatAttribute.height,
        z: SeatAttribute.length / 2
      },
    ]
    FootRest.textureIndex = [FootRestAttribute.textureIndex]
    createRigidBodies(FootRest.vertices, FootRest.indices, FootRest.positionArray, FootRest.scaleArray, FootRest.rotationArray, world, RAPIER)
    Objects.push({ Object: FootRest, object: footRest })
  }

}
// z正半轴朝向
const createSofaAtZPositive = (
  Objects,
  device,
  world,
  RAPIER,
  SofaAttribute,
  SeatAttribute,
  LeftRestAttribute,
  RightRestAttribute,
  BackRestAttribute,
  FootRestAttribute,
  SeatTopAttribute
) => {
  //底座
  {
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
  //沙发左侧 在底座左侧
  {
    const LeftRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: Math.PI / 2
    })
    const leftRest = createGeometry(device, LeftRest.vertices, LeftRest.indices)
    LeftRest.positionArray = [
      {
        x: SofaAttribute.position.x - SeatAttribute.length / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z + (SeatAttribute.width - LeftRestAttribute.length) / 2
      },
    ]
    LeftRest.rotationArray = [
      { x: Math.PI / 2, y: 0, z: 0 },
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
  //沙发右侧 在底座右侧
  {
    const RightRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: -Math.PI / 2
    })
    const rightRest = createGeometry(device, RightRest.vertices, RightRest.indices)
    RightRest.positionArray = [
      {
        x: SofaAttribute.position.x + SeatAttribute.length / 2,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z + (SeatAttribute.width - RightRestAttribute.length) / 2
      }, // 放在底座后面
    ]
    RightRest.rotationArray = [
      { x: -Math.PI / 2, y: 0, z: 0 },
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
  //靠背
  {
    const BackRest = createSemiCylinder({
      thetaLength: Math.PI / 2, // 半圆 (180度)
      thetaStart: 0
    })
    const backRest = createGeometry(device, BackRest.vertices, BackRest.indices)
    BackRest.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z - SeatAttribute.width / 2
      },
    ]
    BackRest.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    BackRest.scaleArray = [
      {
        x: BackRestAttribute.height,
        y: SeatAttribute.length * 0.99,
        z: BackRestAttribute.width
      },
    ]
    BackRest.textureIndex = [101]
    createRigidBodies(BackRest.vertices, BackRest.indices, BackRest.positionArray, BackRest.scaleArray, BackRest.rotationArray, world, RAPIER)
    Objects.push({ Object: BackRest, object: backRest })
  }
  //底座上侧 坐的地方
  {
    const SeatTop = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: 0,
      axis: 'z'
    })
    const seatTop = createGeometry(device, SeatTop.vertices, SeatTop.indices)
    SeatTop.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y + SeatAttribute.height / 2,
        z: SofaAttribute.position.z
      },
    ]
    SeatTop.rotationArray = [
      { x: 0, y: 0, z: Math.PI / 2 },
    ]
    SeatTop.scaleArray = [
      {
        x: SeatTopAttribute.height,
        y: SeatAttribute.length / 2,
        z: SeatAttribute.width - 0.1
      },
    ]
    SeatTop.textureIndex = [101]
    createRigidBodies(SeatTop.vertices, SeatTop.indices, SeatTop.positionArray, SeatTop.scaleArray, SeatTop.rotationArray, world, RAPIER)
    Objects.push({ Object: SeatTop, object: seatTop })
  }
  // 沙发前底
  {

    const FootRest = createSemiCylinder({
      thetaLength: Math.PI, // 半圆 (180度)
      thetaStart: Math.PI
    })
    const footRest = createGeometry(device, FootRest.vertices, FootRest.indices)
    FootRest.positionArray = [
      {
        x: SofaAttribute.position.x,
        y: SofaAttribute.position.y,
        z: SofaAttribute.position.z + SeatAttribute.width / 2
      },
    ]
    FootRest.rotationArray = [
      { x: 0, y: Math.PI / 2, z: 0 },
    ]
    FootRest.scaleArray = [
      {
        x: FootRestAttribute.height,
        y: SeatAttribute.height,
        z: SeatAttribute.length / 2
      },
    ]
    FootRest.textureIndex = [FootRestAttribute.textureIndex]
    createRigidBodies(FootRest.vertices, FootRest.indices, FootRest.positionArray, FootRest.scaleArray, FootRest.rotationArray, world, RAPIER)
    Objects.push({ Object: FootRest, object: footRest })
  }
}
