import { getVpMatrix } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder, MainRenderDepthView,
  device, context,
  BeforeRender,
  eye, center, up, canvasWidth, canvasHeight,
) => {
  const {
    //对象数组
    Objects: Objects,
    //缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer,
    //绑定组
    vsGroup: vsGroup,//顶点着色器绑定组
    //管线
    MainPipeline: MainPipeline,//主渲染管线
  } = BeforeRender//天空渲染前准备

  {
    // 渲染
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

    const vpMatrix = getVpMatrix(eye, center, up, canvasWidth / canvasHeight)
    device.queue.writeBuffer(ObjectVPMatrixBuffer, 0, vpMatrix);
    let instanceOffset = 0;
    for (const { Object, object } of Objects) {
      renderPass.setVertexBuffer(0, object.vertexBuffer);
      renderPass.setIndexBuffer(object.indexBuffer, 'uint16');
      renderPass.setBindGroup(0, vsGroup); // instanceBuffer 已绑定
      renderPass.drawIndexed(
        object.indexCount,
        Object.positionArray.length,
        0,      // firstIndex
        0,      // baseVertex
        instanceOffset // firstInstance
      );
      instanceOffset += Object.positionArray.length;
    }
    renderPass.end()
  }
}

export default MainHallMainRender
