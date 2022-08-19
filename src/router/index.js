import { createRouter, createWebHashHistory } from 'vue-router';

const Layout = () => import('@/views/Layout.vue');
const Home = () => import('@/views/home/index.vue');

// 路由规则
const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '/',
        component: Home
      }
    ]
  }
];

// 创建路由实例
// vue2 使用 new VueRouter({})
// vue3 使用 createRouter({})
const router = createRouter({
  // 使用hash的路由模式
  history: createWebHashHistory(),
  routes
});

export default router;
