import { getModelMatrix, getVpMatrix } from '@/components/B3Map/publicJs/Object'
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
) => {
  const {
    //物体相关
    instanceCount: instanceCount, //实例数量
    Objects: Objects, //物体集合
    instanceBuffer: instanceBuffer, //实例缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer, //VP矩阵缓冲区
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    MainPipeline: MainPipeline, //主渲染管线
  } = BeforeRender
  const instanceData = new Float32Array(instanceCount * 20)
  let idx = 0

  for (const { Object } of Objects) {
    const positions = Object.positionArray
    const rotations = Object.rotationArray
    const scales = Object.scaleArray
    const textures = Object.textureIndex
    for (let i = 0; i < positions.length; i++) {
      const modelMatrix = getModelMatrix(positions[i], rotations[i], scales[i])
      instanceData.set(modelMatrix, idx * 20)
      instanceData[idx * 20 + 16] = textures[i] //剩下3个不要补齐
      idx++
    }
  }
  // 写入 GPU
  device.queue.writeBuffer(instanceBuffer, 0, instanceData)
  // 主渲染
  {
    const renderPass = commandEncoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          storeOp: 'store',
          loadOp: 'load', //第一个渲染不需要保留之前的
        },
      ],
      depthStencilAttachment: {
        view: MainRenderDepthView,
        depthLoadOp: 'clear',
        depthClearValue: 1.0,
        depthStoreOp: 'store', //第一个渲染不需要保留之前的
      },
    })
    renderPass.setPipeline(MainPipeline)
    //获取VP矩阵
    const vpMatrix = getVpMatrix(eye, center, up, canvasWidth / canvasHeight)
    device.queue.writeBuffer(ObjectVPMatrixBuffer, 0, vpMatrix)
    let instanceOffset = 0
    for (const { Object, object } of Objects) {
      renderPass.setVertexBuffer(0, object.vertexBuffer)
      renderPass.setIndexBuffer(object.indexBuffer, 'uint16')
      renderPass.setBindGroup(0, vsGroup)
      renderPass.setBindGroup(1, fsGroup)
      renderPass.drawIndexed(
        object.indexCount,
        Object.positionArray.length,
        0,
        0,
        instanceOffset,
      )
      instanceOffset += Object.positionArray.length
    }
    renderPass.end()
  }
}
export default MainHallMainRender
