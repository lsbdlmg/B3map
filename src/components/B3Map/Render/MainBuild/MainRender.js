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
  sunLightPos,
  sunLightMatrix,
  sunLightIntensity,
) => {
  const {
    instanceCount: instanceCount, //实例集合
    Objects: Objects, //物体集合
    //光源参数
    //缓冲区
    instanceBuffer: instanceBuffer, //实例缓冲区
    ObjectVPMatrixBuffer: ObjectVPMatrixBuffer, //VP矩阵缓冲区
    // ObjectAttributeBuffer: ObjectAttributeBuffer, //物体属性缓冲区
    SunLightMatrixBuffer: SunLightMatrixBuffer, //太阳光矩阵缓冲区
    SunLightMatrixBufferMid: SunLightMatrixBufferMid,
    SunLightMatrixBufferLow: SunLightMatrixBufferLow,
    SunLightAttributeBuffer: SunLightAttributeBuffer, //太阳光属性缓冲区
    SpotLightOneAttributeBuffer: SpotLightOneAttributeBuffer,
    SpotLightTwoAttributeBuffer: SpotLightTwoAttributeBuffer,
    //绑定组
    vsGroup: vsGroup, //顶点着色器绑定组
    fsGroup: fsGroup, //片段着色器绑定组
    SpotLightOneShadowGroup: SpotLightOneShadowGroup, //聚光灯1阴影绑定组
    SpotLightTwoShadowGroup: SpotLightTwoShadowGroup, //聚光灯2阴影绑定组
    SunShadowGroup: SunShadowGroup, //太阳光阴影绑定组
    SunShadowGroupMid: SunShadowGroupMid,
    SunShadowGroupLow: SunShadowGroupLow,
    //管线
    SpotLightOneShadowPipeline: SpotLightOneShadowPipeline, //聚光灯1阴影渲染管线
    SpotLightTwoShadowPipeline: SpotLightTwoShadowPipeline, //聚光灯2阴影渲染管线
    SunShadowPipeline: SunShadowPipeline, //太阳光阴影渲染管线
    MainPipeline: MainPipeline, //主渲染管线
    //视图 不需要主渲染视图
    SpotLightOneShadowDepthView: SpotLightOneShadowDepthView, //聚光灯1阴影深度视图
    SpotLightTwoShadowDepthView: SpotLightTwoShadowDepthView, //聚光灯2阴影深度视图
    SunShadowDepthView: SunShadowDepthView, //太阳光阴影深度视图
    SunShadowDepthViewMid: SunShadowDepthViewMid,
    SunShadowDepthViewLow: SunShadowDepthViewLow,
  } = BeforeRender
  const instanceData = new Float32Array(instanceCount * 20) // 16 floats mat4 + 1 float textureIndex
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

  const isDayTime = sunLightPos[1] > 0;

  // 无论昼夜都必须更新太阳光统一变量(位置/强度)，否则夜晚会残留白天的光照参数
  device.queue.writeBuffer(SunLightAttributeBuffer, 0, new Float32Array([...sunLightPos, 1]))
  device.queue.writeBuffer(SunLightAttributeBuffer, 16, new Float32Array([sunLightIntensity]))

  // 更新聚光灯强度：白天关闭(0.0)，夜晚开启(1.5)
  const spotIntensity = isDayTime ? 0.0 : 1.5;
  device.queue.writeBuffer(SpotLightOneAttributeBuffer, 40, new Float32Array([spotIntensity]));
  device.queue.writeBuffer(SpotLightTwoAttributeBuffer, 40, new Float32Array([spotIntensity]));

  {
    // 聚光灯1阴影渲染
    if (!isDayTime) {
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
        ShadowPass.setVertexBuffer(0, object.vertexBuffer)
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
        ShadowPass.setBindGroup(0, SpotLightOneShadowGroup) // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0, // firstIndex
          0, // baseVertex
          instanceOffset, // firstInstance
        )
        instanceOffset += Object.positionArray.length
      }
      ShadowPass.end()
    }
    // 聚光灯2阴影渲染
    if (!isDayTime) {
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
        ShadowPass.setVertexBuffer(0, object.vertexBuffer)
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
        ShadowPass.setBindGroup(0, SpotLightTwoShadowGroup) // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0, // firstIndex
          0, // baseVertex
          instanceOffset, // firstInstance
        )
        instanceOffset += Object.positionArray.length
      }
      ShadowPass.end()
    }
    // 太阳阴影渲染 High
    if (isDayTime) {
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
      device.queue.writeBuffer(SunLightMatrixBuffer, 0, sunLightMatrix.high)
      // SunLightAttributeBuffer 更新已移至循环外
      let instanceOffset = 0

      // 优化：计算裁切距离平方 (避免开方操作，提升性能)
      // 修改：为了防止大物体被误剔除，这里使用一个保守的半径估计
      // 假设最大物体半径可能达到 1000 (例如地面)
      // CullDistance = PassRadius + MaxObjectRadius
      const cullDistHighSq = (250 + 1000) ** 2;

      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]

        // 简单视锥剔除策略：检查这组实例的第一个物体距离玩家多远
        // 注意：这只是一个近似优化。如果一组实例分布很广，可能导致错误的剔除。
        // 更好的做法是预先计算包围盒/球。
        // 这里假设大多数物体都是集中或者单个的建筑。
        if (Object.positionArray.length > 0) {
          const firstPos = Object.positionArray[0];
          const dx = firstPos.x - eye.x;
          const dz = firstPos.z - eye.z;
          const distSq = dx * dx + dz * dz;

          if (distSq < cullDistHighSq) {
            ShadowPass.setVertexBuffer(0, object.vertexBuffer)
            ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
            ShadowPass.setBindGroup(0, SunShadowGroup) // instanceBuffer 已绑定
            ShadowPass.drawIndexed(
              object.indexCount,
              Object.positionArray.length,
              0, // firstIndex
              0, // baseVertex
              instanceOffset, // firstInstance
            )
          }
        }

        instanceOffset += Object.positionArray.length
      }
      ShadowPass.end()
    }
    // 太阳阴影渲染 Mid
    if (isDayTime) {
      const ShadowPass = commandEncoder.beginRenderPass({
        colorAttachments: [],
        depthStencilAttachment: {
          view: SunShadowDepthViewMid,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
          depthClearValue: 1.0,
        },
      })
      ShadowPass.setPipeline(SunShadowPipeline)
      device.queue.writeBuffer(SunLightMatrixBufferMid, 0, sunLightMatrix.mid)
      let instanceOffset = 0

      // 优化：Mid 层级剔除
      const cullDistMidSq = (550 + 1000) ** 2; // 500范围 + 1000冗余

      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]

        if (Object.positionArray.length > 0) {
          const firstPos = Object.positionArray[0];
          const dx = firstPos.x - eye.x;
          const dz = firstPos.z - eye.z;
          const distSq = dx * dx + dz * dz;

          if (distSq < cullDistMidSq) {
            ShadowPass.setVertexBuffer(0, object.vertexBuffer)
            ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
            ShadowPass.setBindGroup(0, SunShadowGroupMid) // instanceBuffer 已绑定
            ShadowPass.drawIndexed(
              object.indexCount,
              Object.positionArray.length,
              0, // firstIndex
              0, // baseVertex
              instanceOffset, // firstInstance
            )
          }
        }
        instanceOffset += Object.positionArray.length
      }
      ShadowPass.end()
    }
    // 太阳阴影渲染 Low
    if (isDayTime) {
      const ShadowPass = commandEncoder.beginRenderPass({
        colorAttachments: [],
        depthStencilAttachment: {
          view: SunShadowDepthViewLow,
          depthLoadOp: 'clear',
          depthStoreOp: 'store',
          depthClearValue: 1.0,
        },
      })
      ShadowPass.setPipeline(SunShadowPipeline)
      device.queue.writeBuffer(SunLightMatrixBufferLow, 0, sunLightMatrix.low)
      let instanceOffset = 0
      // 注意这里排除最后一个物体 因为最后一个是聚光灯本身 不需要自己给自己投影阴影
      for (let i = 0; i < Objects.length - 1; i++) {
        const { Object, object } = Objects[i]
        ShadowPass.setVertexBuffer(0, object.vertexBuffer)
        ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
        ShadowPass.setBindGroup(0, SunShadowGroupLow) // instanceBuffer 已绑定
        ShadowPass.drawIndexed(
          object.indexCount,
          Object.positionArray.length,
          0, // firstIndex
          0, // baseVertex
          instanceOffset, // firstInstance
        )
        instanceOffset += Object.positionArray.length
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
      renderPass.setBindGroup(1, fsGroup, [0])
      renderPass.drawIndexed(
        object.indexCount,
        Object.positionArray.length,
        0, // firstIndex
        0, // baseVertex
        instanceOffset, // firstInstance
      )
      // console.log(instanceOffset)
      instanceOffset += Object.positionArray.length
    }
    renderPass.end()
  }
}

export default MainHallMainRender
