<template>
  <div class="password">
    <div class="content">
      <h2 class="title">重置密码</h2>
      <!-- 密码表单 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        class="demo-ruleForm"
      >
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model.trim="form.newPassword" @focus="visible = true" @blur="visible = false"></el-input>
          <!-- 弹框提示 -->
          <el-popover
            placement="bottom"
            width="250"
            trigger="manual"
            :visible-arrow="true"
            v-model="visible"
          >
            <div>
              <h4 class="tit">您的密码必须满足:</h4>
              <div class="p_dialog">
                <div class="item"><i :class="{'active':minSix}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':minSix}">密码最小长度6位</span></div>
                <div class="item"><i :class="{'active':containsUppercaseLetters}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':containsUppercaseLetters}">必须包含大写字母</span></div>
                <div class="item"><i :class="{'active':containsLowercaseLetters}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':containsLowercaseLetters}">必须包含小写字母</span></div>
                <div class="item"><i :class="{'active':containsNumericCharacters}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':containsNumericCharacters}">必须包含数字字符</span></div>
                <div class="item"><i :class="{'active':containsSpecialCharacters}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':containsSpecialCharacters}">必须包含特殊字符</span></div>
              </div>
              <h4 class="tit">密码强度:</h4>
              <div class="strength">
                <div class="weak" :class="{'weakactive':weakFlag}">弱</div>
                <div class="centre" :class="{'centreactive':centreFlag}">中</div>
                <div class="strong" :class="{'strongactive':strongFlag}">强</div>
              </div>
            </div>
          </el-popover>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input v-model.trim="form.confirmPassword"></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="save">设置</div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios'
  console.log('axios',axios);
export default {
  name: "psd",
  props: {
    // 国际化请求api
    i8:{
      type:String,
      default:function(){
        return ''
      }
    },

  },
  data() {
    var checkPassword = (rule, value, callback) =>{
      if(value != this.form.newPassword){
       return callback(new Error('请保持两次密码一致'))
      }
      callback()
    }
    return {
      minSix:false,//最小长度为6
      containsUppercaseLetters:false,//必须包含大写字母
      containsLowercaseLetters:false,//必须包含小写字母
      containsNumericCharacters:false,//必须包含数字字符 0-9的数字
      containsSpecialCharacters:false,//必须包含特殊字符
      weakFlag:false,
      centreFlag:false,
      strongFlag:false,
      visible: false,
      form: {
        newPassword: "",
        confirmPassword: "",
      },
      rules: {
        newPassword: [
          { required: true, message: "请输入新密码", trigger: "blur" },
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          {validator: checkPassword, trigger: 'blur'}
        ],
      },
    };
  },
  created(){
    this.getI8Data(this.i8)
  },
  watch:{
    'form.newPassword':{
      deep: true,
      handler:function(newValue,oldValue) {
        // console.log('我监听到了密码改变',newValue);
        // console.log(/^.{6,}$/.test(newValue));
        // console.log(/[A-Z]/.test(newValue));
        // console.log(/[a-z]/.test(newValue));
        // console.log(/[0-9]/.test(newValue));
        // console.log(/(?=.*[!@#$%^&*])/.test(newValue));
        this.minSix = /^.{6,}$/.test(newValue);
        this.containsUppercaseLetters = /[A-Z]/.test(newValue)
        this.containsLowercaseLetters = /[a-z]/.test(newValue)
        this.containsNumericCharacters = /[0-9]/.test(newValue)
        this.containsSpecialCharacters = /(?=.*[!@#$%^&*])/.test(newValue)
      }
    }
  },
  methods: {
    // 请求国际化数据
    getI8Data(porxy){
      console.log(porxy,'----------');
    },
    save(){
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return this.$message({
          message: '请正确填写密码',
          type: 'warning'
        });
        this.$emit('save',111)
      })
    }
  },
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.password {
  position: relative;
  width: 100%;
  height: 100%;
  background: url('~@/assets/logo.png') no-repeat top;
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 28%;
  min-height: 320px;
  border-radius: 10px;
  background-color: #fff;
  padding: 20px;
}
.title {
  font-weight: 400;
  letter-spacing: 1px;
  margin-bottom: 20px;
}
.btn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  margin-top: 30px;
  border-radius: 5px;
  background-color: orange;
  color: #fff;
}
.p_dialog {
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  padding-left: 30px;
}
.tit {
  margin-bottom: 10px;
}
.item {
  margin-bottom: 2px;
}
.m_left {
  margin-left: 8px;
  font-size: 15px;
}
.strength {
  display: flex;
}
.weak,.centre,.strong {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33%;
  height: 20px;
  color: #fff;
  background-color: #ccc;
}
.weakactive {
  background-color: red;
}
.centreactive {
  background-color: orange;
}
.strongactive {
  background-color: #2e993b;
}
.active {
  color: #2e993b;
}
/* 增加input的下间距--校验提示语显示完全 */
.content /deep/.el-form-item__content {
  margin-bottom: 10px;
}
.content /deep/.el-form--label-top .el-form-item__label {
  padding: 0;
}
.content /deep/.el-popover {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
}
</style>
