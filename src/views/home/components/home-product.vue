<template>
  <div class="home-product">
    <HomePanel :title="topCate.name" v-for="topCate in category" :key="topCate.id">
      <!-- 1.头部 -->
      <template v-slot:right>
        <div class="sub">
          <RouterLink to="/" v-for="subCate in topCate.children.slice(0, 4)" :key="subCate.id">{{ subCate.name }}</RouterLink>
        </div>
        <XtxMore />
      </template>
      <!-- 2.内容 -->
      <div class="box">
        <!-- 2.1左侧广告 -->
        <RouterLink class="cover" to="/">
          <!-- <img :src="topCate.picture" alt="" /> -->
          <!-- 使用懒加载指令，那么图片地址就不能直接绑定src了，而是要传给指令 -->
          <img v-lazy="topCate.picture" alt="" />
          <strong class="label">
            <span>{{ topCate.name }}馆</span>
            <span>{{ topCate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <!-- 2.2右侧商品 -->
        <ul class="goods-list">
          <li v-for="good in topCate.goods" :key="good.id">
            <HomeGoods :goods="good" />
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel';
import HomeGoods from './home-goods';
import { findProduct } from '@/api/home.js';
import { ref } from 'vue';
// import { useLazyData } from '../../../hooks';
export default {
  name: 'HomeProduct',
  components: { HomePanel, HomeGoods },
  setup() {
    const category = ref([]);
    findProduct().then(data => {
      // 获取的数据里面goods为空
      category.value = data.result;
    });

    // const { result, target } = useLazyData(findProduct);
    // console.log('商品分类result', result);
    // console.log('商品分类target', target);
    return { category };
  }
};
</script>

<style scoped lang="less">
.home-product {
  background: #fff;
  height: 2900px;
  .sub {
    margin-bottom: 2px;
    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;
      &:hover {
        background: @xtxColor;
        color: #fff;
      }
      &:last-child {
        margin-right: 80px;
      }
    }
  }
  .box {
    display: flex;
    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);
        span {
          text-align: center;
          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }
          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }
    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;
      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;
        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }
        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }
  }
}
</style>
