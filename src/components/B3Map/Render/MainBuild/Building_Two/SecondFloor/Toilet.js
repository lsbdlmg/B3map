import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //长墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 10 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -689.5, y: 49, z: -323 },
      { x: -754.5, y: 49, z: -323 },
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 17, z: 71 },
      { x: 1.5, y: 17, z: 71 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(2).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口短墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 4, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -703, y: 50, z: -252.5 },
      { x: -741, y: 50, z: -252.5 },
    ]
    Wall.scaleArray = [
      { x: 12, y: 16, z: 0.5 },
      { x: 12, y: 16, z: 0.5 },
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
      //女厕
      //竖直
      { x: -710, y: 44, z: -253.5 },
      { x: -710, y: 44, z: -265.5 },
      //横
      { x: -710, y: 54.5, z: -259.5 },
      { x: -710, y: 34.05, z: -259.5 },
      //男厕
      //竖直
      { x: -734, y: 44, z: -253.5 },
      { x: -734, y: 44, z: -265.5 },
      //横
      { x: -734, y: 54.5, z: -259.5 },
      { x: -734, y: 34.05, z: -259.5 },
    ]
    DoorFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 0.5, z: 6.5 },
      { x: 1.5, y: 0.05, z: 6.5 },
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 0.5, z: 6.5 },
      { x: 1.5, y: 0.05, z: 6.5 },
    ]
    DoorFrame.textureIndex = new Array(8).fill(101)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //门口旁短墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -710, y: 50, z: -270 },
      { x: -734, y: 50, z: -270 },
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 16, z: 4 },
      { x: 1.5, y: 16, z: 4 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(2).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //门口上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -710, y: 60.5, z: -259.5 },
      { x: -734, y: 60.5, z: -259.5 },
    ]
    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 5.5, z: 6.5 },
      { x: 1.5, y: 5.5, z: 6.5 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //中间墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 10 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -722, y: 50, z: -334 },
    ]
    Wall.scaleArray = [
      { x: 1.5, y: 16, z: 60 },
    ]
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //正对门口墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -722, y: 50, z: -273.5 },
    ]
    Wall.scaleArray = [
      { x: 10.5, y: 16, z: 0.5 },
    ]
    Wall.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //厕所背墙窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      //女厕
      //竖直
      { x: -696, y: 50, z: -394.5 },
      { x: -716, y: 50, z: -394.5 },
      //横
      { x: -706, y: 57.5, z: -394.5 },
      { x: -706, y: 42.5, z: -394.5 },
      //男厕
      //竖直
      { x: -728, y: 50, z: -394.5 },
      { x: -748, y: 50, z: -394.5 },
      //横
      { x: -738, y: 57.5, z: -394.5 },
      { x: -738, y: 42.5, z: -394.5 },
    ]
    WindowFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.scaleArray = [
      //女厕
      { x: 0.5, y: 8, z: 0.5 },
      { x: 0.5, y: 8, z: 0.5 },
      { x: 10, y: 0.5, z: 0.5 },
      { x: 10, y: 0.5, z: 0.5 },
      //男厕
      { x: 0.5, y: 8, z: 0.5 },
      { x: 0.5, y: 8, z: 0.5 },
      { x: 10, y: 0.5, z: 0.5 },
      { x: 10, y: 0.5, z: 0.5 },
    ]
    WindowFrame.textureIndex = new Array(8).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //厕所背墙-下
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -722, y: 37, z: -394.25 },
      { x: -722, y: 37, z: -394.75 }
    ]
    Wall.scaleArray = [
      { x: 34, y: 5, z: 0.25 },
      { x: 34, y: 5, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //厕所背墙-上
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -722, y: 62, z: -394.25 },
      { x: -722, y: 62, z: -394.75 }
    ]
    Wall.scaleArray = [
      { x: 34, y: 4, z: 0.25 },
      { x: 34, y: 4, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //厕所背墙-左
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -693.25, y: 50, z: -394.25 },
      { x: -691.75, y: 50, z: -394.75 }
    ]
    Wall.scaleArray = [
      { x: 2.25, y: 8, z: 0.25 },
      { x: 3.75, y: 8, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //厕所背墙-中
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -722, y: 50, z: -394.25 },
      { x: -722, y: 50, z: -394.75 }
    ]
    Wall.scaleArray = [
      { x: 5.5, y: 8, z: 0.25 },
      { x: 5.5, y: 8, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //厕所背墙-右
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -750.75, y: 50, z: -394.25 },
      { x: -752.25, y: 50, z: -394.75 }
    ]
    Wall.scaleArray = [
      { x: 2.25, y: 8, z: 0.25 },
      { x: 3.75, y: 8, z: 0.25 }
    ]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //天花板
    const Ceiling = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 10 } })
    const ceiling = createGeometry(device, Ceiling.vertices, Ceiling.indices)
    Ceiling.positionArray = [{ x: -722, y: 66, z: -323.5 }]
    Ceiling.scaleArray = [{ x: 33.5, y: 2, z: 70.5 }]
    Ceiling.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ceiling.textureIndex = [6.1]
    createRigidBodies(Ceiling.vertices, Ceiling.indices, Ceiling.positionArray, Ceiling.scaleArray, Ceiling.rotationArray, world, RAPIER)
    Objects.push({ Object: Ceiling, object: ceiling })
  }
}
export default create
