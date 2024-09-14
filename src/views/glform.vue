
<template>
    <div class="box">
        <div class="left" ref="leftRef">
          <h3>待录入详情</h3>
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
        sharedData: {
          name: ''
        }
      };
    },
    computed: {
      form1Data() {
        return {
          ...this.sharedData,
          // 其他表单1的字段
        };
      },
      form2Data() {
        return {
          ...this.sharedData,
          // 其他表单2的字段
        };
      }
    }
  };
  </script>