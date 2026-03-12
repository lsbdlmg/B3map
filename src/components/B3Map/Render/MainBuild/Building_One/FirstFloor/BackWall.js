import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  // 创建楼梯 中间平台
  {
    //后侧墙壁 窗框 上下2层 下侧竖直 长 16根
    const WindowFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame_Vertical_Down = createGeometry(device, WindowFrame_Vertical_Down.vertices, WindowFrame_Vertical_Down.indices)
    WindowFrame_Vertical_Down.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame_Vertical_Down.positionArray.push({ x: 23.5 - i * 9, y: 9.5, z: 104.6 })
    for (let i = 0; i < 9; i++) WindowFrame_Vertical_Down.positionArray.push({ x: -37.5 - 34 - i * 9, y: 9.5, z: 104.6 })
    WindowFrame_Vertical_Down.scaleArray = new Array(16).fill({ x: 0.5, y: 8.5, z: 0.5 })
    WindowFrame_Vertical_Down.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    WindowFrame_Vertical_Down.textureIndex = new Array(16).fill(100)
    createRigidBodies(WindowFrame_Vertical_Down.vertices, WindowFrame_Vertical_Down.indices, WindowFrame_Vertical_Down.positionArray, WindowFrame_Vertical_Down.scaleArray, WindowFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame_Vertical_Down, object: windowFrame_Vertical_Down })
  }
  {
    //后侧墙壁 窗框 上下2层 上侧竖直 上 16根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: 23.5 - i * 9, y: 22, z: 104.6 })
    for (let i = 0; i < 9; i++) WindowFrame.positionArray.push({ x: -37.5 - 34 - i * 9, y: 22, z: 104.6 })
    WindowFrame.scaleArray = new Array(16).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(16).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁 窗框 上下2层 横向 长 3根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -17 - 43, y: 25.5, z: 104.6 },
      { x: -17 - 43, y: 18.5, z: 104.6 },
      { x: -17 - 43, y: 0.5, z: 104.6 },
    ]
    WindowFrame.scaleArray = new Array(3).fill({ x: 84, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(3).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(3).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 60, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [{ x: -182, y: 29.9, z: 103.1 }]

    PillarTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
    PillarTop.scaleArray = [{ x: 212, y: 3.9, z: 4 }]
    PillarTop.textureIndex = [4.1, 4.1]
    createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {
    //后侧墙壁 窗框 上下3层 上侧竖直 上 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -37.5 - i * 9, y: 22, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - i * 9, y: 22, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 22, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 22, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 22, z: 104.6 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁 窗框 上下3层 上侧竖直 中 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -37.5 - i * 9, y: 13, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - i * 9, y: 13, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 13, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 13, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 13, z: 104.6 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 5, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁 窗框 上下3层 上侧竖直 下 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -37.5 - i * 9, y: 4, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - i * 9, y: 4, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - i * 9, y: 4, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - i * 9, y: 4, z: 104.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -34 - 116.5 - 61 - 61 - 61 - i * 9, y: 4, z: 104.6 })
    WindowFrame.scaleArray = new Array(32).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(32).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(32).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁 窗框 上下3层 横向 长 4根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -51, y: 7.5, z: 104.6 },
      { x: -34 - 204.5 - 30.5, y: 25.5, z: 104.6 },
      { x: -34 - 204.5 - 30.5, y: 18.5, z: 104.6 },
      { x: -34 - 204.5 - 30.5, y: 7.5, z: 104.6 },
      { x: -34 - 204.5 - 30.5, y: 0.5, z: 104.6 },
    ]
    WindowFrame.scaleArray = [{ x: 14, y: 0.5, z: 0.5 }]
    for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 119, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(5).fill(100)
    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {
    //后侧墙壁大柱子 分开 里外纹理不一样
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      //后侧墙壁 第一个不用
      { x: 27, y: 13, z: 104.6 + 0.25 },
      { x: -34, y: 13, z: 104.6 - 3 },
      { x: -34 - 34, y: 13, z: 104.6 - 3 },
      { x: -34, y: 13, z: 104.6 + 1 },
      { x: -34 - 34, y: 13, z: 104.6 + 1 },
      { x: -208 - 3 * 61, y: 13, z: 103.1 }
    ]
    //里
    for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -147 - i * 61, y: 13, z: 101.6 })
    //外
    for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -147 - i * 61, y: 13, z: 105.6 })
    Pillar.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })

    Pillar.scaleArray = [{ x: 3, y: 13, z: 2 + 0.25 }]

    for (let i = 0; i < 2; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 2.5 })
    for (let i = 0; i < 2; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 1.5 })
    Pillar.scaleArray.push({ x: 3, y: 13, z: 4 })
    //里
    for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 2.5 })
    //外
    for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 1.5 })
    Pillar.textureIndex = [4.1, 5.1, 5.1, 4.1, 4.1, 4.1, 5.1, 5.1, 5.1, 5.1, 4.1, 4.1, 4.1, 4.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
}
export default create
