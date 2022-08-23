<template>
  <div class="layout-container">
    <!-- 顶部通栏 -->
    <!-- <nav><AppNavbar /></nav> -->
    <AppNavbar />
    <!-- 头部组件 -->
    <AppHeader />
    <!-- 吸顶头部 -->
    <AppHeaderSticky />
    <main>
      <!-- 二级路由 -->
      <router-view></router-view>
      <!-- <RouterView /> -->
    </main>
    <!-- 底部组件 -->
    <AppFooter />
  </div>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue';
import AppHeader from '@/components/app-header.vue';
import AppFooter from '@/components/app-footer.vue';
import AppHeaderSticky from '@/components/app-header-sticky.vue';
import { useStore } from 'vuex';

export default {
  name: 'xtx-layout',
  components: {
    AppNavbar,
    AppHeader,
    AppFooter,
    AppHeaderSticky
  },
  setup() {
    const store = useStore();
    store.dispatch('category/getList');
  }
};
</script>

<style scoped lang="less">
main {
  min-height: 600px;
}
</style>
