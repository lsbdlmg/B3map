import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 32, z: -57.5 }]
    Ceiling.scaleArray = [{ x: 49, y: 2, z: 57.5 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }
  {
    //短墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -602, y: 16, z: 0 },
      { x: -601.5, y: 16, z: -115 },
    ]
    Wall.scaleArray = [
      { x: 50, y: 16, z: 1.5 },
      { x: 47.5, y: 16, z: 1.5 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(2).fill(5.1)

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -650.5, y: 10, z: -30 },
      { x: -650.5, y: 10, z: -42 },
      //横
      { x: -650.5, y: 20.5, z: -36 },
      { x: -650.5, y: 0.05, z: -36 },
    ]
    DoorFrame.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 0.5, z: 6.5 },
      { x: 1.5, y: 0.05, z: 6.5 },
    ]
    DoorFrame.textureIndex = new Array(9).fill(101)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //门右墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -650.5, y: 16, z: -15.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 16, z: 14 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门左墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 10 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -650.5, y: 16, z: -80.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 16, z: 38 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -650.5, y: 26.5, z: -36 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 5.5, z: 6.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    //竖直
    for (let i = 0; i < 5; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12, z: -2 - i * 10 })
    for (let i = 0; i < 5; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    //竖直
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12, z: -50.5 - i * 10 })
    for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    //横向
    //4块一侧
    WindowFrame.positionArray.push({ x: -553.5, y: 19.5, z: -22 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 20.5 })

    WindowFrame.positionArray.push({ x: -553.5, y: 4.5, z: -22 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 20.5 })
    //6块一侧
    WindowFrame.positionArray.push({ x: -553.5, y: 19.5, z: -80.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.positionArray.push({ x: -553.5, y: 4.5, z: -80.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.rotationArray = new Array(20).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(20).fill(100)
    Objects.push({ Object: WindowFrame, object: windowFrame })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
  }
  {
    //窗户墙 里墙 4块玻璃一侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 6 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -553.5, y: 23, z: -22 },
      { x: -553.5, y: 2, z: -22 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 3, z: 20.5 },
      { x: 0.5, y: 2, z: 20.5 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //窗户墙 里墙 6块玻璃一侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 8 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -553.5, y: 23, z: -80.5 },
      { x: -553.5, y: 2, z: -80.5 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 3, z: 30.5 },
      { x: 0.5, y: 2, z: 30.5 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 窗户墙 大柱子 纵
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 13, z: -46.25 },
      { x: -553.5, y: 13, z: -46.25 },
      { x: -550, y: 13, z: -115 },
      { x: -553.5, y: 13, z: -115 },
    ]
    Pillar.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    Pillar.scaleArray = [
      { x: 3, y: 13, z: 4 },
      { x: 0.5, y: 13, z: 3.75 },
      { x: 3, y: 13, z: 4 },
      { x: 0.5, y: 13, z: 4 }
    ]
    Pillar.textureIndex = [4.1, 5.1, 4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗户墙 柱子 纵
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -550, y: 13, z: -3 - i * 10 })
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13, z: -60.5 - i * 10 })
    Pillar.scaleArray = new Array(9).fill({ x: 3, y: 13, z: 1.5 })
    Pillar.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = new Array(9).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗户墙 上方横向大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 30, z: -60.25 },
      { x: -553.5, y: 30, z: -60.25 }
    ]
    Pillar.scaleArray = [
      { x: 3, y: 4, z: 58.75 },
      { x: 0.5, y: 4, z: 58.75 }
    ]

    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗户墙 窗户上方横柱
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 0.5, z: 60 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 20.5, z: -60 }
    ]
    Pillar.scaleArray = [
      { x: 2.9, y: 0.5, z: 58.5 }
    ]

    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
}
export default create
