import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 后门 上侧墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -472 - 80, y: 26.5, z: 17.65 }]
    Wall.scaleArray = [{ x: 0.5, y: 5.5, z: 11.05 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
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
    Floor.positionArray = [{ x: -737.25, y: 0.1, z: 18 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 184.75, y: 0.1, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }

  {
    //地板 靠近厕所
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 22.5, y: 1, z: 3 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -787, y: 0.1, z: -234 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 99, y: 0.1, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //地板 厕所旁
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -670, y: 0.1, z: -197.4 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 0.1, z: 197.4 })
    Floor.textureIndex = new Array(1).fill(7.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //地板 楼梯旁
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) //宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -904, y: 0.1, z: -126 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 0.1, z: 126 })
    Floor.textureIndex = new Array(1).fill(7.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //地板 连接5号房间
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -966.5, y: 0.1, z: -234.1 }]
    Floor.scaleArray = [{ x: 44.5, y: 0.1, z: 17.9 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //地板 连接4号房间
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -904, y: 0.1, z: 75.5 }]
    Floor.scaleArray = [{ x: 18, y: 0.1, z: 39.5 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //墙 靠近厕所
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -670, y: 16, z: -394.25 },
      { x: -670, y: 16, z: -394.75 },
    ]
    Wall.scaleArray = [
      { x: 18, y: 16, z: 0.25 },
      { x: 18, y: 16, z: 0.25 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //里圈
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

  {
    //外圈
    //柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -886, y: 13, z: 36 },
      { x: -886, y: 13, z: 115 }, // Modified from 112 to fit 8 windows
      { x: -820, y: 13, z: 36 },
      { x: -820, y: 13, z: -252 },
      { x: -754, y: 13, z: 36 },
    ]
    Pillar.scaleArray = new Array(5).fill({ x: 3, y: 13, z: 3 })
    Pillar.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = [4.1, 4.1, 5.1, 5.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 红色 靠近4号房间 长
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 30 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -886, y: 30, z: -50.5 }
    ]
    Pillar.scaleArray = [
      { x: 3, y: 4, z: 168.5 }
    ]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Pillar.textureIndex = [4.1]

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 红色 靠近123号房间
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 25 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -688, y: 30, z: -108 }
    ]
    Pillar.scaleArray = [
      { x: 3, y: 4, z: 111 }
    ]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Pillar.textureIndex = [4.1]

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 红色 4号房间旁 短
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 4, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -905.4, y: 30, z: 115 }
    ]
    Pillar.scaleArray = [
      { x: 16.4, y: 4, z: 3 }
    ]
    Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Pillar.textureIndex = [4.1]

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 白色 内圈
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -787, y: 30, z: -216 },
      { x: -787, y: 30, z: 0 },
    ]
    Pillar.scaleArray = new Array(2).fill({ x: 96, y: 4, z: 3 })
    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(2).fill(5.1)

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 白色 外圈 靠近楼梯1
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 16, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -817, y: 30, z: 36 },
    ]
    Pillar.scaleArray = new Array(1).fill({ x: 66, y: 4, z: 3 })
    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(1).fill(5.1)

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊上方横向大柱子 白色 外圈 靠近楼梯2
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 16, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -821, y: 30, z: -252 },
    ]
    Pillar.scaleArray = new Array(1).fill({ x: 65, y: 4, z: 3 })
    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(1).fill(5.1)

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  // 外圈柱子间的窗户 (Z: 36 到 114)
  {
    // 垂直窗框 (8根)
    const VFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const vFrame = createGeometry(device, VFrame.vertices, VFrame.indices)
    VFrame.positionArray = []
    VFrame.scaleArray = []

    // 水平窗框 (4根贯穿)
    const HFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const hFrame = createGeometry(device, HFrame.vertices, HFrame.indices)

    // 生成8扇窗户结构
    for (let i = 0; i < 9; i++) {
      // 垂直框 Z位置 (起始Z 39 + 偏移)
      const frameZ = 39.5 + i * 9
      // 垂直框 下+中段 (1-18)
      VFrame.positionArray.push({ x: -886, y: 9, z: frameZ })
      VFrame.scaleArray.push({ x: 0.5, y: 9, z: 0.5 })
      // 垂直框 上段 (19-25)
      VFrame.positionArray.push({ x: -886, y: 22, z: frameZ })
      VFrame.scaleArray.push({ x: 0.5, y: 4, z: 0.5 })
    }

    VFrame.rotationArray = new Array(VFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    VFrame.textureIndex = new Array(VFrame.positionArray.length).fill(100)
    createRigidBodies(VFrame.vertices, VFrame.indices, VFrame.positionArray, VFrame.scaleArray, VFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: VFrame, object: vFrame })

    // 水平框配置
    HFrame.positionArray = [
      { x: -886, y: 0.5, z: 75 },
      { x: -886, y: 7.5, z: 75 },
      { x: -886, y: 18.5, z: 75 },
      { x: -886, y: 25.5, z: 75 }
    ]
    HFrame.scaleArray = [
      { x: 0.5, y: 0.5, z: 36 },
      { x: 0.5, y: 0.5, z: 36 },
      { x: 0.5, y: 0.5, z: 36 },
      { x: 0.5, y: 0.5, z: 36 }
    ]
    HFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    HFrame.textureIndex = new Array(4).fill(100)
    createRigidBodies(HFrame.vertices, HFrame.indices, HFrame.positionArray, HFrame.scaleArray, HFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: HFrame, object: hFrame })
  }

  // 外圈柱子间的窗户 (X轴方向: -886 到 -754)
  {
    // 垂直窗框
    const VFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const vFrame = createGeometry(device, VFrame.vertices, VFrame.indices)
    VFrame.positionArray = []
    VFrame.scaleArray = []

    // 两个区段：Segment 1 (-886 to -820), Segment 2 (-820 to -754)
    const segments = [
      { startX: -884.5 }, // -886 + 1.5
      { startX: -818.5 }  // -820 + 1.5
    ]
    const step = 7.875 // 63 / 8

    segments.forEach(seg => {
      for (let i = 0; i < 9; i++) {
        const frameX = seg.startX + i * step
        // 下+中段
        VFrame.positionArray.push({ x: frameX, y: 9.5, z: 36 })
        VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
        // 上段
        VFrame.positionArray.push({ x: frameX, y: 22, z: 36 })
        VFrame.scaleArray.push({ x: 0.5, y: 3, z: 0.5 })
      }
    })

    VFrame.rotationArray = new Array(VFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    VFrame.textureIndex = new Array(VFrame.positionArray.length).fill(100)
    createRigidBodies(VFrame.vertices, VFrame.indices, VFrame.positionArray, VFrame.scaleArray, VFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: VFrame, object: vFrame })

    // 水平窗框
    const HFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const hFrame = createGeometry(device, HFrame.vertices, HFrame.indices)
    HFrame.positionArray = []

    // Segment 1 Center: -853, ScaleX: 31.5
    const yLevels = [0.5, 7.5, 18.5, 25.5]
    yLevels.forEach(y => {
      HFrame.positionArray.push({ x: -853, y: y, z: 36 })
      HFrame.positionArray.push({ x: -787, y: y, z: 36 })
    })

    HFrame.scaleArray = new Array(8).fill({ x: 31.5, y: 0.5, z: 0.5 })
    HFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    HFrame.textureIndex = new Array(8).fill(100)
    createRigidBodies(HFrame.vertices, HFrame.indices, HFrame.positionArray, HFrame.scaleArray, HFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: HFrame, object: hFrame })
  }

  // 扩展区域：连接 -886 柱子与 4号房间墙壁 (X轴方向: -886 到 -922.5)
  // 连续4扇窗户
  {
    // 垂直窗框 (3根中间分隔 + 1根末端)
    const VFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const vFrame = createGeometry(device, VFrame.vertices, VFrame.indices)
    VFrame.positionArray = []
    VFrame.scaleArray = []

    // 计算逻辑基于: 柱子左边缘(-889) 到 墙壁右边缘(-922.5)
    // 距离 33.5, 分4份 -> 每份 8.375
    const startX = -889
    const step = 8.375

    // i=1 to 4 (Indices 1,2,3 are dividers, 4 is end frame)
    for (let i = 0; i < 5; i++) {
      const frameX = startX - i * step
      // 下+中段
      VFrame.positionArray.push({ x: frameX, y: 9.5, z: 115 })
      VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
      // 上段
      VFrame.positionArray.push({ x: frameX, y: 22, z: 115 })
      VFrame.scaleArray.push({ x: 0.5, y: 3, z: 0.5 })
    }

    VFrame.rotationArray = new Array(VFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    VFrame.textureIndex = new Array(VFrame.positionArray.length).fill(100)
    createRigidBodies(VFrame.vertices, VFrame.indices, VFrame.positionArray, VFrame.scaleArray, VFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: VFrame, object: vFrame })

    // 水平窗框
    const HFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const hFrame = createGeometry(device, HFrame.vertices, HFrame.indices)
    HFrame.positionArray = []

    // Center: -889 - 16.75 = -905.75
    const centerX = -905.75
    const halfWidth = 16.75

    const yLevels = [0.5, 7.5, 18.5, 25.5]
    yLevels.forEach(y => {
      HFrame.positionArray.push({ x: centerX, y: y, z: 115 })
    })

    HFrame.scaleArray = new Array(4).fill({ x: halfWidth, y: 0.5, z: 0.5 })
    HFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    HFrame.textureIndex = new Array(4).fill(100)
    createRigidBodies(HFrame.vertices, HFrame.indices, HFrame.positionArray, HFrame.scaleArray, HFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: HFrame, object: hFrame })
  }

  // 扩展区域：5号房间及电梯后方
  {
    // 地板 - 5号房间部分 (左侧长条)
    // X范围: -1011 (左墙) 到 -976.5 (电梯左墙线)
    // Z范围: -252 (走廊末端) 到 -393.5 (建筑背墙)
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -993.75, y: 0.1, z: -322.75 }]
    Floor.scaleArray = [{ x: 17.25, y: 0.1, z: 70.75 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }

  {
    // 地板 - 电梯后方部分 (右侧短块)
    // X范围: -976.5 (电梯左墙线) 到 -929.5 (电梯右墙线)
    // Z范围: -347 (电梯后壁) 到 -393.5 (建筑背墙)
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 0.1, z: -370.25 }]
    Floor.scaleArray = [{ x: 23.5, y: 0.1, z: 23.25 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 地板 - 电梯后方部分 (右侧短块)
    // X范围: -976.5 (电梯左墙线) 到 -929.5 (电梯右墙线)
    // Z范围: -347 (电梯后壁) 到 -393.5 (建筑背墙)
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 0.1, z: -276.5 }]
    Floor.scaleArray = [{ x: 23.5, y: 0.1, z: 24.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 隔墙延伸 (电梯左墙延伸至背墙)
    // X: -976.5
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -976.5, y: 16, z: -370.5 }]
    Wall.scaleArray = [{ x: 0.5, y: 16, z: 23.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    // 隔墙延伸 (电梯右墙延伸至背墙)
    // X: -929.5
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -929.5, y: 16, z: -370.5 }]
    Wall.scaleArray = [{ x: 0.5, y: 16, z: 23.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    // 背墙 (连接左右两侧) - 分内外
    // X范围: -1011 到 -929.5
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -970, y: 16, z: -394.25 }, // Inner
      { x: -970, y: 16, z: -394.75 }  // Outer
    ]
    Wall.scaleArray = new Array(2).fill({ x: 41, y: 16, z: 0.25 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 扩展区域：一号楼梯后方延伸 (对齐辅导员办公室背墙 Z=111.5)
  // 这部分作为走廊的扩展部分处理
  {
    // 补充地板 (楼梯后侧延伸)
    // X范围: -751 (楼梯左边界) 到 -709 (楼梯右边界)
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -730, y: 0.1, z: 97.725 }]
    Floor.scaleArray = [{ x: 21, y: 0.1, z: 13.775 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }

  {
    // 侧墙延伸 (左侧 - 对应楼梯左墙延伸)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -750.25, y: 16, z: 97 }, // Inner
      { x: -750.75, y: 16, z: 97 }  // Outer
    ]
    Wall.scaleArray = new Array(2).fill({ x: 0.25, y: 16, z: 14 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    // 侧墙延伸 (右侧 - 对应楼梯右墙延伸)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -709.5, y: 16, z: 97 }]
    Wall.scaleArray = [{ x: 0.5, y: 16, z: 14 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  {
    // 新背墙 (封闭楼梯后方延伸区域)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -730, y: 16, z: 111.5 }]
    Wall.scaleArray = [{ x: 21, y: 16, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 填补区域：一号楼梯延伸墙与辅导员办公室之间
    // 地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -681.25, y: 0.1, z: 73.5 }]
    Floor.scaleArray = [{ x: 27.75, y: 0.1, z: 37.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }

  {
    // 背墙 (填补区域)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -681.25, y: 16, z: 111.25 },
      { x: -681.25, y: 16, z: 111.75 },
    ]
    Wall.scaleArray = new Array(2).fill({ x: 27.75, y: 16, z: 0.25 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }

  // 后方窗户 (Z: -252)
  // 连接 -820 柱子 与 左侧 (楼梯2 -886) 和 右侧 (厕所 -754)
  {
    const VFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const vFrame = createGeometry(device, VFrame.vertices, VFrame.indices)
    VFrame.positionArray = []
    VFrame.scaleArray = []

    const segments = [
      { startX: -886 }, // Left Segment Start
      { startX: -820 }  // Right Segment Start
    ]
    const step = 8.25

    segments.forEach(seg => {
      for (let i = 0; i < 9; i++) {
        const frameX = seg.startX + i * step
        // 下+中
        VFrame.positionArray.push({ x: frameX, y: 9.5, z: -253 })
        VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
        // 上
        VFrame.positionArray.push({ x: frameX, y: 22, z: -253 })
        VFrame.scaleArray.push({ x: 0.5, y: 3, z: 0.5 })
      }
    })

    VFrame.rotationArray = new Array(VFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    VFrame.textureIndex = new Array(VFrame.positionArray.length).fill(100)
    createRigidBodies(VFrame.vertices, VFrame.indices, VFrame.positionArray, VFrame.scaleArray, VFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: VFrame, object: vFrame })

    // 水平框
    const HFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const hFrame = createGeometry(device, HFrame.vertices, HFrame.indices)
    HFrame.positionArray = []

    // Centers: -853 and -787
    const centers = [-853, -787]
    const yLevels = [0.5, 7.5, 18.5, 25.5]

    centers.forEach(cx => {
      yLevels.forEach(y => {
        HFrame.positionArray.push({ x: cx, y: y, z: -253 })
      })
    })

    HFrame.scaleArray = new Array(8).fill({ x: 33, y: 0.5, z: 0.5 }) // Width 66
    HFrame.rotationArray = new Array(8).fill({ x: 0, y: 0, z: 0 })
    HFrame.textureIndex = new Array(8).fill(100)
    createRigidBodies(HFrame.vertices, HFrame.indices, HFrame.positionArray, HFrame.scaleArray, HFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: HFrame, object: hFrame })
  }
}
export default create
