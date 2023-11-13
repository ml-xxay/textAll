<template>
  <div>
    <div class="header">
      <slot name="header">
    
        <div class="title" v-if="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerRight">
            <!-- <el-button type="parimary" size="medium">新建用户</el-button> -->
          </slot>
        </div>
      </slot>
    </div>
    <div>
     <slot name="twoRowLeft"></slot>
    </div>
    <el-card>
      <el-table
        :header-cell-style="{ background: '#f4f6f8' }"
        :data="listDate"
        stripe
        :max-height="maxheight"
        style="width: 100%"
        
        v-bind="childrenProps"
        @selection-change="handleSelectionChange"
      >
        <!-- 多选项  有的项目不要这个字段  可以传控制变量控制显示与隐藏 -->
        <el-table-column
          v-if="showSelectColumn"
          type="selection"
          align="center"
          width="60"
        >
        </el-table-column>
        <!-- 序号项  有的项目不要这个字段  可以传控制变量控制显示与隐藏 -->
        <el-table-column
          v-if="showIndexColumn"
          type="index"
          label="序号"
          align="center"
          width="80"
        >
        </el-table-column>
        <!-- 循环所有表单项 -->
        <template v-for="propItem in propList">
          <el-table-column
            v-bind="propItem"
            align="center"
            show-overflow-tooltip
          >
            <template #default="scope">
              <slot :name="propItem.slotName" :row="scope.row">
                <!-- :row="scope.row" 把数据交出去 -->
                <!-- 插槽默认所有的内容   想改变的话  外界可以用插槽名替换默认内容 -->
                {{ scope.row[propItem.prop] }}
              </slot>
            </template>
          </el-table-column>
        </template>
      </el-table>
      <!-- 底部分页 -->
      <div class="footer" v-if="showFooter">
        <slot name="footer">
          <!-- @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
           :current-page="currentPage4" -->
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="value.currentPage"
            :page-sizes="[10, 20, 30, 50]"
            :page-size="value.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </slot>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    // 网络请求的数据
    listDate: {
      type: Array,
      required: true,
    },
    maxheight:{
      type:String,
      default:'300'
    },
    // 数据总条数
    total: {
      type: Number,
      default: 0,
    },
    // 表单配置项
    propList: {
      type: Array,
      required: true,
    },
    // 序号显示与隐藏
    showIndexColumn: {
      type: Boolean,
      default: false,
    },
    // 多选项显示与隐藏
    showSelectColumn: {
      type: Boolean,
      default: false,
    },
    // 表格名字标题
    title: {
      type: String,
      default: '用户表格',
    },
    // 表格是否展开
    childrenProps: {
      type: Object,
      default: () => ({}),
    },
    // 自定义分页接收的名字
    // model: {
    //   prop: 'page', //自定义分页接收值
    //   event: 'changePage',
    // },
    //分页
    value: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10,
      }),
    },
    // 底部分页是否显示  默认显示
    showFooter: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    //每页多少条数据
    handleSizeChange(pageSize) {
      this.$emit('input', { ...this.value, pageSize })
    },
    //第几页
    handleCurrentChange(currentPage) {
      this.$emit('input', { ...this.value, currentPage })
    },
    // 多选删除
    handleSelectionChange(val) {
      // console.log(val)
      this.$emit('handleSelectionChange',val)
    },
  },
  mounted() {},
}
</script>
<style scoped lang="less">
.header {
  display: flex;
  // height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

// 去除表格边框线
/deep/.el-table td.el-table__cell {
  border: none;
}
// 去除表格最下面的边框
/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0;
}

.footer {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
