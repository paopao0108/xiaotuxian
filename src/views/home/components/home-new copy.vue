<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质推荐">
      <!-- 头部 -->
      <template #right>
        <XtxMore path="/" />
      </template>
      <!-- 内容 -->
      <ul class="goods-list">
        <li v-for="item in list" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>

<script>
import HomePanel from './home-panel.vue';
import { findNew } from '@/api/home.js';
import { ref } from 'vue';
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup() {
    const list = ref([]);
    findNew().then(data => {
      list.value = data.result;
    });
    console.log('list', list);
    return { list };
  }
};
</script>

<style scoped lang="less">
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;
  li {
    width: 306px;
    height: 406px;
    background: #f0f9f4;
    .hoverShadow();
    img {
      width: 306px;
      height: 306px;
    }
    p {
      font-size: 22px;
      padding: 12px 30px 0 30px;
      text-align: center;
    }
    .price {
      color: @priceColor;
    }
  }
}
</style>
