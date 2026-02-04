import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  {
    // 厕所窗户玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1 })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      //女厕
      { x: -706, y: 16, z: -394.5 },
      //男厕
      { x: -738, y: 16, z: -394.5 },
    ]
    Glass.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Glass.scaleArray = [
      { x: 10, y: 7.5, z: 0.1 },
      { x: 10, y: 7.5, z: 0.1 },
    ]
    Glass.textureIndex = [0, 0]
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
}

export default create
