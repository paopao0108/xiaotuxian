<template>
  <div class="home-panel">
    <div class="container">
      <!-- 1.头部 -->
      <div class="head">
        <!-- 1.1头部标题和副标题 -->
        <h3>
          {{ title }}
          <small>{{ subTitle }}</small>
        </h3>
        <!-- 1.2头部右侧内容 -->
        <slot name="right" />
      </div>
      <!-- 2.主体 -->
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomePanel',
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    }
  }
};
</script>

<style scoped lang="less">
.home-panel {
  background-color: #fff;
  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;
    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;
      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
