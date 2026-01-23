import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 创建楼梯 中间平台
  {
    // 创建地面几何体数据
    const Ground = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 100, y: 2, z: 100 } })
    const ground = createGeometry(device, Ground.vertices, Ground.indices)
    Ground.positionArray = [{ x: -600, y: -1, z: -150 }]
    Ground.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Ground.scaleArray = [{ x: 800, y: 1, z: 300 }]
    Ground.textureIndex = [6.1]
    Ground.lightMask = [{ light1: 1, light2: 0 }]
    createRigidBodies(Ground.vertices, Ground.indices, Ground.positionArray, Ground.scaleArray, Ground.rotationArray, world, RAPIER)
    Objects.push({ Object: Ground, object: ground })
  }
}
export default create
