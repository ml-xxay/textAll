<template>
  <div>
    <!-- 在这里使用需牛列表组件 -->
    <xnlb :items="items" :size="100" :shownumber="10"></xnlb>
  </div>
</template>
<script>
import xnlb from './xnlb.vue'
export default {
  name: '',
  components: {
    xnlb,
  },
  props: {},
  data() {
    return {
      listData: [
        {
          id: 1,
          value: 1,
        },
        {
          id: 2,
          value: 2,
        },
        {
          id: 3,
          value: 3,
        },
        {
          id: 4,
          value: 4,
        },
        {
          id: 5,
          value: 5,
        },
        {
          id: 6,
          value: 6,
        },
        {
          id: 7,
          value: 7,
        },
        {
          id: 8,
          value: 8,
        },
        {
          id: 9,
          value: 9,
        },
        {
          id: 10,
          value: 10,
        },
        {
          id: 11,
          value: 11,
        },
        {
          id: 12,
          value: 12,
        },
        {
          id: 13,
          value: 13,
        },
        {
          id: 14,
          value: 14,
        },
        {
          id: 15,
          value: 15,
        },
        {
          id: 16,
          value: 16,
        },
        {
          id: 17,
          value: 17,
        },
        {
          id: 18,
          value: 18,
        },
        {
          id: 19,
          value: 19,
        },
        {
          id: 20,
          value: 20,
        },
        {
          id: 21,
          value: 21,
        },
        {
          id: 22,
          value: 22,
        },
        {
          id: 23,
          value: 23,
        },
        {
          id: 24,
          value: 24,
        },
        {
          id: 25,
          value: 25,
        },
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
        {id: 26, value: 26,},
      ],
    }
  },
   computed: {
    // 要进行渲染的数据列表
    items () {
      // 自己模拟一万条数据，将其内容进行填充
      return Array(10000).fill('').map((item, index) => ({
        id: index,
        content: '列表项内容' + index
      }))
    }
  },
  watch: {},
  created() {},
  methods: {},
  mounted() {},
}
</script>
<style scoped lang="less"></style>
