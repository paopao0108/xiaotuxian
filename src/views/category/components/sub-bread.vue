<template>
  <!-- 二级类目面包屑组件 -->
  <XtxBread>
    <XtxBreadItem to="/">首页</XtxBreadItem>
    <XtxBreadItem v-if="category.top" :to="`/category/${category.top.id}`">{{ category.top.name }}</XtxBreadItem>
    <Transition name="fade-right">
      <XtxBreadItem v-if="category.sub" :key="category.sub.id">{{ category.sub.name }}</XtxBreadItem>
    </Transition>
  </XtxBread>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
export default {
  name: 'subBread',
  setup() {
    const store = useStore();
    const route = useRoute();
    const category = computed(() => {
      // 通过计算属性从vuex中获取 顶级 和 二级类目信息
      // 需要得到的数据对象：{top: {id, name}, sub:{id, name}}
      const cate = {};
      // 获取数据
      store.state.category.list.forEach(top => {
        if (top.children) {
          const sub = top.children.find(item => item.id === route.params.id);
          if (sub) {
            cate.top = { id: top.id, name: top.name };
            cate.sub = { id: sub.id, name: sub.name };
          }
        }
      });
      return cate;
    });
    console.log(category.value);
    return { category };
  }
};
</script>

<style></style>
