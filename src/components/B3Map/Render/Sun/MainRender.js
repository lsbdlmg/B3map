import { getMvpMatrix } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder, MainRenderDepthView,
  device, context,
  BeforeRender,
  eye, center, up, canvasWidth, canvasHeight,
  sunLightPos
) => {
  const {
    //已经写入顶点缓冲区
    sun: sun,
    //缓冲区
    ObjectMVPMatrixBuffer: ObjectMVPMatrixBuffer,//物体MVP矩阵缓冲区
    ObjectModelMatrixBuffer: ObjectModelMatrixBuffer,//物体Model矩阵缓冲区
    ObjectAttributeBuffer: ObjectAttributeBuffer,//物体属性缓冲区
    //绑定组
    vsGroup: vsGroup,//顶点着色器绑定组
    fsGroup: fsGroup,//片段着色器绑定组
    //管线
    MainPipeline: MainPipeline,//主渲染管线
  } = BeforeRender

  {
    // 渲染太阳
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
    const { mvp: sunMVP, model: sunModel } = getMvpMatrix(
      canvasWidth / canvasHeight,
      { x: sunLightPos[0], y: sunLightPos[1], z: sunLightPos[2] },
      { x: 0, y: 0, z: 0 },
      { x: 10, y: 10, z: 10 },
      eye,
      center,
      up,
    )
    device.queue.writeBuffer(ObjectMVPMatrixBuffer, 0, sunMVP)
    device.queue.writeBuffer(ObjectModelMatrixBuffer, 0, sunModel)
    device.queue.writeBuffer(ObjectAttributeBuffer, 0, new Float32Array([2]))
    renderPass.setBindGroup(0, vsGroup)
    renderPass.setBindGroup(1, fsGroup)
    renderPass.setVertexBuffer(0, sun.vertexBuffer)
    renderPass.setIndexBuffer(sun.indexBuffer, 'uint16')
    renderPass.drawIndexed(sun.indexCount)
    renderPass.end()
  }
}

export default MainHallMainRender
