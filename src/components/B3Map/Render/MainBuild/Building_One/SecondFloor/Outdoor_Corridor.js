import { createCube } from '@/components/B3Map/BasicShape/Cube'
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
}
export default create
