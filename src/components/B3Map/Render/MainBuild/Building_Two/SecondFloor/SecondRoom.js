import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  const Y_OFFSET = 34
  const Z_OFFSET = -197

  // Room 2 (2nd Floor): Z Range -197 to -394. Center Z = -295.5. Length 197.

  {
    // 天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } })
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -602, y: 32 + Y_OFFSET, z: -98.5 + Z_OFFSET }]
    Ceiling.scaleArray = [{ x: 49, y: 2, z: 98.5 }]
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
      { x: -601.5, y: 15 + Y_OFFSET, z: -394.25 },
      { x: -602.5, y: 15 + Y_OFFSET, z: -394.75 },
    ]
    Wall.scaleArray = [
      { x: 47.5, y: 17, z: 0.25 },
      { x: 49.5, y: 17, z: 0.25 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  // --- 走廊墙 (Corridor Wall) x = -650.5 ---

  {
    // 门框 (Door Frames)
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)

    DoorFrame.positionArray = [
      // Door 1 Verticals
      { x: -650.5, y: 10 + Y_OFFSET, z: -14 + Z_OFFSET },
      { x: -650.5, y: 10 + Y_OFFSET, z: -26 + Z_OFFSET },
      // Door 2 Verticals
      { x: -650.5, y: 10 + Y_OFFSET, z: -171 + Z_OFFSET },
      { x: -650.5, y: 10 + Y_OFFSET, z: -183 + Z_OFFSET },

      // Door 1 Horizontals
      { x: -650.5, y: 20.5 + Y_OFFSET, z: -20 + Z_OFFSET },
      { x: -650.5, y: 0.05 + Y_OFFSET, z: -20 + Z_OFFSET },
      // Door 2 Horizontals
      { x: -650.5, y: 20.5 + Y_OFFSET, z: -177 + Z_OFFSET },
      { x: -650.5, y: 0.05 + Y_OFFSET, z: -177 + Z_OFFSET },
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
    Wall.positionArray = [
      { x: -650.5, y: 26.5 + Y_OFFSET, z: -20 + Z_OFFSET },
      { x: -650.5, y: 26.5 + Y_OFFSET, z: -177 + Z_OFFSET }
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

    // Set 1
    for (let i = 0; i < 7; i++) {
      WindowFrame.positionArray.push({ x: -650.5, y: 12 + Y_OFFSET, z: -35 + Z_OFFSET - i * 10 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    }

    // Set 2
    for (let i = 0; i < 7; i++) {
      WindowFrame.positionArray.push({ x: -650.5, y: 12 + Y_OFFSET, z: -102 + Z_OFFSET - i * 10 })
      WindowFrame.scaleArray.push({ x: 0.5, y: 7, z: 0.5 })
    }

    // Horizontals (Top/Bottom) for Sets
    // Set 1
    WindowFrame.positionArray.push({ x: -650.5, y: 19.5 + Y_OFFSET, z: -65 + Z_OFFSET })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    WindowFrame.positionArray.push({ x: -650.5, y: 4.5 + Y_OFFSET, z: -65 + Z_OFFSET })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    // Set 2
    WindowFrame.positionArray.push({ x: -650.5, y: 19.5 + Y_OFFSET, z: -132 + Z_OFFSET })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })
    WindowFrame.positionArray.push({ x: -650.5, y: 4.5 + Y_OFFSET, z: -132 + Z_OFFSET })
    WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 30.5 })

    WindowFrame.rotationArray = new Array(WindowFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(WindowFrame.positionArray.length).fill(100)

    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }

  {
    // 窗户墙 上下侧墙 (Wall Above/Below Windows - Corridor Side)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 6 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      // Set 1
      { x: -650.5, y: 26 + Y_OFFSET, z: -65 + Z_OFFSET },
      { x: -650.5, y: 2 + Y_OFFSET, z: -65 + Z_OFFSET },
      // Set 2
      { x: -650.5, y: 26 + Y_OFFSET, z: -132 + Z_OFFSET },
      { x: -650.5, y: 2 + Y_OFFSET, z: -132 + Z_OFFSET }
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
      { x: -650.5, y: 16 + Y_OFFSET, z: -7.5 + Z_OFFSET },
      { x: -650.5, y: 16 + Y_OFFSET, z: -30.5 + Z_OFFSET },
      { x: -650.5, y: 16 + Y_OFFSET, z: -98.5 + Z_OFFSET },
      { x: -650.5, y: 16 + Y_OFFSET, z: -166.5 + Z_OFFSET },
      { x: -650.5, y: 16 + Y_OFFSET, z: -190.5 + Z_OFFSET }
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 16, z: 6 },
      { x: 1.5, y: 16, z: 4 },
      { x: 1.5, y: 16, z: 3 },
      { x: 1.5, y: 16, z: 4 },
      { x: 1.5, y: 16, z: 7 }
    ]
    Wall.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(5).fill(5.1)

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }


}
export default create
