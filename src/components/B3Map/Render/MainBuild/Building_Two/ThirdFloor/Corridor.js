import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  const Y_OFFSET = 34
  {
    // 走廊地板 - 辅导员办公室前
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 31, y: 1, z: 3 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -737.25, y: 32.1 + Y_OFFSET, z: 18 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 184.75, y: 2, z: 18 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 厕所前
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 22.5, y: 1, z: 3 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -787, y: 32.1 + Y_OFFSET, z: -234 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 99, y: 2, z: 18 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 厕所侧边
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -670, y: 32.1 + Y_OFFSET, z: -197.4 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 2, z: 197.4 })
    Floor.textureIndex = new Array(1).fill(6.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 楼梯侧边
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -904, y: 32.1 + Y_OFFSET, z: -126 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 2, z: 126 })
    Floor.textureIndex = new Array(1).fill(6.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 5号房间连接处
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -966.5, y: 32.1 + Y_OFFSET, z: -234.1 }]
    Floor.scaleArray = [{ x: 44.5, y: 2, z: 17.9 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 4号房间连接处
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -904, y: 32.1 + Y_OFFSET, z: 75.5 }]
    Floor.scaleArray = [{ x: 18, y: 2, z: 39.5 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 5号房间侧地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -993.75, y: 32.1 + Y_OFFSET, z: -322.75 }]
    Floor.scaleArray = [{ x: 17.25, y: 2, z: 70.75 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 电梯后方地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 32.1 + Y_OFFSET, z: -347.25 }]
    Floor.scaleArray = [{ x: 23.5, y: 2, z: 46.25 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //走廊地板 - 电梯门口地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 32.1 + Y_OFFSET, z: -276.5 }]
    Floor.scaleArray = [{ x: 23.5, y: 2, z: 24.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 1号楼梯后侧地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -730, y: 32.1 + Y_OFFSET, z: 97.725 }]
    Floor.scaleArray = [{ x: 20.5, y: 2, z: 13.775 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //走廊地板 - 一号楼梯延伸墙与辅导员办公室之间
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -681.25, y: 32.1 + Y_OFFSET, z: 73.5 }]
    Floor.scaleArray = [{ x: 27.75, y: 2, z: 37.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [6.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
}
export default create
