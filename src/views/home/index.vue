<template>
  <!-- 首页入口 -->
  <div class="home-entry">
    <div class="container">
      <!-- 左侧分类 -->
      <HomeCategory />
      <!-- 轮播图 -->
      <HomeBanner />
    </div>
    <!-- 新鲜好物-test -->
    <!-- <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质推荐">
      <template #right><XtxMore path="/"></XtxMore></template>
      <p>123456</p>
    </HomePanel> -->
    <HomeNew />
    <HomeHot />
    <HomeBrand />
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue';
import HomeBanner from './components/home-banner.vue';
import HomeNew from './components/home-new.vue';
import HomeHot from './components/home-hot.vue';
import HomeBrand from './components/home-brand.vue';
export default {
  name: 'home',
  components: {
    HomeCategory,
    HomeBanner,
    HomeNew,
    HomeHot,
    HomeBrand
  }
};
</script>

<style scoped lang="less"></style>
