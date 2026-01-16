import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  {  // 创建地面 一楼大厅顶
    const Ground = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 10 } })
    const ground = createGeometry(device, Ground.vertices, Ground.indices)
    Ground.positionArray = [
      // { x: -300, y: -1, z: -150 },
      { x: -40.5, y: 33, z: 45.6 },
    ]
    Ground.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Ground.scaleArray = [
      { x: 64.5, y: 1, z: 55 },
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
      { x: -202, y: 33, z: 66.5 },
    ]
    Ground.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Ground.scaleArray = [
      { x: 97, y: 1, z: 34.1 },
    ]
    Ground.textureIndex = [
      6.1,
    ]
    createRigidBodies(Ground.vertices, Ground.indices, Ground.positionArray, Ground.scaleArray, Ground.rotationArray, world, RAPIER)
    Objects.push({ Object: Ground, object: ground })
  }
}
export default create
