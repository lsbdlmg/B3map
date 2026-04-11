import { createCube } from '@/components/B3Map/BasicShape/Cube'
import { createGeometry, createRigidBodies } from '@/components/B3Map/publicJs/Object'
import createChair from '@/components/B3Map/BasicObject/Chair'
import createTable from '@/components/B3Map/BasicObject/Table'
const create = (Objects, device, world, RAPIER) => {
  // 墙体
  {
    {    //大厅右侧小房间 门口 下墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1.6, z: 1.5 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [{ x: -59, y: 4.5, z: 5.1 },]

      Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Wall.scaleArray = [{ x: 2, y: 4.5, z: 4.5 }]
      Wall.textureIndex = [5.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {    //大厅右侧小房间 门口 上墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 2.1, z: 3 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [{ x: -59, y: 26.5, z: 0.1 },]

      Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Wall.scaleArray = [{ x: 2, y: 5.5, z: 9.5 }]
      Wall.textureIndex = [5.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {    //大厅右侧小房间 背侧 后墙
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 5, z: 4.5 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [{ x: -97, y: 16, z: 3.6 },]

      Wall.rotationArray = [{ x: 0, y: 0, z: 0 }]
      Wall.scaleArray = [{ x: 8, y: 16, z: 13 }]
      Wall.textureIndex = [5.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
      Objects.push({ Object: Wall, object: wall })
    }
    {    //大厅右侧小房间 侧墙 有窗户
      const Wall = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 3.5, y: 4, z: 1 } })
      const wall = createGeometry(device, Wall.vertices, Wall.indices)
      Wall.positionArray = [
        { x: -90.5, y: 13, z: -12.4 + 1.5 },
        { x: -90.5, y: 13, z: -12.4 - 1.5 },
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
        { x: -83, y: 30, z: -12.4 + 1.5 },
        { x: -83, y: 29.9, z: -12.4 - 1.5 },
      ]

      Wall.rotationArray = [
        { x: 0, y: 0, z: 0 },
        { x: 0, y: 0, z: 0 }
      ]
      Wall.scaleArray = [
        { x: 22, y: 4, z: 1.5 },
        { x: 22, y: 3.9, z: 1.5 }
      ]
      Wall.textureIndex = [5.1, 4.1]
      createRigidBodies(Wall.vertices, Wall.indices, Wall.positionArray, Wall.scaleArray, Wall.rotationArray, world, RAPIER)
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
        { x: -59, y: 0.05, z: -4.4 },
      ]
      DoorFrame.scaleArray = [
        { x: 1.5, y: 10, z: 0.5 },
        { x: 1.5, y: 10, z: 0.5 },
        { x: 1.5, y: 6, z: 0.5 },
        { x: 1.5, y: 0.5, z: 4 },
        { x: 1.5, y: 0.5, z: 9 },
        { x: 1.5, y: 0.05, z: 4.5 }
      ]
      DoorFrame.rotationArray = new Array(6).fill({ x: 0, y: 0, z: 0 })
      DoorFrame.textureIndex = [101, 101, 101, 101, 101, 101]
      createRigidBodies(DoorFrame.vertices, DoorFrame.indices, DoorFrame.positionArray, DoorFrame.scaleArray, DoorFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: DoorFrame, object: doorFrame })
    }
    {    //大厅右侧小房间 靠近户外窗框 竖直
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        { x: -75.5, y: 13, z: -13.4 },
        { x: -68.5, y: 13, z: -13.4 },
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
      WindowFrame.textureIndex = [100, 100, 100]
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
    {    //大厅右侧小房间 靠近户外窗框 横向
      const WindowFrame = createCube({ hw: 1, hh: 1, hd: 1, slices: 20, repeat: { x: 1, y: 1, z: 1 } })
      const windowFrame = createGeometry(device, WindowFrame.vertices, WindowFrame.indices)
      WindowFrame.positionArray = [
        { x: -68.5, y: 25.5, z: -13.4 },
        { x: -68.5, y: 18.5, z: -13.4 },
        { x: -68.5, y: 7.5, z: -13.4 },
        { x: -68.5, y: 0.5, z: -13.4 },
      ]
      WindowFrame.scaleArray = new Array(4).fill({ x: 6.5, y: 0.5, z: 0.5 })
      WindowFrame.rotationArray = new Array(4).fill({ x: 0, y: 0, z: 0 })
      WindowFrame.textureIndex = [100, 100, 100, 100]
      createRigidBodies(WindowFrame.vertices, WindowFrame.indices, WindowFrame.positionArray, WindowFrame.scaleArray, WindowFrame.rotationArray, world, RAPIER)
      Objects.push({ Object: WindowFrame, object: windowFrame })
    }
  }
  //桌椅
  {
    //大厅椅子
    {
      createChair({
        Objects: Objects,
        device: device,
        world: world,
        RAPIER: RAPIER,
        ChairAttribute: {
          position: { x: -80, y: 5, z: 8 },
        }
      })
    }
    //大厅桌子
    {
      createTable({
        Objects: Objects,
        device: device,
        world: world,
        RAPIER: RAPIER,
        TableAttribute: {
          position: { x: -70, y: 8, z: 8 },
          length: 15,
          width: 10,
          height: 8,
          topTextureIndex: 101,
          legTextureIndex: 103,
        },
      })
    }
  }
}
export default create
