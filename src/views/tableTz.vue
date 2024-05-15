<template>
  <div>
    <page-search
      v-bind="searchFormConfig"
      @queryBtnClick="queryBtnClick"
      @formRest="formRest"
      ref="searchRef"
    ></page-search>

    <tableDrag
      v-bind="tableHeadConfig"
      :tableData="tableData"
      @updatetableData="updatetableData"
      @updatetableHead="updatetableHead"
      ref="tableDragRef"
    ></tableDrag>

    <page-modal
      :defaultInfo="defaultInfo"
      :modalConfig="modalConfig"
      @dialogEdit="dialogEdit"
      ref="pageModalRef"
    >
    </page-modal>
  </div>
</template>
<script>
import axios from "axios";
import tableDrag from "../components/tabdrag/tableDrag";
import pageSearch from "../components/tabdrag/search";
import pageModal from "../components/tabdrag/dialog";
import { BASE_TYPE, formatFormItemConfig } from "./config";
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
        role: true,
        labelWidth: "120px",
        itemStyle: {
          //输入框的间距
          padding: "5px",
        },
        colLayout: {
          span: 6,
        },
        formItems: [],
        rules: {
          name: [
            { required: true, message: "请输入活动名称", trigger: "blur" },
          ],
        },
      },
      // 表格配置
      tableHeadConfig: {
        tableHead: [
          // {
          //   colKey: "value",
          //   colName: "差异项",
          //   colChecked: true,
          // },
          // {
          //   colName: "环网柜绝缘帽",
          //   colKey: "rmUnitInsulatingCap",
          //   colWidth: 150,
          //   colChecked: true, //显隐
          // },
          // {
          //   label: "id",
          //   value: "id",
          //   width: 150,
          //   check: true,
          // },
          // {
          //   label: "v1",
          //   value: "v1",
          //   width: 150,
          //   check: true,
          // },
        ],
        showSelectColumn: true, //多选项显示
        role: false, //角色
      },
      // 表格数据
      tableData: [
        {
          id: 1,
          v0: "2016-05-02",
          v1: 1,
          // v2: "上海",
          // v3: "普陀区",
          // v4: "上海市普陀区金沙江路 1518 弄",
          // v5: 200333,
          // v6: "2016-05-02",
          // v7: "王小虎",
          // v8: "上海",
          // v9: "普陀区",
          // v10: "普陀区",
          // value:''
        },
        {
          id: 2,
          v0: "2016-05-02",
          v1: 2,
          // value:''
          //   // v2: "上海",
          //   // v3: "普陀区",
          //   // v4: "上海市普陀区金沙江路 1518 弄",
          //   // v5: 200333,
          //   // v6: "2016-05-02",
          //   // v7: "王小虎",
          //   // v8: "上海",
          //   // v9: "普陀区",
          //   // v10: "普陀区",
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
        footer: false,
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
              { title: "启用", value: "1" },
              { title: "禁用", value: "2" },
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
      role: false,
      formData: {}, // 检索条件
      baseData: {
        // COM_MACHINE_CAPACITY: [
        //   {
        //     title: "默认",
        //     value: "575366304300797824",
        //   },
        //   {
        //     title: "直流PID",
        //     value: "575366359959211904",
        //   },
        // ],
        // RING_MAIN_UNIT_ARC: [
        //   {
        //     title: "默认",
        //     value: "575366304300797824",
        //   },
        //   {
        //     title: "直流PID",
        //     value: "575366359959211904",
        //   },
        // ],
      },
    };
  },
  created() {
    // this.getRole('sales')
    this.getRole("y");
    this.getBasicdata();//获取基本数据
    this.getTableHeaderConfig();//表格配置头
  },
  methods: {
    // 搜索基础数据处理
    filterBaseData(type) {
      return this.baseData ? this.baseData[type] : [{title:'111',value:'8748977'}];
    },
    // 搜索字典数据处理
    filterBaseDataDict(type){
      return []
    },
    // 基本数据字典项
    getBasicdata(){
      let that = this
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/baseDataManagement/getBaseDataManagementMap`,
          {},
        )
        .then(function (res) {
          console.log(res.data.data, "---我是基本数据------");
          that.baseData = res.data.data;
          const formConfig = formatFormItemConfig(res.data.data)
          console.log('______________________',formConfig);
          that.searchFormConfig.formItems = formConfig
        })
        .catch(function (error) {
          // this.$message.error(error);
        });
    },
    // 表格配置头
    getTableHeaderConfig() {
      let that = this
      const headers = {
        "Content-Type": "application/json", // 指定内容类型为JSON
        Xdapappid: "572840463237644288", // 自定义请求头
        Xdaptenantid: "491633633145126913", // 自定义请求头
        Xdaptoken:
          "	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTU3ODM5NzIsImlhdCI6MTcxNTc0MDk3MiwieGRhcHVzZXJpZCI6IjEwMDUxNzM4OTkwNTA3NzIwNzA0MCJ9.u6ii5lisAZABUkj8TSug_sBuCs8cDQoVFQXLx6UyB6eCYg6mhFkrNoZ13GVDW9oB4AHCmdAP85SPzSsBO4Ph4g", // 自定义请求头
      };
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productColConfig/getProductColConfig`,
          {},
          { headers: headers }
        )
        .then(function (res) {
          console.log(res.data.data, "---我是模拟 表头 数据------");
          that.tableHeadConfig.tableHead = res.data.data;
        })
        .catch(function (error) {
          // this.$message.error(error);
        });
    },
    // 请求角色身份
    getRole(role) {
      //先请求身份 在进行判断
      if (role == "sales") {
        this.role = true;
        this.searchFormConfig.role = true;
      } else {
        this.role = false;
        this.tableHeadConfig.role = false;
      }
    },
    // 编辑
    updatetableData(row) {
      this.defaultInfo = { ...row };
      this.$refs.pageModalRef.dialogVisible = true;
      // console.log(row, "我是子组件传递过来要修改的表格数据");
    },
    // 确定修改
    dialogEdit(obj) {
      obj.isCopied = true;
      this.$set(this.tableData, 0, obj);
      this.$refs.tableDragRef.handleDiffrence(this.tableData, this.formData);
    },
    // 修改表头配置
    updatetableHead(tableHead) {
      console.log("我是表头配置", tableHead);
    },
    // 搜索
    queryBtnClick(obj) {
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productList/getProductListByAlgo`,
          // `http://10.63.32.4:20000/mock/207/custom/access/h5/productList/getProductListByAlgo`,
          obj
        )
        .then(function (res) {
          console.log(res, "---我是模拟请求的数据------");
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(obj, "我是搜索的关键值89789789789");

      this.formData = obj;
      if (this.role) {
        this.$refs.searchRef.handelColor(this.tableData, obj);
      } else {
        // this.$refs.tableDragRef.handelTableErr(this.tableData,obj,'1')
        this.$refs.tableDragRef.handleDiffrence(this.tableData, obj);
      }
    },

    formRest(form) {
      this.tableData = [];
    },
  },
};
</script>

<style></style>
