import createSofa from '@/components/B3Map/BasicObject/Sofa'
// 沙发组件
const create = (Objects, device, world, RAPIER) => {
  {
    const SofaAttribute = {
      position: { x: 15, y: 2, z: 70 }
    }
    const SeatAttribute = {
      length: 30, // 底座长度
      width: 14, // 底座宽度
      height: 4, // 底座高度
      textureIndex: 100, // 纹理索引
    }
    const LeftRestAttribute = {
      //对应scale
      length: 12, //对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 102, // 纹理索引
    }
    const RightRestAttribute = {
      //对应scale
      length: 12,//对应y
      width: 3,//对应x
      height: 4,//对应z
      textureIndex: 102, // 纹理索引
    }
    const BackRestAttribute = {
      //对应scale
      length: 30.2, //对应y
      width: 3,     //对应x
      height: 4,    //对应z
      textureIndex: 101, // 纹理索引
    }
    const Direction = 'x-'
    createSofa({
      Objects: Objects,
      device: device,
      world: world,
      RAPIER: RAPIER,
      SofaAttribute: SofaAttribute,
      SeatAttribute: SeatAttribute,
      LeftRestAttribute: LeftRestAttribute,
      RightRestAttribute: RightRestAttribute,
      BackRestAttribute: BackRestAttribute,
      Direction: Direction,
    })
  }

  {
    // //面朝z负半轴
    const SofaAttribute = {
      position: { x: 0, y: 2, z: 95 }
    }
    // const SeatAttribute = {
    //   length: 30, // 底座长度
    //   width: 14, // 底座宽度
    //   height: 4, // 底座高度
    //   textureIndex: 100, // 纹理索引
    // }
    // const LeftRestAttribute = {
    //   //对应scale
    //   length: 12, //对应y
    //   width: 3,//对应x
    //   height: 4,//对应z
    //   textureIndex: 102, // 纹理索引
    // }
    // const RightRestAttribute = {
    //   //对应scale
    //   length: 12,//对应y
    //   width: 3,//对应x
    //   height: 4,//对应z
    //   textureIndex: 102, // 纹理索引
    // }
    // const BackRestAttribute = {
    //   //对应scale
    //   length: 30.2, //对应y
    //   width: 3,     //对应x
    //   height: 4,    //对应z
    //   textureIndex: 101, // 纹理索引
    // }
    const Direction = 'z-'
    createSofa({
      Objects: Objects,
      device: device,
      world: world,
      RAPIER: RAPIER,
      SofaAttribute: SofaAttribute,
      // SeatAttribute: SeatAttribute,
      // LeftRestAttribute: LeftRestAttribute,
      // RightRestAttribute: RightRestAttribute,
      // BackRestAttribute: BackRestAttribute,
      Direction: Direction,
    })
  }
}

export default create
