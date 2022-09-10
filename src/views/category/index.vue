<template>
  <div class="top-category">
    <div class="container">
      <!-- 面包屑 -->
      <!-- 传入的to可以是对象 :to="{ path: '/' }" 也可以是字符串to="/category/1005001" -->
      <!-- 如何去除最后一个类目的箭头：法1-通过样式控制； 法2-通过render创建箭头 -->
      <XtxBread>
        <XtxBreadItem to="/">首页</XtxBreadItem>
        <XtxBreadItem>{{ topCategory.name }}</XtxBreadItem>
      </XtxBread>
      <!-- 轮播图 -->
      <XtxCarousel :sliders="sliders" style="height: 500px" />
      <!-- 所有二级分类 -->
      <div class="sub-list" v-if="topCategory && topCategory.children">
        <!-- 使用 topCategory.children 时 一定要先判断 topCategory 本身以及其children是否存在-->
        <h3>全部分类</h3>
        <ul>
          <li v-for="sub in topCategory.children" :key="sub.id">
            <RouterLink :to="`/category/sub/${sub.id}`">
              <img :src="sub.picture" />
              <p>{{ sub.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <!-- 不同分类商品 -->
      <!-- <div class="ref-goods">
        <div class="head">
          <h3>- 海鲜 -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore />
        </div>
        <div class="body">
          <GoodsItem v-for="i in 5" :key="i" />
        </div>
      </div> -->
      <div class="ref-goods" v-for="sub in subList" :key="sub.id">
        <div class="head">
          <h3>- {{ sub.name }} -</h3>
          <p class="tag">温暖柔软，品质之选</p>
          <XtxMore :path="`/category/sub/${id}`" />
        </div>
        <div class="body">
          <GoodsItem v-for="goods in sub.goods" :key="goods.id" :goods="goods" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ref, computed, watch } from 'vue';
import { findBanner } from '@/api/home';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import GoodsItem from './components/goods-item.vue';
import { findTopCategory } from '@/api/category';
export default {
  name: 'TopCategory',
  components: {
    GoodsItem
  },
  setup() {
    // 轮播图
    const sliders = ref([]);
    findBanner().then(data => {
      sliders.value = data.result;
    });
    // 面包屑+所有子级分类（从vuex中获取）
    const store = useStore();
    const route = useRoute();
    // 当前的顶级分类: 根据路由上面的id去vuex中category模块的list中查找
    const topCategory = computed(() => {
      let cate = {};
      const item = store.state.category.list.find(item => item.id === route.params.id);
      // 由于模板中常用v-if来判断是否有数据，若获取数据时直接判断，在模板中就不用频繁使用v-if了
      if (item) cate = item;
      return cate;
    });

    // 获取各个子类目下的推荐商品
    const subList = ref([]);
    const getSubList = () => {
      findTopCategory(route.params.id).then(data => {
        subList.value = data.result.children;
      });
    };
    // 需要监听地址栏上的id变化，初始化数据，否则当切换不同顶级分类时，页面数据不会改变
    watch(
      () => route.params.id,
      newVal => {
        // 若监听的路由动态参数id有值时，调用获取数据的函数
        newVal && getSubList();
      },
      // 让watch在首次初始化的时候触发一次
      { immediate: true }
    );
    return { sliders, topCategory, subList };
  }
};
</script>
<style scoped lang="less">
.top-category {
  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;
    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }
      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }
    .body {
      display: flex;
      justify-content: flex-start;
      flex-wrap: wrap;
      padding: 0 65px 30px;
    }
  }
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }
  .sub-list {
    margin-top: 20px;
    background-color: #fff;
    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;
      li {
        width: 168px;
        height: 160px;
        a {
          text-align: center;
          display: block;
          font-size: 16px;
          img {
            width: 100px;
            height: 100px;
          }
          p {
            line-height: 40px;
          }
          &:hover {
            color: @xtxColor;
          }
        }
      }
    }
  }
}
</style>
