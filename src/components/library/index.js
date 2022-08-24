// 扩展vue原有的功能：全局组件、自定义指令、挂载原型方法（vue3没有全局过滤器）
// 这就是插件
// vue2插件写法要素：导出一个对象，有install函数，默认传入 Vue 构造函数，Vue 基础之上扩展
// vue3插件写法要素：导入出一个对象，有install函数，默认传入 app 应用实例，app 基础之上扩展

import XtxSkeleton from './xtx-skeleton.vue';
import Xtxcarousel from './xtx-carousel.vue';

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 若要挂载原型 通过 app.config.globalProperties 方式
    // 使用的组件一定要有name属性
    app.component(XtxSkeleton.name, XtxSkeleton);
    app.component(Xtxcarousel.name, Xtxcarousel);
  }
};
