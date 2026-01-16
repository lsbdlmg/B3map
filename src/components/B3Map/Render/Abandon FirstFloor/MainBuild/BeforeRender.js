import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createSphere } from '@/components/B3Map/BasicShape/Sphere'
import Fragment from '@/components/B3Map/Render/Abandon FirstFloor/Mainbuild/Shader/Fragment.wgsl?raw'
import Vertex from '@/components/B3Map/Render/Abandon FirstFloor/Mainbuild/Shader/Vertex.wgsl?raw'
import Shadow from '@/components/B3Map/Render/Abandon FirstFloor/Mainbuild/Shader/Shadow.wgsl?raw'
import { createGeometry, loadTexture, createRigidBodies } from '@/components/B3Map/publicJs/Object'
import { createSpotLightMatrix } from '@/components/B3Map/publicJs/Light'
const PI = Math.PI


const BeforeRender = async (device, format, world, RAPIER) => {
  const Objects = []
  // const
  {  // 创建楼梯
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)

    Pillar.positionArray = [
      //楼梯半平台
      { x: -48 - 100, y: 12, z: -4.4 },
      //下侧楼梯
      { x: -42 - 100, y: 6.15, z: 10.5 },
      //上侧楼梯
      { x: -54 - 100, y: 18.6, z: 9.7 },
      // { x: 15, y: 15, z: -28 },
    ]
    Pillar.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: -PI / 3, y: 0, z: 0 },
      { x: PI / 3.4, y: 0, z: 0 },
    ]
    Pillar.scaleArray = [
      { x: 12, y: 1, z: 5 },
      { x: 6, y: 12, z: 1 },
      { x: 6, y: 11, z: 1 },
    ]
    Pillar.textureIndex = [
      0,
      0,
      0,
    ]
    createRigidBodies(Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER);
    Objects.push({ Object: Pillar, object: pillar })
  }
  {  // 创建地面几何体数据
    const Ground = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 100, y: 2, z: 100 } })
    const ground = createGeometry(device, Ground.vertices, Ground.indices)

    Ground.positionArray = [
      { x: -300, y: -1, z: -150 },
      // { x: -3, y: 35, z: 25.5 },
      // { x: -76, y: 25, z: 40.3 },
    ]
    Ground.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Ground.scaleArray = [
      { x: 400, y: 1, z: 300 },
      { x: 33, y: 1, z: 37.1 },
      { x: 40, y: 1, z: 22.3 },
    ]
    Ground.textureIndex = [
      5,
      0,
      1,
    ]
    createRigidBodies(Ground.positionArray, Ground.scaleArray, Ground.rotationArray, world, RAPIER)
    Objects.push({ Object: Ground, object: ground })
  }
  //计算坐标的方法 先算中心点 设置的scale只是一半的长度  不要忘记加上自己的半长
  //从原始坐标中心点出发 加上原始物品半长（scale）-> 到原始物体边缘 -> 加上自己的半长scale -> 到物体最终中心点 -> 设置物体的scale
  {    //门口大柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      //门口
      { x: 27, y: 13, z: -12.4 },
    ]
    Pillar.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    Pillar.scaleArray = [
      { x: 3, y: 13, z: 3 },
    ]
    Pillar.textureIndex = [1, 1, 7, 7, 7, 7, 7, 7]
    createRigidBodies(Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {    //门口上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 10, y: 1, z: 2 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: -0.5, y: 29, z: -12.4 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 30.5, y: 3, z: 3 },
    ]
    PillarTop.textureIndex = [1, 1]
    createRigidBodies(PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {    //门口右侧 大墙
    const WallRight = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2.5, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wallRight = createGeometry(device, WallRight.vertices, WallRight.indices)
    WallRight.positionArray = [{ x: -46, y: 16, z: -12.4 },]

    WallRight.rotationArray = [{ x: 0, y: 0, z: 0 }]
    WallRight.scaleArray = [{ x: 15, y: 16, z: 3 }]
    WallRight.textureIndex = [8]
    createRigidBodies(WallRight.positionArray, WallRight.scaleArray, WallRight.rotationArray, world, RAPIER)
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
    DoorFrame_Vertical_Down.textureIndex = new Array(6).fill(6)
    createRigidBodies(DoorFrame_Vertical_Down.positionArray, DoorFrame_Vertical_Down.scaleArray, DoorFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Vertical_Down, object: doorFrame_Vertical_Down })
  }
  {    //门框 上侧7根竖直门框 短
    const DoorFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
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
      6, 6, 6, 6, 6, 6, 6
    ]
    createRigidBodies(DoorFrame_Vertical_Up.positionArray, DoorFrame_Vertical_Up.scaleArray, DoorFrame_Vertical_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Vertical_Up, object: doorFrame_Vertical_up })
  }
  {    //门框 上侧2根横向门框 长
    const DoorFrame_Horizontal_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
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
      6, 6
    ]

    createRigidBodies(DoorFrame_Horizontal_Up.positionArray, DoorFrame_Horizontal_Up.scaleArray, DoorFrame_Horizontal_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Horizontal_Up, object: doorFrame_Horizontal_Up })
  }
  {    //门框 下侧2根横向门框 短
    const DoorFrame_Horizontal_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
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
      6, 6
    ]
    createRigidBodies(DoorFrame_Horizontal_Down.positionArray, DoorFrame_Horizontal_Down.scaleArray, DoorFrame_Horizontal_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame_Horizontal_Down, object: doorFrame_Horizontal_Down })
  }
  {    //左侧墙壁 窗框 下侧竖直 长 13根
    const LeftWall_WindowFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Vertical_Down = createGeometry(device, LeftWall_WindowFrame_Vertical_Down.vertices, LeftWall_WindowFrame_Vertical_Down.indices)
    LeftWall_WindowFrame_Vertical_Down.positionArray = []
    for (let i = 0; i < 13; i++)LeftWall_WindowFrame_Vertical_Down.positionArray.push({ x: 27, y: 9.5, z: -8.9 + i * 9 })
    LeftWall_WindowFrame_Vertical_Down.scaleArray = new Array(13).fill({ x: 0.5, y: 8.5, z: 0.5 })
    LeftWall_WindowFrame_Vertical_Down.rotationArray = new Array(13).fill({ x: 0, y: 0, z: 0 })
    LeftWall_WindowFrame_Vertical_Down.textureIndex = new Array(13).fill(6)
    createRigidBodies(LeftWall_WindowFrame_Vertical_Down.positionArray, LeftWall_WindowFrame_Vertical_Down.scaleArray, LeftWall_WindowFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Vertical_Down, object: leftWall_WindowFrame_Vertical_Down })
  }
  {    //左侧墙壁 窗框 上侧竖直 上 13根
    const LeftWall_WindowFrame_Vertical_Up = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Vertical_Up = createGeometry(device, LeftWall_WindowFrame_Vertical_Up.vertices, LeftWall_WindowFrame_Vertical_Up.indices)
    LeftWall_WindowFrame_Vertical_Up.positionArray = [
      { x: 27, y: 22, z: -8.9 },
      { x: 27, y: 22, z: 0.1 },
      { x: 27, y: 22, z: 9.1 },
      { x: 27, y: 22, z: 18.1 },
      { x: 27, y: 22, z: 27.1 },
      { x: 27, y: 22, z: 36.1 },
      { x: 27, y: 22, z: 45.1 },
      { x: 27, y: 22, z: 54.1 },
      { x: 27, y: 22, z: 63.1 },
      { x: 27, y: 22, z: 72.1 },
      { x: 27, y: 22, z: 81.1 },
      { x: 27, y: 22, z: 90.1 },
      { x: 27, y: 22, z: 99.1 },
    ]
    LeftWall_WindowFrame_Vertical_Up.scaleArray = [
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
      { x: 0.5, y: 3, z: 0.5 },
    ]
    LeftWall_WindowFrame_Vertical_Up.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    LeftWall_WindowFrame_Vertical_Up.textureIndex = [
      6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6, 6
    ]
    createRigidBodies(LeftWall_WindowFrame_Vertical_Up.positionArray, LeftWall_WindowFrame_Vertical_Up.scaleArray, LeftWall_WindowFrame_Vertical_Up.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Vertical_Up, object: leftWall_WindowFrame_Vertical_Up })
  }
  {    //左侧墙壁 窗框 横向 长 3根
    const LeftWall_WindowFrame_Horizontal = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const leftWall_WindowFrame_Horizontal = createGeometry(device, LeftWall_WindowFrame_Horizontal.vertices, LeftWall_WindowFrame_Horizontal.indices)
    LeftWall_WindowFrame_Horizontal.positionArray = [
      { x: 27, y: 25.5, z: 45.1 },
      { x: 27, y: 18.5, z: 45.1 },
      { x: 27, y: 0.5, z: 45.1 },
    ]
    LeftWall_WindowFrame_Horizontal.scaleArray = [
      { x: 0.5, y: 0.5, z: 54.5 },
      { x: 0.5, y: 0.5, z: 54.5 },
      { x: 0.5, y: 0.5, z: 54.5 },
    ]
    LeftWall_WindowFrame_Horizontal.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    LeftWall_WindowFrame_Horizontal.textureIndex = [
      6, 6, 6,
    ]
    createRigidBodies(LeftWall_WindowFrame_Horizontal.positionArray, LeftWall_WindowFrame_Horizontal.scaleArray, LeftWall_WindowFrame_Horizontal.rotationArray, world, RAPIER)
    Objects.push({ Object: LeftWall_WindowFrame_Horizontal, object: leftWall_WindowFrame_Horizontal })
  }
  {    //左侧墙壁上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 1, repeat: { x: 2, y: 1, z: 15 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: 27, y: 29, z: 45.1 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 3, y: 3, z: 54.5 },
    ]
    PillarTop.textureIndex = [1, 1]
    createRigidBodies(PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {    //后侧墙壁 窗框 上下2层 下侧竖直 长 16根
    const WindowFrame_Vertical_Down = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame_Vertical_Down = createGeometry(device, WindowFrame_Vertical_Down.vertices, WindowFrame_Vertical_Down.indices)
    WindowFrame_Vertical_Down.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame_Vertical_Down.positionArray.push({ x: 23.5 - i * 9, y: 9.5, z: 102.6 })
    for (let i = 0; i < 9; i++) WindowFrame_Vertical_Down.positionArray.push({ x: -37.5 - i * 9, y: 9.5, z: 102.6 })
    WindowFrame_Vertical_Down.scaleArray = new Array(16).fill({ x: 0.5, y: 8.5, z: 0.5 })
    WindowFrame_Vertical_Down.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    WindowFrame_Vertical_Down.textureIndex = new Array(16).fill(6)
    createRigidBodies(WindowFrame_Vertical_Down.positionArray, WindowFrame_Vertical_Down.scaleArray, WindowFrame_Vertical_Down.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame_Vertical_Down, object: windowFrame_Vertical_Down })
  }
  {    //后侧墙壁 窗框 上下2层 上侧竖直 上 16根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: 23.5 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 9; i++) WindowFrame.positionArray.push({ x: -37.5 - i * 9, y: 22, z: 102.6 })
    WindowFrame.scaleArray = new Array(16).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(16).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁 窗框 上下2层 横向 长 3根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -43, y: 25.5, z: 102.6 },
      { x: -43, y: 18.5, z: 102.6 },
      { x: -43, y: 0.5, z: 102.6 }
    ]
    WindowFrame.scaleArray = new Array(3).fill({ x: 67, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(3).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(3).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁上侧 横向大柱子
    const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 22, y: 1, z: 1 } }) //宽度1,高度1,深度1
    const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
    PillarTop.positionArray = [
      { x: -43, y: 29, z: 102.6 },
      { x: -207.5, y: 29, z: 102.6 },
    ]

    PillarTop.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    PillarTop.scaleArray = [
      { x: 73, y: 3, z: 3 },
      { x: 91.5, y: 3, z: 3 }
    ]
    PillarTop.textureIndex = [1, 1]
    createRigidBodies(PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
    Objects.push({ Object: PillarTop, object: pillarTop })
    // MainHallDoor.PillarTop = { Object: PillarTop, object: pillarTop }
  }
  {    //后侧墙壁 窗框 上下3层 上侧竖直 上 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - i * 9, y: 22, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - 61 - i * 9, y: 22, z: 102.6 })
    WindowFrame.scaleArray = new Array(21).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(21).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(21).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁 窗框 上下3层 上侧竖直 中 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - i * 9, y: 13, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - i * 9, y: 13, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - 61 - i * 9, y: 13, z: 102.6 })
    WindowFrame.scaleArray = new Array(21).fill({ x: 0.5, y: 5, z: 0.5 })
    WindowFrame.rotationArray = new Array(21).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(21).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁 窗框 上下3层 上侧竖直 下 21根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = []
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - i * 9, y: 4, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - i * 9, y: 4, z: 102.6 })
    for (let i = 0; i < 7; i++) WindowFrame.positionArray.push({ x: -116.5 - 61 - 61 - i * 9, y: 4, z: 102.6 })
    WindowFrame.scaleArray = new Array(21).fill({ x: 0.5, y: 3, z: 0.5 })
    WindowFrame.rotationArray = new Array(21).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(21).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁 窗框 上下2层 横向 长 4根
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -204.5, y: 25.5, z: 102.6 },
      { x: -204.5, y: 18.5, z: 102.6 },
      { x: -204.5, y: 7.5, z: 102.6 },
      { x: -204.5, y: 0.5, z: 102.6 }
    ]
    WindowFrame.scaleArray = new Array(4).fill({ x: 88.5, y: 0.5, z: 0.5 })
    WindowFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    WindowFrame.textureIndex = new Array(4).fill(6)
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //后侧墙壁大柱子 纹理重复两倍 这里从0.5开始
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.5, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      //后侧墙壁
      { x: 27, y: 13, z: 102.6 },
      { x: -34, y: 13, z: 102.6 },
      { x: -113, y: 13, z: 102.6 },
      { x: -174, y: 13, z: 102.6 },
      { x: -174 - 61, y: 13, z: 102.6 },
      { x: -174 - 61 - 61, y: 13, z: 102.6 },
      // { x: 27, y: 13, z: -12.4 },
    ]
    Pillar.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Pillar.scaleArray = [
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
      { x: 3, y: 13, z: 3 },
    ]
    Pillar.textureIndex = [1, 7, 7, 7, 7, 7, 7]
    createRigidBodies(Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {    //大厅右侧小房间 门口 下墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1.6, z: 1.5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -59, y: 4.5, z: 5.1 },]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 2, y: 4.5, z: 4.5 }]
    Wall.textureIndex = [4]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //大厅右侧小房间 门口 上墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2.1, z: 3 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -59, y: 26.5, z: 0.1 },]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 2, y: 5.5, z: 9.5 }]
    Wall.textureIndex = [4]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //大厅右侧小房间 背侧 后墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 4.5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -97, y: 16, z: 3.6 },]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 8, y: 16, z: 13 }]
    Wall.textureIndex = [4]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //大厅右侧小房间 侧墙 有窗户
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3.5, y: 4, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -92.5, y: 13, z: -12.4 },]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 12.5, y: 13, z: 3 }]
    Wall.textureIndex = [1]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //大厅右侧小房间 侧墙 有窗户 上侧横向大柱子
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 6, y: 1, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -83, y: 29, z: -12.4 },]

    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.scaleArray = [{ x: 22, y: 3, z: 3 }]
    Wall.textureIndex = [1]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //配电房墙壁 长墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 9 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -59, y: 16, z: 39.1 },
      { x: -103, y: 16, z: 42.6 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 2, y: 16, z: 29.5 },
      { x: 2, y: 16, z: 26 },
    ]
    Wall.textureIndex = [4, 4]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //配电房墙壁 短墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 6, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -81, y: 16, z: 18.6 },
      { x: -81, y: 16, z: 66.6 },
    ]

    Wall.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
    ]
    Wall.scaleArray = [
      { x: 20, y: 16, z: 2 },
      { x: 20, y: 16, z: 2 },
    ]
    Wall.textureIndex = [4, 4]
    createRigidBodies(Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {    //大厅右侧小房间 门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      { x: -59, y: 10, z: -8.9 },
      { x: -59, y: 10, z: 0.1 },
      { x: -59, y: 15, z: 9.1 },
      { x: -59, y: 9.5, z: 4.6 },
      { x: -59, y: 20.5, z: -0.4 },
    ]
    DoorFrame.scaleArray = [
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 10, z: 0.5 },
      { x: 1.5, y: 6, z: 0.5 },
      { x: 1.5, y: 0.5, z: 4 },
      { x: 1.5, y: 0.5, z: 9 }
    ]
    DoorFrame.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 }
    ]
    DoorFrame.textureIndex = [9, 9, 9, 9, 9]
    createRigidBodies(DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: DoorFrame, object: doorFrame })
  }
  {    //大厅右侧小房间 靠近户外窗框 竖直
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -79.5, y: 13, z: -13.4 },
      { x: -70.5, y: 13, z: -13.4 },
      { x: -61.5, y: 13, z: -13.4 },
    ]
    WindowFrame.scaleArray = [
      { x: 0.5, y: 13, z: 0.5 },
      { x: 0.5, y: 13, z: 0.5 },
      { x: 0.5, y: 13, z: 0.5 }
    ]
    WindowFrame.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 }
    ]
    WindowFrame.textureIndex = [6, 6, 6]
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  {    //大厅右侧小房间 靠近户外窗框 横向
    const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
    WindowFrame.positionArray = [
      { x: -70.5, y: 25.5, z: -13.4 },
      { x: -70.5, y: 18.5, z: -13.4 },
      { x: -70.5, y: 7.5, z: -13.4 },
      { x: -70.5, y: 0.5, z: -13.4 },
    ]
    WindowFrame.scaleArray = [
      { x: 8.5, y: 0.5, z: 0.5 },
      { x: 8.5, y: 0.5, z: 0.5 },
      { x: 8.5, y: 0.5, z: 0.5 },
      { x: 8.5, y: 0.5, z: 0.5 }
    ]
    WindowFrame.rotationArray = [
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 },
      { x: 0, y: 0, z: 0 }
    ]
    WindowFrame.textureIndex = [6, 6, 6, 6]
    createRigidBodies(WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: WindowFrame, object: windowFrame })
  }
  // 把灯放到最后 因为阴影渲染 灯不要渲染
  // 创建聚光灯球体几何体数据
  const SpotLight = createSphere(1, 32, 32)
  const spotLight = createGeometry(device, SpotLight.vertices, SpotLight.indices)
  SpotLight.positionArray = [
    { x: 0, y: 30, z: 40 },
    { x: -30, y: 30, z: 40 },
  ]
  SpotLight.rotationArray = [
    { x: 0, y: 0, z: 0 },
    { x: 0, y: 0, z: 0 },
  ]
  SpotLight.scaleArray = [
    { x: 0.7, y: 0.7, z: 0.7 },
    { x: 0.7, y: 0.7, z: 0.7 },
  ]
  SpotLight.textureIndex = [
    100,
    100,
  ]
  Objects.push({ Object: SpotLight, object: spotLight })

  const stride = 256
  let objectCount = 0//计算总物体数量
  for (let i = 0; i < Objects.length; i++) {
    objectCount += Objects[i].Object.positionArray.length
  }



  // 纹理
  const textures = {}
  textures.wood = await loadTexture(device, '/wood.jpg')
  textures.brickOne = await loadTexture(device, '/brickTwo.jpg')
  textures.brickTwo = await loadTexture(device, '/brickTwo.jpg')
  textures.grass = await loadTexture(device, '/grass.jpg')
  textures.outsideBrick = await loadTexture(device, '/outsideBrick.jpg')
  textures.insideBrick = await loadTexture(device, '/insideBrick.jpg')
  textures.worldGroud = await loadTexture(device, '/worldGroud.jpg')

  // 聚光灯参数
  const outerAngle = Math.PI / (180 / 80) // 160° 聚光灯角度 最大160° 以外无光 会有阴影
  const innerAngle = Math.PI / (180 / 30) // 60° 内全亮
  const innerCone = Math.cos(innerAngle)
  const outerCone = Math.cos(outerAngle)
  // 聚光灯1
  const spotLightOne = {
    position: [SpotLight.positionArray[0].x, SpotLight.positionArray[0].y, SpotLight.positionArray[0].z],
    direction: [0, -1, 0],
    color: [1.0, 1.0, 1.0],
    intensity: 1.5,
  }
  const spotlightOneMatrix = createSpotLightMatrix(spotLightOne.position, spotLightOne.direction, outerAngle)


  // 聚光灯2
  const spotLightTwo = {
    position: [SpotLight.positionArray[1].x, SpotLight.positionArray[1].y, SpotLight.positionArray[1].z],
    direction: [0, -1, 0],
    color: [1.0, 1.0, 1.0],
    intensity: 1.5,
  }
  const spotlightTwoMatrix = createSpotLightMatrix(spotLightTwo.position, spotLightTwo.direction, outerAngle)

  //公共属性
  // 缓冲区属性
  const commonBufferAttribute = {
    arrayStride: 8 * 4,
    attributes: [
      {
        shaderLocation: 0,
        offset: 0,
        format: 'float32x3',
      },
      {
        shaderLocation: 1,
        offset: 3 * 4,
        format: 'float32x3',
      },
      {
        shaderLocation: 2,
        offset: 6 * 4,
        format: 'float32x2',
      },
    ],
  }
  // 图元属性
  const commonPrimitive = {
    topology: 'triangle-list',
    cullMode: 'back',
  }
  // 深度模板属性
  const commonDepthStencil = {
    depthWriteEnabled: true,
    depthCompare: 'less',
    format: 'depth32float',
  }
  const ShadowSize = 8192

  // 创建缓冲区
  const ObjectMVPMatrixBuffer = device.createBuffer({
    label: '物体MVP矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ObjectModelMatrixBuffer = device.createBuffer({
    label: '物体模型矩阵缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const ObjectAttributeBuffer = device.createBuffer({
    label: '物体属性缓冲区',
    size: stride * objectCount,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  // 传给主渲染Vertex着色器、阴影渲染Vertex着色器
  const SpotLightOneMatrixBuffer = device.createBuffer({
    label: '聚光灯1矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SpotLightTwoMatrixBuffer = device.createBuffer({
    label: '聚光灯2矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightMatrixBuffer = device.createBuffer({
    label: '太阳光矩阵缓冲区',
    size: 4 * 16,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  // 聚光灯属性缓冲区 传给主渲染Fragment着色器
  const SpotLightOneAttributeBuffer = device.createBuffer({
    label: '聚光灯1属性缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SpotLightTwoAttributeBuffer = device.createBuffer({
    label: '聚光灯2属性缓冲区',
    size: stride,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  const SunLightAttributeBuffer = device.createBuffer({
    label: '光源属性缓冲区',
    size: 256,
    usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST,
  })
  //=================================================================
  // 顶点着色器绑定组布局
  const vsBindGroupLayout = device.createBindGroupLayout({
    label: '顶点着色器绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } }, // 物体MVP
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } }, // 物体Model
      { binding: 2, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 聚光灯1矩阵
      { binding: 3, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 聚光灯2矩阵
      { binding: 4, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } }, // 太阳光矩阵
    ],
  })
  // 片段着色器绑定组布局
  const fsBindGroupLayout = device.createBindGroupLayout({
    label: '片段着色器绑定组布局',
    entries: [
      // 聚光灯
      { binding: 0, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源属性
      { binding: 1, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影纹理
      { binding: 2, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影采样器
      // 聚光灯2
      { binding: 3, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源2属性
      { binding: 4, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影2纹理
      { binding: 5, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影2采样器
      // 太阳光
      { binding: 6, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform' } }, //光源3属性
      { binding: 7, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'depth' } }, //阴影3纹理
      { binding: 8, visibility: GPUShaderStage.FRAGMENT, sampler: { type: 'comparison' } }, //阴影3采样器
      // 物体纹理
      { binding: 9, visibility: GPUShaderStage.FRAGMENT, sampler: {} }, //普通采样器
      { binding: 10, visibility: GPUShaderStage.FRAGMENT, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 4 } }, // 物体属性缓冲区 目前只存放纹理
      { binding: 11, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 木头纹理
      { binding: 12, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块纵向纹理
      { binding: 13, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 草地纹理
      { binding: 14, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块横向纹理
      { binding: 15, visibility: GPUShaderStage.FRAGMENT, texture: { sampleType: 'float' } }, // 砖块横向纹理

    ],
  })
  // 聚光灯1阴影绑定组布局
  const SpotLightOneShadowBindGroupLayout = device.createBindGroupLayout({
    label: '聚光灯1阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 聚光灯2阴影绑定组布局
  const SpotLightTwoShadowBindGroupLayout = device.createBindGroupLayout({
    label: '聚光灯2阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 太阳光阴影绑定组布局
  const SunShadowBindGroupLayout = device.createBindGroupLayout({
    label: '太阳光阴影绑定组布局',
    entries: [
      { binding: 0, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform', hasDynamicOffset: true, minBindingSize: 64 } },
      { binding: 1, visibility: GPUShaderStage.VERTEX, buffer: { type: 'uniform' } },
    ],
  })
  // 聚光灯1阴影渲染管线
  const SpotLightOneShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SpotLightOneShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 聚光灯1阴影深度纹理
  const SpotLightOneShadowDepthTexture = device.createTexture({
    size: [2048, 2048], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 聚光灯2阴影渲染管线
  const SpotLightTwoShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SpotLightTwoShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 聚光灯2阴影深度纹理
  const SpotLightTwoShadowDepthTexture = device.createTexture({
    size: [2048, 2048], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 太阳光阴影渲染管线
  const SunShadowPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [SunShadowBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Shadow }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 太阳光阴影深度纹理
  const SunShadowDepthTexture = device.createTexture({
    size: [ShadowSize, ShadowSize], //显卡3060 两个灯 在140帧
    format: 'depth32float',
    usage: GPUTextureUsage.RENDER_ATTACHMENT | GPUTextureUsage.TEXTURE_BINDING,
  })
  // 主渲染管线
  const MainPipeline = device.createRenderPipeline({
    layout: device.createPipelineLayout({ bindGroupLayouts: [vsBindGroupLayout, fsBindGroupLayout] }),
    vertex: {
      module: device.createShaderModule({ code: Vertex }),
      entryPoint: 'main',
      buffers: [commonBufferAttribute],
    },
    fragment: {
      module: device.createShaderModule({ code: Fragment }),
      entryPoint: 'main',
      targets: [
        { format: format },
      ],
    },
    primitive: commonPrimitive,
    depthStencil: commonDepthStencil,
  })
  // 创建视图
  const SpotLightOneShadowDepthView = SpotLightOneShadowDepthTexture.createView()
  const SpotLightTwoShadowDepthView = SpotLightTwoShadowDepthTexture.createView()
  const SunShadowDepthView = SunShadowDepthTexture.createView()
  //创建采样器
  const SpotLightOneShadowSampler = device.createSampler({ compare: 'less' })
  const SpotLightTwoShadowSampler = device.createSampler({ compare: 'less' })
  const SunShadowSampler = device.createSampler({ compare: 'less' })
  // 水平重复
  const MainRenderSampler = device.createSampler({ magFilter: 'linear', minFilter: 'linear', addressModeV: 'repeat', addressModeU: 'repeat' })
  // 创建绑定组
  const vsGroup = device.createBindGroup({
    label: '顶点着色器绑定组',
    layout: vsBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ObjectMVPMatrixBuffer, size: 64 } },
      { binding: 1, resource: { buffer: ObjectModelMatrixBuffer, size: 64 } },
      { binding: 2, resource: { buffer: SpotLightOneMatrixBuffer } },
      { binding: 3, resource: { buffer: SpotLightTwoMatrixBuffer } },
      { binding: 4, resource: { buffer: SunLightMatrixBuffer } },
    ],
  })
  const fsGroup = device.createBindGroup({
    label: '片段着色器绑定组',
    layout: fsBindGroupLayout,
    entries: [
      // 聚光灯1
      { binding: 0, resource: { buffer: SpotLightOneAttributeBuffer } },
      { binding: 1, resource: SpotLightOneShadowDepthView },
      { binding: 2, resource: SpotLightOneShadowSampler },
      // 聚光灯2
      { binding: 3, resource: { buffer: SpotLightTwoAttributeBuffer } },
      { binding: 4, resource: SpotLightTwoShadowDepthView },
      { binding: 5, resource: SpotLightTwoShadowSampler },
      // 太阳光
      { binding: 6, resource: { buffer: SunLightAttributeBuffer } },
      { binding: 7, resource: SunShadowDepthView },
      { binding: 8, resource: SunShadowSampler },
      // 物体纹理
      { binding: 9, resource: MainRenderSampler },
      { binding: 10, resource: { buffer: ObjectAttributeBuffer, size: 4 } },
      { binding: 11, resource: textures['wood'].createView() },
      { binding: 12, resource: textures['outsideBrick'].createView() },
      { binding: 13, resource: textures['grass'].createView() },
      { binding: 14, resource: textures['insideBrick'].createView() },
      { binding: 15, resource: textures['worldGroud'].createView() }

    ]
  })
  // 聚光灯1阴影绑定组
  const SpotLightOneShadowGroup = device.createBindGroup({
    label: '聚光灯1阴影绑定组',
    layout: SpotLightOneShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ObjectModelMatrixBuffer, size: 64 } },
      { binding: 1, resource: { buffer: SpotLightOneMatrixBuffer } },
    ],
  })
  // 聚光灯2阴影绑定组
  const SpotLightTwoShadowGroup = device.createBindGroup({
    label: '聚光灯2阴影绑定组',
    layout: SpotLightTwoShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ObjectModelMatrixBuffer, size: 64 } },
      { binding: 1, resource: { buffer: SpotLightTwoMatrixBuffer } },
    ],
  })
  // 太阳光阴影绑定组
  const SunShadowGroup = device.createBindGroup({
    label: '太阳光阴影绑定组',
    layout: SunShadowBindGroupLayout,
    entries: [
      { binding: 0, resource: { buffer: ObjectModelMatrixBuffer, size: 64 } },
      { binding: 1, resource: { buffer: SunLightMatrixBuffer } },
    ],
  })
  return {
    Objects: Objects,//物体集合
    //光源参数
    innerCone: innerCone,//聚光灯内锥角 公用
    outerCone: outerCone,//聚光灯外锥角
    spotLightOne: spotLightOne,//聚光灯1
    spotlightOneMatrix: spotlightOneMatrix,//聚光灯1矩阵
    spotLightTwo: spotLightTwo,//聚光灯2
    spotlightTwoMatrix: spotlightTwoMatrix,//聚光灯2矩阵
    //缓冲区
    ObjectMVPMatrixBuffer: ObjectMVPMatrixBuffer,//物体MVP矩阵缓冲区
    ObjectModelMatrixBuffer: ObjectModelMatrixBuffer,//物体Model矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer,//物体属性缓冲区
    SpotLightOneMatrixBuffer: SpotLightOneMatrixBuffer,//聚光灯1矩阵缓冲区
    SpotLightTwoMatrixBuffer: SpotLightTwoMatrixBuffer,//聚光灯2矩阵缓冲区
    SunLightMatrixBuffer: SunLightMatrixBuffer,//太阳光矩阵缓冲区
    SpotLightOneAttributeBuffer: SpotLightOneAttributeBuffer,//聚光灯1属性缓冲区
    SpotLightTwoAttributeBuffer: SpotLightTwoAttributeBuffer,//聚光灯2属性缓冲区
    SunLightAttributeBuffer: SunLightAttributeBuffer,//太阳光属性缓冲区



    //绑定组
    vsGroup: vsGroup,//顶点着色器绑定组
    fsGroup: fsGroup,//片段着色器绑定组
    SpotLightOneShadowGroup: SpotLightOneShadowGroup,//聚光灯1阴影绑定组
    SpotLightTwoShadowGroup: SpotLightTwoShadowGroup,//聚光灯2阴影绑定组
    SunShadowGroup: SunShadowGroup,//太阳光阴影绑定组
    //管线
    SpotLightOneShadowPipeline: SpotLightOneShadowPipeline,//聚光灯1阴影渲染管线
    SpotLightTwoShadowPipeline: SpotLightTwoShadowPipeline,//聚光灯2阴影渲染管线
    SunShadowPipeline: SunShadowPipeline,//太阳光阴影渲染管线
    MainPipeline: MainPipeline,//主渲染管线
    //视图
    SpotLightOneShadowDepthView: SpotLightOneShadowDepthView,//聚光灯1阴影深度视图
    SpotLightTwoShadowDepthView: SpotLightTwoShadowDepthView,//聚光灯2阴影深度视图
    SunShadowDepthView: SunShadowDepthView,//太阳光阴影深度视图
  }
}

export default BeforeRender
