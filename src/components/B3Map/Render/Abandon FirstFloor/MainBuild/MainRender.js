import {  } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder, MainRenderDepthView,
  device, context,
  BeforeRender,
  eye, center, up, canvasWidth, canvasHeight,
  sunLightPos, sunLightMatrix, sunLightIntensity,
) => {
  const {
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
    //视图 不需要主渲染视图
    SpotLightOneShadowDepthView: SpotLightOneShadowDepthView,//聚光灯1阴影深度视图
    SpotLightTwoShadowDepthView: SpotLightTwoShadowDepthView,//聚光灯2阴影深度视图
    SunShadowDepthView: SunShadowDepthView,//太阳光阴影深度视图
  } = BeforeRender
  // const spotLightCount = SpotLight.positionArray.length
  // 聚光灯1阴影渲染
  {
    const ShadowPass = commandEncoder.beginRenderPass({
      colorAttachments: [],
      depthStencilAttachment: {
        view: SpotLightOneShadowDepthView,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        depthClearValue: 1.0,
      },
    })
    ShadowPass.setPipeline(SpotLightOneShadowPipeline)
    device.queue.writeBuffer(SpotLightOneMatrixBuffer, 0, spotlightOneMatrix)
    device.queue.writeBuffer(SpotLightOneAttributeBuffer, 0, new Float32Array(spotLightOne.position)) // vec3
    device.queue.writeBuffer(SpotLightOneAttributeBuffer, 16, new Float32Array(spotLightOne.direction)) // vec3
    device.queue.writeBuffer(SpotLightOneAttributeBuffer, 32, new Float32Array([innerCone])) // f32
    device.queue.writeBuffer(SpotLightOneAttributeBuffer, 36, new Float32Array([outerCone])) // f32
    let offset = 0
    // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
    for (let i = 0; i < Objects.length - 1; i++) {
      const { Object, object } = Objects[i]
      renderShadow(
        device, eye, center, up, ShadowPass,
        Object, object, offset,
        SpotLightOneShadowGroup,
        canvasWidth, canvasHeight,
        ObjectModelMatrixBuffer
      )
      offset += Object.positionArray.length
    }
    ShadowPass.end()
  }
  // 聚光灯2阴影渲染
  {
    const ShadowPass = commandEncoder.beginRenderPass({
      colorAttachments: [],
      depthStencilAttachment: {
        view: SpotLightTwoShadowDepthView,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        depthClearValue: 1.0,
      },
    })
    ShadowPass.setPipeline(SpotLightTwoShadowPipeline)
    device.queue.writeBuffer(SpotLightTwoMatrixBuffer, 0, spotlightTwoMatrix)
    device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 0, new Float32Array(spotLightTwo.position)) // vec3
    device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 16, new Float32Array(spotLightTwo.direction)) // vec3
    device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 32, new Float32Array([innerCone])) // f32
    device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 36, new Float32Array([outerCone])) // f32
    let offset = 0
    // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
    for (let i = 0; i < Objects.length - 1; i++) {
      const { Object, object } = Objects[i]
      renderShadow(
        device, eye, center, up, ShadowPass,
        Object, object, offset,
        SpotLightTwoShadowGroup,
        canvasWidth, canvasHeight,
        ObjectModelMatrixBuffer
      )
      offset += Object.positionArray.length
    }
    ShadowPass.end()
  }
  // 太阳阴影渲染
  {
    const ShadowPass = commandEncoder.beginRenderPass({
      colorAttachments: [],
      depthStencilAttachment: {
        view: SunShadowDepthView,
        depthLoadOp: 'clear',
        depthStoreOp: 'store',
        depthClearValue: 1.0,
      },
    })
    ShadowPass.setPipeline(SunShadowPipeline)
    device.queue.writeBuffer(SunLightMatrixBuffer, 0, sunLightMatrix)
    device.queue.writeBuffer(SunLightAttributeBuffer, 0, new Float32Array([...sunLightPos, 1]))
    device.queue.writeBuffer(SunLightAttributeBuffer, 16, new Float32Array([sunLightIntensity]))
    let offset = 0
    for (let i = 0; i < Objects.length; i++) {
      const { Object, object } = Objects[i]
      renderShadow(
        device, eye, center, up, ShadowPass,
        Object, object, offset,
        SunShadowGroup,
        canvasWidth, canvasHeight,
        ObjectModelMatrixBuffer
      )
      offset += Object.positionArray.length
    }
    ShadowPass.end()
  }
  // 主渲染
  {
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          storeOp: 'store',
          loadOp: 'load',//第一个渲染不需要保留之前的
        },
      ],
      depthStencilAttachment: {
        view: MainRenderDepthView,
        depthLoadOp: 'clear',//第一个要clear
        depthClearValue: 1.0,
        depthStoreOp: 'store',//第一个渲染不需要保留之前的
      },
    })
    renderPass.setPipeline(MainPipeline)
    let offset = 0
    for (let i = 0; i < Objects.length; i++) {
      const { Object, object, textureIndex } = Objects[i]
      renderObject(
        device, eye, center, up,
        renderPass, Object, object, offset, textureIndex,
        vsGroup, fsGroup,
        canvasWidth, canvasHeight,
        ObjectMVPMatrixBuffer, ObjectModelMatrixBuffer, ObjectAttributeBuffer
      )
      offset += Object.positionArray.length
    }
    renderPass.end()
  }

}

export default MainHallMainRender

