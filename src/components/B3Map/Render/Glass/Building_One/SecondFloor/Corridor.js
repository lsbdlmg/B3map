import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 4扇
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let i = 0; i < 4; i++) {
      let offsetX = 8 * i
      //一次上中下
      Glass.positionArray.push({ x: -139.5 + offsetX, y: 37.5, z: 101.6 })
      Glass.positionArray.push({ x: -139.5 + offsetX, y: 46.5, z: 101.6 })
      Glass.positionArray.push({ x: -139.5 + offsetX, y: 56, z: 101.6 })
      Glass.scaleArray.push({ x: 3.5, y: 2.5, z: 0.5 })
      Glass.scaleArray.push({ x: 3.5, y: 5.5, z: 0.5 })
      Glass.scaleArray.push({ x: 3.5, y: 3, z: 0.5 })
    }
    Glass.rotationArray = new Array(12).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(12).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER, true)
    Objects.push({ Object: Glass, object: glass })
  }
  {
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let i = 0; i < 3; i++) {
      let offsetX = 9 * i
      // 3扇 每扇分上中下
      Glass.positionArray.push({ x: -60 + offsetX, y: 37.5, z: 101.6 })
      Glass.positionArray.push({ x: -60 + offsetX, y: 46.5, z: 101.6 })
      Glass.positionArray.push({ x: -60 + offsetX, y: 56, z: 101.6 })
      Glass.scaleArray.push({ x: 4, y: 2.5, z: 0.5 })
      Glass.scaleArray.push({ x: 4, y: 5.5, z: 0.5 })
      Glass.scaleArray.push({ x: 4, y: 3, z: 0.5 })
    }
    Glass.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(9).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }

}
export default create
