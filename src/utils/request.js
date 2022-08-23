// 1. 创建一个新的axios实例
// 2. 请求拦截器，如果有token进行头部携带
// 3. 响应拦截器：1. 剥离无效数据  2. 处理token失效
// 4. 导出一个函数，调用当前的axsio实例发请求，返回值promise
import store from '@/store';
import axios from 'axios';
import router from '@/router';

// 基准地址
const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/';
// 创建一个新的axios实例
const instance = axios.create({
  baseURL,
  timeout: 5000
});

// 请求拦截器
// 拦截业务逻辑,进行请求配置的修改（为什么要拦截？请求配置修改什么？为什么要修改）
// 1. 获取用户信息对象
instance.interceptors.request.use(
  // use的两个参数分别代表什么？
  config => {
    // 2. 判断是否有token
    const { profile } = store.state.user;

    if (profile.token) {
      // 若本地有token，则在头部携带
      config.headers.Authorization = `Bearer ${profile.token}`;
    }
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  // 请求成功？剥离无效数据
  res => res.data,
  // 请求失败？处理token失效
  err => {
    // 401 状态码，需要用户验证
    if (err.response && err.response.status === 401) {
      // 1. 清空无效数据
      store.commit('user/setUser', {});
      // 2. 跳转到登录页，注意需要传参（当前路由地址）给登录页面
      // router.push('./login?redirectUrl=' + '当前路由地址fullPath')
      const fullPath = encodeURIComponent(router.currentRoute.value.fullPath); // router.currentRoute是ref响应式数据;encodeURIComponent是uri编码，防止解析地址出错
      router.push('./login?redirectUrl=' + fullPath);
    }
    return Promise.reject(err);
  }
);

// 请求工具函数
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 判断是否是get请求
    // 1. [] 用于设置一个 动态的key，里面是js表达式，表达式的结果就是key
    // 2. 处理method：传入的method可能是小写也可能是大写，或者大小写都有，统一转换为小写，便于判断
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  });
};
