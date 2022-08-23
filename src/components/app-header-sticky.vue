<template>
  <div class="app-header-sticky" :class="{ show: y >= 78 }">
    <!-- 此处还需要加上v-show -->
    <div class="container" v-show="y >= 78">
      <RouterLink class="logo" to="/" />
      <AppHeaderNav />
      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<script>
// import { onMounted, ref } from 'vue';
import AppHeaderNav from './app-header-nav';
import { useWindowScroll } from '@vueuse/core';
export default {
  name: 'AppHeaderSticky',
  components: { AppHeaderNav },
  setup() {
    // // 记录页面被卷去的高度
    // const y = ref(0);
    // // 页面滚动时更新高度
    // onMounted(() => {
    //   window.onscroll = () => {
    //     const scrollTop = document.documentElement.scrollTop;
    //     y.value = scrollTop;
    //   };
    // });
    // return { y };

    // 使用vueuse来实现计算页面卷去内容
    const { y } = useWindowScroll();
    return { y };
  }
};
</script>

<style scoped lang="less">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 元素在y轴方向位移-100%（即向上位移元素本身的高度）
  transform: translateY(-100%);
  // 完全透明
  opacity: 0;
  &.show {
    // 过渡动画：把所有方向上的位移置为0，且不透明
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }
  .container {
    display: flex;
    align-items: center;
  }
  .logo {
    width: 200px;
    height: 80px;
    background: url(../assets/images/logo.png) no-repeat right 2px;
    background-size: 160px auto;
  }
  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid @xtxColor;
    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;
      &:hover {
        color: @xtxColor;
      }
    }
  }
}
</style>
