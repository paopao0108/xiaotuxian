//  提供首页相关的API
import request from '@/utils/request.js';

/**
 * @description: 获取品牌数据
 * @param {*} limit - 品牌个数
 * @return Promise
 */
export const findBrand = (limit = 6) => {
  return request('/home/brand', 'get', { limit });
};

/**
 * @description: 获取轮播图
 * @return Promise
 */
export const findBanner = () => {
  return request('/home/banner', 'get');
};

/**
 * @description: 获取首页主体-新鲜好物的数据
 * @return Promise
 */
export const findNew = (limit = 4) => {
  return request('/home/new', 'get', { limit });
};

/**
 * @description: 获取首页主体-人气推荐的数据
 * @return Promise
 */
export const findHot = () => {
  return request('/home/hot', 'get');
};
