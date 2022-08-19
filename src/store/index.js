import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate';

// 三个模块
import cart from './modules/cart';
import user from './modules/user';
import category from './modules/category';

// vue3创建仓库 createStore({})
export default createStore({
  // 配置插件
  plugins: [
    // 默认存储在localStorage
    createPersistedState({
      // 本地存储的名字
      key: 'erabbit-client-pc-108-store',
      // 指定需要存储的模块
      paths: ['user', 'cart']
    })
  ],
  modules: {
    user,
    cart,
    category
  }
});

/* vuex学习2 */
// // A 模块
// const moduleA = {
//   state: {
//     username: 'moduleA'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '!!!';
//     }
//   }
// };
// // B 模块
// const moduleB = {
//   namespaced: true,
//   state: {
//     username: 'moduleB'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '!!!';
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = 'ls';
//     }
//   },
//   actions: {
//     updateName(ctx) {
//       // 发请求
//       setTimeout(() => {
//         ctx.commit('updateName');
//       }, 1000);
//     }
//   }
// };
// export default createStore({
//   modules: {
//     moduleA,
//     moduleB
//   }
// });

/* vuex学习1 */
// 创建仓库
// vue2 使用 new Vuex.store({})
// vue3 使用 createStore({})
// export default createStore({
//   state: {
//     username: 'zs'
//   },
//   getters: {
//     newName(state) {
//       return state.username + '!!!';
//     }
//   },
//   mutations: {
//     updateName(state) {
//       state.username = 'ls';
//     }
//   },
//   actions: {
//     updateName(ctx) {
//       // 发请求
//       setTimeout(() => {
//         ctx.commit('updateName');
//       }, 1000);
//     }
//   },
//   modules: {}
// });
