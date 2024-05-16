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
import {
  BASE_TYPE,
  formatFormItemConfig,
  formatFormItemConfigDcit,
  formatFormItemConfigArea,
} from "./config";
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
      tableData: [],
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
      baseData: {},
      headers: {
        "Content-Type": "application/json", // 指定内容类型为JSON
        Xdapappid: "572840463237644288", // 自定义请求头
        Xdaptenantid: "491633633145126913", // 自定义请求头
        Xdaptoken:
          "	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTU3ODM5NzIsImlhdCI6MTcxNTc0MDk3MiwieGRhcHVzZXJpZCI6IjEwMDUxNzM4OTkwNTA3NzIwNzA0MCJ9.u6ii5lisAZABUkj8TSug_sBuCs8cDQoVFQXLx6UyB6eCYg6mhFkrNoZ13GVDW9oB4AHCmdAP85SPzSsBO4Ph4g",
      },
    };
  },
  created() {
    // this.getRole('sales')
    this.getRole("iprs_rd");
    // 获取基本数据与字典数据之和
    this.getDataAll();
    this.getTableHeaderConfig(); //表格配置头
  },

  methods: {
    // 搜索基础数据处理
    filterBaseData(type) {
      return this.baseData
        ? this.baseData[type]
        : [{ title: "111", value: "8748977" }];
    },
    // 搜索字典数据处理
    filterBaseDataDict(type) {
      return [];
    },
    getDataAll() {
      let that = this;
      const basicDataPromise = axios.post(
        `http://10.13.70.240:9091/custom/access/h5/baseDataManagement/getBaseDataManagementMap`,
        {},
        { headers: that.headers }
      );
      const dictDataPromise = axios.post(
        `http://10.13.70.240:9091/custom/access/h5/dictionary/getDictionary`,
        {},
        { headers: that.headers }
      );

      const areaPromise = axios.post(
        `http://10.13.70.240:9091/custom/access/h5/areaConfig/list`,
        {},
        { headers: that.headers }
      );

      Promise.all([areaPromise, basicDataPromise, dictDataPromise])
        .then(function (responses) {
          // 所有请求都成功后的处理
          const [areaPromise, basicRes, dictRes] = responses;
          // console.log(basicRes.data.data, "---我是基本数据------");
          // console.log(dictRes.data.data, "---我是字典数据------");
          // console.log(areaPromise.data.data, "---我是区域数据------");
          const areaConfig = formatFormItemConfigArea(areaPromise.data.data);
          const formConfig = formatFormItemConfig(basicRes.data.data);
          const formConfigDict = formatFormItemConfigDcit(dictRes.data.data);
          that.searchFormConfig.formItems = [
            ...areaConfig,
            ...formConfig,
            ...formConfigDict,
          ];
          that.modalConfig.formItems = [
            ...areaConfig,
            ...formConfig,
            ...formConfigDict,
          ];
        })
        .catch(function (error) {
          // 如果任何一个请求失败，则这里捕获错误
          console.error("An error occurred:", error);
        });
    },
    // 获取表格配置头
    getTableHeaderConfig() {
      let that = this;
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
          // `http://10.63.32.4:20000/mock/207/custom/access/h5/productColConfig/getProductColConfig`,
          {},
          { headers: that.headers }
        )
        .then(function (res) {
          // console.log(res.data.data, "---我是模拟 表头 数据------");
          that.tableHeadConfig.tableHead = res.data.data;

          // that.tableHeadConfig.tableHead.unshift({
          //   colKeyForCamelCase: "differenceItem",
          //   colName: "差异项",
          //   ifColChecked: true,
          //   colChecked: "true",
          //   colKey: "differenceItem",
          //   colSort: "1",
          //   colType: "private",
          //   colWeight: 2,
          //   colWidth: "150"
          // });
        })
        .catch(function (error) {
          // this.$message.error(error);
        });
    },
    // 获取请求角色身份
    getRole(role) {
      let that = this;
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/paramRole/getUserRoleInfo`,
          {},
          { headers: that.headers }
        )
        .then(function (res) {
          console.log(res.data.data, "---我是角色------");
          const {role} = res.data.data
          //先请求身份 在进行判断
          if (role == "iprs_sale") {
            that.role = true;
            that.searchFormConfig.role = true;
          } else {
            that.role = false;
            that.tableHeadConfig.role = false;
          }
        });
    },
    // 编辑
    updatetableData(row) {
      this.defaultInfo = { ...row };
      this.$refs.pageModalRef.dialogVisible = true;
      console.log(row, "我是子组件传递过来要修改的表格数据");
    },
    // 确定修改
    dialogEdit(obj) {
      obj.isCopied = true;
      this.$set(this.tableData, 0, obj);
      this.$refs.tableDragRef.handleDiffrence(this.tableData, this.formData);
    },
    // 修改表头配置
    updatetableHead(tableHead) {
      let that = this;
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productColConfig/updateProductColConfigs`,
          // `http://10.63.32.4:20000/mock/207/custom/access/h5/productColConfig/getProductColConfig`,
          {productColConfigList:tableHead},
          { headers: that.headers }
        )
        .then(function (res) {
          console.log(res.data.data, "---我是修改表头------");
          if(res.data.data == 'success'){
            that.getTableHeaderConfig()
          }
        })
        .catch(function (error) {
          // this.$message.error(error);
        });
      console.log("------我是确定修改表头配置------", tableHead);
    },
    // 搜索
    queryBtnClick(obj) {
      let that = this;
      that.formData = obj;
      // obj['role'] = "iprs_rd"
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productList/getProductListByAlgo`,
          // `http://10.63.32.4:20000/mock/207/custom/access/h5/productList/getProductListByAlgo`,
          obj,
          { headers: that.headers }
        )
        .then(function (res) {
          console.log(res, "---我是请求的表格数据------");
          that.tableData = res.data.data;

          if (that.role) {
            that.$refs.searchRef.handelColor(that.tableData, obj);
          } else {
            // this.$refs.tableDragRef.handelTableErr(this.tableData,obj,'1')
            that.$refs.tableDragRef.handleDiffrence(that.tableData, obj);
          }
        })
        .catch(function (error) {
          console.log(error);
        });

      console.log(obj, "我是搜索的关键值89789789789");

      // if (this.role) {
      //   that.$refs.searchRef.handelColor(this.tableData, obj);
      // } else {
      //   // this.$refs.tableDragRef.handelTableErr(this.tableData,obj,'1')
      //   that.$refs.tableDragRef.handleDiffrence(this.tableData, obj);
      // }
    },

    formRest(form) {
      this.tableData = [];
    },
  },
};
</script>

<style></style>
