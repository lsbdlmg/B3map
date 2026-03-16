import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    //楼梯 中间平台
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = [{ x: -121.5, y: 17, z: -3.85 }]
    StairCase.rotationArray = [{ x: 0, y: 0, z: 0 }]
    StairCase.scaleArray = [{ x: 16.5, y: 1, z: 9.05 }]
    StairCase.textureIndex = [7.1]
    createRigidBodies(StairCase.vertices, StairCase.indices, StairCase.positionArray, StairCase.scaleArray, StairCase.rotationArray, world, RAPIER)
    Objects.push({ Object: StairCase, object: stairCase })
  }
  {
    //楼梯
    const StairCase = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const stairCase = createGeometry(device, StairCase.vertices, StairCase.indices)
    StairCase.positionArray = []
    //下台阶
    for (let i = 0; i < 8; i++) StairCase.positionArray.push({ x: -113.25, y: 1 + 2 * i, z: 30.7 - 3.4 * i })
    //上台阶
    for (let i = 0; i < 8; i++) StairCase.positionArray.push({ x: -129.75, y: 1 + 16 + 2 * i, z: 6.9 + 3.4 * i })
    StairCase.scaleArray = new Array(16).fill({ x: 8.25, y: 1, z: 1.7 },)
    StairCase.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    StairCase.textureIndex = new Array(16).fill(7.1)
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

  {
    const offsetY = 0
    {

      // 楼梯栏杆 - 竖柱
      const Railing = createCube({ hw: 1, hh: 1, hd: 1, slices: 10, repeat: { x: 1, y: 1, z: 1 } })
      const railing = createGeometry(device, Railing.vertices, Railing.indices)
      Railing.positionArray = []
      Railing.scaleArray = []
      Railing.rotationArray = []
      Railing.textureIndex = []
      const postIndices = [0, 2, 5, 7]
      const xPosInner = -121.5 + 0.6
      const xPosOuter = -121.5 - 0.6
      // 下面台阶的柱子
      postIndices.forEach(i => {
        const yBase = 2 + 2 * i + offsetY
        const zPos = 30.7 - 3.4 * i
        Railing.positionArray.push({ x: xPosInner, y: yBase + 5, z: zPos })
        Railing.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        Railing.rotationArray.push({ x: 0, y: 0, z: 0 })
        Railing.textureIndex.push(103)
      })

      // 上面台阶的柱子
      postIndices.forEach(i => {
        const yBase = 18 + 2 * i + offsetY
        const zPos = 6.9 + 3.4 * i
        Railing.positionArray.push({ x: xPosOuter, y: yBase + 5, z: zPos })
        Railing.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        Railing.rotationArray.push({ x: 0, y: 0, z: 0 })
        Railing.textureIndex.push(103)
      })

      createRigidBodies(Railing.vertices, Railing.indices, Railing.positionArray, Railing.scaleArray, Railing.rotationArray, world, RAPIER)
      Objects.push({ Object: Railing, object: railing })
    }

    {

      // 楼梯栏杆 - 横栏
      const RailingPipe = createCylinder({ radiusTop: 0.5, radiusBottom: 0.5, height: 1, radialSegments: 10 })
      const railingPipe = createGeometry(device, RailingPipe.vertices, RailingPipe.indices)
      RailingPipe.positionArray = []
      RailingPipe.scaleArray = []
      RailingPipe.rotationArray = []
      RailingPipe.textureIndex = []
      const railHeights = [2.5, 4.5, 6.5, 8.5, 10.5]
      const dz = 23.5
      const dy = 14
      const railLength = Math.sqrt(dy * dy + dz * dz) + 1
      const angle = Math.atan2(dy, dz)
      const xPosInner = -121.5 + 0.6
      const xPosOuter = -121.5 - 0.6

      //下面台阶
      {
        const centerZ = (30.7 + (30.7 - 23.8)) / 2
        const centerY = (2 + (2 + 14)) / 2 + offsetY
        railHeights.forEach((h, idx) => {
          const isTop = idx === railHeights.length - 1
          const thick = isTop ? 1 : 0.4
          RailingPipe.positionArray.push({ x: xPosInner, y: centerY + h, z: centerZ })
          RailingPipe.rotationArray.push({ x: -(Math.PI / 2) + angle, y: 0, z: 0 })
          RailingPipe.scaleArray.push({ x: thick, y: railLength, z: thick })
          RailingPipe.textureIndex.push(104)
        })
      }

      //上面台阶
      {
        const centerZ = (6.9 + (6.9 + 23.8)) / 2
        const centerY = (18 + (18 + 14)) / 2 + offsetY
        railHeights.forEach((h, idx) => {
          const isTop = idx === railHeights.length - 1
          const thick = isTop ? 1 : 0.4
          RailingPipe.positionArray.push({ x: xPosOuter, y: centerY + h, z: centerZ })
          RailingPipe.rotationArray.push({ x: (Math.PI / 2) - angle, y: 0, z: 0 })
          RailingPipe.scaleArray.push({ x: thick, y: railLength, z: thick })
          RailingPipe.textureIndex.push(104)
        })
      }

      createRigidBodies(RailingPipe.vertices, RailingPipe.indices, RailingPipe.positionArray, RailingPipe.scaleArray, RailingPipe.rotationArray, world, RAPIER)
      Objects.push({ Object: RailingPipe, object: railingPipe })
    }
  }
}
export default create
