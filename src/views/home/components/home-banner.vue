<template>
  <div class="home-banner">
    <XtxCarousel :sliders="sliders" auto-play :duration="1000" />
  </div>
</template>
<script>
import { findBanner } from '@/api/home.js';
import { ref } from 'vue';
export default {
  name: 'HomeBanner',
  setup() {
    const sliders = ref([]);
    findBanner().then(data => {
      sliders.value = data.result;
    });
    // console.log('sliders', sliders);

    return { sliders };
  }
};
</script>
<style scoped lang="less">
.home-banner {
  width: 1240px;
  height: 500px;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 98;
}
// 覆盖轮播图组件样式
.xtx-carousel {
  ::v-deep .carousel-indicator {
    padding-left: 250px;
  }
  ::v-deep .carousel-btn.prev {
    left: 270px;
  }
}
</style>
