<template>
  <div class="page-model">
    <el-dialog
      title="提示"
      :visible.sync="dialogVisible"
      destroy-on-close
      width="30%"
      center
    >
      <!-- 内容 -->
      <hy-from
        ref="hyFormRef"
        v-bind="modalConfig"
        v-model="formDate"
      ></hy-from>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
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
    // 父亲传来的配置文件
    modalConfig: {
      type: Object,
      reuqired: true,
    },
    // 编辑时要回显的数据
    defaultInfo: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      // 弹框 表格需要双向绑定字段
      formDate: {},
      dialogVisible: false,
      formCope: {},
    }
  },
  computed: {},
  watch: {
    defaultInfo: {
      deep: true,
      immediate: true,
      handler: function (newValue, oldV) {
        const dialogformDate = {}
        for (const item of this.modalConfig?.formItems ?? []) {
          dialogformDate[item.field] = newValue[item.field]
        }
        this.formDate = dialogformDate
        this.formCope = dialogformDate //多保存一份数据 为了重置
      },
    },
  },
  created() {},
  methods: {
    // 关闭弹框
    close() {
      // for (const key in this.formCope) {
      //   this.formDate[key] = this.formCope[key] //直接改属性值可以 可以form组件监听到
      // } //关闭弹框时重置入框
      // this.formDate = {}
      this.dialogVisible = false
    },
    // 确定时  发送请求 关闭弹出弹窗
    handleConfirmClick() {
      this.dialogVisible = false
      if (Object.keys(this.defaultInfo).length) {
        console.log('编辑')
        console.log(this.formDate, '编辑')
        this.$emit('dialogEdit',this.formDate)
      } else {
        console.log('新建')
        console.log(this.formDate, '新建')
        this.$emit('dialogCreate',this.formDate)
      }
    },
  },
  mounted() {},
}
</script>
<style scoped lang="less"></style>
