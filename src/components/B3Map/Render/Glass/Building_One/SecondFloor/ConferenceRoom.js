import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 会议室窗户玻璃 6组 每组2扇
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let j = 0; j < 6; j++) {
      let groupOffsetX = 30.5 * j
      for (let k = 0; k < 2; k++) {
        // pane 1 center: -218.25. pane 2 center: -228.25
        let baseX = -218.25 - k * 10
        let finalX = baseX - groupOffsetX
        // 下
        Glass.positionArray.push({ x: finalX, y: 38, z: -35.1 })
        Glass.scaleArray.push({ x: 4.5, y: 3, z: 0.1 })
        // 中
        Glass.positionArray.push({ x: finalX, y: 47, z: -35.1 })
        Glass.scaleArray.push({ x: 4.5, y: 5, z: 0.1 })
        // 上
        Glass.positionArray.push({ x: finalX, y: 56, z: -35.1 })
        Glass.scaleArray.push({ x: 4.5, y: 3, z: 0.1 })
      }
    }

    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0) // 0 is usually glass texture

    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
  {
    // 靠近走廊 窗户玻璃 中上两层
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []
    Glass.scaleArray = []
    for (let j = 1; j < 5; j++) {
      let groupOffsetX = 30.5 * j
      for (let k = 0; k < 2; k++) {
        let baseX = -218.25 - k * 10
        let finalX = baseX - groupOffsetX
        // 中
        Glass.positionArray.push({ x: finalX, y: 47, z: 65.6 })
        Glass.scaleArray.push({ x: 4.5, y: 5.5, z: 0.1 })
        // 上
        Glass.positionArray.push({ x: finalX, y: 56, z: 65.6 })
        Glass.scaleArray.push({ x: 4.5, y: 3.5, z: 0.1 })
      }
    }
    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0)
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
}
export default create
