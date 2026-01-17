import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  {  // 创建地面 一楼大厅顶
    const Ground = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } })
    const ground = createGeometry(device, Ground.vertices, Ground.indices)
    Ground.positionArray = [
      // { x: -300, y: -1, z: -150 },
      { x: -37, y: 32, z: 45.6 },
    ]
    Ground.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Ground.scaleArray = [
      { x: 66, y: 2, z: 60 },
    ]
    Ground.textureIndex = [
      6.1,
    ]
    createRigidBodies(Ground.vertices, Ground.indices, Ground.positionArray, Ground.scaleArray, Ground.rotationArray, world, RAPIER)
    Objects.push({ Object: Ground, object: ground })
  }
  {  // 创建地面几何体数据
    const Ground = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 16, y: 1, z: 6.2 } })
    const ground = createGeometry(device, Ground.vertices, Ground.indices)
    Ground.positionArray = [
      // { x: -300, y: -1, z: -150 },
      { x: -201, y: 32, z: 69 },
    ]
    Ground.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Ground.scaleArray = [
      { x: 98, y: 2, z: 36.6 },
    ]
    Ground.textureIndex = [
      6.1,
    ]
    createRigidBodies(Ground.vertices, Ground.indices, Ground.positionArray, Ground.scaleArray, Ground.rotationArray, world, RAPIER)
    Objects.push({ Object: Ground, object: ground })
  }
}
export default create
