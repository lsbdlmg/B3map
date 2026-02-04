import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  { //右侧小房间窗户
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      { x: -59, y: 15, z: 4.6 },
    ]
    //下侧长
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 13, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 22, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 4, z: -13.4 })
    Glass.scaleArray = [{ x: 0.5, y: 5, z: 4 }]
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 5, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 3, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(7).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0]//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
}
export default create
