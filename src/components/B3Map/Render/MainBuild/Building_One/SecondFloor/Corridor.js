import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createCylinder } from '@/components/B3Map/BasicShape/Cylinder'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
const create = (Objects, device, world, RAPIER) => {
  //栏杆
  {
    // 栏杆 Railing
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
      for (let i = 1; i < segments; i++) {
        const px = p1.x + stepX * i
        const pz = p1.z + stepZ * i
        RailingPost.positionArray.push({ x: px, y: 39, z: pz })
        RailingPost.scaleArray.push({ x: 0.5, y: 5, z: 0.5 })
        RailingPost.rotationArray.push({ x: 0, y: 0, z: 0 })
        RailingPost.textureIndex.push(103)
      }
      const barLen = dist / segments
      for (let i = 0; i < segments; i++) {
        const cx = p1.x + stepX * (i + 0.5)
        const cz = p1.z + stepZ * (i + 0.5)
        for (let k = 0; k < 5; k++) {
          const barH = 36 + k * 2
          RailingBar.positionArray.push({ x: cx, y: barH, z: cz })
          RailingBar.scaleArray.push({ x: 0.1, y: barLen, z: 0.1 })
          RailingBar.rotationArray.push(barRotation)
          RailingBar.textureIndex.push(103)
        }
      }
    }

    addRailing({ x: -147, z: 101.6 }, { x: -208, z: 101.6 }, 5)
    addRailing({ x: -208, z: 101.6 }, { x: -269, z: 101.6 }, 5)
    addRailing({ x: -269, z: 101.6 }, { x: -330, z: 101.6 }, 5)
    addRailing({ x: -330, z: 101.6 }, { x: -391, z: 101.6 }, 5)
    // 最后一根柱子和后墙之间
    addRailing({ x: -391, z: 103.1 }, { x: -391, z: 72 }, 5)

    createRigidBodies(RailingPost.vertices, RailingPost.indices, RailingPost.positionArray, RailingPost.scaleArray, RailingPost.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingPost, object: railingPost })
    createRigidBodies(RailingBar.vertices, RailingBar.indices, RailingBar.positionArray, RailingBar.scaleArray, RailingBar.rotationArray, world, RAPIER)
    Objects.push({ Object: RailingBar, object: railingBar })
  }
  //长廊部分
  {
    {
      //墙壁上侧 横向大柱子
      const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 60, y: 1, z: 1 } }) //宽度1,高度1,深度1
      const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
      PillarTop.positionArray = [{ x: -182, y: 63, z: 103.1 }]

      PillarTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
      PillarTop.scaleArray = [{ x: 212, y: 3, z: 4 }]
      PillarTop.textureIndex = [4.1, 4.1]
      createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
      Objects.push({ Object: PillarTop, object: pillarTop })
    }
    //长廊柱子
    {
      //后侧墙壁大柱子 分开 里外纹理不一样
      const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
      const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
      Pillar.positionArray = [
        //不区分内外侧
        //第一根柱子
        { x: 27, y: 47, z: 104.6 },
        //加入栏杆
        //最后一根柱子
        { x: -208 - 3 * 61, y: 47, z: 103.1 }
      ]
      //后面连续四根柱子
      for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -147 - i * 61, y: 47, z: 101.6 })    //里
      for (let i = 0; i < 4; i++) Pillar.positionArray.push({ x: -147 - i * 61, y: 47, z: 105.6 })    //外
      Pillar.rotationArray = new Array(16).fill({ x: 0, y: 0, z: 0 })
      Pillar.scaleArray = [
        { x: 3, y: 13, z: 2.5 },
        { x: 3, y: 13, z: 2.5 },
      ]
      //里
      for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 2.5 })
      //外
      for (let i = 0; i < 4; i++) Pillar.scaleArray.push({ x: 3, y: 13, z: 1.5 })
      Pillar.textureIndex = [4.1, 4.1, 5.1, 5.1, 5.1, 5.1, 4.1, 4.1, 4.1, 4.1, 5.1]
      createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
      Objects.push({ Object: Pillar, object: pillar })
    }
    {
      //窗框 4扇
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        //横
        { x: -143.5 + 2 * 8, y: 34.5, z: 101.6 },
        { x: -143.5 + 2 * 8, y: 34.5 + 6, z: 101.6 },
        { x: -143.5 + 2 * 8, y: 34.5 + 18, z: 101.6 },
        { x: -143.5 + 2 * 8, y: 34.5 + 25, z: 101.6 },
      ]
      for (let i = 0; i < 5; i++) WindowFrame.positionArray.push({ x: -143.5 + i * 8, y: 47, z: 101.6 })//竖

      WindowFrame.scaleArray = []
      for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 16.5, y: 0.5, z: 0.5 })//横

      for (let i = 0; i < 5; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 13, z: 0.5 })//竖
      WindowFrame.rotationArray = new Array(100).fill({ x: 0, y: 0, z: 0 })
      WindowFrame.textureIndex = new Array(100).fill(100)
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
    {
      //4扇窗户旁连接墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [
        { x: -88, y: 47, z: 101.6 },
        { x: -88, y: 47, z: 105.6 },
      ]
      Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
      Wall.scaleArray = [
        { x: 23, y: 13, z: 2.5 },
        { x: 23, y: 13, z: 1.5 },
      ]
      Wall.textureIndex = [5.1, 4.1,]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {
      //窗框 3扇
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        //横
        { x: -64.5 + 13.5, y: 34.5, z: 101.6 },
        { x: -64.5 + 13.5, y: 34.5 + 6, z: 101.6 },
        { x: -64.5 + 13.5, y: 34.5 + 18, z: 101.6 },
        { x: -64.5 + 13.5, y: 34.5 + 25, z: 101.6 },
      ]
      for (let i = 0; i < 4; i++) WindowFrame.positionArray.push({ x: -64.5 + i * 9, y: 47, z: 101.6 })//竖
      WindowFrame.scaleArray = []
      for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 13.5, y: 0.5, z: 0.5 })//横
      for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 13, z: 0.5 })//竖
      WindowFrame.rotationArray = new Array(100).fill({ x: 0, y: 0, z: 0 })
      WindowFrame.textureIndex = new Array(100).fill(100)
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
    {
      //3扇窗户旁连接墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 5, y: 5, z: 1 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [
        { x: -6.5, y: 47, z: 101.6 },
        { x: -6.5, y: 47, z: 105.6 },
      ]
      Wall.rotationArray = new Array(2).fill({ x: 0, y: 0, z: 0 })
      Wall.scaleArray = [
        { x: 30.5, y: 13, z: 2.5 },
        { x: 30.5, y: 13, z: 1.5 },
      ]
      Wall.textureIndex = [5.1, 4.1,]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
  }
  //后门部分 以及对应墙体
  {
    {
      //后门 门框
      const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
      DoorFrame.positionArray = [
        //竖直
        { x: -391, y: 44, z: 7.1 },
        { x: -391, y: 44, z: 17.1 },
        { x: -391, y: 44, z: 18.2 },
        { x: -391, y: 44, z: 28.2 },
        //横向
        { x: -391, y: 54.5, z: 17.65 },
        { x: -391, y: 34.1, z: 17.65 },
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
      //后侧门口 上墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 0.2, y: 2, z: 3 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [{ x: -391, y: 60.5, z: 17.65 }]

      Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Wall.scaleArray = [{ x: 3, y: 5.5, z: 11.05 }]
      Wall.textureIndex = [4.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {
      //后侧墙壁 墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 6 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [{ x: -391, y: 50, z: 50.15 }]

      Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Wall.scaleArray = [{ x: 3, y: 16, z: 21.45 }]
      Wall.textureIndex = [4.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {
      //后侧墙壁 上方横柱
      const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 5 } }) //宽度1,高度1,深度1
      const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
      Pillar.positionArray = [{ x: -391, y: 63, z: 85.35 }]
      Pillar.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Pillar.scaleArray = [{ x: 3, y: 3, z: 13.75 }]
      Pillar.textureIndex = [4.1]
      createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
      Objects.push({ Object: Pillar, object: pillar })
    }
  }
  //左墙部分
  {
    {
      //墙壁上侧 横向大柱子
      const PillarTop = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 2, y: 1, z: 15 } }) //宽度1,高度1,深度1
      const pillarTop = createGeometry(device, PillarTop.vertices, PillarTop.indices)
      PillarTop.positionArray = [{ x: 27, y: 63, z: 45.1 - 0.25 }]

      PillarTop.rotationArray = [{ x: 0, y: 0, z: 0 }]
      PillarTop.scaleArray = [{ x: 3, y: 3, z: 54.25 }]
      PillarTop.textureIndex = [4.1]
      createRigidBodies(PillarTop.vertices, PillarTop.indices, PillarTop.positionArray, PillarTop.scaleArray, PillarTop.rotationArray, world, RAPIER)
      Objects.push({ Object: PillarTop, object: pillarTop })
    }
    {
      //窗户墙 窗框
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 20, y: 20, z: 1 } }) //宽度1,高度1,深度1
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = []
      WindowFrame.scaleArray = []
      for (let j = 0; j < 6; j++) {
        let offsetZ = 19.5 * j
        for (let i = 0; i < 3; i++) WindowFrame.positionArray.push({ x: 27, y: 47, z: 102.1 - offsetZ - i * 7 }) //竖直
        WindowFrame.positionArray.push({ x: 27, y: 34.5, z: 102.1 - 7 - offsetZ }) //横
        WindowFrame.positionArray.push({ x: 27, y: 41.5, z: 102.1 - 7 - offsetZ }) //横
        WindowFrame.positionArray.push({ x: 27, y: 52.5, z: 102.1 - 7 - offsetZ }) //横
        WindowFrame.positionArray.push({ x: 27, y: 59.5, z: 102.1 - 7 - offsetZ }) //横
        for (let i = 0; i < 3; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 13, z: 0.5 })
        for (let i = 0; i < 4; i++) WindowFrame.scaleArray.push({ x: 0.5, y: 0.5, z: 7.5 })
      }

      WindowFrame.rotationArray = new Array(100).fill({ x: 0, y: 0, z: 0 })
      WindowFrame.textureIndex = new Array(100).fill(100)
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
    {
      //窗户墙间柱子
      const Pillar = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
      const pillar = createGeometry(device, Pillar.vertices, Pillar.indices)
      Pillar.positionArray = []
      for (let i = 0; i < 5; i++) Pillar.positionArray.push({ x: 27, y: 47, z: 85.35 - i * 19.5 })
      // Pillar.positionArray.push({ x: 27, y: 47, z: -12.4 })
      Pillar.scaleArray = new Array(5).fill({ x: 3, y: 13, z: 2.75 })
      // Pillar.scaleArray.push({ x: 3, y: 13, z: 3 })
      Pillar.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })
      Pillar.textureIndex = new Array(6).fill(4.1)
      createRigidBodies(Pillar.vertices, Pillar.indices, Pillar.positionArray, Pillar.scaleArray, Pillar.rotationArray, world, RAPIER)
      Objects.push({ Object: Pillar, object: pillar })

    }
  }
  {
    {
      //正门部分
      {
        //墙 门口左侧长
        const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 8, y: 5, z: 1 } }) //宽度1,高度1,深度1
        const wall = createGeometry(device, Wall.vertices, Wall.indices)
        Wall.positionArray = [
          { x: -2.5, y: 50, z: -12.4 },
        ]

        Wall.rotationArray = [
          { x: 0, y: 0, z: 0 },
        ]
        Wall.scaleArray = [
          { x: 32.5, y: 16, z: 3 },
        ]
        Wall.textureIndex = [4.1]
        createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
        Objects.push({ Object: Wall, object: wall })
      }
      {
        //门框
        const DoorFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
        const doorFrame = createGeometry(device, DoorFrame.vertices, DoorFrame.indices)
        const offsetX = 593.5
        const offsetY = 34
        DoorFrame.positionArray = [
          //竖直
          { x: -650 + offsetX, y: 10 + offsetY, z: -12.4 },
          { x: -640 + offsetX, y: 10 + offsetY, z: -12.4 },
          { x: -638.9 + offsetX, y: 10 + offsetY, z: -12.4 },
          { x: -628.9 + offsetX, y: 10 + offsetY, z: -12.4 },
          //横向
          { x: -639.45 + offsetX, y: 20.5 + offsetY, z: -12.4 },
          { x: -639.45 + offsetX, y: 0.05 + offsetY, z: -12.4 },
        ]
        DoorFrame.rotationArray = new Array(9).fill({ x: 0, y: 0, z: 0 })
        DoorFrame.scaleArray = [
          { x: 0.5, y: 10, z: 0.5 },
          { x: 0.5, y: 10, z: 0.5 },
          { x: 0.5, y: 10, z: 0.5 },
          { x: 0.5, y: 10, z: 0.5 },
          { x: 11.05, y: 0.5, z: 0.5 },
          { x: 11.05, y: 0.05, z: 0.5 },
        ]
        DoorFrame.textureIndex = new Array(9).fill(100)
        createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
        Objects.push({ Object: DoorFrame, object: doorFrame })
      }
      {
        //墙 门口右侧短
        const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 1 } }) //宽度1,高度1,深度1
        const wall = createGeometry(device, Wall.vertices, Wall.indices)
        Wall.positionArray = [
          { x: -59, y: 50, z: -12.4 },
        ]

        Wall.rotationArray = [
          { x: 0, y: 0, z: 0 },
        ]
        Wall.scaleArray = [
          { x: 2, y: 16, z: 3 },
        ]
        Wall.textureIndex = [4.1]
        createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
        Objects.push({ Object: Wall, object: wall })
      }
      {
        // 墙 门口上墙
        const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3, y: 2, z: 1 } }) //宽度1,高度1,深度1
        const wall = createGeometry(device, Wall.vertices, Wall.indices)
        Wall.positionArray = [
          { x: -639.45+593.5, y: 60.5, z: -12.4 },
        ]

        Wall.rotationArray = [
          { x: 0, y: 0, z: 0 },
        ]
        Wall.scaleArray = [
          { x: 11.05, y: 5.5, z: 3 },
        ]
        Wall.textureIndex = [4.1]
        createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
        Objects.push({ Object: Wall, object: wall })
      }
    }
    {    //大厅右侧小房间 侧墙 有窗户
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3.5, y: 4, z: 1 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [
        { x: -90.5, y: 47, z: -12.4 + 1.5 },
        { x: -90.5, y: 47, z: -12.4 - 1.5 },
      ]

      Wall.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ]
      Wall.scaleArray = [
        { x: 14.5, y: 13, z: 1.5 },
        { x: 14.5, y: 13, z: 1.5 }
      ]
      Wall.textureIndex = [5.1, 4.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {    //大厅右侧小房间 侧墙 有窗户 上侧横向大柱子
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 6, y: 1, z: 1 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [
        { x: -83, y: 63, z: -12.4 + 1.5 },
        { x: -83, y: 63, z: -12.4 - 1.5 },
      ]

      Wall.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ]
      Wall.scaleArray = [
        { x: 22, y: 3, z: 1.5 },
        { x: 22, y: 3, z: 1.5 }
      ]
      Wall.textureIndex = [5.1, 4.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {    //大厅右侧小房间 靠近户外窗框 竖直
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        { x: -75.5, y: 47, z: -13.4 },
        { x: -68.5, y: 47, z: -13.4 },
        { x: -61.5, y: 47, z: -13.4 },
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
      WindowFrame.textureIndex = [100, 100, 100]
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
    {    //大厅右侧小房间 靠近户外窗框 横向
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        { x: -68.5, y: 34 + 25.5, z: -13.4 },
        { x: -68.5, y: 34 + 18.5, z: -13.4 },
        { x: -68.5, y: 34 + 7.5, z: -13.4 },
        { x: -68.5, y: 34 + 0.5, z: -13.4 },
      ]
      WindowFrame.scaleArray = new Array(4).fill({ x: 6.5, y: 0.5, z: 0.5 })
      WindowFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
      WindowFrame.textureIndex = [100, 100, 100, 100]
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
  }
}
export default create
