import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -553.5, y: 12, z: -262.5 - i * 10 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -553.5, y: 12, z: -331.5 - i * 10 })
    Glass.scaleArray = new Array(12).fill({ x: 0.5, y: 7, z: 4.5 })
    Glass.rotationArray = new Array(12).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(12).fill(0) //占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
}
export default create
