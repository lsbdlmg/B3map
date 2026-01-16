import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  { //左侧墙壁玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //-6.4 + 45 + 4 + 2 + 4 + 4 ==
    for (let i = 0; i < 6; i++)     Glass.positionArray.push({ x: 27, y: 9.5, z: -6.4 + i * 9 })
    for (let i = 0; i < 6; i++)     Glass.positionArray.push({ x: 27, y: 9.5, z: 52.6 + i * 9 })
    for (let i = 0; i < 6; i++)     Glass.positionArray.push({ x: 27, y: 22, z: -6.4 + i * 9 })
    for (let i = 0; i < 6; i++)     Glass.positionArray.push({ x: 27, y: 22, z: 52.6 + i * 9 })
    Glass.scaleArray = []
    for (let i = 0; i < 12; i++) Glass.scaleArray.push({ x: 0.5, y: 8.5, z: 4 })
    for (let i = 0; i < 12; i++) Glass.scaleArray.push({ x: 0.5, y: 3, z: 4 })
    Glass.rotationArray = new Array(24).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(24).fill(0)//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
}
export default create
