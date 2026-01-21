import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //楼梯窗户
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //最下面一排
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -111 - i * 11, y: 5.5, z: -13.4 })
    //上面连着三排
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -111 - i * 11, y: 22, z: -13.4 })
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -111 - i * 11, y: 31, z: -13.4 })
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -111 - i * 11, y: 40, z: -13.4 })
    //楼梯左侧
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -138.5, y: 5.5, z: -8.9 + i * 9 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -138.5, y: 22, z: -8.9 + i * 9 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -138.5, y: 31, z: -8.9 + i * 9 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -138.5, y: 40, z: -8.9 + i * 9 })

    Glass.scaleArray = []
    for (let i = 0; i < 3; i++) Glass.scaleArray.push({ x: 5, y: 4.5, z: 0.5 })
    for (let i = 0; i < 9; i++) Glass.scaleArray.push({ x: 5, y: 4, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 0.5, y: 4.5, z: 4 })
    for (let i = 0; i < 6; i++) Glass.scaleArray.push({ x: 0.5, y: 4, z: 4 })

    Glass.rotationArray = new Array(24).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(24).fill(0) //不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
}
export default create
