<template>
  <div class="spec-preview">
    <img :src="skuImageList[imgIndex].imgUrl" />
    <div class="event" @mousemove="changeEnlarge"></div>
    <div class="big">
      <img :src="skuImageList[imgIndex].imgUrl" ref="big"/>
    </div>
    <div class="mask"  ref="mask"></div>
  </div>
</template>

<script>
  // 引入事件总线
  import emitter from '@/mybus'
  import {ref} from 'vue'
  export default {
    name: "Zoom",
    props:['skuImageList'],
    setup(){
      let imgIndex = ref(0)
      const mask = ref(null)
      const big = ref(null)
      // 接受兄弟组件ImageList传过来的图片索引
      emitter.on('changeImageIndex', index => {
        imgIndex.value= index
      })
      // 鼠标移入图片时调用的回调
      const changeEnlarge = (event) => {
        let width = mask.value.offsetWidth
        let left = event.offsetX - width/2
        let top = event.offsetY - width/2
        // 将蒙版限制在图片内移动
        if(left < 0) left = 0
        if(left > width) left = width
        if(top < 0) top = 0
        if(top > width) top = width
        // 移动蒙版
        mask.value.style.left = left + 'px'
        mask.value.style.top = top + 'px'
        // 移动放大的图片
        big.value.style.left = -2 * left + 'px'
        big.value.style.top = -2 * top + 'px'
      }

      return {
        imgIndex,
        mask,
        big,
        changeEnlarge
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>