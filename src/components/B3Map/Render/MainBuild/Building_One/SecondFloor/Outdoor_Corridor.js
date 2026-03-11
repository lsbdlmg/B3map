import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -460, y: 47, z: 32.7 },
      { x: -460, y: 47, z: 2.6 },
      { x: -520, y: 47, z: 32.7 },
      { x: -520, y: 47, z: 2.6 },
    ]
    Pillar.scaleArray = new Array(16).fill({ x: 4, y: 13, z: 4 })
    Pillar.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(16).fill(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //连接会议室后门 到柱子的横柱
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -459 - 14.5, y: 63, z: 2.6 },
      { x: -459 - 14.5, y: 63, z: 32.7 },
    ]
    Pillar.scaleArray = [
      { x: 65 + 14.5, y: 3, z: 4 },
      { x: 65 + 14.5, y: 3, z: 4 },
    ]
    Pillar.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Pillar.textureIndex = [5.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 0.5, z: 4 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -471.5, y: 33.1, z: 17.65 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 80, y: 1.1, z: 19.05 }]
    Floor.textureIndex = [5.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 栏杆 Railing
    const RailingPost = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const railingPost = createGeometry(device, RailingPost.vertices, RailingPost.indices)
    RailingPost.positionArray = []
    RailingPost.scaleArray = []
    RailingPost.rotationArray = []
    RailingPost.textureIndex = []
    const RailingBar = createCylinder({ radiusTop: 5, radiusBottom: 5, height: 1, radialSegments: 10 })
    const railingBar = createGeometry(device, RailingBar.vertices, RailingBar.indices)
    RailingBar.positionArray = []
    RailingBar.scaleArray = []
    RailingBar.rotationArray = []
    RailingBar.textureIndex = []
    const addRailing = (p1, p2, segments) => {
      const dx = p2.x - p1.x
      const dz = p2.z - p1.z
      const dist = Math.sqrt(dx * dx + dz * dz)
      const stepX = dx / segments
      const stepZ = dz / segments

      let barRotation = { x: 0, y: 0, z: 0 }
      if (Math.abs(dx) > Math.abs(dz)) {
        barRotation = { x: 0, y: 0, z: Math.PI / 2 }
      } else {
        barRotation = { x: Math.PI / 2, y: 0, z: 0 }
      }
      for (let i = 1; i < segments; i++) {
        const px = p1.x + stepX * i
        const pz = p1.z + stepZ * i
        RailingPost.positionArray.push({ x: px, y: 39, z: pz })
        RailingPost.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        RailingPost.rotationArray.push({ x: 0, y: 0, z: 0 })
        RailingPost.textureIndex.push(103)
      }
      const barLen = dist / segments
      for (let i = 0; i < segments; i++) {
        const cx = p1.x + stepX * (i + 0.5)
        const cz = p1.z + stepZ * (i + 0.5)
        for (let k = 0; k < 5; k++) {
          const barH = 36 + k * 2
          RailingBar.positionArray.push({ x: cx, y: barH, z: cz })
          RailingBar.scaleArray.push({ x: 0.1, y: barLen, z: 0.1 })
          RailingBar.rotationArray.push(barRotation)
          RailingBar.textureIndex.push(103)
        }
      }
    }

    // Side 1 (z=32.7)
    addRailing({ x: -391, z: 32.7 }, { x: -460, z: 32.7 }, 5)
    addRailing({ x: -460, z: 32.7 }, { x: -520, z: 32.7 }, 5)
    addRailing({ x: -520, z: 32.7 }, { x: -550, z: 32.7 }, 3)

    // Side 2 (z=2.6)
    addRailing({ x: -391, z: 2.6 }, { x: -460, z: 2.6 }, 5)
    addRailing({ x: -460, z: 2.6 }, { x: -520, z: 2.6 }, 5)

    // Side 3 (x=-520) - connecting the two sides at the end
    addRailing({ x: -520, z: 2.6 }, { x: -550, z: 2.6 }, 3)

    createRigidBodies(RailingPost.vertices, RailingPost.indices, RailingPost.positionArray, RailingPost.scaleArray, RailingPost.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingPost, object: railingPost })
    createRigidBodies(RailingBar.vertices, RailingBar.indices, RailingBar.positionArray, RailingBar.scaleArray, RailingBar.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingBar, object: railingBar })
  }
}
export default create
