import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  //门口部分
  {
    {    //门口大柱子
      const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
      const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
      Pillar.positionArray = [
        //门口
        { x: 27, y: 13, z: -13.4 },
      ]
      Pillar.rotationArray = [
        { x: 0, y: 0, z: 0 },
      ]
      Pillar.scaleArray = [
        { x: 3, y: 13, z: 2 },
      ]
      Pillar.textureIndex = [4.1]
      createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
      Objects.push({ Object: Pillar, object: pillar })

    }
    {    //门口上侧 横向大柱子
      const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 10, y: 1, z: 2 } }) //宽度1,高度1,深度1
      const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
      PillarTop.positionArray = [
        { x: -0.5, y: 29.9, z: -12.4 },
      ]

      PillarTop.rotationArray = [
        { x: 0, y: 0, z: 0 },
      ]
      PillarTop.scaleArray = [
        { x: 30.5, y: 3.9, z: 3 },
      ]
      PillarTop.textureIndex = [4.1]
      createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
      Objects.push({ Object: PillarTop, object: pillarTop })
    }
    {    //门口右侧 大墙 对半分 里外纹理不一样
      const WallRight = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } }) //宽度1,高度1,深度1
      const wallRight = createGeometry(device, WallRight.vertices, WallRight.indices)
      WallRight.positionArray = [
        { x: -46, y: 16, z: -10.9 },
        { x: -46, y: 16.9, z: -13.9 },
      ]

      WallRight.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]
      WallRight.scaleArray = [
        { x: 15, y: 16, z: 1.5 },
        { x: 15, y: 16.9, z: 1.5 }
      ]
      WallRight.textureIndex = [5.1, 4.1]
      createRigidBodies(WallRight.vertices, WallRight.indices, WallRight.positionArray, WallRight.scaleArray, WallRight.rotationArray, world, RAPIER)
      Objects.push({ Object: WallRight, object: wallRight })
    }
    {    //门框 下侧6根竖直门框
      const DoorFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const doorFrame_Vertical_Down = createGeometry(device, DoorFrame_Vertical_Down.vertices, DoorFrame_Vertical_Down.indices)
      DoorFrame_Vertical_Down.positionArray = []
      for (let i = 0; i < 3; i++)    DoorFrame_Vertical_Down.positionArray.push({ x: 23.5 - i * 9, y: 9.5, z: -13 })
      for (let i = 0; i < 3; i++)    DoorFrame_Vertical_Down.positionArray.push({ x: 23.5 - (i + 4) * 9, y: 9.5, z: -13 })
      DoorFrame_Vertical_Down.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })
      DoorFrame_Vertical_Down.scaleArray = new Array(6).fill({ x: 0.5, y: 8.5, z: 0.5 })
      DoorFrame_Vertical_Down.textureIndex = new Array(6).fill(100)
      createRigidBodies(DoorFrame_Vertical_Down.vertices, DoorFrame_Vertical_Down.indices, DoorFrame_Vertical_Down.positionArray, DoorFrame_Vertical_Down.scaleArray, DoorFrame_Vertical_Down.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame_Vertical_Down, object: doorFrame_Vertical_Down })
    }
    {    //门框 上侧7根竖直门框 短
      const DoorFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const doorFrame_Vertical_up = createGeometry(device, DoorFrame_Vertical_Up.vertices, DoorFrame_Vertical_Up.indices)
      DoorFrame_Vertical_Up.positionArray = [
        { x: 23.5, y: 22, z: -13 },
        { x: 14.5, y: 22, z: -13 },
        { x: 5.5, y: 22, z: -13 },
        { x: -3.5, y: 22, z: -13 },
        { x: -12.5, y: 22, z: -13 },
        { x: -21.5, y: 22, z: -13 },
        { x: -30.5, y: 22, z: -13 },
      ]
      DoorFrame_Vertical_Up.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]
      DoorFrame_Vertical_Up.scaleArray = [
        //门口的玻璃 上侧短
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
        { x: 0.5, y: 3, z: 0.5 },
      ]
      DoorFrame_Vertical_Up.textureIndex = [
        100, 100, 100, 100, 100, 100, 100
      ]
      createRigidBodies(DoorFrame_Vertical_Up.vertices, DoorFrame_Vertical_Up.indices, DoorFrame_Vertical_Up.positionArray, DoorFrame_Vertical_Up.scaleArray, DoorFrame_Vertical_Up.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame_Vertical_Up, object: doorFrame_Vertical_up })
    }
    {    //门框 上侧2根横向门框 长
      const DoorFrame_Horizontal_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const doorFrame_Horizontal_Up = createGeometry(device, DoorFrame_Horizontal_Up.vertices, DoorFrame_Horizontal_Up.indices)
      DoorFrame_Horizontal_Up.positionArray = [
        { x: -3.5, y: 25.5, z: -13 },
        { x: -3.5, y: 18.5, z: -13 },

      ]
      DoorFrame_Horizontal_Up.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]
      DoorFrame_Horizontal_Up.scaleArray = [
        { x: 27.5, y: 0.5, z: 0.5 },
        { x: 27.5, y: 0.5, z: 0.5 },
      ]
      DoorFrame_Horizontal_Up.textureIndex = [
        100, 100
      ]

      createRigidBodies(DoorFrame_Horizontal_Up.vertices, DoorFrame_Horizontal_Up.indices, DoorFrame_Horizontal_Up.positionArray, DoorFrame_Horizontal_Up.scaleArray, DoorFrame_Horizontal_Up.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame_Horizontal_Up, object: doorFrame_Horizontal_Up })
    }
    {    //门框 下侧2根横向门框 短
      const DoorFrame_Horizontal_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const doorFrame_Horizontal_Down = createGeometry(device, DoorFrame_Horizontal_Down.vertices, DoorFrame_Horizontal_Down.indices)
      DoorFrame_Horizontal_Down.positionArray = [
        { x: 14.5, y: 0.5, z: -13 },
        { x: -21.5, y: 0.5, z: -13 },

      ]
      DoorFrame_Horizontal_Down.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 },
      ]
      DoorFrame_Horizontal_Down.scaleArray = [
        { x: 9.5, y: 0.5, z: 0.5 },
        { x: 9.5, y: 0.5, z: 0.5 },
      ]
      DoorFrame_Horizontal_Down.textureIndex = [
        100, 100
      ]
      createRigidBodies(DoorFrame_Horizontal_Down.vertices, DoorFrame_Horizontal_Down.indices, DoorFrame_Horizontal_Down.positionArray, DoorFrame_Horizontal_Down.scaleArray, DoorFrame_Horizontal_Down.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame_Horizontal_Down, object: doorFrame_Horizontal_Down })
    }
  }
  //左墙
  {
    {
      //左侧墙壁 窗框 下侧竖直 长 13根
      const LeftWall_WindowFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const leftWall_WindowFrame_Vertical_Down = createGeometry(device, LeftWall_WindowFrame_Vertical_Down.vertices, LeftWall_WindowFrame_Vertical_Down.indices)
      LeftWall_WindowFrame_Vertical_Down.positionArray = []
      //55-6.9==48.1
      for (let i = 0; i < 7; i++) LeftWall_WindowFrame_Vertical_Down.positionArray.push({ x: 27, y: 9.5, z: -10.9 + i * 9 })
      for (let i = 0; i < 7; i++) LeftWall_WindowFrame_Vertical_Down.positionArray.push({ x: 27, y: 9.5, z: 48.1 + i * 9 })
      LeftWall_WindowFrame_Vertical_Down.scaleArray = new Array(14).fill({ x: 0.5, y: 8.5, z: 0.5 })
      LeftWall_WindowFrame_Vertical_Down.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
      LeftWall_WindowFrame_Vertical_Down.textureIndex = new Array(14).fill(100)
      createRigidBodies(LeftWall_WindowFrame_Vertical_Down.vertices, LeftWall_WindowFrame_Vertical_Down.indices, LeftWall_WindowFrame_Vertical_Down.positionArray, LeftWall_WindowFrame_Vertical_Down.scaleArray, LeftWall_WindowFrame_Vertical_Down.rotationArray, world, RAPIER)
      Objects.push({ Object: LeftWall_WindowFrame_Vertical_Down, object: leftWall_WindowFrame_Vertical_Down })
    }
    {
      //左侧墙壁 窗框 上侧竖直 上 13根
      const LeftWall_WindowFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const leftWall_WindowFrame_Vertical_Up = createGeometry(device, LeftWall_WindowFrame_Vertical_Up.vertices, LeftWall_WindowFrame_Vertical_Up.indices)
      LeftWall_WindowFrame_Vertical_Up.positionArray = []
      for (let i = 0; i < 7; i++) LeftWall_WindowFrame_Vertical_Up.positionArray.push({ x: 27, y: 22, z: -10.9 + i * 9 })
      for (let i = 0; i < 7; i++) LeftWall_WindowFrame_Vertical_Up.positionArray.push({ x: 27, y: 22, z: 48.1 + i * 9 })
      LeftWall_WindowFrame_Vertical_Up.scaleArray = new Array(14).fill({ x: 0.5, y: 3, z: 0.5 })
      LeftWall_WindowFrame_Vertical_Up.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
      LeftWall_WindowFrame_Vertical_Up.textureIndex = new Array(14).fill(100)
      createRigidBodies(LeftWall_WindowFrame_Vertical_Up.vertices, LeftWall_WindowFrame_Vertical_Up.indices, LeftWall_WindowFrame_Vertical_Up.positionArray, LeftWall_WindowFrame_Vertical_Up.scaleArray, LeftWall_WindowFrame_Vertical_Up.rotationArray, world, RAPIER)
      Objects.push({ Object: LeftWall_WindowFrame_Vertical_Up, object: leftWall_WindowFrame_Vertical_Up })
    }
    {
      //左侧墙壁 窗框 横向 长 3根
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
      LeftWall_WindowFrame_Horizontal.textureIndex = [100, 100, 100]
      createRigidBodies(LeftWall_WindowFrame_Horizontal.vertices, LeftWall_WindowFrame_Horizontal.indices, LeftWall_WindowFrame_Horizontal.positionArray, LeftWall_WindowFrame_Horizontal.scaleArray, LeftWall_WindowFrame_Horizontal.rotationArray, world, RAPIER)
      Objects.push({ Object: LeftWall_WindowFrame_Horizontal, object: leftWall_WindowFrame_Horizontal })
    }
    {
      //左侧墙壁上侧 横向大柱子
      const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } }) //宽度1,高度1,深度1
      const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
      PillarTop.positionArray = [{ x: 27, y: 29.9, z: 45.1 - 0.25 }]

      PillarTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
      PillarTop.scaleArray = [{ x: 3, y: 3.9, z: 54.25 }]
      PillarTop.textureIndex = [4.1]
      createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
      Objects.push({ Object: PillarTop, object: pillarTop })
    }
    {
      //中间柱子
      const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
      const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
      Pillar.positionArray = [
        //门口
        { x: 27, y: 13, z: 45.6 },
      ]
      Pillar.rotationArray = [
        { x: 0, y: 0, z: 0 },
      ]
      Pillar.scaleArray = [
        { x: 3, y: 13, z: 2 },
      ]
      Pillar.textureIndex = [4.1]
      createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
      Objects.push({ Object: Pillar, object: pillar })
    }
  }
  //后墙
  {

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

}
export default create
