<script setup>
import { CubeRenderStore } from '@/stores/Cube'
import { storeToRefs } from 'pinia'
const renderStore = CubeRenderStore()
const { color, material, intensity, bgcolor, speed, running, lightOff, shape, lightPos, scale, objectCount, fps } = storeToRefs(renderStore)
</script>

<template>
  <div class="control-panel">
    <label class="row">
      🎨 物体颜色：
      <input type="color" :value="color" @input="renderStore.color = $event.target.value" />
    </label>
    <label class="row">
      ⚙️ 物体纹理：
      <select :value="material" @change="renderStore.material = $event.target.value">
        <option value="rgb">RGB</option>
        <option value="color">纯色</option>
        <option value="wood">木材</option>
        <option value="brick">砖块</option>
        <option value="jupiter">木星</option>
        <option value="metal">金属</option>
        <option value="grass">草地</option>
        <option value="glass">玻璃</option>
      </select>
    </label>
    <label class="row">
      ⚙️ 物体形状：
      <select :value="shape" @change="renderStore.shape = $event.target.value">
        <option value="cube">立方体</option>
        <option value="sphere">球体</option>
      </select>
    </label>
    <label class="row">
      ⚡ 旋转速度：
      <input type="range" min="0.01" max="3" step="0.01" :value="speed" @input="renderStore.speed = $event.target.value" />
      <span>{{ speed }}</span>
    </label>
    <label class="row">
      ⚡ 物体数量：
      <input type="range" min="1" max="1000" step="1" :value="objectCount" @input="renderStore.objectCount = $event.target.value" />
      <span>{{ objectCount }}</span>
    </label>
    <button @click="renderStore.lightOff = !lightOff">
      {{ lightOff ? '▶️ 开启大灯' : '⏸ 关闭大灯' }}
    </button>

    <label class="row">
      💡 光源 X 轴：
      <input type="range" min="-10" max="10" step="1" :value="lightPos.x" @input="renderStore.lightPos.x = $event.target.value" />
      <span>{{ lightPos.x }}</span>
    </label>
    <label class="row">
      💡 光源 Y 轴：
      <input type="range" min="-10" max="10" step="1" :value="lightPos.y" @input="renderStore.lightPos.y = $event.target.value" />
      <span>{{ lightPos.y }}</span>
    </label>
    <label class="row">
      💡 光源 Z 轴：
      <input type="range" min="-20" max="40" step="1" :value="lightPos.z" @input="renderStore.lightPos.z = $event.target.value" />
      <span>{{ lightPos.z }}</span>
    </label>
    <label class="row">
      ✨ 光源强度：
      <input type="range" min="1" max="10" step="0.01" :value="intensity" @input="renderStore.intensity = $event.target.value" />
      <span>{{ intensity }}</span>
    </label>
    <label class="row">
      ✨ 拉伸 X 轴：
      <input type="range" min="1" max="5" step="0.01" :value="scale.x" @input="renderStore.scale.x = $event.target.value" />
      <span>{{ scale.x }}</span>
    </label>
    <label class="row">
      ✨ 拉伸 Y 轴：
      <input type="range" min="1" max="5" step="0.01" :value="scale.y" @input="renderStore.scale.y = $event.target.value" />
      <!-- <input type="number" min="1" max="5" :value="scale.y" @input="renderStore.scale.y = $event.target.value" /> -->
      <span>{{ scale.y }}</span>
    </label>
    <label class="row">
      ✨ 拉伸 Z 轴：
      <input type="range" min="1" max="5" step="0.01" :value="scale.z" @input="renderStore.scale.z = $event.target.value" />
      <span>{{ scale.z }}</span>
    </label>
    <label class="row">
      🎨 背景颜色：
      <input type="color" :value="bgcolor" @input="renderStore.bgcolor = $event.target.value" />
    </label>
    <button @click="renderStore.running = !running">{{ running ? '⏸ 暂停' : '▶️ 继续' }}</button>
    <label class="row">
      🎨 性能参数： 帧率：{{ fps }}帧
      <!-- 单帧渲染耗时：{{renderTime}}ms -->
    </label>
  </div>
</template>

<style scoped lang="less">
.control-panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 8px;
  min-width: 280px;
  height: fit-content;
  background: #e5e5e5;
  color: rgb(0, 0, 0);
  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  input {
    margin-left: 5px;
    margin-right: auto;
    width: 100px;
  }
  select {
    width: 80px;
    height: 28px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #f9f9f9;
    color: #333;
    cursor: pointer;
    padding: 2px 6px;
    margin-left: 9px;
    margin-right: auto;
    font-size: 14px;
    transition: all 0.2s;
    margin-left: 9px;

    &:hover {
      border-color: #888;
      background-color: #f0f0f0;
    }

    &:focus {
      outline: none;
      border-color: #555;
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
    }
  }
  input[type='color'] {
    flex: 1;
    height: 30px;
    border: none;
    background: transparent;
    cursor: pointer;
  }
  button {
    background: #3b82f6;
    color: white;
    border: none;
    border-radius: 6px;
    padding: 6px 10px;
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: #2563eb;
    }
  }
}
</style>
