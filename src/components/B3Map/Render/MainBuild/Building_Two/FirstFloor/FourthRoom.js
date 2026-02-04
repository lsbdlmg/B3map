import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  //前门
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -922.5, y: 10, z: 94.4 - 65 },
      { x: -922.5, y: 10, z: 84.4 - 65 },
      { x: -922.5, y: 10, z: 83.3 - 65 },
      { x: -922.5, y: 10, z: 73.3 - 65 },
      //横向
      { x: -922.5, y: 20.5, z: 83.85 - 65 },
      { x: -922.5, y: 0.05, z: 83.85 - 65 },
    ]

    DoorFrame.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 0.5, z: 11.05 },
      { x: 0.5, y: 0.05, z: 11.05 },
    ]
    DoorFrame.textureIndex = new Array(10).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  //后门
  {
    //门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -922.5, y: 10, z: 94.4 - 280 },
      { x: -922.5, y: 10, z: 84.4 - 280 },
      { x: -922.5, y: 10, z: 83.3 - 280 },
      { x: -922.5, y: 10, z: 73.3 - 280 },
      //横向
      { x: -922.5, y: 20.5, z: 83.85 - 280 },
      { x: -922.5, y: 0.05, z: 83.85 - 280 },
    ]

    DoorFrame.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 0.5, z: 11.05 },
      { x: 0.5, y: 0.05, z: 11.05 },
    ]
    DoorFrame.textureIndex = new Array(10).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }

  // 窗框
  {
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []

    const xPoints = [-922.5, -1072.5]

    xPoints.forEach(x => {
      const groups = [4.8, -58.7, -122.2]

      groups.forEach(startZ => {
        // 竖直 (7 frames per group for 6 windows)
        for (let i = 0; i < 7; i++) {
          WindowFrame.positionArray.push({ x: x, y: 12, z: startZ - i * 10 })
          WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
        }
        // 横向
        const centerZ = startZ - 30
        // Top
        WindowFrame.positionArray.push({ x: x, y: 19.5, z: centerZ })
        WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
        // Bottom
        WindowFrame.positionArray.push({ x: x, y: 4.5, z: centerZ })
        WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
      })

      // 前门另一侧 (8 frames + 1 = 9 frames)
      const startZ_Other = 32.9
      for (let i = 0; i < 9; i++) {
        WindowFrame.positionArray.push({ x: x, y: 12, z: startZ_Other + i * 10 })
        WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      }
      // Lateral for 8 windows (length 80)
      const centerZ_Other = startZ_Other + 40
      // Top
      WindowFrame.positionArray.push({ x: x, y: 19.5, z: centerZ_Other })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 40.5 })
      // Bottom
      WindowFrame.positionArray.push({ x: x, y: 4.5, z: centerZ_Other })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 40.5 })
    })

    WindowFrame.rotationArray = new Array(WindowFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(WindowFrame.positionArray.length).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }

  // 窗户墙 (上下墙)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 9 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.textureIndex = []

    const xPoints = [-922.5, -1072.5]
    const groups = [4.8 - 30, -58.7 - 30, -122.2 - 30] // Center Zs

    xPoints.forEach(x => {
      const isOuter = x === -1072.5
      groups.forEach(z => {
        if (isOuter) {
          // Inner (-1072.25) 5.1
          Wall.positionArray.push({ x: x + 0.25, y: 26, z: z })
          Wall.scaleArray.push({ x: 0.25, y: 6, z: 30.5 })
          Wall.textureIndex.push(5.1)
          Wall.positionArray.push({ x: x + 0.25, y: 2, z: z })
          Wall.scaleArray.push({ x: 0.25, y: 2, z: 30.5 })
          Wall.textureIndex.push(5.1)
          // Outer (-1072.75) 4.1
          Wall.positionArray.push({ x: x - 0.25, y: 26, z: z })
          Wall.scaleArray.push({ x: 0.25, y: 6, z: 30.5 })
          Wall.textureIndex.push(4.1)
          Wall.positionArray.push({ x: x - 0.25, y: 2, z: z })
          Wall.scaleArray.push({ x: 0.25, y: 2, z: 30.5 })
          Wall.textureIndex.push(4.1)
        } else {
          // Normal
          Wall.positionArray.push({ x: x, y: 26, z: z })
          Wall.scaleArray.push({ x: 0.5, y: 6, z: 30.5 })
          Wall.textureIndex.push(5.1)
          Wall.positionArray.push({ x: x, y: 2, z: z })
          Wall.scaleArray.push({ x: 0.5, y: 2, z: 30.5 })
          Wall.textureIndex.push(5.1)
        }
      })

      // 前门另一侧 8 windows
      const centerZ_Other = 32.9 + 40
      if (isOuter) {
        // Inner
        Wall.positionArray.push({ x: x + 0.25, y: 26, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.25, y: 6, z: 40.5 })
        Wall.textureIndex.push(5.1)
        Wall.positionArray.push({ x: x + 0.25, y: 2, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.25, y: 2, z: 40.5 })
        Wall.textureIndex.push(5.1)
        // Outer
        Wall.positionArray.push({ x: x - 0.25, y: 26, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.25, y: 6, z: 40.5 })
        Wall.textureIndex.push(4.1)
        Wall.positionArray.push({ x: x - 0.25, y: 2, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.25, y: 2, z: 40.5 })
        Wall.textureIndex.push(4.1)
      } else {
        Wall.positionArray.push({ x: x, y: 26, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.5, y: 6, z: 40.5 })
        Wall.textureIndex.push(5.1)
        Wall.positionArray.push({ x: x, y: 2, z: centerZ_Other })
        Wall.scaleArray.push({ x: 0.5, y: 2, z: 40.5 })
        Wall.textureIndex.push(5.1)
      }
    })

    Wall.rotationArray = new Array(Wall.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 间隔墙 (Pillars)
  {
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    Pillar.scaleArray = []
    Pillar.textureIndex = []

    const xPoints = [-922.5, -1072.5]
    xPoints.forEach(x => {
      const isOuter = x === -1072.5
      const zPoints = [6.55, -56.95, -120.45, -183.9, 31.15]

      zPoints.forEach(z => {
        if (isOuter) {
            // Inner
            Pillar.positionArray.push({ x: x + 0.375, y: 16, z: z })
            Pillar.scaleArray.push({ x: 0.75, y: 16, z: 1.75 })
            Pillar.textureIndex.push(5.1)
            // Outer
            Pillar.positionArray.push({ x: x - 0.375, y: 16, z: z })
            Pillar.scaleArray.push({ x: 0.75, y: 16, z: 1.75 })
            Pillar.textureIndex.push(4.1)
        } else {
            Pillar.positionArray.push({ x: x, y: 16, z: z })
            Pillar.scaleArray.push({ x: 1.5, y: 16, z: 1.75 })
            Pillar.textureIndex.push(5.1)
        }
      })
    })

    Pillar.rotationArray = new Array(Pillar.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }

  // 后门另一侧墙体 (到走廊边缘) & 填补门口空缺 (x=-1072.5 only)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.textureIndex = []

    const xPoints = [-922.5, -1072.5]
    xPoints.forEach(x => {
      const isOuter = x === -1072.5
      if (isOuter) {
         // Inner
        Wall.positionArray.push({ x: x + 0.25, y: 16, z: -215.35 + 4 })
         Wall.scaleArray.push({ x: 0.25, y: 16, z: 4.15 })
         Wall.textureIndex.push(5.1)
         // Outer
         Wall.positionArray.push({ x: x - 0.25, y: 16, z: -215.35 + 4 })
         Wall.scaleArray.push({ x: 0.25, y: 16, z: 4.15 })
         Wall.textureIndex.push(4.1)
      } else {
         Wall.positionArray.push({ x: x, y: 16, z: -216 + 4.35 })
         Wall.scaleArray.push({ x: 0.5, y: 16, z: 4.35 })
         Wall.textureIndex.push(5.1)
      }
    })

    // -1072.5 specific parts (Outer wall)
    // 1. Front door gap fill
    // Inner
    Wall.positionArray.push({ x: -1072.5 + 0.25, y: 16, z: 18.85 })
    Wall.scaleArray.push({ x: 0.25, y: 16, z: 10.55 })
    Wall.textureIndex.push(5.1)
    // Outer
    Wall.positionArray.push({ x: -1072.5 - 0.25, y: 16, z: 18.85 })
    Wall.scaleArray.push({ x: 0.25, y: 16, z: 10.55 })
    Wall.textureIndex.push(4.1)

    // 2. Back door gap fill
    // Inner
    Wall.positionArray.push({ x: -1072.5 + 0.25, y: 16, z: -196.425 })
    Wall.scaleArray.push({ x: 0.25, y: 16, z: 10.775 })
    Wall.textureIndex.push(5.1)
    // Outer
    Wall.positionArray.push({ x: -1072.5 - 0.25, y: 16, z: -196.425 })
    Wall.scaleArray.push({ x: 0.25, y: 16, z: 10.775 })
    Wall.textureIndex.push(4.1)

    Wall.rotationArray = new Array(Wall.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 门上方墙体 (仅 -922.5)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      // Front Door Top
      { x: -922.5, y: 26.5, z: 18.85 },
      // Back Door Top
      { x: -922.5, y: 26.5, z: -196.15 }
    ]
    Wall.scaleArray = [
      { x: 0.5, y: 5.5, z: 11.05 },
      { x: 0.5, y: 5.5, z: 11.05 }
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 前后墙 (Front & Back Walls)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 15, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -997.5, y: 16, z: 112.9 },  // Front Wall
      { x: -997.4, y: 16, z: 115.7 },  // Front Wall
      { x: -997, y: 16, z: -216.5 }  // Back Wall
    ]
    Wall.scaleArray = [
      { x: 74.5, y: 16, z: 0.5 },
      { x: 75.6, y: 16, z: 2.3 },
      { x: 75, y: 16, z: 0.5 }
    ]
    Wall.rotationArray = new Array(3).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1, 5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 天花板
  {
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 20 } })
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    // x range: -922.5 to -1072.5 -> Center -997.5, Width 150
    // z range: 113.4 to -207.2 -> Center -46.9, Length 320.6
    Ceiling.positionArray = [{ x: -997.5, y: 32, z: -51 }]
    Ceiling.scaleArray = [{ x: 75, y: 2, z: 165 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }

}

export default create
