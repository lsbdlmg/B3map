import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  const Y_OFFSET = 34
  {
    // 天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } })
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 32 + Y_OFFSET, z: -98.5 }]
    Ceiling.scaleArray = [{ x: 49, y: 2, z: 98.5 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }

  {
    // 短墙 (End Walls) - At Z=0 and Z=-197
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -602, y: 16 + Y_OFFSET, z: 0 },
      { x: -601.5, y: 16 + Y_OFFSET, z: -185 },
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
  // --- 走廊墙 (Corridor Wall) x = -650.5 ---
  {
    // 门框 (Door Frames)
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)

    // Door 1 (-20) & Door 2 (-177)
    // Verticals: +/- 6 from center. Horizontals: center.
    // 1st Floor Vert Y: 10 -> 44. Top Y: 20.5 -> 54.5. Bottom Y: 0.05 -> 34.05.

    DoorFrame.positionArray = [
      // Door 1 Verticals
      { x: -650.5, y: 10 + Y_OFFSET, z: -14 },
      { x: -650.5, y: 10 + Y_OFFSET, z: -26 },
      // Door 2 Verticals
      { x: -650.5, y: 10 + Y_OFFSET, z: -171 },
      { x: -650.5, y: 10 + Y_OFFSET, z: -183 },

      // Door 1 Horizontals
      { x: -650.5, y: 20.5 + Y_OFFSET, z: -20 },
      { x: -650.5, y: 0.05 + Y_OFFSET, z: -20 },
      // Door 2 Horizontals
      { x: -650.5, y: 20.5 + Y_OFFSET, z: -177 },
      { x: -650.5, y: 0.05 + Y_OFFSET, z: -177 },
    ]

    DoorFrame.scaleArray = [
      // Verticals
      { x: 1.5, y: 10, z: 0.5 }, { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 10, z: 0.5 }, { x: 1.5, y: 10, z: 0.5 },
      // Horizontals
      { x: 1.5, y: 0.5, z: 6.5 }, { x: 1.5, y: 0.05, z: 6.5 },
      { x: 1.5, y: 0.5, z: 6.5 }, { x: 1.5, y: 0.05, z: 6.5 },
    ]

    DoorFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.textureIndex = new Array(8).fill(101)

    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }

  {
    // 门上墙 (Wall Above Doors)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    // 1st Floor Y: 26.5 -> 60.5
    Wall.positionArray = [
      { x: -650.5, y: 26.5 + Y_OFFSET, z: -20 },
      { x: -650.5, y: 26.5 + Y_OFFSET, z: -177 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [
      { x: 1.5, y: 5.5, z: 6.5 },
      { x: 1.5, y: 5.5, z: 6.5 }
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    // 窗框 (Window Frames) - Corridor Wall
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []

    // Window Set 1 Center -65 (Range -35 to -95). 6 Windows -> 7 verticals. Stride 10.
    // Start -35.
    for (let i = 0; i < 7; i++) {
      WindowFrame.positionArray.push({ x: -650.5, y: 12 + Y_OFFSET, z: -35 - i * 10 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    }

    // Window Set 2 Center -132 (Range -102 to -162).
    // Start -102.
    for (let i = 0; i < 7; i++) {
      WindowFrame.positionArray.push({ x: -650.5, y: 12 + Y_OFFSET, z: -102 - i * 10 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    }

    // Horizontals (Top/Bottom) for Sets
    // Set 1
    WindowFrame.positionArray.push({ x: -650.5, y: 19.5 + Y_OFFSET, z: -65 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    WindowFrame.positionArray.push({ x: -650.5, y: 4.5 + Y_OFFSET, z: -65 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    // Set 2
    WindowFrame.positionArray.push({ x: -650.5, y: 19.5 + Y_OFFSET, z: -132 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    WindowFrame.positionArray.push({ x: -650.5, y: 4.5 + Y_OFFSET, z: -132 })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.rotationArray = new Array(WindowFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(WindowFrame.positionArray.length).fill(100)

    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }

  {
    // 窗户墙 上下侧墙 (Wall Above/Below Windows - Corridor Side)
    // Similar logic to 'Wall Above Doors' or 'Wall Below Windows'
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 6 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      // Set 1
      { x: -650.5, y: 26 + Y_OFFSET, z: -65 },
      { x: -650.5, y: 2 + Y_OFFSET, z: -65 },
      // Set 2
      { x: -650.5, y: 26 + Y_OFFSET, z: -132 },
      { x: -650.5, y: 2 + Y_OFFSET, z: -132 }
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 6, z: 30.5 }, { x: 1.5, y: 2, z: 30.5 },
      { x: 1.5, y: 6, z: 30.5 }, { x: 1.5, y: 2, z: 30.5 },
    ]
    Wall.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 5.1, 5.1, 5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    //走廊墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -650.5, y: 16 + Y_OFFSET, z: -7.5 },
      { x: -650.5, y: 16 + Y_OFFSET, z: -30.5 },
      { x: -650.5, y: 16 + Y_OFFSET, z: -98.5 },
      { x: -650.5, y: 16 + Y_OFFSET, z: -166.5 },
      { x: -650.5, y: 16 + Y_OFFSET, z: -191 }
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 16, z: 6 },
      { x: 1.5, y: 16, z: 4 },
      { x: 1.5, y: 16, z: 3 },
      { x: 1.5, y: 16, z: 4 },
      { x: 1.5, y: 16, z: 7.5 }
    ]
    Wall.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(5).fill(5.1)

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  //对应1楼1号房间
  {
    {
      // 窗框
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = []
      WindowFrame.scaleArray = []
      //竖直
      for (let i = 0; i < 5; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -2 - i * 10 })
      for (let i = 0; i < 5; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      //竖直
      for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -50.5 - i * 10 })
      for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      //横向
      //4块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -22 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 20.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -22 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 20.5 })
      //6块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -80.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -80.5 })
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
        { x: -553.5, y: 23 + Y_OFFSET, z: -22 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -22 },
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
        { x: -553.5, y: 23 + Y_OFFSET, z: -80.5 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -80.5 },
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
        { x: -550, y: 13 + Y_OFFSET, z: -46.25 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -46.25 },
        { x: -550, y: 13 + Y_OFFSET, z: -115 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -115 },
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
      for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -3 - i * 10 })
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -60.5 - i * 10 })
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
        { x: -550, y: 29 + 1 + Y_OFFSET, z: -60.25 },
        { x: -553.5, y: 29 + 1 + Y_OFFSET, z: -60.25 }
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
        { x: -550, y: 20.5 + Y_OFFSET, z: -60 }
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
  //对应1楼2号房间
  {
    {
      // 窗框
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = []
      WindowFrame.scaleArray = []
      //竖直
      for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -119.5 - i * 10 })
      for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -188.5 - i * 10 })
      for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      //横向
      //6块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -149.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -149.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
      //6块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -218.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -218.5 })
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
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -129.5 - i * 10 })
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -198.5 - i * 10 })
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
        { x: -550, y: 13 + Y_OFFSET, z: -184 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -184 },
        { x: -550, y: 13 + Y_OFFSET, z: -253 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -253 },
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
        { x: -550, y: 20.5 + Y_OFFSET, z: -149.5 },
        { x: -550, y: 20.5 + Y_OFFSET, z: -218.5 }
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
        { x: -550, y: 29 + 1 + Y_OFFSET, z: -188 },
        { x: -553.5, y: 29 + 1 + Y_OFFSET, z: -188 }
      ]
      Pillar.scaleArray = [
        { x: 3, y: 3 + 1, z: 69 },
        { x: 0.5, y: 3 + 1, z: 69 }
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
        { x: -553.5, y: 23 + Y_OFFSET, z: -149.5 },
        { x: -553.5, y: 23 + Y_OFFSET, z: -218.5 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -149.5 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -218.5 },
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
  //对应1楼3号房间
  {
    {
      // 窗框
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = []
      WindowFrame.scaleArray = []
      //竖直
      for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -257.5 - i * 10 })
      for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -553.5, y: 12 + Y_OFFSET, z: -326.5 - i * 10 })
      for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      for (let i = 0; i < 7; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      // //横向
      //6块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -287.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -287.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
      //6块一侧
      WindowFrame.positionArray.push({ x: -553.5, y: 19.5 + Y_OFFSET, z: -356.5 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

      WindowFrame.positionArray.push({ x: -553.5, y: 4.5 + Y_OFFSET, z: -356.5 })
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
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -267.5 - i * 10 })
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -550, y: 13 + Y_OFFSET, z: -336.5 - i * 10 })
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
        { x: -550, y: 13 + Y_OFFSET, z: -322 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -322 },
        { x: -550, y: 13 + Y_OFFSET, z: -391 },
        { x: -553.5, y: 13 + Y_OFFSET, z: -390.5 },
      ]
      Pillar.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
      Pillar.scaleArray = [
        { x: 3, y: 13, z: 4 },
        { x: 0.5, y: 13, z: 4 },
        { x: 3, y: 13, z: 4 },
        { x: 0.5, y: 13, z: 3.5 }
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
        { x: -550, y: 20.5 + Y_OFFSET, z: -287.5 },
        { x: -550, y: 20.5 + Y_OFFSET, z: -356.5 }
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
        { x: -550, y: 29 + 1 + Y_OFFSET, z: -188 - 69 * 2 },
        { x: -553.5, y: 29 + 1 + Y_OFFSET, z: -188 - 69 * 2 + 0.5 }
      ]
      Pillar.scaleArray = [
        { x: 3, y: 3 + 1, z: 69 },
        { x: 0.5, y: 3 + 1, z: 68.5 }
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
        { x: -553.5, y: 23 + Y_OFFSET, z: -287.5 },
        { x: -553.5, y: 23 + Y_OFFSET, z: -356.5 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -287.5 },
        { x: -553.5, y: 2 + Y_OFFSET, z: -356.5 },
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
}
export default create
