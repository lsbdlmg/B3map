import { getSkyVpMatrix } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder,
  MainRenderDepthView,
  device,
  context,
  BeforeRender,
  eye,
  center,
  up,
  canvasWidth,
  canvasHeight,
  sunLightPos,
) => {
  const {
    //已经写入顶点缓冲区
    sky: sky,
    //缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer, //物体MVP矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer, //物体属性缓冲区
    //绑定组
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    //管线
    MainPipeline: MainPipeline, //主渲染管线
  } = BeforeRender //天空渲染前准备

  {
    // 渲染天空
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          storeOp: 'store',
          loadOp: 'load', // 保留之前的渲染
        },
      ],
      depthStencilAttachment: {
        view: MainRenderDepthView,
        depthLoadOp: 'load', // 保留之前的深度阴影
        depthClearValue: 1.0,
        depthStoreOp: 'store',
      },
    })
    renderPass.setPipeline(MainPipeline)

    let textureIndex = 0 // 白天
    if (sunLightPos[1] < 0) {
      textureIndex = 1 // 夜晚
    }
    const vpMatrix = getSkyVpMatrix(eye, center, up, canvasWidth / canvasHeight)
    device.queue.writeBuffer(ObjectVPMatrixBuffer, 0, vpMatrix) //这里用VP矩阵
    device.queue.writeBuffer(ObjectAttributeBuffer, 0, new Float32Array([textureIndex])) // 0: 白天 1: 夜晚
    renderPass.setBindGroup(0, vsGroup)
    renderPass.setBindGroup(1, fsGroup)
    renderPass.setVertexBuffer(0, sky.vertexBuffer)
    renderPass.setIndexBuffer(sky.indexBuffer, 'uint16')
    renderPass.drawIndexed(sky.indexCount)
    renderPass.end()
  }
}
export default MainHallMainRender
