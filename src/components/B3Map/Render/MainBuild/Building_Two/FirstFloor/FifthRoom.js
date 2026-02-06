import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  {
    //门口
    {
      //门框
      const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
      DoorFrame.positionArray = [
        //竖直
        { x: -1012.5, y: 10, z: -230 },
        { x: -1012.5, y: 10, z: -242 },
        //横
        { x: -1012.5, y: 20.5, z: -236 },
        { x: -1012.5, y: 0.05, z: -236 },
      ]
      DoorFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
      DoorFrame.scaleArray = [
        { x: 1.5, y: 10, z: 0.5 },
        { x: 1.5, y: 10, z: 0.5 },
        { x: 1.5, y: 0.5, z: 6.5 },
        { x: 1.5, y: 0.05, z: 6.5 },
      ]
      DoorFrame.textureIndex = new Array(4).fill(101)
      createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame, object: doorFrame })
    }
  }

  // 1. 门口周围墙体
  {
    //门口右侧墙体
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 20 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.positionArray.push({ x: -1012.5, y: 16, z: -318.5 })
    Wall.scaleArray.push({ x: 1.5, y: 16, z: 76 })

    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口左侧墙体
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.positionArray.push({ x: -1012.5, y: 16, z: -223 })
    Wall.scaleArray.push({ x: 1.5, y: 16, z: 6.5 })
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 门上方
    const WallTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } })
    const wallTop = createGeometry(device, WallTop.vertices, WallTop.indices)
    WallTop.positionArray = [{ x: -1012.5, y: 26.5, z: -236 }]
    WallTop.scaleArray = [{ x: 1.5, y: 5.5, z: 6.5 }] // Matches Door size
    WallTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallTop.textureIndex = [5.1]
    createRigidBodies(WallTop.vertices, WallTop.indices, WallTop.positionArray, WallTop.scaleArray, WallTop.rotationArray, world, RAPIER)
    Objects.push({ Object: WallTop, object: wallTop })
  }

  // 2. 对侧墙体 (带有窗户)
  // Window Frame
  {
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    const x = -1072.5
    const groupStarts = [-260, -320] // Arbitrary but separated positions

    groupStarts.forEach(startZ => {
      // Vertical Frames (3 frames for 2 windows)
      for (let i = 0; i < 3; i++) {
        WindowFrame.positionArray.push({ x: x, y: 12, z: startZ - i * 10 })
        WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
      }
      // Horizontal Frames
      const centerZ = startZ - 10
      // Top
      WindowFrame.positionArray.push({ x: x, y: 19.5, z: centerZ })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 10.5 })
      // Bottom
      WindowFrame.positionArray.push({ x: x, y: 4.5, z: centerZ })
      WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 10.5 })
    })

    WindowFrame.rotationArray = new Array(WindowFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(WindowFrame.positionArray.length).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }

  // 窗户区域墙体 (上下墙 - 分内外)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 3 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.textureIndex = []

    const xBase = -1072.5
    const windowCenters = [-270, -330]

    windowCenters.forEach(z => {
      // Inner
      Wall.positionArray.push({ x: xBase + 0.25, y: 26, z: z })
      Wall.scaleArray.push({ x: 0.25, y: 6, z: 10.5 })
      Wall.textureIndex.push(5.1)
      Wall.positionArray.push({ x: xBase + 0.25, y: 2, z: z })
      Wall.scaleArray.push({ x: 0.25, y: 2, z: 10.5 })
      Wall.textureIndex.push(5.1)
      // Outer
      Wall.positionArray.push({ x: xBase - 0.25, y: 26, z: z })
      Wall.scaleArray.push({ x: 0.25, y: 6, z: 10.5 })
      Wall.textureIndex.push(4.1)
      Wall.positionArray.push({ x: xBase - 0.25, y: 2, z: z })
      Wall.scaleArray.push({ x: 0.25, y: 2, z: 10.5 })
      Wall.textureIndex.push(4.1)
    })

    Wall.rotationArray = new Array(Wall.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 间隔墙 (Left/Middle/Right - 分内外)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = []
    Wall.scaleArray = []
    Wall.textureIndex = []

    const xBase = -1072.5
    const pillars = [
      { z: -237.5, sz: 22 },   // Left
      { z: -300, sz: 19.5 },   // Middle
      { z: -367.5, sz: 27 } // Right
    ]

    pillars.forEach(p => {
      // Inner
      Wall.positionArray.push({ x: xBase + 0.25, y: 16, z: p.z })
      Wall.scaleArray.push({ x: 0.25, y: 16, z: p.sz })
      Wall.textureIndex.push(5.1)
      // Outer
      Wall.positionArray.push({ x: xBase - 0.25, y: 16, z: p.z })
      Wall.scaleArray.push({ x: 0.25, y: 16, z: p.sz })
      Wall.textureIndex.push(4.1)
    })

    Wall.rotationArray = new Array(Wall.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 前后墙 (Front & Back Walls)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 8, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -1043, y: 16, z: -394.25 }, // Inner
      { x: -1042, y: 16, z: -394.75 }  // Outer
    ]
    Wall.scaleArray = [
      { x: 29, y: 16, z: 0.25 },
      { x: 31, y: 16, z: 0.25 }
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 天花板
  {
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 20 } })
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    // Center X -1042.5, Width 60 -> Scale 30.5
    // Center Z -305.25, Length 179.5 -> Scale 90
    // Y 32.5, Height 1 -> Scale 0.5
    Ceiling.positionArray = [{ x: -1042, y: 32, z: -305 }]
    Ceiling.scaleArray = [{ x: 30.5, y: 2, z: 89 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1] // Uses same texture as walls
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }

}
export default create
