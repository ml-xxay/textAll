<template>
  <!-- 搜索表单组件 -->
  <div>
    <el-form
      class="form"
      :label-width="labelWidth"
      :model="value"
      :rules="rules"
      ref="fm"
      
    >
      <el-row>
        <!-- 循环所有搜索表单项数据 -->
        <template v-for="item in formItems">
          <el-col v-bind="colLayout">
            <el-form-item
              v-if="!item.isHidden"
              :label="item.label"
              :style="itemStyle"
              :prop="item.field"
            >
              <!-- 配置文件类型是 input 和 password 显示input框-->
              <template v-if="item.type == 'input' || item.type == 'password'">
                <!-- v-model="formDate[item.field]"  双向绑定的形式
                 :value="value[item.field]"   @input="handleValueChange($event, item.field)" 第三种 不双向绑定的形式 自己手动写 -->
                <el-input
                  :value="value[item.field]"
                  @input="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  :show-password="item.type == 'password'"
                  clearable
                ></el-input>
              </template>
              <!-- 配置文件类型是 select下拉选择框 显示下拉-->
              <template v-else-if="item.type == 'select'">
                <el-select
                  :value="value[item.field]"
                  @input="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="options in item.options"
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
                  :value="value[item.field]"
                  @input="handleValueChange($event, item.field)"
                  :placeholder="item.placeholder"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="options in item.options"
                    :label="options.title"
                    :value="options.value"
                  >
                  </el-option>
                </el-select>
              </template>
              <!-- 配置文件类型是 datepicker时间 显示时间-->
              <template v-else-if="item.type == 'datepicker'">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  :value="value[item.field]"
                  @input="handleValueChange($event, item.field)"
                  style="width: 100%"
                  v-bind="item.otherOptions"
                  clearable
                ></el-date-picker>
              </template>
              <!-- 配置文件是 单个日期 datepickerone 时间  显示单个的日期-->
              <template v-else-if="item.type == 'datepickerone'">
                <el-date-picker
                  value-format="yyyy-MM-dd"
                  :value="value[item.field]"
                  @input="handleValueChange($event, item.field)"
                  type="date"
                  style="width: 100%"
                  :placeholder="item.placeholder"
                  clearable
                >
                </el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
        <!-- 底部插槽 -->
        <div class="footer">
          <slot name="footer"> </slot>
        </div>
      </el-row>
    </el-form>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    // 传来的需要双向绑定的字段   这是 v-model="formDate" 传过来的数据
    value: {
      //value 是v-model作用在子组件身上  默认value接收数据  然后还有一个默认emit的input事件   vue3默认就是modelValue接收数据
      type: Object,
      required: true,
    },

    // 下面这是 v-bind="searchFormConfig" 传过来的数据
    // 传来的配置数据
    formItems: {
      type: Array,
      default: () => [],
    },
    rules: {
      type: Object,
      default: () => ({}),
    },
    // lable的宽度
    labelWidth: {
      type: String,
      default: '100px',
    },
    // 传过来的样式
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' }),
    },
    // 传来的 一行显示几个
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
  },
  data() {
    return {
      // formDate: {},
      // formDate: { ...this.value }, // 2第二种方式
      // formDate: this.value, // 2第二种方式/
    }
  },
  computed: {
    // 1第一种方式
    // // 因为双向绑定字段 是父组件传过来的  我们要符合vue设计的单向数据流的原理 使用emit来发射事件
    // formDate: {
    //   get() {
    //     return this.value //v-model作用在子组件身上传来的数据  这样也是直接引用 不太好
    //   },
    //   set(newValue) {
    //     this.$emit('input', newValue) //v-model作用在子组件身上默认回传的方法 input
    //   },
    // },
  },
  watch: {
    // 2.1第二种方式  这样比较好一点  自己监听数据改变发送事件 formDate这个数据是这个页面的
    // formDate: {
    //   //这里因为data里面的 formDate 做了浅拷贝  所以只有输入框值改变之后才能监听到 点击重置时监听不到
    //   //监听的对象
    //   deep: true, //深度监听设置为 true
    //   // immediate: true,
    //   handler: function (newValue, oldV) {
    //     this.$emit('input', newValue)
    //   },
    // },
  },
  created() {},
  methods: {
    // 第三种方式  自己监听输入框值的变化 触发这个方法  这个方法来自vue v-model的语法糖 @input方法 值绑定是:value
    handleValueChange(newValue, field) {
      //值 newValue, 字段名field
      //第一个参数默认是值   第二个参数是字段名     [field]: newValue 这个替换掉...this.value里面原有的字段和值
      this.$emit('input', { ...this.value, [field]: newValue }) // ...this.value 这里直接引用的  所以重置的时候也能触发
    },
  },
  mounted() {},
}
</script>
<style scoped lang="less">
// .handel-btns {
//   text-align: right;
//   padding: 0 50px 20px 0;
// }
// .form {
//   // background-color: #ccc;
// }
.footer {
  padding-top: 10px;
}
.el-form-item {
  margin-bottom: 15px;
}
</style>
