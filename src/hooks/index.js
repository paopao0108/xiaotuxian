// 提供复用逻辑的函数（钩子）

import { useIntersectionObserver } from '@vueuse/core';
import { ref } from 'vue';

/**
 * @description: 数据懒加载函数
 * @param {Element} target - DOM对象
 * @param {Function} apiFn - API函数
 * @return {*}
 */
export const useLazyData = apiFn => {
  const target = ref(null); // 需要懒加载的DOM对象
  const result = ref([]);
  // stop 停止观察
  const { stop } = useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    // isIntersecting 是否进入可视区
    if (isIntersecting) {
      // 1.进入可视区，停止监听
      stop();
      // 2.调用API函数获取数据
      apiFn().then(data => {
        result.value = data.result;
      });
    }
  });
  // 返回懒加载得到的数据
  return { result, target };
};
