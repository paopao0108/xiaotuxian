<template>
  <div class="xtx-carousel" @mouseenter="stop()" @mouseleave="start()">
    <ul class="carousel-body">
      <li class="carousel-item" v-for="(slider, i) in sliders" :key="slider.id" :class="{ fade: i === index }">
        <RouterLink to="/">
          <img :src="slider.imgUrl" alt="" />
        </RouterLink>
      </li>
    </ul>
    <!-- 上一张 -->
    <a href="javascript:;" class="carousel-btn prev"><i class="iconfont icon-angle-left"></i></a>
    <!-- 下一张 -->
    <a href="javascript:;" class="carousel-btn next"><i class="iconfont icon-angle-right"></i></a>
    <div class="carousel-indicator">
      <!-- 添加active类，激活点 -->
      <span v-for="(item, i) in sliders" :key="item.id" :class="{ active: i === index }"></span>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
export default {
  name: 'XtxCarousel',
  props: {
    sliders: {
      type: Array,
      default: () => []
    },
    autoPlay: {
      type: Boolean,
      default: false
    },
    // 间隔时长
    duration: {
      type: Number,
      default: 3000
    }
  },
  setup(props) {
    const index = ref(0); // index用于存放当前轮播图图片的索引

    // 1.自动轮播
    let timer = null;
    const autoPlayFn = () => {
      clearInterval(timer); // 创建定时器之前要先清除定时器
      timer = setInterval(() => {
        index.value++;
        if (index.value >= props.sliders.length) {
          index.value = 0;
        }
      }, props.duration);
    };

    // 什么时候调用autoPlayFn：若sliders数据有变化且autoplay为true
    // 使用watch监听sliders
    watch(
      () => props.sliders,
      newVal => {
        if (newVal.length && props.autoPlay) {
          autoPlayFn();
        }
      },
      // 第三个参数immediate：true的作用是：立即执行watch，由于watch默认是数据变化才会监听
      // 若没有immediate为true，那么当sliders数据没有变化，就无法执行watch监听
      { immediate: true }
    );

    // 2.鼠标进入，轮播图停止，鼠标离开，轮播图播放
    const stop = () => {
      if (timer) clearInterval(timer);
    };
    const start = () => {
      if (props.sliders.length && props.autoPlay) {
        autoPlayFn();
      }
    };
    return { index, stop, start };
  }
};
</script>
<style scoped lang="less">
.xtx-carousel {
  width: 100%;
  height: 100%;
  min-width: 300px;
  min-height: 150px;
  position: relative;
  .carousel {
    &-body {
      width: 100%;
      height: 100%;
    }
    &-item {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0;
      transition: opacity 0.5s linear;
      &.fade {
        opacity: 1;
        z-index: 1;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    &-indicator {
      position: absolute;
      left: 0;
      bottom: 20px;
      z-index: 2;
      width: 100%;
      text-align: center;
      span {
        display: inline-block;
        width: 12px;
        height: 12px;
        background: rgba(0, 0, 0, 0.2);
        border-radius: 50%;
        cursor: pointer;
        ~ span {
          margin-left: 12px;
        }
        &.active {
          background: #fff;
        }
      }
    }
    &-btn {
      width: 44px;
      height: 44px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      border-radius: 50%;
      position: absolute;
      top: 228px;
      z-index: 2;
      text-align: center;
      line-height: 44px;
      opacity: 0;
      transition: all 0.5s;
      &.prev {
        left: 20px;
      }
      &.next {
        right: 20px;
      }
    }
  }
  &:hover {
    .carousel-btn {
      opacity: 1;
    }
  }
}
</style>
