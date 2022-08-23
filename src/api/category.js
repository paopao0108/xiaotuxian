// 定义首页需要的接口函数

// 1. 导入请求函数
import request from '@/utils/request';

/**
 * 2. 获取首页头部需要的分类数据
 */
export const findAllCategory = () => {
  return request('/home/category/head', 'get');
};
