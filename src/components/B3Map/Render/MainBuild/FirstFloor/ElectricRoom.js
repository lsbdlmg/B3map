import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  {    //配电房墙壁 长墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 9 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -59, y: 16, z: 39.1 },
      { x: -103, y: 16, z: 42.6 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 2, y: 16, z: 29.5 },
      { x: 2, y: 16, z: 26 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //配电房墙壁 短墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 6, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -81, y: 16, z: 18.6 },
      { x: -81, y: 16, z: 66.6 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 20, y: 16, z: 2 },
      { x: 20, y: 16, z: 2 },
    ]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
}
export default create
