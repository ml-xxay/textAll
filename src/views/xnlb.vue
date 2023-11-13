<template>
  <div
    class="container"
    :style="{ height: containerHeight }"
    @scroll="handleScroll"
    ref="container"
  >
    <!-- 数据列表 -->
    <div  class="list"  :style="{ top: listTop }" >
      <!-- 列表项 -->
      <div
        v-for="item in showData"
        :key="item.id"
        :style="{ height: size + 'px' }"
      >
        {{ item.content }}
      </div>
      <!-- 用于撑开高度的元素 -->
      <div class="bar" :style="{ height: barHeight }" />
    </div>
  </div>
</template>
<script>
export default {
  name: 'VircualList',
  props: {
    // 要渲染的数据
    items: {
      type: Array,
      required: true,
    },
    // 每条数据渲染的节点的高度
    size: {
      type: Number,
      required: true,
    },
    // 每次渲染的 DOM 节点个数
    shownumber: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      start: 0, // 要展示的数据的起始下标
      end: this.shownumber, // 要展示的数据的结束下标
    }
  },
  computed: {
    // 最终筛选出的要展示的数据
    showData() {
      return this.items.slice(this.start, this.end)
    },
    // 容器的高度
    containerHeight() {
      return this.size * this.shownumber + 'px'
    },
    // 撑开容器内容高度的元素的高度
    barHeight() {
      return this.size * this.items.length + 'px'
    },
    // 列表向上滚动时要动态改变 top 值
    listTop() {
      return this.start * this.size + 'px'
    },
  },
  methods: {
    // 容器的滚动事件
    handleScroll() {
      // 获取容器顶部滚动的尺寸
      const scrollTop = this.$refs.container.scrollTop

      // 计算卷去的数据条数，用计算的结果作为获取数据的起始和结束下标
      // 起始的下标就是卷去的数据条数，向下取整
      this.start = Math.floor(scrollTop / this.size)
      // 结束的下标就是起始的下标加上要展示的数据条数
      this.end = this.start + this.shownumber
    },
  },
}
</script>
<style scoped>
.container {
  position: relative;
  overflow-y: scroll;
  background-color: rgb(150, 195, 238);
  font-size: 20px;
  font-weight: bold;
  line-height: 60px;
  text-align: center;
}

.list {
  position: absolute;
  top: 0;
  width: 100%;
}
</style>
