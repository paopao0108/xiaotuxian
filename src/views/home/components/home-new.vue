<template>
  <div class="home-new">
    <HomePanel title="新鲜好物" sub-title="新鲜出炉 品质靠谱">
      <template #right><XtxMore path="/" /></template>
      <!-- 面板内容 -->
      <ul class="goods-list">
        <!-- <li v-for="item in goods" :key="item.id">
          <RouterLink :to="`/product/${item.id}`">
            <img :src="item.picture" alt="" />
            <p class="name ellipsis">{{ item.name }}</p>
            <p class="price">&yen;{{ item.price }}</p>
          </RouterLink>
        </li> -->
        <li v-for="item in 4" :key="item">
          <RouterLink to="/">
            <img src="https://yanxuan-item.nosdn.127.net/65aaa061f6ef6834c93018d2aeb79693.jpg" alt="" />
            <p class="name ellipsis">KENROLL吾皇潮趣男女室外拖鞋</p>
            <p class="price">&yen;139</p>
          </RouterLink>
        </li>
      </ul>
    </HomePanel>
  </div>
</template>
<script>
import { ref } from 'vue';
import HomePanel from './home-panel';
import { findNew } from '@/api/home';
export default {
  name: 'HomeNew',
  components: { HomePanel },
  setup() {
    const goods = ref([]);
    findNew().then(data => {
      goods.value = data.result;
    });
    // console.log('新鲜好物goods', goods);
    return { goods };
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
