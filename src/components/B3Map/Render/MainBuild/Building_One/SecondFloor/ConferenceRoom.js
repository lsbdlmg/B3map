import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    const offsetX = 417
    const offsetY = 34
    DoorFrame.positionArray = [
      //竖直
      { x: -650 + offsetX, y: 10 + offsetY, z: 65.6 },
      { x: -640 + offsetX, y: 10 + offsetY, z: 65.6 },
      { x: -638.9 + offsetX, y: 10 + offsetY, z: 65.6 },
      { x: -628.9 + offsetX, y: 10 + offsetY, z: 65.6 },
      //横向
      { x: -639.45 + offsetX, y: 20.5 + offsetY, z: 65.6 },
      { x: -639.45 + offsetX, y: 0.05 + offsetY, z: 65.6 },
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
    //墙 门口上方
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -639.45 + 417, y: 25.5 + 34, z: 65.6 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 11.05, y: 4.5, z: 2 }]
    Wall.textureIndex = [5.1,]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 靠近厕所
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -207, y: 50, z: -13.1 },
      { x: -210.25, y: 50, z: -13.1 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 2, y: 16, z: 19 },
      { x: 1.25, y: 16, z: 19 },
    ]
    Wall.textureIndex = [4.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 靠近厕所 但是在会议室内侧
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -210.25, y: 50, z: 37 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 1.25, y: 16, z: 31.6 }]
    Wall.textureIndex = [5.1,]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //靠外窗户墙 柱子 里外纹理
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -209.1, y: 47, z: -34.1 },
      { x: -206.9 - 6 * 30.5, y: 47, z: -34.1 - 1 },//最后一根
      { x: -206.9 - 6 * 30.5, y: 47, z: -34.1 + 1 },
    ]
    for (let i = 1; i < 6; i++) Pillar.positionArray.push({ x: -208 - i * 30.5, y: 47, z: -34.1 - 1 }) //外墙
    for (let i = 1; i < 6; i++) Pillar.positionArray.push({ x: -208 - i * 30.5, y: 47, z: -34.1 + 1 }) //内墙
    Pillar.scaleArray = [
      { x: 3.9, y: 13, z: 2 },

      { x: 3.9, y: 13, z: 1 },
      { x: 3.9, y: 13, z: 1 },
    ]
    for (let i = 1; i < 6; i++) Pillar.scaleArray.push({ x: 5, y: 13, z: 1 })
    for (let i = 1; i < 6; i++) Pillar.scaleArray.push({ x: 5, y: 13, z: 1 })
    Pillar.rotationArray = new Array(20).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = [4.1, 4.1, 5.1]
    for (let i = 1; i < 6; i++) Pillar.textureIndex.push(4.1) //外墙
    for (let i = 1; i < 6; i++) Pillar.textureIndex.push(5.1) //内墙
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }

  {
    //靠外窗户墙 窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    for (let j = 0; j < 6; j++) {
      let offsetX = 30.5 * j
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -213.25 - offsetX - i * 10, y: 47, z: -35.1 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 34.5, z: -35.1 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 41.5, z: -35.1 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 52.5, z: -35.1 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 59.5, z: -35.1 }) //竖直
      for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 13, z: 0.5 })
      for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 10, y: 0.5, z: 0.5 })
    }

    WindowFrame.rotationArray = new Array(100).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(100).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }

  {
    //靠外窗户墙 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 30, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: -299.5, y: 63, z: -34.1 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 94.3, y: 3, z: 2 },
    ]
    PillarTop.textureIndex = [4.1, 4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
  }
  {
    //靠近走廊 窗户间柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 1; i < 6; i++) Pillar.positionArray.push({ x: -208 - i * 30.5, y: 50.5, z: 65.6 }) //外墙
    Pillar.scaleArray = []
    for (let i = 1; i < 6; i++) Pillar.scaleArray.push({ x: 5, y: 9.5, z: 2 })
    Pillar.rotationArray = new Array(20).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(20).fill(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //靠近走廊 窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    for (let j = 1; j < 5; j++) {
      let offsetX = 30.5 * j
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -213.25 - offsetX - i * 10, y: 50.5, z: 65.6 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 41.5, z: 65.6 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 52.5, z: 65.6 }) //竖直
      WindowFrame.positionArray.push({ x: -223.25 - offsetX, y: 59.5, z: 65.6 }) //竖直
      for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 9.5, z: 0.5 })
      for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 10, y: 0.5, z: 0.5 })
    }
    WindowFrame.rotationArray = new Array(100).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(100).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //靠近走廊 上下墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -299.5, y: 37.5, z: 65.6 },
      { x: -299.5, y: 62, z: 65.6 },
    ]
    Wall.scaleArray = [
      { x: 66, y: 3.5, z: 2 },
      { x: 66, y: 2, z: 2 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //小房间外墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 6 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -391, y: 50, z: -14.65 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 3, y: 16, z: 21.25 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //小房间短墙 靠近走廊
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -376.75, y: 50, z: 4.6 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 11.25, y: 16, z: 2 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //靠近后门 墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 10 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -363.5, y: 50, z: 27.1 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 2, y: 16, z: 36.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}

export default create
