<template>
  <!-- 将面包屑的一个类目名称和一个箭头单独封装 -->
  <div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
    <span v-else><slot /></span>
    <!-- 箭头不在这里创建，通过render来创建 -->
    <!-- <i class="iconfont icon-angle-right"></i> -->
  </div>
</template>
<script>
export default {
  name: 'XtxBreadItem',
  props: {
    to: {
      type: [String, Object],
      default: ''
    }
  }
};
</script>
