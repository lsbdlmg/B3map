import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {  // 创建楼梯 中间平台
  {    //左侧墙壁 窗框 下侧竖直 长 13根
    const LeftWall_WindowFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Vertical_Down = createGeometry(device, LeftWall_WindowFrame_Vertical_Down.vertices, LeftWall_WindowFrame_Vertical_Down.indices)
    LeftWall_WindowFrame_Vertical_Down.positionArray = []
    //55-6.9==48.1
    for (let i = 0; i < 7; i++)LeftWall_WindowFrame_Vertical_Down.positionArray.push({ x: 27, y: 9.5, z: -10.9 + i * 9 })
    for (let i = 0; i < 7; i++)LeftWall_WindowFrame_Vertical_Down.positionArray.push({ x: 27, y: 9.5, z: 48.1 + i * 9 })
    LeftWall_WindowFrame_Vertical_Down.scaleArray = new Array(14).fill({ x: 0.5, y: 8.5, z: 0.5 })
    LeftWall_WindowFrame_Vertical_Down.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
    LeftWall_WindowFrame_Vertical_Down.textureIndex = new Array(14).fill(100)
    createRigidBodies(LeftWall_WindowFrame_Vertical_Down.vertices, LeftWall_WindowFrame_Vertical_Down.indices, LeftWall_WindowFrame_Vertical_Down.positionArray, LeftWall_WindowFrame_Vertical_Down.scaleArray, LeftWall_WindowFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Vertical_Down, object: leftWall_WindowFrame_Vertical_Down })
  }
  {    //左侧墙壁 窗框 上侧竖直 上 13根
    const LeftWall_WindowFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Vertical_Up = createGeometry(device, LeftWall_WindowFrame_Vertical_Up.vertices, LeftWall_WindowFrame_Vertical_Up.indices)
    LeftWall_WindowFrame_Vertical_Up.positionArray = []
    for (let i = 0; i < 7; i++)LeftWall_WindowFrame_Vertical_Up.positionArray.push({ x: 27, y: 22, z: -10.9 + i * 9 })
    for (let i = 0; i < 7; i++)LeftWall_WindowFrame_Vertical_Up.positionArray.push({ x: 27, y: 22, z: 48.1 + i * 9 })
    LeftWall_WindowFrame_Vertical_Up.scaleArray = new Array(14).fill({ x: 0.5, y: 3, z: 0.5 })
    LeftWall_WindowFrame_Vertical_Up.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
    LeftWall_WindowFrame_Vertical_Up.textureIndex = new Array(14).fill(100)
    createRigidBodies(LeftWall_WindowFrame_Vertical_Up.vertices, LeftWall_WindowFrame_Vertical_Up.indices, LeftWall_WindowFrame_Vertical_Up.positionArray, LeftWall_WindowFrame_Vertical_Up.scaleArray, LeftWall_WindowFrame_Vertical_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Vertical_Up, object: leftWall_WindowFrame_Vertical_Up })
  }
  {    //左侧墙壁 窗框 横向 长 3根
    const LeftWall_WindowFrame_Horizontal = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Horizontal = createGeometry(device, LeftWall_WindowFrame_Horizontal.vertices, LeftWall_WindowFrame_Horizontal.indices)
    LeftWall_WindowFrame_Horizontal.positionArray = [
      { x: 27, y: 25.5, z: 45.1 },
      { x: 27, y: 18.5, z: 45.1 },
      { x: 27, y: 0.5, z: 45.1 },
    ]
    LeftWall_WindowFrame_Horizontal.scaleArray = [
      { x: 0.5, y: 0.5, z: 57.5 },
      { x: 0.5, y: 0.5, z: 57.5 },
      { x: 0.5, y: 0.5, z: 57.5 },
    ]
    LeftWall_WindowFrame_Horizontal.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    LeftWall_WindowFrame_Horizontal.textureIndex = [
      100, 100, 100,
    ]
    createRigidBodies(LeftWall_WindowFrame_Horizontal.vertices, LeftWall_WindowFrame_Horizontal.indices, LeftWall_WindowFrame_Horizontal.positionArray, LeftWall_WindowFrame_Horizontal.scaleArray, LeftWall_WindowFrame_Horizontal.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Horizontal, object: leftWall_WindowFrame_Horizontal })
  }
  {    //左侧墙壁上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: 27, y: 29, z: 45.6 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 3, y: 3, z: 55 },
    ]
    PillarTop.textureIndex = [4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
}
export default create
