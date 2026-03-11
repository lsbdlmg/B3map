import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createRampTrapezoid } from '@/components/B3Map/BasicShape/createRampTrapezoid'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const PI = Math.PI
const create = (Objects, device, world, RAPIER) => {
  // 创建楼梯 中间平台
  {
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -121.5, y: 17, z: -4.15 }]
    StairCase.rotationArray = [{ x: 0, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 16.5, y: 1, z: 8.75 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }

  {
    // 创建楼梯 上层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 16, hh: 1, slices: 20, angleLeftDeg: 60, angleRightDeg: -60, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -129.5, y: 24.6, z: 18 }]
    StairCase.rotationArray = [{ x: -PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 8.5, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }
  {
    // 创建楼梯 下层
    const StairCase = createRampTrapezoid({ hl: 1, hw: 16, hh: 1, slices: 20, angleLeftDeg: -60, angleRightDeg: -30, repeat: { x: 1, y: 1, z: 1 }, slopeAxis: 'z' }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -113, y: 8.5, z: 19 }]
    StairCase.rotationArray = [{ x: PI / 6, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 8, y: 1, z: 1 }]
    StairCase.textureIndex = [0]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }

  {
    //楼梯 墙 朝外
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 4, y: 1, z: 4 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -122.5, y: 14, z: -5.15 }]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 17.5, y: 3, z: 10.25 }]
    Wall.textureIndex = [5.1, 5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    //楼梯 窗框
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    WindowFrame.scaleArray = []
    WindowFrame.rotationArray = new Array(44).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(44).fill(100)
    //楼梯正面
    {
      //最底下 4根
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -105.5 - i * 11, y: 5.5, z: -13.4 })
      //上面连着三层 每层4根
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -105.5 - i * 11, y: 22, z: -13.4 })
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -105.5 - i * 11, y: 31, z: -13.4 })
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -105.5 - i * 11, y: 40, z: -13.4 })
      //最底下 横向 2根
      WindowFrame.positionArray.push({ x: -121.5, y: 0.5, z: -13.4 })
      WindowFrame.positionArray.push({ x: -121.5, y: 10.5, z: -13.4 })
      //上面连着三层 横向 4根
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -121.5, y: 17.5 + i * 9, z: -13.4 })
      //楼梯正面
      for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 4.5, z: 0.5 })
      for (let i = 0; i < 12; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 4, z: 0.5 })
      for (let i = 0; i < 6; i++) WindowFrame.scaleArray.push({ x: 16.5, y: 0.5, z: 0.5 })
    }

    // 楼梯左侧
    {
      //楼梯左侧
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -138.5, y: 5.5, z: -13.4 + i * 9 })
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -138.5, y: 22, z: -13.4 + i * 9 })
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -138.5, y: 31, z: -13.4 + i * 9 })
      for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: -138.5, y: 40, z: -13.4 + i * 9 })
      //最底下 横向 2根
      WindowFrame.positionArray.push({ x: -138.5, y: 0.5, z: -4.4 })
      WindowFrame.positionArray.push({ x: -138.5, y: 10.5, z: -4.4 })
      //上面连着三层 横向 4根
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -138.5, y: 17.5 + i * 9, z: -4.4 })
      //楼梯左侧
      for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 4.5, z: 0.5 })
      for (let i = 0; i < 9; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 4, z: 0.5 })
      for (let i = 0; i < 6; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 9.5 })
    }

    createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
}
export default create
