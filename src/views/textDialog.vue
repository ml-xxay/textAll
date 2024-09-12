<template>
  <div class="box">
    <div class="left" ref="leftRef">
        <!-- 左侧表单 -->
      <el-form ref="form" :model="formLeft" :rules="configLeft.rules" label-width="80px" class="form-left-box" label-position="top" :disabled="isDisabledLeft">
        <el-form-item class="item" :label="item.label" :prop="item.prop" v-for="(item,index) in configLeft.formItems" :key="index">
           <!-- 配置文件类型是 input 框-->
           <template v-if="item.type == 'input'">
            <el-input
              v-model="formLeft[item.prop]"
              :placeholder="item.placeholder"
              style="width: 100%"
              clearable
            ></el-input>
          </template>
         
          <!-- 配置文件类型是 select  单选下拉选择框 显示下拉-->
          <template v-else-if="item.type == 'select'">
            <el-select
              v-model="formLeft[item.prop]"
              :ref="`leftSelect-${item.prop}`"
              @focus="handleFocus(item.prop)"
              @blur="handleBlur"
              :placeholder="item.placeholder"
              style="width: 100%"
              clearable
              filterable
            >
              <el-option
                v-for="options in getOptions(item)"
                :label="options.title"
                :value="options.value"
              >
              </el-option>
            </el-select>
          </template>

          <!-- 配置文件类型是  multiple 多选下拉-->
          <template v-else-if="item.type == 'multiple'">
            <el-select
              multiple
              filterable
              v-model="formLeft[item.prop]"
              :ref="`leftSelect-${item.prop}`"
              @focus="handleFocus(item.prop)"
              @blur="handleBlur"
              :placeholder="item.placeholder"
              style="width: 100%"
              clearable
            >
              <el-option
                v-for="options in getOptions(item)"
                :label="options.title"
                :value="options.value"
              >
              </el-option>
            </el-select>
          </template>

          <!-- 配置文件是 单个日期 datepickerone 时间  显示单个的日期-->
          <template v-else-if="item.type == 'datepickerone'">
            <el-date-picker
              value-format="yyyy-MM-dd"
              v-model="formLeft[item.prop]"
              :ref="`leftSelect-${item.prop}`"
              @focus="handleFocus(item.prop)"
              @blur="handleBlur"
              type="date"
              style="width:100%"
              :placeholder="item.placeholder"
              clearable
            >
            </el-date-picker>
          </template>

           <!-- 配置文件是 file  文件-->
           <template v-else-if="item.type == 'file'">
              文件展示
          </template>
        </el-form-item>
      </el-form>
      <!-- 操作按钮 -->
      <div class="footer">
        <el-button type="primary"  @click="isDisabledLeft = !isDisabledLeft">{{isDisabledLeft ? '编辑' : '保存'}}</el-button>
      </div>
    </div>
    <!-- 右侧tabs -->
    <div class="right" ref="searchBoxRef">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane   v-for="(pane, index) in panes"
        :key="pane.id"
        :label="pane.label"
        :name="pane.id"
        >

        <template #default>
          <el-form :model="pane.data" :ref="`rightForm-${pane.id}`" :rules="configLeft.rules" class="form-left-box right-form"  label-width="120px" label-position="top" :disabled="isDisabledRight" >
            <el-form-item class="item" :label="item.label" :prop="item.prop" v-for="(item,index) in configLeft.formItems" :key="index">
              <!-- 配置文件类型是 input 框-->
              <template v-if="item.type == 'input'">
               <el-input
                  v-model="pane.data[item.prop]"
                 :placeholder="item.placeholder"
                 style="width: 100%"
                 clearable
               ></el-input>
             </template>
            
             <!-- 配置文件类型是 select下拉选择框 显示下拉-->
             <template v-else-if="item.type == 'select'">
               <el-select
                  v-model="pane.data[item.prop]"
                 :placeholder="item.placeholder"
                 :ref="`rightSelect-${item.prop}`"
                 @focus="handleRightFocus(item.prop)"
                 @blur="handleRightBlur"
                 style="width: 100%"
                 clearable
                 filterable
               >
                 <el-option
                   v-for="options in getOptions(item)"
                   :label="options.title"
                   :value="options.value"
                 >
                 </el-option>
               </el-select>
             </template>
   
             <!-- 配置文件类型是  multiple 多选下拉-->
             <template v-else-if="item.type == 'multiple'">
               <el-select
                 multiple
                 filterable
                 v-model="pane.data[item.prop]"
                 :placeholder="item.placeholder"
                 :ref="`rightSelect-${item.prop}`"
                 @focus="handleRightFocus(item.prop)"
                 @blur="handleRightBlur"
                 style="width: 100%"
                 clearable
               >
                 <el-option
                   v-for="options in getOptions(item)"
                   :label="options.title"
                   :value="options.value"
                 >
                 </el-option>
               </el-select>
             </template>
   
             <!-- 配置文件是 单个日期 datepickerone 时间  显示单个的日期-->
             <template v-else-if="item.type == 'datepickerone'">
               <el-date-picker
                 value-format="yyyy-MM-dd"
                 v-model="pane.data[item.prop]"
                 type="date"
                 style="width:100%"
                 :placeholder="item.placeholder"
                 :ref="`rightSelect-${item.prop}`"
                 @focus="handleRightFocus(item.prop)"
                 @blur="handleRightBlur"
                 clearable
               >
               </el-date-picker>
             </template>
   
              <!-- 配置文件是 file  文件-->
              <template v-else-if="item.type == 'file'">
                 文件展示
             </template>
           </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>  
     
      </el-tabs>
      <!-- 操作按钮 -->
      <div class="footer">
        <el-button type="primary"  @click="isDisabledRight = !isDisabledRight">{{isDisabledRight ? '编辑' : '保存'}}</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectField: '', // 左侧当高聚焦的选择框
      selectRightField: '', // 右侧当高聚焦的选择框
      
      isDisabledLeft:true,//禁用左侧表单
      // 左侧配置文件
      configLeft:{
        formItems:[
            {
            label:'项目简称',
            prop:'projectAbbreviation',
            rolus:'',
            slot:'projectAbbreviation',
            type: 'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'证书/报告号',
            prop:'certificateReportNumber',
            rolus:'',
            slot:'',
            type: 'input',
          },
          {
            label:'类型',
            prop:'certificateType',
            rolus:'',
            slot:'certificateType',
            type: 'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          
          },
          {
            label:'标准',
            prop:'standard',
            rolus:'',
            slot:'standard',
            type: 'multiple',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'变更原因',
            prop:'reason',
            rolus:'',
            slot:'',
            type:'input'
          },
        
          {
            label:'证书状态',
            prop:'certificateStatus',
            rolus:'',
            slot:'certificateStatus',
            type: 'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
        
          {
            label:'产品线',
            prop:'productLine',
            rolus:'',
            slot:'productLine',
            type:'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'适用区域',
            prop:'applicableRegion',
            rolus:'',
            slot:'',
            type:'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'机构',
            prop:'organization',
            rolus:'',
            slot:'organization',
            type:'select',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'语言',
            prop:'language',
            rolus:'',
            slot:'',
            type:'input'
          },
          {
            label:'产品型号',
            prop:'productModel',
            rolus:'',
            slot:'productModel',
            type: 'multiple',
            options: [
                  { title: '启用', value: 1 },
                  { title: '禁用', value: 0 }
            ]
          },
          {
            label:'认证产品版本',
            prop:'certifiedProductVersion',
            rolus:'',
            slot:'',
            type:'input'
          },
          {
            label:'签发日期',
            prop:'issueDate',
            rolus:'',
            slot:'issueDate',
            type: 'datepickerone',
          },
        
          {
            label:'有效期至',
            prop:'validDate',
            rolus:'',
            slot:'validDate',
            type:'datepickerone' //单选日期
          },
        
          {
            label:'证书或报告',
            prop:'certificates',
            rolus:'',
            slot:'',
            type:'file'
          },
          {
            label:'附件',
            prop:'attachements',
            rolus:'',
            slot:'',
            type:'file'
          },
          {
            label:'备注',
            prop:'remark',
            rolus:'',
            slot:'',
            type:'input'
          },
        ],
        rules: {
          certificateType: [{ required: true, message: '请选择类型', trigger: 'blur' }],
          certificateReportNumber: [{ required: true, message: '请输入证书/报告号', trigger: 'blur' }],
          standard: [{ required: true, message: '请选择标准', trigger: 'blur' }],
          certificateStatus: [{ required: true, message: '请选择证书状态', trigger: 'blur' }],
          productLine: [{ required: true, message: '请选择产品线', trigger: 'blur' }],
        }
      } ,
      // 左侧双向绑定表单
      formLeft: {
        certificateReportNumber: 'pdf文件',
        projectAbbreviation: 'I-V扫描与智能诊断',
        language: 'zh',
        productLine: '字典产品线id',
        standard: '字典标准型号id',
        organization: ' 字典机构简称id',
        certificateType: '类型字典id',
        productModel: '字典产品型号id',
        validDate: '2017-01-17 16:25:38',
        issueDate: '2020-12-08 06:16:08',
        applicableRegion: '字典事业部id',
        certifiedProductVersion: '认证产品版本',
        reason: '变更原因',
        certificateStatus: '证书状态',
        certificates: '证书或报告',
        attachements: '附件',
        remark: '备注',
        id: '1'
      },
       
      isDisabledRight:true,//禁用右侧表单
      // 右侧双向绑定表单
      formRight: {},
      // 右侧tab项数据
      inbound:[
        {
          certificateReportNumber: 'pdf文件',
          projectAbbreviation: 'I-V扫描与智能诊断',
          language: 'zh',
          productLine: '字典产品线id',
          standard: '字典标准型号id',
          organization: ' 字典机构简称id',
          certificateType: '类型字典id',
          productModel: '字典产品型号id',
          validDate: '2017-01-17 16:25:38',
          issueDate: '2020-12-08 06:16:08',
          applicableRegion: '字典事业部id',
          certifiedProductVersion: '认证产品版本',
          reason: '变更原因',
          certificateStatus: '证书状态',
          certificates: '证书或报告',
          attachements: '附件',
          remark: '备注',
          id: '1'
        },
        {
          certificateReportNumber: 'pdf文件',
          projectAbbreviation: 'I-V扫描与智能诊断',
          language: 'zh',
          productLine: '字典产品线id',
          standard: '字典标准型号id',
          organization: ' 字典机构简称id',
          certificateType: '类型字典id',
          productModel: '字典产品型号id',
          validDate: '2017-01-17 16:25:38',
          issueDate: '2020-12-08 06:16:08',
          applicableRegion: '字典事业部id',
          certifiedProductVersion: '认证产品版本',
          reason: '变更原因',
          certificateStatus: '证书状态',
          certificates: '证书或报告',
          attachements: '附件',
          remark: '备注',
          id: '2'
        }
      ],//已入库的数据
      activeName: '1', //右侧激活
      index:0,//右侧tab点击的的索引
      // 下拉options数据
      dictionaries:{
          "projectAbbreviation": [
              {
                  "id": "1111",
                  "name": "a项目"
              },
              {
                  "id": "222",
                  "name": "b项目"
              }
          ],
          "productLine": [
              {
                  "id": "1111",
                  "name": "line1"
              },
              {
                  "id": "222",
                  "name": "line2"
              }
          ],
          "standard": [
              {
                  "id": "1111",
                  "name": "iso9001"
              },
              {
                  "id": "222",
                  "name": "iso9002"
              }
          ],
          "certificateType": [
              {
                  "id": "1111",
                  "name": "iso9001"
              },
              {
                  "id": "222",
                  "name": "iso9002"
              }
          ],
          "certificateStatus": [
              {
                  "id": "1111",
                  "name": "有效"
              },
              {
                  "id": "222",
                  "name": "无效"
              }
          ],
          "applicableRegion": [
              {
                  "id": "1111",
                  "name": "中国"
              },
              {
                  "id": "222",
                  "name": "美国"
              }
          ],
          "organization": [
              {
                  "id": "1111",
                  "shortName": "iso9001",
                  "fullName": "iso9001标准"
              },
              {
                  "id": "222",
                  "shortName": "iso9002",
                  "fullName": "iso9001标准"
              }
          ],
          "product_model": [
              {
                  "id": "1111",
                  "name": "型号1"
              },
              {
                  "id": "222",
                  "name": "型号2"
              }
          ]
      }
    };
  },
  created(){
    this.getDictionaries()
  },
  mounted() {
    // 监听左侧列表滚动事件
    this.$refs.leftRef.addEventListener('scroll', this.handleScroll)
   
    // 右侧每个表单的滚动事件
    const allFormRefs = Object.keys(this.$refs).filter(ref => ref.startsWith('rightForm-'));
      allFormRefs.forEach(formRef => {
        this.$refs[formRef][0].$el.addEventListener('scroll',  () => this.handleRightScroll(formRef))
      });
  

    // 右侧每个表单的滚动事件 (方式2)
      // this.panes.forEach((pane, index) => {
        // console.log(pane,'-----我是循环注册事件----');
        // console.log(this.$refs[`rightForm-${pane.id}`]);
        // this.handleTabScroll(`rightForm-${pane.id}`);
        // this.$refs[`rightForm-${pane.id}`].addEventListener('scroll', this.handleRightScroll(`rightForm-${pane.id}`))
    // });
    
  },
  computed: {
    // 处理右侧绑定数据 和 label
    panes() {
      return this.inbound.map((item,index) => ({
        label: `tab${index + 1}`,
        id: item.id,
        data: item
      }));
    },
    //  处理左侧字典
    getOptions() {
      return function (item) {
        const dictionaryKey = item.prop;
        if (this.dictionaries[dictionaryKey]) {
          return this.dictionaries[dictionaryKey].map(dictItem => ({
            title: dictItem.name || dictItem.fullName || dictItem.shortName,
            value: dictItem.id
          }));
        }
        return [];
      };
    }
  },
  methods:{
    // 左侧 列表滚动事件
    handleScroll(){
      const dom = this.$refs[`leftSelect-${this.selectField}`]
      if (dom) {
        dom[0].blur()
      }

      // 单独针对日期关闭
      if(dom && dom[0]?.type && dom[0]?.type == 'date'){
        dom[0].hidePicker()
      }
    },
    // 左侧 在选择框打开的时候标记那个选择框被选中了
    handleFocus(field) {
      this.selectField = field
    },
    //左侧 失焦时，清除标记
    handleBlur() {
      this.selectField = ''
    },


    // 右侧滚动事件
    handleRightScroll(formRef){
      const dom = this.$refs[`rightSelect-${this.selectRightField}`]

      if (dom) {
        dom[this.index].blur()
      }
      if(dom && dom[0]?.type && dom[0]?.type == 'date'){
        dom[this.index].hidePicker()
      }
     
    },
    // 右侧 在选择框打开的时候标记那个选择框被选中了
    handleRightFocus(field){
      this.selectRightField = field
    },
    //右侧 失焦时，清除标记
    handleRightBlur(){
      this.selectRightField = ''
    },

    // tab点击
    handleClick(tab, event) {
        // console.log(tab, event);
        // console.log(tab.name,'所选项',tab.index,'所选的索引');
        this.index = tab.index
        this.selectRightField = ''
    },


    // 获取所有字段数据
    getDictionaries(){
    
    },
   
  },
  watch:{
    isDisabledLeft(newVal,oldVal){
      if(newVal){
        // 发送请求保存左侧表单数据
        console.log('左侧保存数据');
      }
    },
    isDisabledRight(newVal,oldVal){
      if(newVal){
        // 发送请求保存 右侧表单数据
        console.log('右侧保存数据');

      }
    },
     // 如果 inbound 发生变化，重新计算 panes
     inbound(newVal) {
      this.panes = newVal.map(item => ({
        label:  `tab${index + 1}`,
        id: item.id,
        data: item
      }));
    }
  }
};
</script>

<style scoped>
  /deep/.el-form--label-top .el-form-item__label {
    padding: 0 !important;
  }
.box {
  display: flex;
  justify-content: space-between;
  width: 95%;
  height: 100%;
  padding: 10px;
  background-color: #f7f7f7;
}
.left,
.right {
  width: 49%;
  height: 100%;
  height: 500px;
  overflow: auto;
  box-sizing: border-box;
}
.left .form-left-box, .right  .form-left-box{
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  background-color: #fff;
  
}

.left .form-left-box .item, .right .form-left-box .item{
  width: 49%;
  box-sizing: border-box;
  padding: 10px;
  background-color: #f0f0f0;
  /* margin-bottom: 10px; */
}
.left .footer, .right .footer {
  width: 80px;
  position: sticky;
  bottom: 50px;
  right: 30px;
  margin-left: 85%;
}


.right {
  padding: 10px;
  background-color: #fff;
  overflow: hidden;
}
.right-form {
  height: 420px;
  overflow: auto;
}

</style>
