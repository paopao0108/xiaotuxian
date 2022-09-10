// 扩展vue原有的功能：全局组件、自定义指令、挂载原型方法（vue3没有全局过滤器）
// 这就是插件
// vue2插件写法要素：导出一个对象，有install函数，默认传入 Vue 构造函数，Vue 基础之上扩展
// vue3插件写法要素：导入出一个对象，有install函数，默认传入 app 应用实例，app 基础之上扩展

// import XtxSkeleton from './xtx-skeleton.vue';
// import XtxCarousel from './xtx-carousel.vue';
// import XtxMore from './xtx-more.vue';
// import XtxBread from './xtx-bread.vue';
// import XtxBreadItem from './xtx-bread-item.vue';

// constext(目录路径, 是否加载子目录, 加载文件的匹配正则)
const importFn = require.context('./', false, /\.vue$/);

export default {
  install(app) {
    // 在app上进行扩展，app提供 component directive 函数
    // 若要挂载原型 通过 app.config.globalProperties 方式
    // 使用的组件一定要有name属性
    // app.component(XtxSkeleton.name, XtxSkeleton);
    // app.component(XtxCarousel.name, XtxCarousel);
    // app.component(XtxMore.name, XtxMore);
    // app.component(XtxBread.name, XtxBread);
    // app.component(XtxBreadItem.name, XtxBreadItem);

    // 根据 keys() 批量导入注册组件
    importFn.keys().forEach(path => {
      // 通过路径导入组件
      const component = importFn(path).default;
      // 注册组件
      app.component(component.name, component);
    });

    // 定义指令
    defineDirective(app);
  }
};

// 定义指令
const defineDirective = app => {
  // 图片懒加载指令 v-lazy
  // 原理：先存储图片地址，不能在src上。当图片进入可视区，将存储的图片地址设置给图片元素
  app.directive('lazy', {
    // vue2 监听使用指令的DOM是否创建好，钩子函数：inserted
    // vue3 使用指令的DOM元素是否创建好，钩子函数：mounted（vue3的指令拥有的钩子函数和组件的一样）
    mounted(el, binding) {
      // el就是使用指令的元素，binding就是使用指令时传入的值（要使用其值，要用binding.value）
      // console.log('mounted');
      // 创建一个观察对象，来观察当前使用指令的元素
      const observe = new IntersectionObserver(
        ([{ isIntersecting }]) => {
          if (isIntersecting) {
            // console.log('进入可视区', el);
            // 停止观察
            observe.unobserve(el);
            // 把指令的值设置给el的src属性，binding.value就是传入的值
            el.src = binding.value;
          }
        },
        {
          threshold: 0
        }
      );
      // 开启观察
      observe.observe(el);
    }
  });
};
