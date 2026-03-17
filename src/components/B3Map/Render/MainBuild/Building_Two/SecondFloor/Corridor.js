import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  {
    // 后门 上侧墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2, z: 2 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -472 - 80, y: 60.5, z: 17.65 }]
    Wall.scaleArray = [{ x: 0.5, y: 5.5, z: 11.05 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 后门区域 - 门框
    const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
    const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
    DoorFrame.positionArray = [
      // 竖直
      { x: -472 - 80, y: 44, z: 7.1 },
      { x: -472 - 80, y: 44, z: 17.1 },
      { x: -472 - 80, y: 44, z: 18.2 },
      { x: -472 - 80, y: 44, z: 28.2 },
      // 横向
      { x: -472 - 80, y: 54.5, z: 17.65 },
      { x: -472 - 80, y: 34.05, z: 17.65 },
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
    // 后门区域 - 门旁装饰柱
    // 需要分开里外2根，纹理不同
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) // 宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -472 - 80 + 1.5, y: 47, z: 2.6 },
      { x: -472 - 80 - 2.5, y: 47, z: 2.6 },
      { x: -472 - 80 + 1.5, y: 47, z: 32.7 },
      { x: -472 - 80 - 2.5, y: 47, z: 32.7 },
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
    // 走廊地板 - 辅导员办公室前
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 31, y: 1, z: 3 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -737.25, y: 32.1, z: 18 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 184.75, y: 2, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 厕所前
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 22.5, y: 1, z: 3 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -787, y: 32.1, z: -234 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.scaleArray = [{ x: 99, y: 2, z: 18 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 厕所侧边
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -670, y: 32.1, z: -197.4 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 2, z: 197.4 })
    Floor.textureIndex = new Array(1).fill(7.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 楼梯侧边
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 35 } }) // 宽度1,高度1,深度1
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [
      { x: -904, y: 32.1, z: -126 },
    ]
    Floor.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Floor.scaleArray = new Array(1).fill({ x: 18, y: 2, z: 126 })
    Floor.textureIndex = new Array(1).fill(7.1)
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 5号房间连接处
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -966.5, y: 32.1, z: -234.1 }]
    Floor.scaleArray = [{ x: 44.5, y: 2, z: 17.9 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 4号房间连接处
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -904, y: 32.1, z: 75.5 }]
    Floor.scaleArray = [{ x: 18, y: 2, z: 39.5 }] // Width 32
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 5号房间侧地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -993.75, y: 32.1, z: -322.75 }]
    Floor.scaleArray = [{ x: 17.25, y: 2, z: 70.75 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 电梯后方地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 32.1, z: -370.25 }]
    Floor.scaleArray = [{ x: 23.5, y: 2, z: 23.25 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //走廊地板 - 电梯门口地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 1, z: 3 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -953, y: 32.1, z: -276.5 }]
    Floor.scaleArray = [{ x: 23.5, y: 2, z: 24.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 走廊地板 - 1号楼梯后侧地板
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -730, y: 32.1, z: 97.725 }]
    Floor.scaleArray = [{ x: 20.5, y: 2, z: 13.775 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    //走廊地板 - 一号楼梯延伸墙与辅导员办公室之间
    const Floor = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 1, z: 5 } })
    const floor = createGeometry(device, Floor.vertices, Floor.indices)
    Floor.positionArray = [{ x: -681.25, y: 32.1, z: 73.5 }]
    Floor.scaleArray = [{ x: 27.75, y: 2, z: 37.5 }]
    Floor.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Floor.textureIndex = [7.1]
    createRigidBodies(Floor.vertices, Floor.indices, Floor.positionArray, Floor.scaleArray, Floor.rotationArray, world, RAPIER)
    Objects.push({ Object: Floor, object: floor })
  }
  {
    // 内墙 - 厕所区域隔墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } }) // 宽度1,高度1,深度1
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -670, y: 49, z: -394.25 },
      { x: -670, y: 49, z: -394.75 },
    ]
    Wall.scaleArray = [
      { x: 18, y: 17, z: 0.25 },
      { x: 18, y: 17, z: 0.25 },
    ]
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 内圈走廊 - 承重柱
    // 柱子
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) // 宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = []
    // 红色柱子
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -688, y: 47, z: 0 - i * 54 })
    for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: -688 - 198, y: 47, z: 0 - i * 54 })
    // 白色柱子
    for (let i = 0; i < 2; i++) Pillar.positionArray.push({ x: -688 - 66 - i * 66, y: 47, z: 0 })
    for (let i = 0; i < 2; i++) Pillar.positionArray.push({ x: -688 - 66 - i * 66, y: 47, z: -216 })
    Pillar.scaleArray = new Array(14).fill({ x: 3, y: 13, z: 3 })
    Pillar.rotationArray = new Array(14).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = []
    for (let i = 0; i < 10; i++) Pillar.textureIndex.push(4.1)
    for (let i = 0; i < 4; i++) Pillar.textureIndex.push(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊护栏
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
      // 竖直柱子
      for (let i = 1; i < segments; i++) {
        const px = p1.x + stepX * i
        const pz = p1.z + stepZ * i
        RailingPost.positionArray.push({ x: px, y: 39, z: pz })
        RailingPost.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        RailingPost.rotationArray.push({ x: 0, y: 0, z: 0 })
        RailingPost.textureIndex.push(103)
      }
      const barLen = dist / segments
      // 横向栏杆
      for (let i = 0; i < segments; i++) {
        const cx = p1.x + stepX * (i + 0.5)
        const cz = p1.z + stepZ * (i + 0.5)
        for (let k = 0; k < 5; k++) {
          const barH = 36 + k * 2
          RailingBar.positionArray.push({ x: cx, y: barH, z: cz })
          RailingBar.scaleArray.push({ x: 0.1, y: barLen, z: 0.1 })
          RailingBar.rotationArray.push(barRotation)
          RailingBar.textureIndex.push(104)
        }
      }
    }
    const xPillars = [-688, -754, -820, -886]
    for (let i = 0; i < xPillars.length - 1; i++) {
      addRailing({ x: xPillars[i], z: 0 }, { x: xPillars[i + 1], z: 0 }, 5)
    }
    for (let i = 0; i < xPillars.length - 1; i++) {
      addRailing({ x: xPillars[i], z: -216 }, { x: xPillars[i + 1], z: -216 }, 5)
    }
    const zPillars = [0, -54, -108, -162, -216]
    for (let i = 0; i < zPillars.length - 1; i++) {
      addRailing({ x: -688, z: zPillars[i] }, { x: -688, z: zPillars[i + 1] }, 4)
    }
    for (let i = 0; i < zPillars.length - 1; i++) {
      addRailing({ x: -886, z: zPillars[i] }, { x: -886, z: zPillars[i + 1] }, 4)
    }
    createRigidBodies(RailingPost.vertices, RailingPost.indices, RailingPost.positionArray, RailingPost.scaleArray, RailingPost.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingPost, object: railingPost })
    createRigidBodies(RailingBar.vertices, RailingBar.indices, RailingBar.positionArray, RailingBar.scaleArray, RailingBar.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingBar, object: railingBar })
  }
  {
    // 外圈走廊 - 承重柱
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) // 宽度1,高度1,深度1
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -886, y: 47, z: 36 },
      { x: -886, y: 47, z: 115 }, // Modified from 112 to fit 8 windows
      { x: -820, y: 47, z: 36 },
      { x: -820, y: 47, z: -252 },
      { x: -754, y: 47, z: 36 },
    ]
    Pillar.scaleArray = new Array(5).fill({ x: 3, y: 13, z: 3 })
    Pillar.rotationArray = new Array(5).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = [4.1, 4.1, 5.1, 5.1, 5.1]
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  // 外圈走廊 - 窗户框架 (Z轴侧 36 到 114)
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
      VFrame.positionArray.push({ x: -886, y: 43, z: frameZ })
      VFrame.scaleArray.push({ x: 0.5, y: 9, z: 0.5 })
      // 垂直框 上段 (19-25)
      VFrame.positionArray.push({ x: -886, y: 56, z: frameZ })
      VFrame.scaleArray.push({ x: 0.5, y: 4, z: 0.5 })
    }
    VFrame.rotationArray = new Array(VFrame.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    VFrame.textureIndex = new Array(VFrame.positionArray.length).fill(100)
    createRigidBodies(VFrame.vertices, VFrame.indices, VFrame.positionArray, VFrame.scaleArray, VFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: VFrame, object: vFrame })
    // 水平框配置
    HFrame.positionArray = [
      { x: -886, y: 34.5, z: 75 },
      { x: -886, y: 41.5, z: 75 },
      { x: -886, y: 52.5, z: 75 },
      { x: -886, y: 59.5, z: 75 }
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
  // 外圈走廊 - 窗户框架 (X轴侧 -886 到 -754)
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
        VFrame.positionArray.push({ x: frameX, y: 43.5, z: 36 })
        VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
        // 上段
        VFrame.positionArray.push({ x: frameX, y: 56, z: 36 })
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
    const yLevels = [34.5, 41.5, 52.5, 59.5]
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
  // 走廊扩展区 - 窗户框架 (X轴侧 -886 到 -922.5)
  // 连接 -886 柱子与 4号房间墙壁 (连续4扇窗户)
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
      VFrame.positionArray.push({ x: frameX, y: 43.5, z: 115 })
      VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
      // 上段
      VFrame.positionArray.push({ x: frameX, y: 56, z: 115 })
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
    const yLevels = [34.5, 41.5, 52.5, 59.5]
    yLevels.forEach(y => {
      HFrame.positionArray.push({ x: centerX, y: y, z: 115 })
    })
    HFrame.scaleArray = new Array(4).fill({ x: halfWidth, y: 0.5, z: 0.5 })
    HFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
    HFrame.textureIndex = new Array(4).fill(100)
    createRigidBodies(HFrame.vertices, HFrame.indices, HFrame.positionArray, HFrame.scaleArray, HFrame.rotationArray, world, RAPIER)
    Objects.push({ Object: HFrame, object: hFrame })
  }
  {
    // 墙壁 电梯隔墙延伸 (左侧)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -976.5, y: 49, z: -370.5 }]
    Wall.scaleArray = [{ x: 0.5, y: 17, z: 23.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 墙壁 电梯隔墙延伸 (右侧)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -929.5, y: 49, z: -370.5 }]
    Wall.scaleArray = [{ x: 0.5, y: 17, z: 23.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //走廊背墙-电梯旁 -5号房间
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -970, y: 49, z: -394.25 }, // Inner
      { x: -970, y: 49, z: -394.75 }  // Outer
    ]
    Wall.scaleArray = new Array(2).fill({ x: 41, y: 17, z: 0.25 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙壁 1号楼梯侧墙延伸 (左侧)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -750.25, y: 49, z: 97 }, // Inner
      { x: -750.75, y: 49, z: 97 }  // Outer
    ]
    Wall.scaleArray = new Array(2).fill({ x: 0.25, y: 17, z: 14 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    //墙壁  1号楼梯侧墙延伸 (右侧)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 5 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -709.5, y: 49, z: 97 }]
    Wall.scaleArray = [{ x: 0.5, y: 17, z: 14 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [5.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 背墙 (封闭1号楼梯后方延伸区域)
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [{ x: -730, y: 49, z: 111.5 }]
    Wall.scaleArray = [{ x: 21, y: 17, z: 0.5 }]
    Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
    Wall.textureIndex = [4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  {
    // 背墙 茶水间与辅导员办公室之间走廊的背墙
    const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
    const wall = createGeometry(device, Wall.vertices, Wall.indices)
    Wall.positionArray = [
      { x: -681.25, y: 49, z: 111.25 },
      { x: -681.25, y: 49, z: 111.75 },
    ]
    Wall.scaleArray = new Array(2).fill({ x: 27.75, y: 17, z: 0.25 })
    Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Wall.textureIndex = [5.1, 4.1]
    createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
    Objects.push({ Object: Wall, object: wall })
  }
  // 后方走廊 - 窗户框架 (Z轴侧 -252)
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
        VFrame.positionArray.push({ x: frameX, y: 43.5, z: -253 })
        VFrame.scaleArray.push({ x: 0.5, y: 8.5, z: 0.5 })
        // 上
        VFrame.positionArray.push({ x: frameX, y: 56, z: -253 })
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
    const yLevels = [34.5, 41.5, 52.5, 59.5]
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
  {
    // 走廊顶部 - 横梁 (红色 4号房侧)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 30 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -886, y: 64, z: -50.5 }
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
    // 走廊顶部 - 横梁 (红色 1-3号房侧)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 25 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -688, y: 64, z: -108 }
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
    // 走廊顶部 - 短横梁 (红色 4号房侧)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 4, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -905.4, y: 64, z: 115 }
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
    // 走廊顶部 - 横梁 (白色 内圈)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -787, y: 64, z: -216 },
      { x: -787, y: 64, z: 0 },
    ]
    Pillar.scaleArray = new Array(2).fill({ x: 96, y: 4, z: 3 })
    Pillar.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(2).fill(5.1)

    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊顶部 - 横梁 (白色 外圈)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 16, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -817, y: 64, z: 36 },
    ]
    Pillar.scaleArray = new Array(1).fill({ x: 66, y: 4, z: 3 })
    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
  {
    // 走廊顶部 - 横梁 (白色 外圈 靠近楼梯2)
    const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 16, y: 1, z: 1 } })
    const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
    Pillar.positionArray = [
      { x: -821, y: 64, z: -252 },
    ]
    Pillar.scaleArray = new Array(1).fill({ x: 65, y: 4, z: 3 })
    Pillar.rotationArray = new Array(1).fill({ x: 0, y: 0, z: 0 })
    Pillar.textureIndex = new Array(1).fill(5.1)
    createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
    Objects.push({ Object: Pillar, object: pillar })
  }
}
export default create
