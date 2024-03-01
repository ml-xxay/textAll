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
                <!-- 改用后端顶的校验贵则 -->
                <div class="item" v-for="(item,index) in text"><i :class="{'active':rulesAll[index][index]}" class="el-icon-circle-check"></i><span class="m_left" :class="{'active':rulesAll[index][index]}">{{item.desc}}</span></div>
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
          // { min: 6, max: 10, message: '长度在 6 到 10 个字符', trigger: 'blur' }
        ],
        confirmPassword: [
          { required: true, message: "请确认密码", trigger: "blur" },
          { validator: checkPassword, trigger: 'blur' }
        ],
      },
      rulesAll:[],
      text: [
              {
                  "descriptionMsgKey": "msg.password.length.required.8.characters",
                  "regexExpression": "^.{8,}$",
                  "desc": "密码最小长度8位",
                  "i18nDesc": "密码最小长度8位"
              },
              {
                  "descriptionMsgKey": "msg.password.must.contain.uppercase.char",
                  "regexExpression": "[A-Z]",
                  "desc": "密码必须包含大写字母",
                  "i18nDesc": "密码必须包含大写字母"
              },
              {
                  "descriptionMsgKey": "msg.password.must.contain.lowercase.char",
                  "regexExpression": "[a-z]",
                  "desc": "密码必须包含小写字母",
                  "i18nDesc": "密码必须包含小写字母"
              },
              {
                  "descriptionMsgKey": "msg.password.must.contain.numbers",
                  "regexExpression": "[0-9]",
                  "desc": "密码必须包含数字",
                  "i18nDesc": "密码必须包含数字"
              },
              {
                  "descriptionMsgKey": "msg.password.must.contain.special.char",
                  "regexExpression": "[!@#\\$%\\^&\\*\\(\\)\\-\\+=_{}\\[\\]:;'\"<>,.?/]",
                  "desc": "密码必须包含特殊字符",
                  "i18nDesc": "密码必须包含特殊字符"
              }
          ]
    }
  },
  created(){
    // this.getI8Data(this.i8)
    this.getRules()
  },
  watch:{
    'form.newPassword':{
      deep: true,
      handler:async function(newValue,oldValue) {
        // 用后端订的校验规则
       await this.text.forEach((item,index) => {
          this.rulesAll[index][index] = item.regexExpression.test(newValue)
        })
        
        let countTrue = this.rulesAll.reduce((count, item, index) => count + (item[index] === true ? 1 : 0), 0);
        // console.log(countTrue);
        if(countTrue == 0){
          this.weakFlag = false
          this.centreFlag = false
          this.strongFlag = false
        }else if(countTrue / this.text.length * 100 < 33) {
          this.weakFlag = true
          this.centreFlag = false
          this.strongFlag = false
        }else if(countTrue / this.text.length * 100 >= 33 && countTrue / this.text.length * 100 < 66) {
          this.centreFlag = true
          this.strongFlag = false
        }else {
          this.strongFlag = true
        }
      }
    }
  },
  methods: {
    // 请求国际化数据
    getI8Data(porxy){
      console.log(porxy,'----------');
      axios.post(`/${porxy}`, {}).then(function (response) {
        console.log(response);
      }).catch(function (error) {
        this.$message.error(error)
     });
    },
    // 请求密码规则校验
    getRules(){
      // 测试用例
      this.text.forEach((item,index) => {
        item.regexExpression = new RegExp(item.regexExpression)
        this.rulesAll.push({[index]:false})
      });
      // 真正调接口使用
      // axios.post(``, {}).then(function (response) {
      //   response.data.forEach((item,index) => {
      //    item.regexExpression = new RegExp(item.regexExpression)
      //    this.rulesAll.push({[index]:false})
      //   });
      //   console.log(response);
      // }).catch(function (error) {
      //   this.$message.error(error)
      // });
    },
    save(){
      this.$refs.ruleForm.validate(async valid => {
        if (!valid) return this.$message({
          message: '请正确填写密码',
          type: 'warning'
        });
        this.$emit('save',this.form)
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
  min-width: 350px;
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
  /* 需使用项目配置色  先预留 */
  /* background-color: var(--color-background); */ 
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
