// 定义首页需要的接口函数

// 1. 导入请求函数
import request from '@/utils/request';

/**
 * @description: 获取首页头部需要的分类数据
 * @return {*}
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get');
};

/**
 * @description: 获取顶级类目信息（children属性就是各个子分类）
 * @param {String} id - 顶级类目ID
 * @return {*}
 */
export const findTopCategory = id => {
  return request('/category', 'get', { id });
};

/**
 * @description: 获取二级类目的筛选条件
 * @param {String} id - 二级类目ID
 * @return {*}
 */
export const findSubCategoryFilter = id => {
  return request('/category/sub/filter', 'get', { id });
};
