import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 四个点 (-552,36)(-652,36)(-552,109)(-652,109)
  // y shift: +34. Base 16 -> 50.
  {
    //天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 66, z: 74 }]
    Ceiling.scaleArray = [{ x: 49, y: 2, z: 37.5 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }

  // 原门口位置变成墙壁 (Front Wall at z near 37.5)
  {
    // 前墙 (原门口位置现为整面墙)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -602, y: 50, z: 37.5 }]
    Wall.scaleArray = [{ x: 49, y: 16, z: 1.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 左墙 (x=-652) - 现在这里需要开门 (靠近走廊/靠近前方)
  // 1. Door Frame on Left Wall
  {
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    // Rotate 90 degrees for side wall

    // Z position for door center. Let's pick z=48.
    const doorZ = 48

    DoorFrame.positionArray = [
      // 竖直 (x offsets, z fixed relative to door center)
      // Rotated: x is fixed (-652), z changes.
      // Front post
      { x: -652, y: 44, z: doorZ - 5 },
      { x: -652, y: 44, z: doorZ - 4.5 }, // Slight thickness adjustment if needed, but simple pillars are fine
      // Back post
      { x: -652, y: 44, z: doorZ + 5 },
      { x: -652, y: 44, z: doorZ + 4.5 },

      // 横向 (Top)
      { x: -652, y: 54.5, z: doorZ }, // y=20.5+34
      // Threshold
      { x: -652, y: 34.05, z: doorZ }, // y=0.05+34
    ]
    // Clean up the frame geometry to match the rotation
    DoorFrame.scaleArray = [
      // Posts
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      // Top bar (long in Z)
      { x: 0.5, y: 0.5, z: 5.5 },
      // Threshold
      { x: 0.5, y: 0.05, z: 5.5 },
    ]
    DoorFrame.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.textureIndex = new Array(6).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //门口左侧 短
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.positionArray.push({ x: -652, y: 50, z: 39.5 })
    Wall.scaleArray.push({ x: 1.5, y: 16, z: 3.5 })
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口右侧 长
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 6 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.positionArray.push({ x: -652, y: 50, z: 82 })
    Wall.scaleArray.push({ x: 1.5, y: 16, z: 29 })
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口上侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.positionArray.push({ x: -652, y: 60.5, z: 48 }) // y=26.5+34
    Wall.scaleArray.push({ x: 1.5, y: 5.5, z: 5 })
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙 窗框 (保持不变, y+34)
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    //竖直
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 46, z: 39.5 + i * 11 })
    for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    //横向
    WindowFrame.positionArray.push({ x: -553.5, y: 53.5, z: 72.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 33.5 })
    WindowFrame.positionArray.push({ x: -553.5, y: 38.5, z: 72.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 33.5 })
    WindowFrame.rotationArray = new Array(windowFrame.positionArray ? windowFrame.positionArray.length : 10).fill({ x: 0, y: 0, z: 0 }) // Fix potential undefined check
    const count = 7 + 2;
    WindowFrame.rotationArray = new Array(count).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(count).fill(100)
    Objects.push({ Object: WindowFrame, object: windowFrame })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
  }
  {
    //右墙 右墙里 (保持不变, y+34)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -553.5, y: 47, z: 108 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 0.5, y: 13, z: 2 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙 下墙和上墙 (保持不变, y+34)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 10 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -553.5, y: 35, z: 72.5 }, // 2+34
      { x: -553.5, y: 57, z: 72.5 }, // 23+34
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 3, z: 33.5 },
      { x: 0.5, y: 3, z: 33.5 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //右墙上方横向大柱子 (保持不变, y+34)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 10 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 63, z: 74.35 },
      { x: -553.5, y: 63, z: 74.5 }
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
    //右墙 窗户上方横柱 (保持不变, y+34)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 0.5, z: 60 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 54.5, z: 74.35 }
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
    //柱子 外侧 (保持不变, y+34)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 46, z: 48 + i * 12 })
    Pillar.scaleArray = new Array(5).fill({ x: 3, y: 14, z: 1.5 })
    Pillar.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = new Array(5).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //背墙大柱子 (保持不变, y+34)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [{ x: -550, y: 46, z: 109 }]
    Pillar.scaleArray = [{ x: 3, y: 14, z: 3 }]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]

    Pillar.textureIndex = [4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 背墙 (整面实心墙)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -603.25, y: 49, z: 110.75 }, // Inner
      { x: -603.25, y: 49, z: 111.75 }  // Outer
    ]
    Wall.scaleArray = [
      { x: 50.25, y: 17, z: 0.75 },
      { x: 50.25, y: 17, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}
export default create
