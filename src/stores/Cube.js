import { defineStore } from 'pinia'

export const CubeRenderStore = defineStore('CubeRenderStore', {
  state: () => ({
    color: '#ffffff', //物体颜色
    material: 'rgb', //物体材质
    bgcolor: '#000000', //背景颜色
    lightX: 2, //光源x坐标
    lightY: 2, //光源y坐标
    lightZ: 2, //光源z坐标
    lightPos: { x: 2, y: 2, z: 2 }, //光源位置
    position: { x: 0, y: 0, z: 0 }, //物体位置
    rotation: { x: 0, y: 0, z: 0 }, //物体旋转
    scale: { x: 1, y: 1, z: 1 }, //物体缩放
    intensity: 4, //光源强度
    running: true, //是否运行
    speed: 1, //旋转速度
    lightOff: false, //是否关闭光源
    shape: 'cube', //形状
    objectCount: 1, //物体数量
    fps: 0, //帧率
    renderTime: 0, //渲染时间
  }),
  getters: {
    //将物体颜色转换为RGB数组
    colorRGB: (state) => {
      const bigInt = parseInt(state.color.slice(1), 16)
      return [((bigInt >> 16) & 255) / 255, ((bigInt >> 8) & 255) / 255, (bigInt & 255) / 255]
    },
    //将背景颜色转换为RGB数组
    bgcolorRGB: (state) => {
      const bigInt = parseInt(state.bgcolor.slice(1), 16)
      return [((bigInt >> 16) & 255) / 255, ((bigInt >> 8) & 255) / 255, (bigInt & 255) / 255]
    },
  },
})
