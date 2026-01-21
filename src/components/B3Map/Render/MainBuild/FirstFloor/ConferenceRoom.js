import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //大厅门口 旁边墙壁大柱子 分开 里外纹理不一样
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [{ x: -208 - 3 * 61, y: 13, z: 2.6 }]
    for (let i = 0; i < 3; i++) Pillar.positionArray.push({ x: -208 - i * 61, y: 13, z: 0.1 }) //外墙
    for (let i = 0; i < 3; i++) Pillar.positionArray.push({ x: -208 - i * 61, y: 13, z: 4.1 }) //内墙
    for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -208 - i * 61, y: 13, z: -32.1 })
    Pillar.scaleArray = [{ x: 3, y: 13, z: 4 }]
    for (let i = 0; i < 3; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 1.5 })
    for (let i = 0; i < 3; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 2.5 })
    for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 4 })
    Pillar.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1]
    for (let i = 0; i < 3; i++) Pillar.textureIndex.push(4.1) //外墙
    for (let i = 0; i < 3; i++) Pillar.textureIndex.push(5.1) //内墙
    for (let i = 0; i < 4; i++) Pillar.textureIndex.push(4.1) //内墙
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //大厅门口 旁边墙壁 横向大柱子 连接外面大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 3 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -208 - i * 61, y: 29, z: -14.75 })
    Pillar.scaleArray = []
    for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 3, z: 13.35 })
    Pillar.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(4).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //大厅门口 旁边墙壁 窗框 上下3层 上侧竖直 上 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 22, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 22, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 22, z: 1.5 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //大厅门口 旁边墙壁 窗框 上下3层 上侧竖直 中 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 13, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 13, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 13, z: 1.5 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 5, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //大厅门口 旁边墙壁 窗框 上下3层 上侧竖直 下 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 4, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 4, z: 1.5 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 4, z: 1.5 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //大厅门口 旁边墙壁 窗框 上下3层 横向 长 4根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -34 - 204.5 - 61, y: 25.5, z: 1.5 },
      { x: -34 - 204.5 - 61, y: 18.5, z: 1.5 },
      { x: -34 - 204.5 - 61, y: 7.5, z: 1.5 },
      { x: -34 - 204.5 - 61, y: 0.5, z: 1.5 },
    ]
    WindowFrame.scaleArray = []
    for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 119 - 30.5, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(5).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //大厅门口 旁边墙壁上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 30, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: -299.5, y: 29, z: 2.6 },
      { x: -299.5, y: 29, z: -32.1 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 94.5, y: 3, z: 4 },
      { x: 94.5, y: 3, z: 4 },
    ]
    PillarTop.textureIndex = [4.1, 4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {
    //后侧墙壁上侧 横向大柱子 背对门口
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 15 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [{ x: -391, y: 29, z: 52.85 }]

    PillarTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
    PillarTop.scaleArray = [{ x: 3, y: 3, z: 46.25 }]
    PillarTop.textureIndex = [4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -208, y: 10, z: 98.6 },
      { x: -208, y: 10, z: 95.5 },
      { x: -208, y: 10, z: 94.4 },
      { x: -208, y: 10, z: 84.4 },
      { x: -208, y: 10, z: 83.3 },
      { x: -208, y: 10, z: 73.3 },
      { x: -208, y: 10, z: 72.2 },
      { x: -208, y: 10, z: 69.1 },
      //横向
      { x: -208, y: 20.5, z: 83.85 },
      { x: -208, y: 0.05, z: 83.85 },
    ]

    DoorFrame.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 0.5, z: 15.25 },
      { x: 0.5, y: 0.05, z: 15.25 },
    ]
    DoorFrame.textureIndex = new Array(10).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //墙 门口上侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 2, z: 4 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -208, y: 26.5, z: 83.85 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 0.5, y: 5.5, z: 15.25 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //后侧墙 窗框 上下2层 横向3根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 10, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    //下侧长
    for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -391, y: 9.5, z: 98.6 - i * 9 })
    //上侧短
    for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -391, y: 22, z: 98.6 - i * 9 })
    //横向3根
    WindowFrame.positionArray.push({ x: -391, y: 0.5, z: 85.1 })
    WindowFrame.positionArray.push({ x: -391, y: 18.5, z: 85.1 })
    WindowFrame.positionArray.push({ x: -391, y: 25.5, z: 85.1 })

    WindowFrame.scaleArray = []
    for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
    for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 3, z: 0.5 })
    for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 14 })
    WindowFrame.rotationArray = new Array(11).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(11).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后门 门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -391, y: 10, z: 7.1 },
      { x: -391, y: 10, z: 17.1 },
      { x: -391, y: 10, z: 18.2 },
      { x: -391, y: 10, z: 28.2 },
      //横向
      { x: -391, y: 20.5, z: 17.65 },
      { x: -391, y: 0.05, z: 17.65 },
    ]
    DoorFrame.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },

      { x: 0.5, y: 0.5, z: 11.05 },
      { x: 0.5, y: 0.05, z: 11.05 },
    ]
    DoorFrame.textureIndex = new Array(9).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //后侧门口 上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 1, z: 3 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -391, y: 23.5, z: 17.65 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 3, y: 2.5, z: 11.05 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //后侧墙壁 墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 5, z: 6 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -391, y: 13, z: 50.15 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 3, y: 13, z: 21.45 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}

export default create
