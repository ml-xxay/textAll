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
        disableRole:true,
        role:false,
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
            active:false
          },
          {
            field: "v0",
            type: "input",
            label: "v0",
            placeholder: "请输入v0",
            active:false
          } ,
          {
            field: "v1",
            linHeight: {
              lineHeight: "20px",
            },
            type: "select",
            value: "自己决定默认值",
            label: "v1",
            placeholder: "请选择用户名",
            active:false,
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
            label: "v0",
            value: "v0",
            width: 150,
            check: true,//显隐
          },
          {
            label: "id",
            value: "id",
            width: 150,
            check: true
          },
          {
            label: "v1",
            value: "v1",
            width: 150,
            check: true
          },
          // {
          //   label: "三三",
          //   value: "v3",
          //   width: 150,
          //   check: false
          // },
        ],
        showSelectColumn: true, //多选项显示
        role:false,//角色
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
        // {
        //   id: 2,
        //   v0: "2016-05-02",
        //   v1: "2",
        //   v2: "上海",
        //   v3: "普陀区",
        //   v4: "上海市普陀区金沙江路 1518 弄",
        //   v5: 200333,
        //   v6: "2016-05-02",
        //   v7: "王小虎",
        //   v8: "上海",
        //   v9: "普陀区",
        //   v10: "普陀区",
        // },
      ],
      // 弹窗配置
      modalConfig: {
        disableRole:false,
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
  created(){
    this.getRole('sales')
  },
  methods: {
    // 请求角色身份
    getRole(role){
      //先请求身份 在进行判断
      if(role == 'sales'){
        this.searchFormConfig.role = true
      }else {
        this.tableHeadConfig.role = true
      }
    },
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
      // 利用搜索的value与请求回来的value做对比 ，不一致需要使搜索文字高亮，动态决定活动类
      this.formData= obj
      const item = this.tableData[0]
      this.searchFormConfig.formItems.forEach((it, idx) => {
        if (this.formData[it.field] && this.formData[it.field] !== item[it.field]) {
          it.active = true
        } else {
          it.active = false
        }
      })

      this.$refs.searchRef.handelColor(this.tableData,obj)

      // console.info('formData', this.formData, item);
      // console.info(this.searchFormConfig.formItems);
    },

    formRest(form) {
      // this.formData = obj
    }
  },
};
</script>

<style></style>
