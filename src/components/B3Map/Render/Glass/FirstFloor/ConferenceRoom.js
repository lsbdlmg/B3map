import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //后侧墙壁玻璃 上下3层
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //下侧长
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - i * 9, y: 13, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - i * 9, y: 13, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - 61 - i * 9, y: 13, z: 1.5 })
    //上侧短
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - i * 9, y: 22, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - i * 9, y: 22, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - 61 - i * 9, y: 22, z: 1.5 })
    //下侧短
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - i * 9, y: 4, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - i * 9, y: 4, z: 1.5 })
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -182 - 34 - 61 - 61 - i * 9, y: 4, z: 1.5 })
    Glass.scaleArray = []
    //下侧长
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 5, z: 0.5 })
    //上侧短
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    //下侧短
    for (let i = 0; i < 18; i++) Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(81).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(81).fill(0)
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
  {
    //门口玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = [
      //竖直
      { x: -208, y: 10.05, z: 97.05 },
      { x: -208, y: 10.05, z: 70.65 },
    ]
    Glass.scaleArray = [
      { x: 0.5, y: 9.95, z: 1.05 },
      { x: 0.5, y: 9.95, z: 1.05 },
    ]
    Glass.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0] //占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
  {
    //会议室背墙玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //下侧长玻璃
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -391, y: 9.5, z: 94.1 - i * 9 })
    //上侧短玻璃
    for (let i = 0; i < 3; i++) Glass.positionArray.push({ x: -391, y: 22, z: 94.1 - i * 9 })
    Glass.scaleArray = []
    for (let i = 0; i < 3; i++) Glass.scaleArray.push({ x: 0.5, y: 8.5, z: 4 })
    for (let i = 0; i < 3; i++) Glass.scaleArray.push({ x: 0.5, y: 3, z: 4 })
    Glass.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0, 0, 0, 0] //占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
}
export default create
