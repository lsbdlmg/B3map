import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    for (let i = 0; i < 6; i++) Glass.positionArray.push({ x: -553.5, y: 12, z: 45 + i * 11 })
    Glass.scaleArray = []
    for (let i = 0; i < 6; i++) Glass.scaleArray.push({ x: 0.5, y: 7, z: 5 })
    Glass.rotationArray = new Array(10).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(10).fill(0) //占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
  {
    //后墙玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let i = 0; i < 7; i++) Glass.positionArray.push({ x: -569 - i * 11, y: 9.5, z:  111.5 })
    for (let i = 0; i < 7; i++) Glass.scaleArray.push({ x: 5, y: 8.5, z: 0.5 })
    for (let i = 0; i < 7; i++) Glass.positionArray.push({ x: -569 - i * 11, y: 22, z:  111.5 })
    for (let i = 0; i < 7; i++) Glass.scaleArray.push({ x: 5, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(14).fill(0) //占位 不起作用
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }

}
export default create
