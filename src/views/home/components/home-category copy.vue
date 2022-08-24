<template>
  <div class="home-category" @mouseleave="categoryId = null">
    <!-- 左侧分类 -->
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id" @mouseenter="categoryId = item.id" :class="{ active: (categoryId = item.id) }">
        <RouterLink :to="`/category/${item.id}`">{{ item.name }}</RouterLink>
        <template v-if="item.children">
          <!-- 当 顶级分类来下有children时 -->
          <RouterLink :to="`/category/sub/${sub.id}`" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
        </template>
      </li>
    </ul>
    <!-- 弹层 -->
    <div class="layer">
      <h4>
        {{ currentCategory && currentCategory.id === 'brand' ? '品牌' : '分类' }}推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <!-- 商品 -->
      <ul v-if="currentCategory && currentCategory.goods">
        <!-- 当存在当前分类，且分类下有商品 -->
        <li v-for="item in currentCategory.goods" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ item.name }}</p>
              <p class="desc ellipsis">{{ item.desc }}</p>
              <p class="price">
                <i>¥</i>
                {{ item.price }}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
      <!-- 品牌 -->
      <!-- <ul v-if="currentCategory && currentCategory.brands">
        <li class="brand" v-for="brand in currentCategory" :key="brand.id">
          <RouterLink to="/">
            <img :src="brand.picture" alt="" />
            <div class="info">
              <p class="place">
                <i class="iconfont icon-dingwei"></i>
                {{ brand.place }}
              </p>
              <p class="name ellipsis">{{ brand.name }}</p>
              <p class="desc ellipsis-2">{{ brand.desc }}</p>
            </div>
          </RouterLink>
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed, reactive, ref } from 'vue';
import { findBrand } from '@/api/home.js';
export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore();
    // 要用到的数据是：9个分类+一个品牌类
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-children', name: '品牌推荐' }],
      brands: []
    });
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          goods: item.goods,
          name: item.name,
          // 当顶级分类里面有子级，且取子级里面的两个子级
          children: item.children && item.children.slice(0, 2)
        };
      });
      list.push(brand); // 将 品牌 单独追加到list当中
      return list;
    });
    console.log('menulist', menuList.value);
    // 获取弹层数据
    const categoryId = ref(null); // 用于记录当前鼠标所在分类位置的id
    const currentCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value);
    });
    console.log(categoryId.value);
    // 获取品牌列表
    findBrand().then(data => {
      brand.brands = data.result;
    });

    return { menuList, categoryId, currentCategory };
  }

  // 获取9个分类数据 和 每个分类下的两个子分类数据
};
</script>

<style scoped lang="less">
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;
  .menu {
    li {
      padding-left: 40px;
      height: 50px;
      line-height: 50px;
      // 添加一个类active，鼠标经过 或者 active类存在时，有背景颜色
      &:hover,
      &:active {
        background: @xtxColor;
      }
      a {
        margin-right: 4px;
        color: #fff;
        &:first-child {
          font-size: 16px;
        }
      }
    }
  }
  // 弹出层样式
  .layer {
    width: 990px;
    height: 500px;
    background: rgba(255, 255, 255, 0.8);
    position: absolute;
    left: 250px;
    top: 0;
    display: none;
    padding: 0 15px;
    h4 {
      font-size: 20px;
      font-weight: normal;
      line-height: 80px;
      small {
        font-size: 16px;
        color: #666;
      }
    }
    ul {
      display: flex;
      flex-wrap: wrap;
      li {
        width: 310px;
        height: 120px;
        margin-right: 15px;
        margin-bottom: 15px;
        border: 1px solid #eee;
        border-radius: 4px;
        background: #fff;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .brand {
          height: 180px;
          a {
            align-items: flex-start;
            img {
              width: 120px;
              height: 160px;
            }
            .info {
              p {
                margin-top: 8px;
              }
              .place {
                color: #999;
              }
            }
          }
        }
        a {
          display: flex;
          width: 100%;
          height: 100%;
          align-items: center;
          padding: 10px;
          &:hover {
            background: #e3f9f4;
          }
          img {
            width: 95px;
            height: 95px;
          }
          .info {
            padding-left: 10px;
            line-height: 24px;
            width: 190px;
            .name {
              font-size: 16px;
              color: #666;
            }
            .desc {
              color: #999;
            }
            .price {
              font-size: 22px;
              color: @priceColor;
              i {
                font-size: 16px;
              }
            }
          }
        }
      }
    }
  }
  &:hover {
    .layer {
      display: block;
    }
  }
}
</style>
