import { getMvpMatrix } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder, MainRenderDepthView,
  device, context,
  BeforeRender,
  eye, center, up, canvasWidth, canvasHeight,
  sunLightPos,
) => {
  const {
    Sky: Sky,
    //已经写入顶点缓冲区
    sky: sky,
    //缓冲区
    ObjectMVPMatrixBuffer: ObjectMVPMatrixBuffer,//物体MVP矩阵缓冲区
    ObjectModelMatrixBuffer: ObjectModelMatrixBuffer,//物体Model矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer,//物体属性缓冲区
    //绑定组
    vsGroup: vsGroup,//顶点着色器绑定组
    fsGroup: fsGroup,//片段着色器绑定组
    //管线
    MainPipeline: MainPipeline,//主渲染管线
  } = BeforeRender//天空渲染前准备

  {
    // 渲染天空
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          storeOp: 'store',
          loadOp: 'load',// 保留之前的渲染
        },
      ],
      depthStencilAttachment: {
        view: MainRenderDepthView,
        depthLoadOp: 'load',// 保留之前的深度阴影
        depthClearValue: 1.0,
        depthStoreOp: 'store',
      },
    })
    renderPass.setPipeline(MainPipeline)

    let textureIndex = 0; // 白天
    if (sunLightPos[1] < 0) {
      textureIndex = 1; // 夜晚
    }
    // 绘制天空
    renderSky(
      device, eye, center, up,
      renderPass, Sky, sky, 0, textureIndex,
      vsGroup, fsGroup,
      canvasWidth, canvasHeight,
      ObjectMVPMatrixBuffer, ObjectModelMatrixBuffer, ObjectAttributeBuffer
    )
    renderPass.end()
  }
}
const renderSky = (
  device, eye, center, up, renderPass,
  Object, object, slot, textureIndex,
  vsGroup, fsGroup,
  canvasWidth, canvasHeight,
  ObjectMVPMatrixBuffer, ObjectModelMatrixBuffer, ObjectAttributeBuffer
) => {
  let count = Object.positionArray.length
  for (let i = 0; i < count; i++) {
    const offset = (i + slot) * 256
    const { model: Model, vp: VP } = getMvpMatrix(
      canvasWidth / canvasHeight,
      Object.positionArray[i],
      Object.rotationArray[i],
      Object.scaleArray[i],
      eye,
      center,
      up,
    )
    device.queue.writeBuffer(ObjectMVPMatrixBuffer, offset, VP)//这里用VP矩阵
    device.queue.writeBuffer(ObjectModelMatrixBuffer, offset, Model)
    device.queue.writeBuffer(ObjectAttributeBuffer, offset, new Float32Array([textureIndex])) // 0: 白天 1: 夜晚
  }
  // 绘制
  for (let i = 0; i < count; i++) {
    // const offset = (i + slot) * 256
    renderPass.setBindGroup(0, vsGroup)
    renderPass.setBindGroup(1, fsGroup)
    renderPass.setVertexBuffer(0, object.vertexBuffer)
    renderPass.setIndexBuffer(object.indexBuffer, 'uint16')
    renderPass.drawIndexed(object.indexCount)
  }
}
export default MainHallMainRender
