import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 四个点 (-552,36)(-652,36)(-552,109)(-652,109)
  {
    //天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 32, z: 73.5 }]
    Ceiling.scaleArray = [{ x: 49, y: 1, z: 37.5 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -650, y: 10, z: 36.5 },
      { x: -640, y: 10, z: 36.5 },
      { x: -638.9, y: 10, z: 36.5 },
      { x: -628.9, y: 10, z: 36.5 },
      //横向
      { x: -639.45, y: 20.5, z: 36.5 },
      { x: -639.45, y: 0.05, z: 36.5 },
    ]
    DoorFrame.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 11.05, y: 0.5, z: 0.5 },
      { x: 11.05, y: 0.05, z: 0.5 },
    ]
    DoorFrame.textureIndex = new Array(9).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //门口 旁墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -590.2, y: 16, z: 37.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 38.2, y: 16, z: 1.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 2, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -639.45, y: 26.5, z: 37.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 11.05, y: 5.5, z: 1.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //左墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 20 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -652, y: 16, z: 73 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 16, z: 37 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙 窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    //竖直
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12, z: 39.5 + i * 11 })
    for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    //横向
    WindowFrame.positionArray.push({ x: -553.5, y: 19.5, z: 72.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 33.5 })
    WindowFrame.positionArray.push({ x: -553.5, y: 4.5, z: 72.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 33.5 })
    WindowFrame.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(10).fill(100)
    Objects.push({ Object: WindowFrame, object: windowFrame })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
  }
  {
    //右墙 右墙里
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -553.5, y: 13, z: 108 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 0.5, y: 13, z: 2 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙 下墙和上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 20 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -553.5, y: 2, z: 72.5 },
      { x: -553.5, y: 23, z: 72.5 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 2, z: 33.5 },
      { x: 0.5, y: 3, z: 33.5 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙上方横向大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 29, z: 74.35 },
      { x: -553.5, y: 29, z: 74.5 }
    ]
    Pillar.scaleArray = [
      { x: 3, y: 3, z: 37.65 },
      { x: 0.5, y: 3, z: 35.5 }
    ]

    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //右墙 窗户上方横柱
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 0.5, z: 60 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 20.5, z: 74.35 }
    ]
    Pillar.scaleArray = [
      { x: 2.9, y: 0.5, z: 37.65 }
    ]

    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //柱子 外侧
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13, z: 48 + i * 12 })
    Pillar.scaleArray = new Array(5).fill({ x: 3, y: 13, z: 1.5 })
    Pillar.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = new Array(5).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //背墙大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [{ x: -550, y: 13, z: 109 }]
    Pillar.scaleArray = [{ x: 3, y: 13, z: 3 }]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]

    Pillar.textureIndex = [4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //背墙  窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    //竖直
    for (let i = 0; i < 8; i++) WindowFrame.positionArray.push({ x: -563.5 - i * 11, y: 9.5, z: 111.5 })
    for (let i = 0; i < 8; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
    for (let i = 0; i < 8; i++) WindowFrame.positionArray.push({ x: -563.5 - i * 11, y: 22, z: 111.5 })
    for (let i = 0; i < 8; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 3, z: 0.5 })
    //横向
    WindowFrame.positionArray.push({ x: -602, y: 25.5, z: 111.5 })
    WindowFrame.scaleArray.push({ x: 39, y: 0.5, z: 0.5 })
    WindowFrame.positionArray.push({ x: -602, y: 18.5, z: 111.5 })
    WindowFrame.scaleArray.push({ x: 39, y: 0.5, z: 0.5 })
    WindowFrame.positionArray.push({ x: -602, y: 0.5, z: 111.5 })
    WindowFrame.scaleArray.push({ x: 39, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(20).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(20).fill(100)
    Objects.push({ Object: WindowFrame, object: windowFrame })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
  }
  {
    //背墙 上下墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -602, y: 29, z: 110.5 },
      { x: -602, y: 29, z: 111.5 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 39, y: 3, z: 0.5 },
      { x: 39, y: 3, z: 0.5 },
    ]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //背墙 右墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -558, y: 16, z: 110.5 },
      { x: -558, y: 16, z: 111.5 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.scaleArray = new Array(2).fill({ x: 5, y: 16, z: 0.5 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //背墙 左墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -647.25, y: 16, z: 110.5 },
      { x: -647.25, y: 16, z: 111.5 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.scaleArray = new Array(2).fill({ x: 6.25, y: 16, z: 0.5 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}
export default create
