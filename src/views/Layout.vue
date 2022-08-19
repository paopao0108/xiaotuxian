<template>
  <div class="layout-container">
    <!-- 顶部通栏 -->
    <!-- <nav><AppNavbar /></nav> -->
    <AppNavbar />
    <!-- 头部组件 -->
    <header>头部组件</header>
    <!-- 内容容器 -->
    <main>
      <!-- 二级路由 -->
      <router-view></router-view>
      <!-- <RouterView /> -->
    </main>
    <!-- 底部组件 -->
    <footer>底部组件</footer>
    <button @click="$store.commit('user/setUser', { token: '111', account: 'zs' })">登录</button>
    <button @click="$store.commit('user/setUser', {})">退出</button>
  </div>
</template>

<script>
import AppNavbar from '@/components/app-navbar.vue';
export default {
  name: 'xtx-layout',
  components: {
    AppNavbar
  },
  setup() {}
};
</script>

<style scoped lang="less"></style>
