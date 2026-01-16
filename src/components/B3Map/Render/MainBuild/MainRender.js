import { getModelMatrix, getVpMatrix } from '@/components/B3Map/publicJs/Object'
const MainHallMainRender = (
  commandEncoder, MainRenderDepthView,
  device, context,
  BeforeRender,
  eye, center, up, canvasWidth, canvasHeight,
  sunLightPos, sunLightMatrix, sunLightIntensity,
) => {
  const {
    instanceCount: instanceCount,//实例集合
    Objects: Objects,//物体集合
    //光源参数
    //缓冲区
    instanceBuffer: instanceBuffer,//实例缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer,//VP矩阵缓冲区
    SunLightMatrixBuffer: SunLightMatrixBuffer,//太阳光矩阵缓冲区
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
  const instanceData = new Float32Array(instanceCount * 20); // 16 floats mat4 + 1 float textureIndex
  let idx = 0;

  for (const { Object } of Objects) {
    const positions = Object.positionArray;
    const rotations = Object.rotationArray;
    const scales = Object.scaleArray;
    const textures = Object.textureIndex;

    for (let i = 0; i < positions.length; i++) {
      const modelMatrix = getModelMatrix(positions[i], rotations[i], scales[i]);
      instanceData.set(modelMatrix, idx * 20);
      instanceData[idx * 20 + 16] = textures[i]; //剩下3个不要补齐
      // instanceData[idx * 20 + 17] = textures[i]; 写不写都行 vertex里面不读
      // instanceData[idx * 20 + 18] = textures[i];
      // instanceData[idx * 20 + 19] = textures[i];
      idx++;
    }
  }
  // 写入 GPU
  device.queue.writeBuffer(instanceBuffer, 0, instanceData);
  {  // 聚光灯1阴影渲染
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



      let instanceOffset = 0
      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]
        ShadowPass.setVertexBuffer(0, object.vertexBuffer);
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16');
        ShadowPass.setBindGroup(0, SpotLightOneShadowGroup); // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0,      // firstIndex
          0,      // baseVertex
          instanceOffset // firstInstance
        );
        instanceOffset += Object.positionArray.length;
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

      let instanceOffset = 0
      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]
        ShadowPass.setVertexBuffer(0, object.vertexBuffer);
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16');
        ShadowPass.setBindGroup(0, SpotLightTwoShadowGroup); // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0,      // firstIndex
          0,      // baseVertex
          instanceOffset // firstInstance
        );
        instanceOffset += Object.positionArray.length;
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
      let instanceOffset = 0
      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]
        ShadowPass.setVertexBuffer(0, object.vertexBuffer);
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16');
        ShadowPass.setBindGroup(0, SunShadowGroup); // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0,      // firstIndex
          0,      // baseVertex
          instanceOffset // firstInstance
        );
        instanceOffset += Object.positionArray.length;
      }
      ShadowPass.end()
    }
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
        depthLoadOp: 'clear',
        depthClearValue: 1.0,
        depthStoreOp: 'store',//第一个渲染不需要保留之前的
      },
    })
    renderPass.setPipeline(MainPipeline)
    //获取VP矩阵
    const vpMatrix = getVpMatrix(eye, center, up, canvasWidth / canvasHeight)
    device.queue.writeBuffer(ObjectVPMatrixBuffer, 0, vpMatrix);
    let instanceOffset = 0;
    for (const { Object, object } of Objects) {
      renderPass.setVertexBuffer(0, object.vertexBuffer);
      renderPass.setIndexBuffer(object.indexBuffer, 'uint16');
      renderPass.setBindGroup(0, vsGroup);
      renderPass.setBindGroup(1, fsGroup, [0]);
      renderPass.drawIndexed(
        object.indexCount,
        Object.positionArray.length,
        0,      // firstIndex
        0,      // baseVertex
        instanceOffset // firstInstance
      );
      // console.log(instanceOffset)
      instanceOffset += Object.positionArray.length;
    }
    renderPass.end()
  }
}

export default MainHallMainRender
