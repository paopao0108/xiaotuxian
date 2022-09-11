<template>
  <!-- 筛选区 -->
  <div class="sub-filter" v-if="filterData && !filterLoading">
    <div class="item">
      <div class="head">品牌</div>
      <div class="body">
        <a :class="{ active: item.id === filterData.brands.selectedBrand }" @click="filterData.brands.selectedBrand = item.id" href="javascript:;" v-for="item in filterData.brands" :key="item.id">{{ item.name }}</a>
      </div>
    </div>

    <div class="item" v-for="item in filterData.saleProperties" :key="item.id">
      <div class="head ellipsis">{{ item.name }}</div>
      <div class="body">
        <a :class="{ active: prop.id === item.selectedAttr }" @click="item.selectedAttr = prop.id" href="javascript:;" v-for="prop in item.properties" :key="prop.id">{{ prop.name }}</a>
      </div>
    </div>
  </div>
  <div v-else class="sub-filter">
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="800px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
    <XtxSkeleton class="item" width="600px" height="40px" />
  </div>
</template>
<script>
import { ref, watch } from 'vue';
import { findSubCategoryFilter } from '@/api/category';
import { useRoute } from 'vue-router';

export default {
  name: 'SubFilter',
  setup() {
    const route = useRoute();
    const filterData = ref([]);
    const filterLoading = ref(false);
    watch(
      () => route.params.id,
      newVal => {
        if (newVal && route.path === `/category/sub/${newVal}`) {
          // 加载中为true
          filterLoading.value = true;
          findSubCategoryFilter(route.params.id).then(data => {
            // 每一组的筛选条件缺失 “全部” 选项，因此需要加上 “全部”
            // 每一组数据上加上一个选中的ID（用于鼠标点击选中）
            // 品牌
            data.result.brands.selectedBrand = null; // 给品牌加上selectedAttr用于存选中ID
            data.result.brands.unshift({ id: null, name: '全部' });
            // 属性
            data.result.saleProperties.forEach(item => {
              item.selectedAttr = null; // 给每个筛选属性加上selectedAttr用于存选中ID
              item.properties.unshift({ id: null, name: '全部' });
            });
            filterData.value = data.result;
            console.log(data.result);
            // 加载后为 false
            filterLoading.value = false;
          });
        }
      },
      { immediate: true }
    );

    return { filterData, filterLoading };
  }
};
</script>
<style scoped lang="less">
// 筛选区
.sub-filter {
  background: #fff;
  padding: 25px;
  .item {
    display: flex;
    line-height: 40px;
    .head {
      width: 80px;
      color: #999;
    }
    .body {
      flex: 1;
      a {
        margin-right: 36px;
        transition: all 0.3s;
        display: inline-block;
        &.active,
        &:hover {
          color: @xtxColor;
        }
      }
    }
  }
}
.xtx-skeleton {
  padding: 10px 0;
}
</style>
