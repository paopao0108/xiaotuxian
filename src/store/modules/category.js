import { topCategory } from '@/api/constants.js';
import { findAllCategory } from '@/api/category.js';
// 分类模块
export default {
  namespaced: true,
  state: () => {
    return {
      //  分类信息list: []  如果默认是[]空数组，看不见默认的9个分类，等数据加载完毕才会看到
      list: topCategory.map(item => ({ name: item }))
      // 上面的写法就是 下面的简写
      // list: topCategory.map(item => {
      //   return { name: item };
      // })
    };
  },
  // 加载数据成功后需要修改list所以需要mutations函数
  mutations: {
    setList(state, headCategory) {
      state.list = headCategory;
    },
    // 定义 show 和 hide 用于控制二级分类显示和隐藏
    show(state, id) {
      // 找到当前分类
      const currentCategory = state.list.find(item => item.id === id);
      // 将当前分类的open置为true
      currentCategory.open = true;
    },
    hide(state, id) {
      // 找到当前分类
      const currentCategory = state.list.find(item => item.id === id);
      // 将当前分类的open置为true
      currentCategory.open = false;
    }
  },
  // 需要向后台加载数据，所以需要actions函数获取数据
  actions: {
    async getList({ commit }) {
      // actions里面的函数参数相当于一个ministore，通过解构可以获得其中的commit方法
      const data = await findAllCategory();
      // 给每个分类添加控制二级分类显示隐藏的数据
      data.result.forEach(topCate => {
        topCate.open = false;
      });
      // 获取数据成功，提交mutations进行数据修改
      commit('setList', data.result);
    }
  }
};
