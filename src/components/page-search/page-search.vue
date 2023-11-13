<template>
  <div>
    <!-- v-model="formDate" 相当于  :value="formDate" @input="formDate = $event.target.value"   这个@input事件是hyfrom组件发射回来的-->
    <hy-From v-bind="searchFormConfig" v-model="formDate">
      <template #footer>
        <div class="handle-btns">
          <el-button icon="el-icon-refresh" @click="handelReset"
            >重置</el-button
          >
          <el-button type="primary" icon="el-icon-search" @click="handelQuery"
            >搜索</el-button
          >
        </div>
      </template>
    </hy-From>
  </div>
</template>
<script>
import HyFrom from '@/base-ui/form'
export default {
  name: '',
  components: {
    HyFrom,
  },
  props: {
    searchFormConfig: {
      type: Object,
      reuqired: true,
    },
  },
  data() {
    return {
      // 搜索需要双向绑定的字段
      formDate: {}, // 想要封装的很灵活  这里就不能手动去写字段  应该由配置文件的 field 来决定

      // formDate: { //这里是之前写死的
      //   id: '',
      //   name: '',
      //   password: '',
      //   iphone: '',
      //   status: '', //状态
      //   createdTime: '', //创建时间
      // },
      formOriginData: {},
    }
  },
  computed: {},
  watch: {
    // 1监听传过来的配置文件  传过来之后动态决定formDate的字段
    searchFormConfig: {
      deep: true,
      immediate: true,
      handler: function () {
        this.formDateMets()
      },
    },
  },
  created() {},
  methods: {
    // 2.  formDate中的属性应该动态来决定
    formDateMets() {
      const formItems = this.searchFormConfig?.formItems ?? []
      const formOriginData = {}
      for (const item of formItems) {
        // console.log(item)
        if (item.field == 'status') {
          formOriginData[item.field] = item.value ?? '' //默认下拉框内容
        } else {
          formOriginData[item.field] = '' //取出每个搜索字段名  放到formOriginData中
        }
      }
      // console.log(formOriginData)

      this.formDate = formOriginData //动态搜索字段

      this.formOriginData = formOriginData //多保存一份数据  为了重置
    },

    // 重置按钮点击
    handelReset() {
      //不双向绑定方式  自己手动触发方法可以改 在form组件第三种方式
      this.formDate = this.formOriginData

      // 双向绑定方式  在form组件第二种方式
      // for (const key in this.formOriginData) {
      //   this.formDate[key] = this.formOriginData[key] //直接改属性值可以 可以form组件监听到
      // }

      this.$emit('resetBtnClick') //重置事件发出去  是为了请求重置之后的默认数据
    },
    // 搜索按钮的点击
    handelQuery() {
      this.$emit('queryBtnClick', this.formDate) //搜索事件发出去
    },
  },
  mounted() {},
}
</script>
<style scoped lang="less">
.handle-btns {
  text-align: right;
  padding: 0 50px 10px 0;
}
</style>
