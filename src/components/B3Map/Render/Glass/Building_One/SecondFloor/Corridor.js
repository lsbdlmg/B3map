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
  {
    // 左墙部分窗户玻璃 6组 每组2扇
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let j = 0; j < 6; j++) {
      let offsetZ = 19.5 * j
      for (let k = 0; k < 2; k++) {
        // pane 1 center Z: 98.6. pane 2 center Z: 91.6 (-7)
        let baseZ = 98.6 - k * 7;
        let finalZ = baseZ - offsetZ

        // 下
        Glass.positionArray.push({ x: 27, y: 38, z: finalZ })
        Glass.scaleArray.push({ x: 0.1, y: 3.5, z: 3.25 })
        // 中
        Glass.positionArray.push({ x: 27, y: 47, z: finalZ })
        Glass.scaleArray.push({ x: 0.1, y: 5.5, z: 3.25 })
        // 上
        Glass.positionArray.push({ x: 27, y: 56, z: finalZ })
        Glass.scaleArray.push({ x: 0.1, y: 3.5, z: 3.25 })
      }
    }

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
  { //右侧小房间窗户
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    //下侧长
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 34 + 13, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 34 + 22, z: -13.4 })
    for (let i = 0; i < 2; i++) Glass.positionArray.push({ x: -72 + i * 7, y: 34 + 4, z: -13.4 })
    Glass.scaleArray = []
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 5, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 3, z: 0.5 })
    for (let i = 0; i < 2; i++) Glass.scaleArray.push({ x: 3, y: 3, z: 0.5 })
    Glass.rotationArray = new Array(7).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = [0, 0, 0, 0, 0, 0]//不用传 默认蓝色
    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER);
  }
  {
    //门框玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    const offsetX = 593.5
    const offsetY = 34
    Glass.positionArray = [
      { x: -645 + offsetX, y: 10 + offsetY, z: -12.4 },
      { x: -633.9 + offsetX, y: 10 + offsetY, z: -12.4 }
    ]
    Glass.scaleArray = [
      { x: 4.5, y: 10, z: 0.1 },
      { x: 4.5, y: 10, z: 0.1 },
    ]
    Glass.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(2).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
}
export default create
