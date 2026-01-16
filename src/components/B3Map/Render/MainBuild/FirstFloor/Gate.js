import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  {    //门口大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      //门口
      { x: 27, y: 13, z: -13.4 },
      { x: 27, y: 13, z: 45.6 },
    ]
    Pillar.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Pillar.scaleArray = [
      { x: 3, y: 13, z: 2 },
      { x: 3, y: 13, z: 2 },
    ]
    Pillar.textureIndex = [4.1, 4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {    //门口上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 2 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: -0.5, y: 29, z: -12.4 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 30.5, y: 3, z: 3 },
    ]
    PillarTop.textureIndex = [4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {    //门口右侧 大墙 对半分 里外纹理不一样
    const WallRight = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wallRight = createGeometry(device, WallRight.vertices, WallRight.indices)
    WallRight.positionArray = [
      { x: -46, y: 16, z: -10.9 },
      { x: -46, y: 16, z: -13.9 },
    ]

    WallRight.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    WallRight.scaleArray = [
      { x: 15, y: 16, z: 1.5 },
      { x: 15, y: 16, z: 1.5 }
    ]
    WallRight.textureIndex = [5.1, 4.1]
    createRigidBodies(WallRight.vertices, WallRight.indices, WallRight.positionArray, WallRight.scaleArray, WallRight.rotationArray, world, RAPIER)
    Objects.push({ Object: WallRight, object: wallRight })
  }
  {    //门框 下侧6根竖直门框
    const DoorFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const doorFrame_Vertical_Down = createGeometry(device, DoorFrame_Vertical_Down.vertices, DoorFrame_Vertical_Down.indices)
    DoorFrame_Vertical_Down.positionArray = []
    for (let i = 0; i < 3; i++)    DoorFrame_Vertical_Down.positionArray.push({ x: 23.5 - i * 9, y: 9.5, z: -13 })
    for (let i = 0; i < 3; i++)    DoorFrame_Vertical_Down.positionArray.push({ x: 23.5 - (i + 4) * 9, y: 9.5, z: -13 })
    DoorFrame_Vertical_Down.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })
    DoorFrame_Vertical_Down.scaleArray = new Array(6).fill({ x: 0.5, y: 8.5, z: 0.5 })
    DoorFrame_Vertical_Down.textureIndex = new Array(6).fill(100)
    createRigidBodies(DoorFrame_Vertical_Down.vertices, DoorFrame_Vertical_Down.indices, DoorFrame_Vertical_Down.positionArray, DoorFrame_Vertical_Down.scaleArray, DoorFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Vertical_Down, object: doorFrame_Vertical_Down })
  }
  {    //门框 上侧7根竖直门框 短
    const DoorFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const doorFrame_Vertical_up = createGeometry(device, DoorFrame_Vertical_Up.vertices, DoorFrame_Vertical_Up.indices)
    DoorFrame_Vertical_Up.positionArray = [
      { x: 23.5, y: 22, z: -13 },
      { x: 14.5, y: 22, z: -13 },
      { x: 5.5, y: 22, z: -13 },
      { x: -3.5, y: 22, z: -13 },
      { x: -12.5, y: 22, z: -13 },
      { x: -21.5, y: 22, z: -13 },
      { x: -30.5, y: 22, z: -13 },
    ]
    DoorFrame_Vertical_Up.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    DoorFrame_Vertical_Up.scaleArray = [
      //门口的玻璃 上侧短
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
    ]
    DoorFrame_Vertical_Up.textureIndex = [
      100, 100, 100, 100, 100, 100, 100
    ]
    createRigidBodies(DoorFrame_Vertical_Up.vertices, DoorFrame_Vertical_Up.indices, DoorFrame_Vertical_Up.positionArray, DoorFrame_Vertical_Up.scaleArray, DoorFrame_Vertical_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Vertical_Up, object: doorFrame_Vertical_up })
  }
  {    //门框 上侧2根横向门框 长
    const DoorFrame_Horizontal_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const doorFrame_Horizontal_Up = createGeometry(device, DoorFrame_Horizontal_Up.vertices, DoorFrame_Horizontal_Up.indices)
    DoorFrame_Horizontal_Up.positionArray = [
      { x: -3.5, y: 25.5, z: -13 },
      { x: -3.5, y: 18.5, z: -13 },

    ]
    DoorFrame_Horizontal_Up.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    DoorFrame_Horizontal_Up.scaleArray = [
      { x: 27.5, y: 0.5, z: 0.5 },
      { x: 27.5, y: 0.5, z: 0.5 },
    ]
    DoorFrame_Horizontal_Up.textureIndex = [
      100, 100
    ]

    createRigidBodies(DoorFrame_Horizontal_Up.vertices, DoorFrame_Horizontal_Up.indices, DoorFrame_Horizontal_Up.positionArray, DoorFrame_Horizontal_Up.scaleArray, DoorFrame_Horizontal_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Horizontal_Up, object: doorFrame_Horizontal_Up })
  }
  {    //门框 下侧2根横向门框 短
    const DoorFrame_Horizontal_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const doorFrame_Horizontal_Down = createGeometry(device, DoorFrame_Horizontal_Down.vertices, DoorFrame_Horizontal_Down.indices)
    DoorFrame_Horizontal_Down.positionArray = [
      { x: 14.5, y: 0.5, z: -13 },
      { x: -21.5, y: 0.5, z: -13 },

    ]
    DoorFrame_Horizontal_Down.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    DoorFrame_Horizontal_Down.scaleArray = [
      { x: 9.5, y: 0.5, z: 0.5 },
      { x: 9.5, y: 0.5, z: 0.5 },
    ]
    DoorFrame_Horizontal_Down.textureIndex = [
      100, 100
    ]
    createRigidBodies(DoorFrame_Horizontal_Down.vertices, DoorFrame_Horizontal_Down.indices, DoorFrame_Horizontal_Down.positionArray, DoorFrame_Horizontal_Down.scaleArray, DoorFrame_Horizontal_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Horizontal_Down, object: doorFrame_Horizontal_Down })
  }
}
export default create
