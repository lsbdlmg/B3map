import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 墙壁 靠近走廊
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 6, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -152.5, y: 16, z: 65.6 },
      { x: -195.5, y: 16, z: 65.6 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 12.5, y: 16, z: 3 },
      { x: 12.5, y: 16, z: 3 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 靠近会议室
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 6, z: 9 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -208.5, y: 16, z: 36.85 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 0.5, y: 16, z: 31.75 }]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    //墙 厕所里 长
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 6, z: 9 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -184 - 1.5, y: 16, z: 28.6 },
      { x: -160 - 1.5, y: 16, z: 28.6 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 16, z: 23 },
      { x: 0.5, y: 16, z: 23 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 清洁间门口 右
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 6, z: 0.2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -166.5 - 1.5, y: 10.5, z: 51.1 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 6, y: 10.5, z: 0.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 清洁间门口 上
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 4, y: 2, z: 0.2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -172 - 1.5, y: 26.5, z: 51.1 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 11.5, y: 5.5, z: 0.5 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 男女门口 上
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 2, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -160 - 1.5, y: 26.5, z: 57.1 },
      { x: -184 - 1.5, y: 26.5, z: 57.1 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 5.5, z: 5.5 },
      { x: 0.5, y: 5.5, z: 5.5 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 4, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //女厕 左右 上下
      { x: -160 - 1.5, y: 10, z: 62.1 },
      { x: -160 - 1.5, y: 10, z: 52.1 },
      { x: -160 - 1.5, y: 20.5, z: 57.1 },
      { x: -160 - 1.5, y: 0.05, z: 57.1 },
      //男厕
      { x: -184 - 1.5, y: 10, z: 62.1 },
      { x: -184 - 1.5, y: 10, z: 52.1 },
      { x: -184 - 1.5, y: 20.5, z: 57.1 },
      { x: -184 - 1.5, y: 0.05, z: 57.1 },
      //清洁间
      { x: -183 - 1.5, y: 10, z: 51.1 },
      { x: -173 - 1.5, y: 10, z: 51.1 },
      { x: -178 - 1.5, y: 20.5, z: 51.1 },
      { x: -178 - 1.5, y: 0.05, z: 51.1 },
    ]

    DoorFrame.rotationArray = new Array(12).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 0.5, z: 5.5 },
      { x: 0.5, y: 0.05, z: 5.5 },

      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 0.5, z: 5.5 },
      { x: 0.5, y: 0.05, z: 5.5 },

      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 5.5, y: 0.5, z: 0.5 },
      { x: 5.5, y: 0.05, z: 0.5 },
    ]
    DoorFrame.textureIndex = new Array(12).fill(101)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //柱子 外侧
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    for (let i = 0; i < 6; i++) Pillar.positionArray.push({ x: -140.5 - i * 11, y: 13, z: 1.6 })
    Pillar.scaleArray = new Array(6).fill({ x: 1.5, y: 13, z: 3 })
    Pillar.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })

    Pillar.textureIndex = new Array(6).fill(4.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //墙 靠近外面 上
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 60, y: 0.2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -173.5, y: 20.5, z: 2.7 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 34.5, y: 0.5, z: 4 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙 靠近外面 下 白色
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -174, y: 2, z: 5.1 },
      { x: -174, y: 23.5, z: 5.1 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 35, y: 2, z: 0.5 },
      { x: 35, y: 2.5, z: 0.5 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //柱子  外侧 横向大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [{ x: -172, y: 29, z: 2.1 }]
    Pillar.scaleArray = [{ x: 33, y: 3, z: 3.5 }]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]

    Pillar.textureIndex = [4.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //窗框 外侧
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    WindowFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(8).fill(100)
    //外侧窗框 竖直
    for (let i = 0; i < 6; i++) WindowFrame.positionArray.push({ x: -140.5 - i * 11, y: 12, z: 5.1 })
    for (let i = 0; i < 6; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 8, z: 0.5 })
    //外侧窗框 横向
    WindowFrame.positionArray.push({ x: -172, y: 19.5, z: 5.1 })
    WindowFrame.scaleArray.push({ x: 33, y: 0.5, z: 0.5 })
    WindowFrame.positionArray.push({ x: -172, y: 4.5, z: 5.1 })
    WindowFrame.scaleArray.push({ x: 33, y: 0.5, z: 0.5 })
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
}
export default create
