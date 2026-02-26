import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'

const create = (Objects, device, world, RAPIER) => {
  {
    //玻璃
    const Glass = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const glass = createGeometry(device, Glass.vertices, Glass.indices)
    Glass.positionArray = []

    const xPoints = [-922.5, -1072.5]
    // Frame Starts: 4.8, -58.7, -122.2
    // Glass Offset: -5 relative to frame
    // 6 glasses per group
    // Pitch 10
    const groupStarts = [4.8, -58.7, -122.2]

    xPoints.forEach(x => {
      groupStarts.forEach(startZ => {
        const firstGlassZ = startZ - 5
        for (let i = 0; i < 6; i++) {
          Glass.positionArray.push({ x: x, y: 46, z: firstGlassZ - i * 10 })
        }
      })

      // 前门另一侧 8 panes
      const startZ_Other = 32.9
      for (let i = 0; i < 8; i++) {
        // Start + 5 + i*10
        Glass.positionArray.push({ x: x, y: 46, z: startZ_Other + 5 + i * 10 })
      }
    })

    Glass.scaleArray = new Array(Glass.positionArray.length).fill({ x: 0.5, y: 7, z: 4.5 })
    Glass.rotationArray = new Array(Glass.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    Glass.textureIndex = new Array(Glass.positionArray.length).fill(0) // 占位

    Objects.push({ Object: Glass, object: glass })
    createRigidBodies(Glass.vertices, Glass.indices, Glass.positionArray, Glass.scaleArray, Glass.rotationArray, world, RAPIER)
  }
}

export default create
