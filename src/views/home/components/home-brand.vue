<template>
  <HomePanel title="热门品牌" sub-title="国际经典 品质保证">
    <template #right>
      <a @click="toggle(-1)" :class="{ disabled: index === 0 }" href="javascript:;" class="iconfont icon-angle-left prev"></a>
      <a @click="toggle(1)" :class="{ disabled: index === 1 }" href="javascript:;" class="iconfont icon-angle-right next"></a>
    </template>
    <div class="box" ref="target">
      <Transition name="fade">
        <!-- 淡出动画 -->
        <ul v-if="brands.length" class="list" :style="{ transform: `translateX(${-index * 1240}px)` }">
          <li v-for="item in brands" :key="item.id">
            <RouterLink to="/">
              <img :src="item.picture" alt="" />
            </RouterLink>
          </li>
        </ul>
        <div v-else class="skeleton">
          <XtxSkeleton class="item" v-for="i in 5" :key="i" animated bg="#e4e4e4" width="240px" height="305px" />
        </div>
      </Transition>
    </div>
  </HomePanel>
</template>

<script>
import HomePanel from './home-panel';
import { useLazyData } from '../../../hooks';
import { findBrand } from '../../../api/home';
import { ref } from 'vue';
import XtxSkeleton from '@/components/library/xtx-skeleton.vue';
export default {
  name: 'HomeBrand',
  components: { HomePanel, XtxSkeleton },
  setup() {
    // 注意：useLazyData()需要传入的是一个函数findBrand，但此处需要向findBrand传入参数，传入参数后findBrand(5)返回的是一个Promise对象，因此有如下写法：改写成箭头函数 () => findBrand(5) 就可以传入useLazyData
    const { result, target } = useLazyData(() => findBrand(10));
    const index = ref(0); // 用于记录上下页的索引

    const toggle = step => {
      const newIndex = index.value + step;
      // if (newIndex < 0) index.value = 0;
      // else if (newIndex > 1) index.value = 1;
      // else index.value = newIndex;
      if (newIndex < 0 || newIndex > 1) return;
      index.value = newIndex;
    };

    // console.log('品牌数据result', result);
    return { brands: result, target, index, toggle };
  }
};
</script>

<style scoped lang="less">
// 骨架样式
.skeleton {
  width: 100%;
  display: flex;
  .item {
    margin-right: 10px;
    &:nth-child(5n) {
      margin-right: 0;
    }
  }
}
.home-panel {
  background: #f5f5f5;
}
.iconfont {
  width: 20px;
  height: 20px;
  background: #ccc;
  color: #fff;
  display: inline-block;
  text-align: center;
  margin-left: 5px;
  background: @xtxColor;
  &::before {
    font-size: 12px;
    position: relative;
    top: -2px;
  }
  &.disabled {
    background: #ccc;
    cursor: not-allowed;
  }
}
.box {
  display: flex;
  width: 100%;
  height: 345px;
  overflow: hidden;
  padding-bottom: 40px;
  .list {
    width: 200%;
    display: flex;
    transition: all 1s; // 过渡动画时间持续1s
    li {
      margin-right: 10px;
      width: 240px;
      &:nth-child(5n) {
        margin-right: 0;
      }
      img {
        width: 240px;
        height: 305px;
      }
    }
  }
}
</style>
