import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //起始点 -552 30
    //后门 门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      //竖直
      { x: -472 - 80, y: 10, z: 7.1 },
      { x: -472 - 80, y: 10, z: 17.1 },
      { x: -472 - 80, y: 10, z: 18.2 },
      { x: -472 - 80, y: 10, z: 28.2 },
      //横向
      { x: -472 - 80, y: 20.5, z: 17.65 },
      { x: -472 - 80, y: 0.05, z: 17.65 },
    ]
    DoorFrame.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
    DoorFrame.scaleArray = [
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },
      { x: 0.5, y: 10, z: 0.5 },

      { x: 0.5, y: 0.5, z: 11.05 },
      { x: 0.5, y: 0.05, z: 11.05 },
    ]
    DoorFrame.textureIndex = new Array(9).fill(100)
    createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {
    //门口旁边的柱子 需要分开里外2根 纹理不同
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -472 - 80 + 1.5, y: 13, z: 2.6 },
      { x: -472 - 80 - 2.5, y: 13, z: 2.6 },
      { x: -472 - 80 + 1.5, y: 13, z: 32.7 },
      { x: -472 - 80 - 2.5, y: 13, z: 32.7 },
    ]
    Pillar.scaleArray = [
      { x: 1.5, y: 13, z: 4 },
      { x: 2.5, y: 13, z: 4 },
      { x: 1.5, y: 13, z: 4 },
      { x: 2.5, y: 13, z: 4 },
    ]
    Pillar.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = [4.1, 5.1, 4.1, 5.1]

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    //地板 靠近辅导员办公室
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 31, y: 1, z: 3 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -737, y: 0.03, z: 18 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 185, y: 0.03, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  
  {
    //地板 靠近厕所
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 22.5, y: 1, z: 3 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -787, y: 0.03, z: -234 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 135, y: 0.03, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //地板 两边
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 20 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -670, y: 0.03, z: -108 },
      { x: -904, y: 0.03, z: -108 },
    ]
    Floor.rotationArray =new Array(2).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(2).fill({ x: 18, y: 0.03, z: 108 })
    Floor.textureIndex = new Array(2).fill(7.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    //红色
    for (let i = 0; i < 5; i++)Pillar.positionArray.push({ x: -688, y: 13, z: 0 - i * 54 })
    for (let i = 0; i < 5; i++)Pillar.positionArray.push({ x: -688 - 198, y: 13, z: 0 - i * 54 })
    //白色
    for (let i = 0; i < 2; i++)Pillar.positionArray.push({ x: -688 - 66 - i * 66, y: 13, z: 0 })
    for (let i = 0; i < 2; i++)Pillar.positionArray.push({ x: -688 - 66 - i * 66, y: 13, z: -216 })
    Pillar.scaleArray = new Array(14).fill({ x: 3, y: 13, z: 3 })
    Pillar.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = []
    for (let i = 0; i < 10; i++)Pillar.textureIndex.push(4.1)
    for (let i = 0; i < 4; i++)Pillar.textureIndex.push(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
}
export default create
