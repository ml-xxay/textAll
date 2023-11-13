<template>
  <div>
    <hy-table
      :listDate="listDate"
      :total="total"
      v-bind="contentTableConfig"
      v-model="pageInfo"
      @handleSelectionChange="handleSelectionChange"
    >
      <!-- 1.header中的插槽 -->
      <template #headerRight>
        <!-- <el-button type="parimary" size="medium">新建用户</el-button> -->
        <!-- <el-button type="parimary" size="medium">多选删除</el-button> -->
        <!-- 用插槽父亲就可以自定义了 -->
        <slot name="shanchu"></slot>
      </template>

      <template #twoRowLeft>
        <slot name="rowTwo"></slot>
      </template>
      <!-- 2. 列的插槽 -->
      <!--通过具名插槽status 对状态插入 -->
      <template #status="scope">
        <!-- <pre>{{ scope.row }}</pre> -->
        <el-button size="mini" :type="scope.row.status ? 'success' : 'danger'">
          {{ scope.row.status ? '启用' : '禁用' }}
        </el-button>
      </template>
      <!--通过具名插槽 handler 对操作插入 -->
      <!-- <template #handler="scope"> -->
      <!-- <slot name="caozuo"></slot> -->
      <!-- <el-button -->
      <!-- icon="el-icon-edit"
          size="mini"
          type="text"
          @click="handleEditClick(scope.row)"
        > -->
      <!-- 编辑 -->
      <!-- </el-button> -->

      <!-- <el-button
          icon="el-icon-delete"
          size="mini"
          type="text"
          @click="handleDeleteClick(scope.row)"
          >删除</el-button
        > -->
      <!-- </template> -->

      <!-- 在page-content中动态插入剩余的插槽 -->
      <template v-for="item in otherPropSlots" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName" :row="scope.row"></slot>
        </template>
      </template>
    </hy-table>
  </div>
</template>
<script>
import HyTable from '../../base-ui/table'
export default {
  name: '',
  components: {
    HyTable,
  },
  props: {
    //网络请求的数据
    listDate: {
      type: Array,
      required: true,
    },
    // 总条数
    total: {
      type: Number,
      default: 0,
    },
    //配置项
    contentTableConfig: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      pageInfo: {
        currentPage: 1,
        pageSize: 10,
      },
      otherPropSlots: [], //剩余插槽项
    }
  },
  computed: {},
  watch: {
    pageInfo: {
      //监听分页改变  发送请求
      deep: true,
      // immediate: true, 不需要页面一家在就监听  注释掉
      handler: function (newValue, oldV) {
        // 发送请求  也可以传递给父组件  让父组件发送请求  这里我是在父组件发送的请求
        this.$emit('getPageListDate', newValue)
      },
    },

    //获取其他的动态插槽名称
    contentTableConfig: {
      deep: true,
      immediate: true,
      handler: function () {
        this.dongtaiSlot()
      },
    },
  },
  created() {},
  methods: {
    // 编辑
    // handleEditClick(row) {
    //   alert('点击了编辑')
    //   this.$emit('EditClick', row)
    // },
    // 删除
    // handleDeleteClick(row) {
    //   // console.log(row)
    //   alert('点击了删除')
    //   this.$emit('deleatl', row)
    // },
    // 多选按钮删除
    handleSelectionChange(val) {
      // console.log(val)
      this.$emit('handleSelectionChange',val)
    },
    // 动态插槽  插剩余的
    dongtaiSlot() {
      this.otherPropSlots = this.contentTableConfig?.propList.filter((item) => {
        if (item.slotName == 'status') return false
        if (item.slotName == 'createAt') return false
        if (item.slotName == 'updateAt') return false
        if (item.slotName == 'handler') return true
        return true
      })
      // console.log(this.otherPropSlots)
    },
  },
  mounted() {},
}
</script>
<style scoped lang="less"></style>
