<template>
  <div class="home-container">
    <!-- 左侧分类 -->
    <HomeCategory />
  </div>
</template>

<script>
import HomeCategory from './components/home-category.vue';
export default {
  name: 'home',
  components: {
    HomeCategory
  }
};
</script>

<style scoped lang="less">
.home-container {
  .hoverShadow();
  color: @xtxColor;
}
</style>
