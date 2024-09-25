<template>
  <div class="box">
    <div class="left" ref="leftRef">
      <h3 style="margin-bottom:16px">待录入详情</h3>
        <!-- 左侧表单 -->
      <el-form ref="form" :model="formLeft" :rules="configLeft.rules" label-width="80px" class="form-left-box" label-position="top" :disabled="isDisabledLeft">
        <el-form-item class="item" :label="item.label" :prop="item.prop" v-for="(item,index) in configLeft.formItems" :key="index">
           <!-- 配置文件类型是 input 框-->
           <template v-if="item.type == 'input'">
            <el-input
              v-model="formLeft[item.prop]"
              :placeholder="item.placeholder"
              :disabled="item.disabled || false"
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
              @change="updateProductLineDropdown(null, formLeft,true)"
              :placeholder="item.placeholder"
              :disabled="item.disabled || false"
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
            <div v-if="formLeft[item.prop] && formLeft[item.prop].trim() !== ''">
              <div v-for="(item,i) in formLeft[item.prop].split(',')" >
                <el-tooltip class="item" effect="dark" :content="item" placement="top">
                  <div class="box-tooltip"  style="width: 100%;padding: 0;"> 
                    <div class="tooltip-item">{{item || 暂无}}</div>
                  </div>
                </el-tooltip>
              </div>
            </div>
            <div v-else>暂无数据</div>
          </template>
          <!-- 配置文件是 textarea  文件-->
          <template v-else-if="item.type == 'textarea'">
            <el-input
              v-model="formLeft[item.prop]"
              :placeholder="item.placeholder"
              style="width: 100%"
              maxlength="2000"
              autosize
              show-word-limit
              type="textarea"
              clearable
            ></el-input>
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
          <el-form :model="pane.data" :ref="`rightForm-${pane.id}`" :rules="configLeft.rules" class="form-left-box right-form"  label-width="120px" label-position="top" :disabled="pane.id !== currentActiveTab || isDisabledRight" >
            <el-form-item class="item" :label="item.label" :prop="item.prop" v-for="(item,index) in configLeft.formItems" :key="index">
              <!-- 配置文件类型是 input 框-->
              <template v-if="item.type == 'input'">
               <el-input
                  v-model="pane.data[item.prop]"
                 :placeholder="item.placeholder"
                 style="width: 100%"
                 :disabled="item.disabled || false"
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
                 @change="updateProductLineDropdown(pane.id, pane.data,false)"
                 style="width: 100%"
                 clearable
               >
                 <el-option
                   v-for="options in getOptions(item,pane.productLineCopy)"
                   :label="options.title"
                   :value="options.value"
                   :key="options.value"
                   :disabled="item.disabled || false"
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
                <div v-if="pane.data[item.prop] && pane.data[item.prop].trim() !== ''">
                  <div v-for="(item,i) in pane.data[item.prop].split(',')" >
                    <el-tooltip class="item" effect="dark" :content="item" placement="top">
                      <div class="box-tooltip"  style="width: 100%;padding: 0;"> 
                        <div class="tooltip-item">{{item || 暂无}}</div>
                      </div>
                    </el-tooltip>
                  </div>
                </div>
                <div v-else>暂无数据</div>
             </template>
             <template v-else-if="item.type == 'textarea'">
              <el-input
                v-model="pane.data[item.prop]"
                :placeholder="item.placeholder"
                style="width: 100%"
                maxlength="2000"
                autosize
                show-word-limit
                type="textarea"
                clearable
              ></el-input>
            </template>
           </el-form-item>
          </el-form>
        </template>
      </el-tab-pane>  
     
      </el-tabs>
      <!-- 操作按钮 -->
      <div class="footer">
        <el-button type="primary"  @click="toggleEdit">{{isDisabledRight ? '编辑' : '保存'}}</el-button>
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
            type: 'input',
            disabled:true
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
            type:'multiple',
            disabled:true,
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
            type:'multiple',
            disabled:true,
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
            slot:'certificates',
            type:'file'
          },
          {
            label:'附件',
            prop:'attachements',
            rolus:'',
            slot:'attachements',
            type:'file'
          },
          {
            label:'备注',
            prop:'remark',
            rolus:'',
            slot:'remark',
            type:'textarea'
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
        projectAbbreviation: '',
        language: 'zh',
        productLine: [],
        standard: [],
        organization: ' 字典机构简称id',
        certificateType: '类型字典id',
        productModel: [],
        validDate: '2017-01-17 16:25:38',
        issueDate: '2020-12-08 06:16:08',
        applicableRegion: [],
        certifiedProductVersion: '认证产品版本',
        reason: '变更原因',
        certificateStatus: '证书状态',
        certificates: '信测-M2-报告-03-TR20240415 SC2500UD-P3 国内竞争性指标委托测试报告 CN.pdf,北京鉴衡认证中心-M2-报告-01-交流PLC宽带载波通讯性能等级认证_Level5_鉴衡认证报告_202309.pdf',
        attachements: '',
        remark: '备注',
        id: '1'
      },
       
      isDisabledRight:true,//禁用右侧表单
      currentActiveTab: '1',//记录当前激活的 Tab

     
      // 右侧tab项数据
      inbound:[
        {
          certificateReportNumber: 'pdf文件',
          projectAbbreviation: '',
          language: 'zh',
          productLine: [],
          standard: [],
          organization: ' 字典机构简称id',
          certificateType: '类型字典id',
          productModel: [],
          validDate: '2017-01-17 16:25:38',
          issueDate: '2020-12-08 06:16:08',
          applicableRegion: [],
          certifiedProductVersion: '认证产品版本',
          reason: '变更原因',
          certificateStatus: '证书状态',
          certificates: '',
          attachements: '附件',
          remark: '备注',
          id: '1'
        },
        {
          certificateReportNumber: 'pdf文件',
          projectAbbreviation: 'I-V扫描与智能诊断',
          language: 'zh',
          productLine: [],
          standard: [],
          organization: ' 字典机构简称id',
          certificateType: '类型字典id',
          productModel: [],
          validDate: '2017-01-17 16:25:38',
          issueDate: '2020-12-08 06:16:08',
          applicableRegion: [],
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
                  "id": "600",
                  "name": "line1"
              },
              {
                  "id": "601",
                  "name": "line2"
              },
              {
                  "id": "602",
                  "name": "line3"
              },
              {
                  "id": "603",
                  "name": "line4"
              }
          ],
          "standard": [
            {
               "id":"619460322461487488",
               "name":"CGC/GF 035:2013",
              //  "projectAbbreviation":"",
               "applicableRegion": [
                    {
                       "id":"700",
                       "name":"美洲大区"
                    }
                ]
            },
            {
               "id":"619460723655053696",
               "name":"CGC/GF 086:2021",
               "projectAbbreviation":"bbb",
               "applicableRegion": [
                    {
                       "id":"701",
                       "name":"中国大区"
                    }
                ]
            },
            {
               "id":"622539668016206208",
               "name":"SG8K-D",
               "projectAbbreviation":"aaaa",
               "applicableRegion": [
                    {
                       "id":"702",
                       "name":"东南亚大区"
                    }
                ]
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
                  "id":"700",
                  "name":"美洲大区"
              },
              {
                 "id":"701",
                 "name":"中国大区"
              },
              {
                 "id":"702",
                 "name":"东南亚大区"
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
          "productModel": [
              {
                  "id": "1",
                  "name": "型号1",
                  productLine: [
                    //产品型号--> 产品线(多个)
                    {
                      "id": "600",
                      "name": "line1"
                    },
                    {
                        "id": "601",
                        "name": "line2"
                    },
                    
                  ]
              },
              {
                  "id": "2",
                  "name": "型号2",
                  productLine: [
                    //产品型号--> 产品线(多个)
                    {
                        "id": "602",
                        "name": "line3"
                    },
                    {
                        "id": "603",
                        "name": "line4"
                    }
                  ]
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
    setTimeout(()=>{
      this.$refs.leftRef.addEventListener('scroll', this.handleScroll)
      const allFormRefs = Object.keys(this.$refs).filter(ref => ref.startsWith('rightForm-'));
      allFormRefs.forEach(formRef => {
        this.$refs[formRef][0].$el.addEventListener('scroll',  () => this.handleRightScroll(formRef))
      });
    },5000)


   
    // // 右侧每个表单的滚动事件 （方式1）
    // const allFormRefs = Object.keys(this.$refs).filter(ref => ref.startsWith('rightForm-'));
    //   allFormRefs.forEach(formRef => {
    //     this.$refs[formRef][0].$el.addEventListener('scroll',  () => this.handleRightScroll(formRef))
    //   });
    

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
        label: `tab${index + 1}已入库详情`,
        id: item.id,
        data: item,
        // 创建一个 productLine 的副本,防止全局的字典改变
        productLineCopy: this.dictionaries.productLine.slice()
      }));
    },
    //  处理左侧字典
    // getOptions() {
    //   return function (item) {
    //     console.log(item,'----------');
    //     const dictionaryKey = item.prop;
    //     if (this.dictionaries[dictionaryKey]) {
    //       return this.dictionaries[dictionaryKey].map(dictItem => ({
    //         title: dictItem.name || dictItem.fullName || dictItem.shortName,
    //         value: dictItem.id
    //       }));
    //     }
    //     return [];
    //   };
    // }

     getOptions() {
      return function (item, productLineCopy = this.dictionaries.productLine) {
              // console.log(item,'----------'); 
              if (item.prop === 'productLine') {
              return productLineCopy.map(line => ({
                title: line.name,
                value: line.id
              }));
            }
              const dictionaryKey = item.prop;
              if (this.dictionaries[dictionaryKey]) {
                return this.dictionaries[dictionaryKey].map(dictItem => ({
                  title: dictItem.name || dictItem.fullName || dictItem.shortName,
                  value: dictItem.id
                }));
              }
              return [];
      };
    },
  },
  methods:{
    // 左侧 列表滚动事件
    handleScroll(){
      const dom = this.$refs[`leftSelect-${this.selectField}`]
      if (dom) {
        dom[0].blur()
      }

      // 单独针对日期关闭
      if(dom && dom[0].type && dom[0].type == 'date'){
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
      if(dom && dom[this.index].type && dom[this.index].type == 'date'){
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
        console.log(tab.name,'所选项',tab.index,'所选的索引');
        this.index = tab.index
        this.currentActiveTab = tab.name; // tab.name 是id
        this.selectRightField = ''
        this.isDisabledRight = true; // 默认禁用所有表单
    },
    toggleEdit() {
      this.isDisabledRight = !this.isDisabledRight;

      if(this.isDisabledRight){
        console.log('我需要请求税局');
        const currentForm = this.panes.find(pane => pane.id === this.currentActiveTab);

        if (!currentForm) {
          console.error('找不到当前激活的 Tab 的数据');
          return;
        }

        console.log(currentForm,'我是要提交的表单');
        console.log(this.$refs[`rightForm-${this.currentActiveTab}`],'---我是要提交表单的dom----');

        this.$refs[`rightForm-${this.currentActiveTab}`][0].validate((valid) => {
          if (!valid) {
            this.isDisabledRight = false;
            return
          } 
          // 请求
        });
      }
    },

    // 获取所有字段数据
    getDictionaries(){
    
    },
  

    // 根据所选产品型号 动态的处理  产品线  |  根据所选标准  动态的处理 适用区域 & 项目简称 
   updateProductLineDropdown(tabId = null, modelIds,type = false) {
  //  console.log('当前tab的id:', tabId, '右侧所有的数组', modelIds);

    let currentForm = null
    if(type){
      currentForm = this.formLeft
    }else{
      currentForm = this.panes.find(pane => pane.id == tabId); // 找出当前激活tabs所对应的双向绑定的表单
    }

 
    console.log(currentForm,'我是所选择的表单');

    if (!currentForm) {
      console.error('找不到当前激活的 Tab 的数据');
      return;
    }

    const modelItem = this.configLeft.formItems.find(item => item.prop === 'productModel'); // 从配置里面找出产品型号这一项
    const standardItem = this.configLeft.formItems.find(item => item.prop === 'standard'); // 从配置里寻找标准项

    if ((modelItem && modelItem.type === 'multiple' && modelItem.prop == 'productModel') || (standardItem && standardItem.type === 'multiple' && standardItem.prop == 'standard')) {

      let selectedModels = type ? currentForm.productModel : currentForm.data.productModel // 所选择的产品型号  [id]
      let selectedStandards = type ? currentForm.standard : currentForm.data.standard
      let combinedProductLines = [];
      let combinedStandards = []
      let combineProjectAbbreviation = ''

      selectedModels.forEach(modelId => {
        const productLinesForModel = this.dictionaries.productModel.find(p => p.id === modelId).productLine;  //产品型号所对应的产品线
        combinedProductLines = combinedProductLines.concat(productLinesForModel);
      });

      selectedStandards.forEach(standardId =>{
        const applicableRegionForStandar =   this.dictionaries.standard.find(s =>s.id === standardId).applicableRegion
        const applicableRegionForProjectAbbreviation =   this.dictionaries.standard.find(s =>s.id === standardId).projectAbbreviation
        combinedStandards = combinedStandards.concat(applicableRegionForStandar)

        if(applicableRegionForProjectAbbreviation){ //防止取出来的字段是空
          combineProjectAbbreviation = combineProjectAbbreviation + applicableRegionForProjectAbbreviation + ','
        }
      })

      //以防重复  去重
      const uniqueProductLines = [...new Set(combinedProductLines)];
      const uniqueApplicableRegions = [...new Set(combinedStandards)]
  
      
      // 更新当前表单的 productLineCopy
      // currentForm.productLineCopy = uniqueProductLines;
      
      // modelItem.options = uniqueProductLines.map(option => ({
      //   title: option.name,
      //   value: option.id
      // }));


      // 更新当前表单中的 productLine | applicableRegion | projectAbbreviation 字段
      type ? currentForm.productLine = uniqueProductLines.map(option => option.id) : currentForm.data.productLine = uniqueProductLines.map(option => option.id)
      type ? currentForm.applicableRegion = uniqueApplicableRegions.map(option => option.id) : currentForm.data.applicableRegion = uniqueApplicableRegions.map(option => option.id)
      type ? currentForm.projectAbbreviation = combineProjectAbbreviation.slice(0, -1) : currentForm.data.projectAbbreviation = combineProjectAbbreviation.slice(0, -1)
    }
  },
  },
  watch:{
    isDisabledLeft(newVal,oldVal){
      if(newVal){
        // 发送请求保存左侧表单数据
        this.$refs.form.validate((valid) => {
          if (!valid) {
            this.isDisabledLeft = false
            return
          } 
          // 请求
          console.log(this.$refs.form,'=======');
        });
      }
    },
    // 动态的监听产品型号下拉
    // panes: {
    //   handler(newVal, oldVal) {
    //     this.updateProductLineDropdown(this.currentActiveTab,newVal);
    //   },
    //   deep: true
    // },
    currentActiveTab(newVal,oldVal){
      // 仅在切换 Tab 时重置表单字段
      if (newVal !== oldVal) {
        this.$refs[`rightForm-${newVal}`][0].resetFields(); // 每次点击的时候重置表单
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
  },
  // 移除滚动事件监听器
  beforeDestroy() {
    console.log('我被销毁了');
    this.$refs.leftRef.removeEventListener('scroll', this.handleScroll)

    const allFormRefs = Object.keys(this.$refs).filter(ref => ref.startsWith('rightForm-'));
    allFormRefs.forEach(formRef => {
        this.$refs[formRef][0].$el.removeEventListener('scroll',  () => this.handleRightScroll(formRef))
    });
  },
};
</script>

<style scoped>

  /deep/.el-form--label-top .el-form-item__label {
    padding: 0 !important;
  }
  /* 设置滚动条样式 */
 ::-webkit-scrollbar {
  width: 3px;
  border-radius: 3px;
 }
 ::-webkit-scrollbar-thumb{
  background-color: #ccc;
 }
 ::-webkit-scrollbar-track{
  background-color: #f1f1f1;
 }
 ::-webkit-scrollbar-track-piece {
  background-color: transparent;
  -webkit-border-radius: 6px;
  }
  ::-webkit-scrollbar-thumb:vertical {
  background-color: #ccc;
  -webkit-border-radius: 6px;
}

::-webkit-scrollbar-thumb:horizontal {
  background-color: #ccc;
  -webkit-border-radius: 6px;

}
 /* 设置滚动条在hover状态下的样式 */
 ::-webkit-scrollbar-thumb:hover{
  background-color: #888;
 }
  
.box {
  display: flex;
  justify-content: space-between;
  width: 98%;
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
  /* background-color: #f0f0f0; */
  border-radius: 5px;
  margin-bottom: 0 !important;
}
.left .footer, .right .footer {
  width: 80px;
  position: sticky;
  bottom: 50px;
  right: 30px;
  margin-left: 85%;
}
.left .box-tooltip,.right .box-tooltip{
  width: 100%;
}
.left .box-tooltip .tooltip-item, .right .box-tooltip .tooltip-item{
  width: 100%;
  height: 40px;
  background-color: #f5f7fa;
  margin-bottom: 2px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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
