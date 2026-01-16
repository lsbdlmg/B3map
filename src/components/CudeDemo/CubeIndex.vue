<script setup>
import ControlPanel from '@/components/CudeDemo/ControlPanel.vue'
import CubeCreate from '@/components/CudeDemo/CubeCreate.vue'
</script>

<template>
  <div class="container">
    <ControlPanel />
    <CubeCreate />
  </div>
</template>

<style scoped lang="less">
.container {
  display: flex;
  gap: 20px;
}
</style>
