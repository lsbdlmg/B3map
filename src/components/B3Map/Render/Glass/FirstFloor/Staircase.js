import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  { //楼梯窗户
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -110 - i * 9, y: 5.5, z: -13.4 })
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -110 - i * 9, y: 22, z: -13.4 })
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -110 - i * 9, y: 31, z: -13.4 })
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -110 - i * 9, y: 40, z: -13.4 })
    Glass.scaleArray = []
    for (let i = 0; i < 3; i++) Glass.scaleArray.push({ x: 4, y: 4.5, z: 0.5 })
    for (let i = 0; i < 9; i++) Glass.scaleArray.push({ x: 4, y: 4, z: 0.5 })
    Glass.rotationArray = new Array(12).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(12).fill(0)//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
}
export default create
