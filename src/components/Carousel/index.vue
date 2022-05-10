<template>
  <swiper
    :modules="modules"
    navigation
    :loop="true"
    :pagination="{ clickable: true }"
    :autoplay="{
      delay: 1500,
      disableOnInteraction: false,
    }"
  >
    <swiper-slide v-for="item in carousel" :key="item.id">
      <img :src="item.imgUrl" />
    </swiper-slide>
  </swiper>
</template>

<script>
import { Navigation, Pagination, Autoplay } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue/swiper-vue"
export default {
  name: "Carousel",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: ["carousel"],
  setup() {
    return {
      modules: [Navigation, Pagination, Autoplay],
    }
  },
}
</script>

<style>
</style>