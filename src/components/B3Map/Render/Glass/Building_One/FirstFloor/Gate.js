import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  { //门口玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //下侧长玻璃
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: 19 - i * 9, y: 9.5, z: -13 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -17 - i * 9, y: 9.5, z: -13 })
    //上侧短玻璃
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: 19 - i * 9, y: 22, z: -13 })
    Glass.scaleArray = []
    for (let i = 0; i < 4; i++) Glass.scaleArray.push({ x: 4, y: 8.5, z: 0.5 })
    for (let i = 0; i < 6; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]//占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
}
export default create
