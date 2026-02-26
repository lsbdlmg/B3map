import { createSphere } from '@/components/B3Map/BasicShape/Sphere'
import { createGeometry } from '@/components/B3Map/publicJs/Object'
const create = (Objects, spotLightsData, device, innerAngle, outerAngle) => {
  {  // 聚光灯参数

    const innerCone = Math.cos(innerAngle)
    const outerCone = Math.cos(outerAngle)

    // 把灯放到最后 因为阴影渲染 灯不要渲染
    // 创建聚光灯球体几何体数据
    const SpotLight = createSphere(1, 32, 32)
    const spotLight = createGeometry(device, SpotLight.vertices, SpotLight.indices)
    SpotLight.positionArray = [
      //建筑1 一楼
      { x: -10, y: 30, z: 70 },//大厅 远离门口
      { x: -10, y: 30, z: 20 },//大厅 靠近门口
      { x: -70, y: 30, z: -2 },//大厅小房间
      { x: -120, y: 30, z: 45 },//楼梯
      { x: -200, y: 30, z: 40 },//厕所男
      { x: -150, y: 30, z: 40 },//厕所女
      { x: -170, y: 30, z: 40 },//清洁间
      { x: -260, y: 30, z: 30 },//会议室
      { x: -260, y: 30, z: 70 },//会议室
      { x: -340, y: 30, z: 30 },//会议室
      { x: -340, y: 30, z: 70 },//会议室
      //建筑2 一楼
      { x: -610, y: 30, z: 75 },//辅导员办公室
      { x: -680, y: 30, z: 80 },//茶水间

      { x: -605, y: 30, z: -20 },//1号房间
      { x: -605, y: 30, z: -105 },//1号房间

      { x: -605, y: 30, z: -140 },//2号房间
      { x: -605, y: 30, z: -225 },//2号房间

      { x: -605, y: 30, z: -290 },//3号房间
      { x: -605, y: 30, z: -375 },//3号房间

      { x: -1020, y: 30, z: 90 },//4号房间
      { x: -970, y: 30, z: 90 },//4号房间
      { x: -1020, y: 30, z: 20 },//4号房间
      { x: -970, y: 30, z: 20 },//4号房间
      { x: -1020, y: 30, z: -50 },//4号房间
      { x: -970, y: 30, z: -50 },//4号房间
      { x: -1020, y: 30, z: -120 },//4号房间
      { x: -970, y: 30, z: -120 },//4号房间
      { x: -1020, y: 30, z: -190 },//4号房间
      { x: -970, y: 30, z: -190 },//4号房间

      { x: -1040, y: 30, z: -250 },//5号房间
      { x: -1040, y: 30, z: -320 },//5号房间

      { x: -980, y: 30, z: -250 },//电梯前

      { x: -740, y: 30, z: -340 },//厕所男
      { x: -715, y: 30, z: -340 },//厕所女
      { x: -722, y: 30, z: -260 },//厕所门口

      { x: -905, y: 30, z: -240 },//楼梯1
      { x: -730, y: 30, z: 26 },//楼梯2

      //建筑2 二楼
      { x: -610, y: 64, z: 75 },//辅导员办公室
      { x: -680, y: 64, z: 80 },//茶水间

      { x: -605, y: 64, z: -20 },//1号房间
      { x: -605, y: 64, z: -105 },//1号房间

      { x: -605, y: 64, z: -140 },//2号房间
      { x: -605, y: 64, z: -225 },//2号房间

      { x: -605, y: 64, z: -290 },//3号房间
      { x: -605, y: 64, z: -375 },//3号房间

      { x: -1020, y: 64, z: 90 },//4号房间
      { x: -970, y: 64, z: 90 },//4号房间
      { x: -1020, y: 64, z: 20 },//4号房间
      { x: -970, y: 64, z: 20 },//4号房间
      { x: -1020, y: 64, z: -50 },//4号房间
      { x: -970, y: 64, z: -50 },//4号房间
      { x: -1020, y: 64, z: -120 },//4号房间
      { x: -970, y: 64, z: -120 },//4号房间
      { x: -1020, y: 64, z: -190 },//4号房间
      { x: -970, y: 64, z: -190 },//4号房间

      { x: -1040, y: 64, z: -250 },//5号房间
      { x: -1040, y: 64, z: -320 },//5号房间

      { x: -980, y: 64, z: -250 },//电梯前

      { x: -740, y: 64, z: -340 },//厕所男
      { x: -715, y: 64, z: -340 },//厕所女
      { x: -722, y: 64, z: -260 },//厕所门口

      { x: -905, y: 64, z: -240 },//楼梯1
      { x: -905, y: 64, z: -240 },//楼梯1
      { x: -730, y: 64, z: 26 },//楼梯2
    ]
    console.log('灯光数量', SpotLight.positionArray.length)
    SpotLight.rotationArray = new Array(SpotLight.positionArray.length).fill({ x: 0, y: 0, z: 0 })
    SpotLight.scaleArray = new Array(SpotLight.positionArray.length).fill({ x: 0.7, y: 0.7, z: 0.7 })
    SpotLight.textureIndex = new Array(SpotLight.positionArray.length).fill(102)
    //黄色 偏白 光
    SpotLight.colorArray = new Array(SpotLight.positionArray.length).fill({ r: 1.0, g: 0.956, b: 0.939 })
    SpotLight.intensity = new Array(SpotLight.positionArray.length).fill(2)
    Objects.push({ Object: SpotLight, object: spotLight })
    for (let i = 0; i < SpotLight.positionArray.length; i++) {
      spotLightsData.push({
        position: [SpotLight.positionArray[i].x, SpotLight.positionArray[i].y, SpotLight.positionArray[i].z],
        range: 300,
        direction: [0, -1, 0],
        intensity: SpotLight.intensity[i] ? SpotLight.intensity[i] : 1.0,
        color: SpotLight.colorArray[i] ? [SpotLight.colorArray[i].r, SpotLight.colorArray[i].g, SpotLight.colorArray[i].b] : [1.0, 1.0, 1.0],
        innerCone,
        outerCone,
        shadowIndex: i, // 每个灯光一个阴影层
      })
    }
  }
}
export default create
