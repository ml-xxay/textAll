<template>
  <div>
    <page-search
      v-bind="searchFormConfig"
      @queryBtnClick="queryBtnClick"
    ></page-search>

    <tableDrag
      v-bind="tableHeadConfig"
      :tableDataSource="tableData"
      @updatetableData="updatetableData"
      @updatetableHead="updatetableHead"
    ></tableDrag>

    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      ref="pageModalRef"
    >
    </page-modal>
  </div>
</template>
<script>
import tableDrag from "../components/tabdrag/tableDrag";
import pageSearch from "../components/tabdrag/search";
import pageModal from "../components/tabdrag/dialog";
export default {
  name: "PaymentList",
  components: {
    tableDrag,
    pageSearch,
    pageModal,
  },
  data() {
    return {
      //搜索配置
      searchFormConfig: {
        labelWidth: "120px",
        itemStyle: {
          //输入框的间距
          padding: "5px",
        },
        colLayout: {
          span: 6,
        },
        formItems: [
          //field 是要双向绑定所对应上去的字段  type 输入框类型  label 标头名称  value是输入框默认值
          {
            field: "id",
            type: "input",
            label: "id",
            placeholder: "请输入id",
          },
          {
            field: "v0",
            type: "input",
            label: "v0",
            placeholder: "请输入v0",
          } ,
          {
            field: "v1",
            linHeight: {
              lineHeight: "20px",
            },
            type: "select",
            value: "自己决定默认值",
            label: "测试下拉用户名",
            placeholder: "请选择用户名",
            options: [
              { title: "全部", value: 0 },
              { title: "启用", value: 1 },
              { title: "禁用", value: 2 },
            ],
          },
        ],
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
        },
      },
      // 表格配置
      tableHeadConfig: {
        tableHeadSource: [
          {
            label: "零零",
            value: "v0",
            width: 150,
            check: false,
          },
          {
            label: "id",
            value: "v1",
            width: 150,
            check: true,
          },
          {
            label: "v0",
            value: "v2",
            width: 150,
            check: true,
          },
          {
            label: "三三",
            value: "v3",
            width: 150,
            check: false,
          },
        ],
        showSelectColumn: true, //多选项显示
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          v0: "2016-05-02",
          v1: "王1",
          v2: "上海",
          v3: "普陀区",
          v4: "上海市普陀区金沙江路 1518 弄",
          v5: 200333,
          v6: "2016-05-02",
          v7: "王小虎",
          v8: "上海",
          v9: "普陀区",
          v10: "普陀区",
        },
        {
          id: 2,
          v0: "2016-05-02",
          v1: "2",
          v2: "上海",
          v3: "普陀区",
          v4: "上海市普陀区金沙江路 1518 弄",
          v5: 200333,
          v6: "2016-05-02",
          v7: "王小虎",
          v8: "上海",
          v9: "普陀区",
          v10: "普陀区",
        },
      ],
      // 弹窗配置
      modalConfig: {
        labelWidth: "120px",
        itemStyle: {
          //输入框的间距
          padding: "5px",
        },
        colLayout: {
          span: 6,
        },
        footer:false,
        formItems: [
          //field 是要双向绑定所对应上去的字段  type 输入框类型  label 标头名称  value是输入框默认值
          {
            field: "id",
            type: "input",
            label: "id",
            placeholder: "请输入id",
          },
          {
            field: "v0",
            type: "input",
            label: "v0",
            placeholder: "请输入v0",
          },
          {
            field: "v1",
            linHeight: {
              lineHeight: "20px",
            },
            type: "select",
            value: "自己决定默认值",
            label: "测试下拉用户名",
            placeholder: "请选择用户名",
            options: [
              { title: "全部", value: 0 },
              { title: "启用", value: 1 },
              { title: "禁用", value: 2 },
            ],
          },
        ],
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
        },
      },
      // 弹框编辑时要操作的数据
      defaultInfo: {},
    };
  },
  methods: {
    // 编辑
    updatetableData(row) {
      this.defaultInfo = {...row}
      this.$refs.pageModalRef.dialogVisible = true;
      // console.log(row, "我是子组件传递过来要修改的表格数据");
    },
    // 修改表头配置
    updatetableHead(tableHead) {
      console.log("我是表头配置", tableHead);
    },
    // 搜索
    queryBtnClick(obj) {
      console.log(obj, "我是搜索的关键值");
    },
  },
};
</script>

<style></style>
