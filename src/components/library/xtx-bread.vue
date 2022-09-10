<script>
import { h } from 'vue';
export default {
  name: 'XtxBread',
  render() {
    // 用法
    // 1. 去除template中的相应标签，单文件组件
    // 2. 返回值就是组件内容
    // 3. vue2.0 的 h函数传参进来的， vue3.0 的h函数导入进来的
    // 4. h的第一个参数-标签名，第二个参数-标签属性对象，第三个参数-子节点
    // 需求：
    // 1. 创建xtx-bread父容器
    // 2. 获取默认插槽内容
    // 3. 去除xx-bread-item 组件的i标签，应该由render来组件
    // 4. 遍历插槽中的item，得到一个动态创建的节点，最后一个item不加i标签
    // 5. 把动态创建的节点渲染在xtx-bread 标签中
    const items = this.$slots.default(); // 获取默认插槽内容
    const dynamicItems = []; // 创建数组用于存放动态子节点
    items.forEach((item, index) => {
      // console.log(item);
      dynamicItems.push(item); // 遍历插槽内容，追加到数组中
      if (index < items.length - 1) {
        // 当最后一个元素时，追加一个 i 标签
        dynamicItems.push(h('i', { class: 'iconfont icon-angle-right' }));
      }
    });

    // 最后将创建好的 动态子节点 放入 类名为xtx-bread 的 div标签
    return h('div', { class: 'xtx-bread' }, dynamicItems);
  }
};
</script>

<style lang="less">
// 去除了scoped属性，由此此处的样式可以作用到XtxBreadItem组件
.xtx-bread {
  display: flex;
  padding: 25px 10px;
  &-item {
    a {
      color: #666;
      transition: all 0.4s;
      &:hover {
        color: @xtxColor;
      }
    }
    // 需求：要清除最后一个类目的箭头-修改样式这种方法不是很合理
    // 1、先找到需要清除箭头的父元素xtx-bread-item
    // div li:last-of-type 子元素中所有类型为li的元素，选中最后一个
    // &:last-of-type {
    //   i {
    //     font-size: 12px;
    //     margin-left: 5px;
    //     margin-right: 5px;
    //     line-height: 22px;
    //     // 2、再找到里面的最后一个为i的标签，清除最后一个箭头
    //     // div li:last-child 所有子元素中的最后一个是li就选中，否则不选中
    //     &:last-child {
    //       display: none;
    //     }
    //   }
    // }
  }
  i {
    font-size: 12px;
    margin-left: 5px;
    margin-right: 5px;
    line-height: 22px;
  }
}
</style>
