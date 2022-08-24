<template>
  <div class="home-category">
    <!-- 左侧分类 -->
    <ul class="menu">
      <li v-for="topItem in menuList" :key="topItem.id" @mouseenter="categoryId = topItem.id">
        <RouterLink :to="`/category/${topItem.id}`">{{ topItem.name }}</RouterLink>
        <template v-if="topItem.children">
          <RouterLink :to="`/category/sub/${subItem.id}`" v-for="subItem in topItem.children" :key="subItem.id">
            {{ subItem.name }}
          </RouterLink>
        </template>
      </li>
    </ul>
    <!-- 右侧弹层 -->
    <div class="layer">
      <h4>
        分类推荐
        <small>根据您的购买或浏览记录推荐</small>
      </h4>
      <ul v-if="currentCategory && currentCategory.goods.length">
        <li v-for="goods in currentCategory.goods" :key="goods.id">
          <RouterLink to="/">
            <img :src="goods.picture" alt="" />
            <div class="info">
              <p class="name ellipsis-2">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}}</p>
              <p class="price">
                <i>¥</i>
                {{ goods.price }}
              </p>
            </div>
          </RouterLink>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue';
import { useStore } from 'vuex';
export default {
  name: 'HomeCategory',
  setup() {
    const brand = reactive({
      id: 'brand',
      name: '品牌',
      children: [{ id: 'brand-chilren', name: '品牌推荐' }]
    });

    const store = useStore();
    const menuList = computed(() => {
      const list = store.state.category.list.map(item => {
        return {
          id: item.id,
          name: item.name,
          // 防止初始化没有children的时候调用slice函数报错
          children: item.children && item.children.slice(0, 2),
          goods: item.goods
        };
      });
      list.push(brand);
      return list;
    });
    console.log('menuList', menuList);

    // 获取当前分类id
    const categoryId = ref(null);
    const currentCategory = computed(() => {
      return menuList.value.find(item => item.id === categoryId.value);
    });

    return { menuList, categoryId, currentCategory };
  }
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
      &:hover {
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