<template>
  <div>
    <div class="search-box" :style="{height: getHeight + 'px',overflowY:'auto'}">
      <el-form 
        class="form"
        :label-width="labelWidth"
        :model="formDate"
        :rules="rules"
        ref="fm"
      >
        <el-row >
          <!-- 循环所有搜索表单项数据 -->
          <template v-for="(item,index) in formItems">
            <el-col v-bind="colLayout">
              <el-form-item
                v-if="!item.isHidden"
                :style="itemStyle"
                :prop="item.field"
              >
              <!-- 对label进行处理 -->
              <template slot="label">
                <!-- {{item.label}} -->
                <el-tooltip :content="item.label" placement="top">
                  <span >{{item.label}}</span>
                </el-tooltip>
              </template>
                <!-- 配置文件类型是 input-->
                <template v-if="item.type == 'input'">
                  <el-input
                    :value="formDate[item.field]"
                    @input="handleValueChange($event, item.field)"
                    :placeholder="item.placeholder"
                    :show-password="item.type == 'password'"
                    :class="{ 'active': item.active  && disableRole}"
                    clearable
                  ></el-input>
                </template>
                <!-- 配置文件类型是 select下拉选择框 显示下拉-->
                <template v-else-if="item.type == 'select'">
                  <el-select
                    :value="formDate[item.field]"
                    @input="handleValueChange($event, item.field)"
                    :placeholder="item.placeholder"
                    style="width: 100%"
                    :class="{ 'active': resultArray[index] && disableRole}"
                    clearable
                    filterable
                  >
                    <el-option
                      v-for="options in item.options"
                      :label="options.title"
                      :value="options.value"
                    >
                    </el-option>
                  </el-select>
                </template>
              </el-form-item>

            </el-col>
          </template>
         
        </el-row>
      </el-form>
    </div>
     <div class="footer" v-if="footer">
        <div class="handle-btns">
            <el-button icon="el-icon-refresh" size="small" @click="handelReset">重置</el-button>
            <el-button type="primary" size="small" icon="el-icon-search" @click="handelQuery">搜索</el-button>
            <el-button v-if="iconDisable" size="small" class="icon" icon="el-icon-arrow-up" @click="iconDisable = false">折叠</el-button>
            <el-button v-else size="small" class="icon" icon="el-icon-arrow-down" @click="iconDisable = true">展开</el-button>
        </div>
    </div>
    <div class="footer" v-else>
      <div class="handle-btns">
          <el-button v-if="iconDisable" size="small" class="icon" icon="el-icon-arrow-up" @click="iconDisable = false">折叠</el-button>
          <el-button v-else size="small" class="icon" icon="el-icon-arrow-down" @click="iconDisable = true">展开</el-button>
      </div>
  </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: {
    // 表格数据
    tableData:{
      type: Array,
      default: () => [],
    },
    // 下面这是 v-bind="searchFormConfig" 传过来的数据
    formItems: {
      type: Array,
      default: () => [],
    },
   // 编辑时要回显的数据
   dInfo: {
      type: Object,
      default: () => ({}),
    },
    // 弹窗时不显示飘红
    disableRole:{
      type:Boolean,
      default: () => {
        return false
      }
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    labelWidth: {
      type: String,
      default: "100px",
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: "10px 40px" }),
    },
    //一行显示几个
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // >1920px 4个
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24,
      }),
    },
    footer:{
      type:Boolean,
      default: () => {
        return true
      },
    }
  },
  data() {
    return {
        formDate: {},
        formOriginData: {},
        iconDisable:false,
        isUpdate:false,// 是否是修改还是添加
        isMismatch:true,// 是否是修改还是添加
        resultArray:[]
    };
  },
  watch: {
    // 动态决定formDate的字段  后续搜索字段发生变化只需要传递配置即可
    formItems: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.formDateMets('formItems')
      },
    },
    dInfo:{
      deep: true,
      immediate: true,
      handler:function(newVal){
        // console.log(newVal,'我是监听回显数据---------');
      if (this.dInfo) {
        this.formDateMets('defaultInfo')
        this.isUpdate = true;
      } else {
        this.isUpdate = false;
      }
      }
    },
  },
  computed: {
    getHeight(){
      return this.iconDisable ? 270 : 50
    },
    getColor(){
      return 'red'
    }
  },
  mounted(){
  
  },
  methods: {
    formDateMets(plyload) {
      if(plyload == 'formItems'){
        const formItem = this.formItems
        const formOriginData = {}
        for (const item of formItem) {
          formOriginData[item.field] = ''
        }
        this.formOriginData = formOriginData //多保存一份数据 方便重置
        this.formDate = formOriginData //动态搜索字段

      }else {
        const dialogformDate = {}
        for (const item of this.formItems ?? []) {
          dialogformDate[item.field] = this.dInfo[item.field]
        }
        this.formDate = dialogformDate
      }
     
    },
    // 输入框值改变时
    handleValueChange(newValue, field) {//值 newValue, 字段名field
      this.formDate = { ...this.formDate, [field]: newValue }
      this.$emit('formDateChange',this.formDate)
    },
    // 重置
    handelReset(){
        Object.keys(this.formDate).forEach(key => {
          this.formDate[key] = ''
        })
        this.$emit('formRest', this.formDate)
    },
    // 搜索
    handelQuery(){
        this.$emit('queryBtnClick', this.formDate) //搜索事件发出去
    },
    //处理飘红的方法
    handelColor(tabDate,obj){
      // const item = tabDate[0]
      // this.formItems.forEach((it, idx) => {
      //   if (this.formData[it.field] && this.formData[it.field] !== item[it.field]) {
      //     it.active = true
      //   } else {
      //     it.active = false
      //   }
      // })
      console.log(obj,'789');
      // this.formData = obj
      

      // let resul = tabDate.map(item => {
      // // 对比每个键值对
      // const isActive = Object.keys(this.formDate).every(key => {
      //     return this.formDate[key] !== item[key];
      // });
      // return isActive
      // });
      // Object.keys(this.formDate).forEach(key=>{
      //   if(this.formDate[key] !== 'undefined '){
      //     console.log(this.formDate[key],'我是每个搜索字段的值');
      //   }
      // })

      // this.resultArray = resul
      // console.log(resul,'我是处理完的数组');
    }
  },
};
</script>
<style scoped>
/* 输入框的高 */
/deep/.el-input__inner {
    height: 33px !important;
}
/deep/.el-form-item__label {  
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.search-box::-webkit-scrollbar {
        width: 8px; /*  设置纵轴（y轴）轴滚动条 */
        height: 4px; /*  设置横轴（x轴）轴滚动条 */
    }
.search-box::-webkit-scrollbar-thumb {
        border-radius: 10px;
        box-shadow: inset 0 0 5px #ccc;
        background: #ccc;
}
.search-box::-webkit-scrollbar-track {
        border-radius: 0;
        box-shadow: inset 0 0 5px rgba(0,0,0,0.2);
        background: #fff;
}
.footer {
  
  padding-top: 10px;
}
.el-form-item {
  margin-bottom: 0px;
}
.handle-btns {
  text-align: right;
  padding: 0 10px 10px 0;
}
.icon {
    margin: 10px 0 10px 10px;
}
/* 输入框检索不正确的时候文字高亮 */
/deep/ .el-form-item .active .el-input__inner {
  color: red !important;
}
</style>
