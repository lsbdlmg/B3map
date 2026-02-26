import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  {
    // 玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []

    // Window Group 1 (Near Door/Wall 1)
    // Centers: -265, -275 (Between frames -260, -270, -280)
    Glass.positionArray.push({ x: -1072.5, y: 12, z: -265 })
    Glass.positionArray.push({ x: -1072.5, y: 12, z: -275 })

    // Window Group 2 (Near Inner/Wall 3)
    // Centers: -325, -335 (Between frames -320, -330, -340)
    Glass.positionArray.push({ x: -1072.5, y: 12, z: -325 })
    Glass.positionArray.push({ x: -1072.5, y: 12, z: -335 })

    // Size: Width(Z) 9 (Scale 4.5), Height(Y) 14 (Scale 7), Thickness(X) 1 (Scale 0.5)
    Glass.scaleArray = new Array(Glass.positionArray.length).fill({ x: 0.5, y: 7, z: 4.5 })
    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0) // 占位

    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
    Objects.push({ Object: Glass, object: glass })
  }
}
export default create
