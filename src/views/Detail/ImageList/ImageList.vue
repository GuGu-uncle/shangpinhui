<template>
  <div class="swiper-container">
    <swiper :modules="modules" :slides-per-view="3" navigation>
      <swiper-slide
        v-for="(skuImage, index) in skuImageList"
        :key="skuImage.id"
      >
        <img
          :src="skuImage.imgUrl"
          :class="{ active: currentIndex === index }"
          @click="changeImage(index)"
        />
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue"
import { Navigation } from "swiper"
import { ref } from "vue"
// 引入事件总线
import emitter from "@/mybus"
export default {
  name: "ImageList",
  props: ["skuImageList"],
  components: { Swiper, SwiperSlide },
  setup() {
    let currentIndex = ref(0)
    const changeImage = (index) => {
      currentIndex.value = index
      // 将点击的图片的索引传给兄弟组件Zoom
      emitter.emit('changeImageIndex', index)
    }
    
    return {
      currentIndex,
      changeImage,
      modules: [Navigation],
    }
  },
}
</script>

<style lang="less" scoped>
.swiper-container {
  height: 56px;
  width: 412px;
  box-sizing: border-box;
  padding: 0 12px;

  .swiper-slide {
    width: 56px;
    height: 56px;

    img {
      width: 100%;
      height: 100%;
      border: 1px solid #ccc;
      padding: 2px;
      width: 50px;
      height: 50px;
      display: block;
      margin: 0 auto;

      &.active {
        border: 2px solid #f60;
        padding: 1px;
      }

      &:hover {
        border: 2px solid #f60;
        padding: 1px;
      }
    }
  }

  .swiper-button-next {
    left: auto;
    right: 0;
  }

  .swiper-button-prev {
    left: 0;
    right: auto;
  }

  .swiper-button-next,
  .swiper-button-prev {
    box-sizing: border-box;
    width: 12px;
    height: 56px;
    background: rgb(235, 235, 235);
    border: 1px solid rgb(204, 204, 204);
    top: 0;
    margin-top: 0;
    &::after {
      font-size: 12px;
    }
  }
}
</style>