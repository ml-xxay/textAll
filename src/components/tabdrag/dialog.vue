<template>
  <div class="page-model">
    <el-dialog
      :visible.sync="dialogVisible"
      destroy-on-close
      width="70%"
      center
    >
      <!-- 内容 -->
      <page-search
        ref="hyFormRef"
        v-bind="modalConfig"
        :dInfo="defaultInfo"
        @formDateChange="formDateChange"
      ></page-search>

      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import pageSearch from "../tabdrag/search";
export default {
  name: "",
  components: {
    pageSearch,
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
    };
  },
  methods: {
    // 关闭弹框
    close() {
      this.dialogVisible = false;
    },
    formDateChange(searchform){
        this.formDate = {...searchform}
        console.log(searchform,'我是输入框改变的值');
    },
    // 确定
    handleConfirmClick() {
      this.dialogVisible = false;
      if (Object.keys(this.defaultInfo).length) {
        console.log('编辑')
        console.log(this.formDate, '编辑')
        // this.$emit('dialogEdit',this.formDate)
      } else {
        console.log('新建')
        console.log(this.formDate, '新建')
        // this.$emit('dialogCreate',this.formDate)
      }
    },
  },
};
</script>
<style scoped></style>
