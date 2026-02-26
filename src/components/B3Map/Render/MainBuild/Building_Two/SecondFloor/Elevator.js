import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 电梯门 (双开门 - 密封纹理 102)
  {
    const Door = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const door = createGeometry(device, Door.vertices, Door.indices)

    Door.positionArray = [
      { x: -958.55, y: 45, z: -301.5 }, // 左扇门
      { x: -947.45, y: 45, z: -301.5 }  // 右扇门
    ]
    Door.scaleArray = [
      { x: 5.45, y: 11, z: 0.5 },
      { x: 5.45, y: 11, z: 0.5 }
    ]
    Door.rotationArray = [{ x: 0, y: 0, z: 0 }, { x: 0, y: 0, z: 0 }]
    Door.textureIndex = [103, 103]

    createRigidBodies(Door.vertices, Door.indices, Door.positionArray, Door.scaleArray, Door.rotationArray, world, RAPIER)
    Objects.push({ Object: Door, object: door })
  }

  // 电梯左侧墙体 (靠近5号房间)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -976.5, y: 49, z: -324 }]
    Wall.scaleArray = [{ x: 0.5, y: 17, z: 23 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 电梯右侧墙体 (靠近2号楼梯)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -929.5, y: 49, z: -324 }]
    Wall.scaleArray = [{ x: 0.5, y: 17, z: 23 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 电梯背面墙体 (远端)
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -953, y: 49, z: -346.5 }]
    Wall.scaleArray = [{ x: 23, y: 17, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 电梯正面墙体 - 门左侧
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)

    Wall.positionArray = [{ x: -970, y: 49, z: - 301.5 }]
    Wall.scaleArray = [{ x: 6, y: 17, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 电梯正面墙体 - 门右侧
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)

    Wall.positionArray = [{ x: -936, y: 49, z: -301.5 }]
    Wall.scaleArray = [{ x: 6, y: 17, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 电梯正面墙体 - 门上方
  {
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)

    Wall.positionArray = [{ x: -953, y: 61, z: -301.5 }]
    Wall.scaleArray = [{ x: 11, y: 5, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]

    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}
export default create
