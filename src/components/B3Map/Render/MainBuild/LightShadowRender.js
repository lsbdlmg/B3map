import { getModelMatrix, getVpMatrix } from '@/components/B3Map/publicJs/Object'
const Render = (
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
    //物体相关
    instanceCount: instanceCount, //实例数量
    Objects: Objects, //物体集合
    instanceBuffer: instanceBuffer, //实例缓冲区
    //太阳光相关
    SunLightMatrixBufferHigh: SunLightMatrixBufferHigh, //太阳光矩阵缓冲区 High
    SunLightMatrixBufferMid: SunLightMatrixBufferMid,//太阳光矩阵缓冲区 Mid
    SunLightMatrixBufferLow: SunLightMatrixBufferLow,//太阳光矩阵缓冲区 Low
    SunLightAttributeBuffer: SunLightAttributeBuffer, //太阳光属性缓冲区
    SunShadowGroupHigh: SunShadowGroupHigh, //太阳光阴影绑定组 High
    SunShadowGroupMid: SunShadowGroupMid,//太阳光阴影绑定组 Mid
    SunShadowGroupLow: SunShadowGroupLow,//太阳光阴影绑定组 Low
    SunShadowDepthViewHigh: SunShadowDepthViewHigh, //太阳光阴影深度视图 High
    SunShadowDepthViewMid: SunShadowDepthViewMid, //太阳光阴影深度视图 Mid
    SunShadowDepthViewLow: SunShadowDepthViewLow, //太阳光阴影深度视图 Low
    SunShadowPipeline: SunShadowPipeline, //太阳光阴影渲染管线
    //聚光灯相关
    SpotLightsStorageBuffer: SpotLightsStorageBuffer,
    spotLightsData: spotLightsData,
    SpotLightShadowPipelines: SpotLightShadowPipelines, // 聚光灯阴影渲染管线列表
    SpotLightShadowGroups: SpotLightShadowGroups, // 聚光灯阴影绑定组列表
    SpotLightArrayLayerViews: SpotLightArrayLayerViews, // 聚光灯阴影纹理数组 各层视图列表
    SpotLightMatrices: SpotLightMatrices, // 聚光灯矩阵列表
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

  if (isDayTime) {
    // 优化：白天直接将光照数量设为 0，彻底跳过 Shader 循环
    device.queue.writeBuffer(SpotLightsStorageBuffer, 0, new Uint32Array([0]));
  }
  else {
    // 优化：夜晚实施简单的距离剔除 (Light Culling)
    // 降低最大同时激活灯光数到 8，这对性能提升巨大且在走廊等场景通常足够
    // 渲染 256 个动态光源即使无阴影也非常卡顿。建议控制在 48-64 以内。
    const MAX_ACTIVE_LIGHTS = 6;
    const MAX_SHADOW_LIGHTS = 4;

    // 提前计算VP矩阵用于视锥剔除
    const vpMatrix = getVpMatrix(eye, center, up, canvasWidth / canvasHeight);

    // 提取视锥平面
    const planes = [];
    const m = vpMatrix;
    planes.push([m[3] + m[0], m[7] + m[4], m[11] + m[8], m[15] + m[12]]); // Left
    planes.push([m[3] - m[0], m[7] - m[4], m[11] - m[8], m[15] - m[12]]); // Right
    planes.push([m[3] + m[1], m[7] + m[5], m[11] + m[9], m[15] + m[13]]); // Bottom
    planes.push([m[3] - m[1], m[7] - m[5], m[11] - m[9], m[15] - m[13]]); // Top
    planes.push([m[3] + m[2], m[7] + m[6], m[11] + m[10], m[15] + m[14]]); // Near
    planes.push([m[3] - m[2], m[7] - m[6], m[11] - m[10], m[15] - m[14]]); // Far
    // 归一化
    for (let p of planes) {
      const len = Math.sqrt(p[0] * p[0] + p[1] * p[1] + p[2] * p[2]);
      if (len > 0) { p[0] /= len; p[1] /= len; p[2] /= len; p[3] /= len; }
    }

    // 1. 筛选并排序
    const candidateLights = [];
    for (let i = 0; i < spotLightsData.length; i++) {
      const light = spotLightsData[i];

      // --- 视锥剔除 ---
      let isVisible = true;
      for (const p of planes) {
        // 球体剔除: dist = dot(N, P) + D; if (dist < -radius) cull
        if (p[0] * light.position[0] + p[1] * light.position[1] + p[2] * light.position[2] + p[3] < -light.range) {
          isVisible = false; break;
        }
      }
      if (!isVisible) continue;

      const dx = light.position[0] - eye.x;
      const dy = light.position[1] - eye.y;
      const dz = light.position[2] - eye.z;
      const distSq = dx * dx + dy * dy + dz * dz;

      // 距离筛选 (3000以内)
      if (distSq < 3000 * 3000) {
        candidateLights.push({ index: i, distSq, light });
      }
    }
    // 按距离排序
    candidateLights.sort((a, b) => a.distSq - b.distSq);

    // 2. 取前 N 个
    const lightsToRender = candidateLights.slice(0, MAX_ACTIVE_LIGHTS);
    const activeCount = lightsToRender.length;

    // 3. 构建临时缓冲区数据 - 使用 TypedArray 优化性能
    // Struct Layout: u32 count, u32 pad[3], SpotLight array[128 bytes each]
    // 头部 16 Bytes (4 floats)
    const float32Count = 4 + activeCount * 32; // 32 floats = 128 bytes
    const tempArray = new Float32Array(float32Count);
    // 也就是 Uint32 view
    const uint32View = new Uint32Array(tempArray.buffer);

    // 写入数量 (第0个 uint32)
    uint32View[0] = activeCount;

    // 写入光源数据
    for (let k = 0; k < activeCount; k++) {
      const item = lightsToRender[k];
      const l = item.light;
      const m = SpotLightMatrices[item.index]; // 获取对应的矩阵
      const base = 4 + k * 32; // float32 index base

      // Position (Offset 0) vec3
      tempArray[base + 0] = l.position[0];
      tempArray[base + 1] = l.position[1];
      tempArray[base + 2] = l.position[2];
      // Range (Offset 12) f32
      tempArray[base + 3] = l.range;

      // Direction (Offset 16) vec3
      tempArray[base + 4] = l.direction[0];
      tempArray[base + 5] = l.direction[1];
      tempArray[base + 6] = l.direction[2];
      // Intensity (Offset 28) f32
      tempArray[base + 7] = l.intensity;

      // Color (Offset 32) vec3
      tempArray[base + 8] = l.color[0];
      tempArray[base + 9] = l.color[1];
      tempArray[base + 10] = l.color[2];
      // InnerCone (Offset 44) f32
      tempArray[base + 11] = l.innerCone;

      // OuterCone (Offset 48) f32
      tempArray[base + 12] = l.outerCone;
      // ShadowIndex (Offset 52) f32
      tempArray[base + 13] = k < MAX_SHADOW_LIGHTS ? l.shadowIndex : -1.0;
      // Pad
      tempArray[base + 14] = 0;
      tempArray[base + 15] = 0;

      // Matrix (Offset 64) mat4x4 -> 16 floats
      tempArray.set(m, base + 16);
    }

    // 一次性上传
    device.queue.writeBuffer(SpotLightsStorageBuffer, 0, tempArray);
  }

  // 无论昼夜都必须更新太阳光统一变量(位置/强度)，否则夜晚会残留白天的光照参数
  device.queue.writeBuffer(SunLightAttributeBuffer, 0, new Float32Array([...sunLightPos, 1]))
  device.queue.writeBuffer(SunLightAttributeBuffer, 16, new Float32Array([sunLightIntensity]))
  {
    // 统一循环渲染聚光灯阴影
    // [优化] 聚光灯是不动的，只需要渲染一次阴影贴图即可
    //  BeforeRender 对象上挂载一个标记来记录是否已经渲染过
    if (!BeforeRender.hasRenderedSpotLights) {
      for (let i = 0; i < SpotLightShadowPipelines.length; i++) {
        const ShadowPass = commandEncoder.beginRenderPass({
          colorAttachments: [],
          depthStencilAttachment: {
            view: SpotLightArrayLayerViews[i],
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
            depthClearValue: 1.0,
          },
        })
        ShadowPass.setPipeline(SpotLightShadowPipelines[i])
        let instanceOffset = 0
        for (let j = 0; j < Objects.length - 1; j++) {
          const { Object, object } = Objects[j]
          ShadowPass.setVertexBuffer(0, object.vertexBuffer)
          ShadowPass.setIndexBuffer(object.indexBuffer, 'uint16')
          ShadowPass.setBindGroup(0, SpotLightShadowGroups[i])
          ShadowPass.drawIndexed(
            object.indexCount,
            Object.positionArray.length,
            0, // 开始索引
            0, // 基本顶点
            instanceOffset, // 实例偏移
          )
          instanceOffset += Object.positionArray.length
        }
        ShadowPass.end()
      }
      // 标记为已渲染，后续帧将跳过这些 Pass，极大节省性能
      BeforeRender.hasRenderedSpotLights = true;
    }

    {
      // 太阳阴影渲染 High
      if (isDayTime) {
        const ShadowPass = commandEncoder.beginRenderPass({
          colorAttachments: [],
          depthStencilAttachment: {
            view: SunShadowDepthViewHigh,
            depthLoadOp: 'clear',
            depthStoreOp: 'store',
            depthClearValue: 1.0,
          },
        })
        ShadowPass.setPipeline(SunShadowPipeline)
        device.queue.writeBuffer(SunLightMatrixBufferHigh, 0, sunLightMatrix.high)

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
              ShadowPass.setBindGroup(0, SunShadowGroupHigh) // instanceBuffer 已绑定
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
  }
}

export default Render
