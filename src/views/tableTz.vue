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
      @uploadFile="uploadFile"
      @downloadTemplate="downloadTemplate"
      @downloadAllProductList="downloadAllProductList"
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
        role: '',
        labelWidth: "120px",
        itemStyle: {
          padding: "5px",
        },
        colLayout: {
          span: 6,
        },
        formItems: []
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
        role: '', //角色
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

        formItems: [],
      },
      // 弹框编辑时要操作的数据
      defaultInfo: {},
      role: '',
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
 async created() {
    // this.getRole('iprs_sale')
    await this.getRole();
    // 获取基本数据与字典数据之和
    this.getDataAll();
    this.getTableHeaderConfig(); //表格配置头
  },

  methods: {
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
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productColConfig/getProductColConfig`,
          // `http://10.63.32.4:20000/mock/207/custom/access/h5/productColConfig/getProductColConfig`,
          {},
          { headers: that.headers }
        )
        .then(function (res) {
          // console.log(res.data.data, "---我是模拟 表头 数据------");
          if(that.role == 'iprs_sale') {
            res.data.data[0].ifColChecked = false
          }
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
          const { role } = res.data.data;
          //先请求身份 在进行判断
            that.role = role;
            that.tableHeadConfig.role = role;
            that.searchFormConfig.role = role;
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
      // 确定请求
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/productList/copyProductList`,
          obj,
          { headers: this.headers }
        )
        .then(function (res) {
          console.log(res, "---我是新建------");
        });

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
          { productColConfigList: tableHead },
          { headers: that.headers }
        )
        .then(function (res) {
          console.log(res.data.data, "---我是修改表头------");
          if (res.data.data == "success") {
            that.getTableHeaderConfig();
          }
        })
        .catch(function (error) {
          console.log(error);
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
    // 重置
    formRest(form) {
      this.tableData = [];
    },
    // 下载模板
    downloadTemplate() {
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/download/downloadProductListTemplate`,
          {},
          { 
            headers: this.headers,
            responseType: 'arraybuffer',
          }
        )
        .then(function (res) {
          console.log(res, "---我是下载模板------");
          const blob = new Blob([res.data], {
            type: res.headers['content-type'],
          }); 
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "模板.xlsx"; // 指定下载的文件名
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(downloadUrl); // 释放URL对象
          document.body.removeChild(link); // 清理DOM
        })
        .catch(function (error) {
          console.error("文件下载出错:", error);
        });
    },
    // 下载数据
    downloadAllProductList() {
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/download/downloadAllProductList`,
          {},
          { 
            headers: this.headers,
            responseType: 'arraybuffer',
          }
        )
        .then(function (res) {
          console.log(res, "---我是下载数据------");
          const blob = new Blob([res.data], {
            type: res.headers['content-type'],
          }); 
          const downloadUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = downloadUrl;
          link.download = "模板.xlsx"; // 指定下载的文件名
          link.style.display = "none";
          document.body.appendChild(link);
          link.click();
          window.URL.revokeObjectURL(downloadUrl); // 释放URL对象
          document.body.removeChild(link); // 清理DOM
        })
        .catch(function (error) {
          console.error("文件下载出错:", error);
        });
    },
    //  上传文件
    uploadFile(obj) {
      let that = this
      let headersCopy = {
        "Content-Type": "multipart/form-data", // 指定内容类型为JSON
        Xdapappid: "572840463237644288", // 自定义请求头
        Xdaptenantid: "491633633145126913", // 自定义请求头
        Xdaptoken:
          "	eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJleHAiOjE3MTU3ODM5NzIsImlhdCI6MTcxNTc0MDk3MiwieGRhcHVzZXJpZCI6IjEwMDUxNzM4OTkwNTA3NzIwNzA0MCJ9.u6ii5lisAZABUkj8TSug_sBuCs8cDQoVFQXLx6UyB6eCYg6mhFkrNoZ13GVDW9oB4AHCmdAP85SPzSsBO4Ph4g",
      }
      axios
        .post(
          `http://10.13.70.240:9091/custom/access/h5/upload/uploadProductList`,
          obj,
          { 
            headers: headersCopy,
          }
        )
        .then(function (res) {
          console.log(res, "---我是上传文件------");
          if(res.data.status == 'error'){
            that.$message.error(res.data.data.message)
          }else {
            that.$message.success('上传成功')
          }
          
        })
        .catch(function (error) {
          that.$message.error('请求失败',error)
        });
    },
  },
};
</script>

<style></style>
