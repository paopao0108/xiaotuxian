<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in menuList" :key="item.id">
        <RouterLink to="/">{{ item.name }}</RouterLink>
        <RouterLink to="/" v-for="sub in item.children" :key="sub.id">{{ sub.name }}</RouterLink>
        <!-- <RouterLink to="/">清洁</RouterLink> -->
      </li>
    </ul>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
// import { useStore } from 'vuex';
// import { computed } from 'vue';
export default {
  name: 'HomeCategory',
  setup() {
    const store = useStore();
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
      return list;
    });
    return { menuList };
  }

  // 要用到的数据是：9个分类+一个品牌类
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
}
</style>
