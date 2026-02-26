import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } }) //宽度1,高度1,深度1
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 32, z: -184}]
    Ceiling.scaleArray = [{ x: 49, y: 2, z: 69}]
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
      { x: -601.5, y: 16, z: -253 },
    ]
    Wall.scaleArray = [
      { x: 47.5, y: 16, z: 1.5 },
    ]
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -650.5, y: 10, z: -119 },
      { x: -650.5, y: 10, z: -131 },
      //横
      { x: -650.5, y: 20.5, z: -125 },
      { x: -650.5, y: 0.05, z: -125 },
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
    //门上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -650.5, y: 26.5, z: -125 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 5.5, z: 6.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门左墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 15 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -650.5, y: 16, z: -194 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.5, y: 16, z: 62.5 }]
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
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12, z: -119.5 - i * 10 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12, z: -188.5 - i * 10 })
    for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    //横向
    //6块一侧
    WindowFrame.positionArray.push({ x: -553.5, y: 19.5, z: -149.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.positionArray.push({ x: -553.5, y: 4.5, z: -149.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    //6块一侧
    WindowFrame.positionArray.push({ x: -553.5, y: 19.5, z: -218.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.positionArray.push({ x: -553.5, y: 4.5, z: -218.5 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    WindowFrame.rotationArray = new Array(20).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(20).fill(100)
    Objects.push({ Object: WindowFrame, object: windowFrame })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
  }
  {
    //窗户墙 柱子 纵
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13, z: -129.5 - i * 10 })
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13, z: -198.5 - i * 10 })
    Pillar.scaleArray = new Array(10).fill({ x: 3, y: 13, z: 1.5 })
    Pillar.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = new Array(10).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 窗户墙 大柱子 纵
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 13, z: -184 },
      { x: -553.5, y: 13, z: -184 },
      { x: -550, y: 13, z: -253 },
      { x: -553.5, y: 13, z: -253 },
    ]
    Pillar.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    Pillar.scaleArray = [
      { x: 3, y: 13, z: 4 },
      { x: 0.5, y: 13, z: 4 },
      { x: 3, y: 13, z: 4 },
      { x: 0.5, y: 13, z: 4 }
    ]
    Pillar.textureIndex = [4.1, 5.1, 4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }

  {
    //窗户墙 窗户上方横柱
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 0.5, z: 60 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 20.5, z: -149.5 },
      { x: -550, y: 20.5, z: -218.5 }
    ]
    Pillar.scaleArray = [
      { x: 2.9, y: 0.5, z: 30.5 },
      { x: 2.9, y: 0.5, z: 30.5 }
    ]
    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = [4.1, 4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗户墙 上方大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 20 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -550, y: 30, z: -188 },
      { x: -553.5, y: 30, z: -188 }
    ]
    Pillar.scaleArray = [
      { x: 3, y: 4, z: 69 },
      { x: 0.5, y: 4, z: 69 }
    ]
    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = [4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗户墙 里墙 6块玻璃一侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 8 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -553.5, y: 23, z: -149.5 },
      { x: -553.5, y: 23, z: -218.5 },
      { x: -553.5, y: 2, z: -149.5 },
      { x: -553.5, y: 2, z: -218.5 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 3, z: 30.5 },
      { x: 0.5, y: 3, z: 30.5 },
      { x: 0.5, y: 2, z: 30.5 },
      { x: 0.5, y: 2, z: 30.5 },
    ]
    Wall.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 5.1, 5.1, 5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}
export default create
