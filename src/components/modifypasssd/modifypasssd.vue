<template>
  <div class="password">
    <div class="content">
      <h2 class="title">
        {{ obj["msg.modify.password.title"] || "重置密码" }}
      </h2>
      <!-- 密码表单 -->
      <el-form
        :model="form"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        label-position="top"
        class="demo-ruleForm"
      >
        <!-- 原密码 -->
        <el-form-item v-if="showOriPassword"
          :label="obj['msg.modify.password.oriPassword'] || '原密码'"
          prop="oldPassword"
        >
          <el-input
            v-model.trim="form.oldPassword"
            show-password
          ></el-input>
        </el-form-item>
        <!-- 新密码 -->
        <el-form-item
          :label="obj['msg.modify.password.newPassword'] || '新密码'"
          prop="newPassword"
        >
          <!-- 弹框提示 -->
          <el-popover
            placement="bottom"
            width="250"
            trigger="manual"
            v-model="visible"
            
          >
            <el-input
              v-model.trim="form.newPassword"
              slot="reference"
              @focus="visible = true"
              @blur="visible = false"
              show-password
            ></el-input>
            <div>
              <h4 class="tit">
                {{ obj["msg.modify.password.passwordMustMeet"] }}:
              </h4>
              <div class="p_dialog" v-if="text.length > 0">
                <!-- 改用后端顶的校验贵则 -->
                <div class="item" v-for="(item, index) in text" :key="index">
                  <i
                    :class="{ active: rulesAll[index][index] }"
                    class="el-icon-circle-check"
                  ></i
                  ><span
                    class="m_left"
                    :class="{ active: rulesAll[index][index] }"
                    >{{ item.i18nDesc }}</span
                  >
                </div>
              </div>
              <h4 class="tit">
                {{ obj["msg.modify.password.passwordStrength"] }}:
              </h4>
              <div class="strength">
                <div class="weak" :class="{ weakactive: weakFlag }">
                  {{ obj["msg.modify.password.weak"] }}
                </div>
                <div class="centre" :class="{ centreactive: centreFlag }">
                  {{ obj["msg.modify.password.centre"] }}
                </div>
                <div class="strong" :class="{ strongactive: strongFlag }">
                  {{ obj["msg.modify.password.strong"] }}
                </div>
              </div>
            </div>
          </el-popover>
        </el-form-item>
        <!-- 确认密码 -->
        <el-form-item
          :label="obj['msg.modify.password.confirmPassword'] || '确认密码'"
          prop="confirmPassword"
        >
          <el-input
            v-model.trim="form.confirmPassword"
            @press.enter.native="passwordSave"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btn" @click="save">
        {{ obj["msg.modify.password.set_up"] || "设置" }}
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "ModifyPassword",
  props: {
    // 请求域名
    admin: {
      type: String,
      default: "https://sso-sit.sungrow.cn",
    },
    // 语言
    language: {
      type: String,
      default: function () {
        return "zh_CN";
      },
    },
    // 原密码展示
    showOriPassword: {
      type: Boolean,
      default: function(){
        return false
      },
    },
    showOneLogin:{
      type:Boolean,
      default:function(){
        return false
      }
    }
  },
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value != this.form.newPassword) {
        return callback(
          new Error(this.obj["msg.modify.password.p_TwoPasswordsConsistent"])
        );
      }
      callback();
    };
    return {
      obj: {},
      weakFlag: false,
      centreFlag: false,
      strongFlag: false,
      visible: false,
      form: {
        newPassword: "",
        confirmPassword: "",
        oldPassword:""//原密码
      },
      rules: {
        newPassword: [],
        confirmPassword: [{ validator: checkPassword, trigger: "blur" }],
      },
      rulesAll: [],
      text: [],
    };
  },
 async created() {
    await this.getI8Data(this.language);
    this.getRules();
    this.initRules();
    if(this.showOneLogin){
      this.$message.warning(this.obj["msg.first.modify.password.note"] || '首次登录，请修改密码')
    }
  },
  watch: {
    "form.newPassword": {
      deep: true,
      handler: async function (newValue, oldValue) {
        // 用后端订的校验规则
        await this.text.forEach((item, index) => {
          this.rulesAll[index][index] = item.regexExpression.test(newValue);
        });

        let countTrue = this.rulesAll.reduce(
          (count, item, index) => count + (item[index] === true ? 1 : 0),
          0
        );
        // console.log(countTrue);
        if (countTrue == 0) {
          this.weakFlag = false;
          this.centreFlag = false;
          this.strongFlag = false;
        } else if ((countTrue / this.text.length) * 100 < 33) {
          this.weakFlag = true;
          this.centreFlag = false;
          this.strongFlag = false;
        } else if (
          (countTrue / this.text.length) * 100 >= 33 &&
          (countTrue / this.text.length) * 100 < 66
        ) {
          this.centreFlag = true;
          this.strongFlag = false;
        } else {
          this.strongFlag = true;
        }
      },
    },
  },
  methods: {
    // 初始化校验
    initRules() {
      this.rules.oldPassword = [
        {
          required: this.showOriPassword,
          message: this.obj["msg.modify.password.p_oriPassword"],
          trigger: "blur",
        },
      ];
      this.rules.newPassword = [
        {
          required: true,
          message: this.obj["msg.modify.password.p_newPassword"],
          trigger: "blur",
        },
      ];
      this.rules.confirmPassword.push({
        required: true,
        message: this.obj["msg.modify.password.p_confirmPassword"],
        trigger: "blur",
      });
    },
    // 请求国际化数据
    getI8Data(language) {
      let that = this;
      var result =  that.showOneLogin ? "msg.first.modify.password.note" : ''
      var params = {
        locale: language,
        i18nKeys: [
          result,//首登的提示动态显示
          "msg.modify.password.oriPassword", //原密码
          "msg.modify.password.title", //重置密码
          "msg.modify.password.newPassword", //新密码
          "msg.modify.password.confirmPassword", //确认密码
          "msg.modify.password.set_up", //设置
          "msg.modify.password.p_newPassword", //请输入新密码
          "msg.modify.password.p_confirmPassword", //请确认密码
          "msg.modify.password.p_fillInPassword", //请正确填写密码,
          "msg.modify.password.passwordMustMeet", //您的密码必须满足,
          "msg.modify.password.passwordStrength", //密码强度,
          "msg.modify.password.weak", //弱,
          "msg.modify.password.centre", //中,
          "msg.modify.password.strong", //强,
          "msg.modify.password.p_TwoPasswordsConsistent", //请保持两次密码一致
        ],
      };
      axios
        .post(`${this.admin}/uaa/queryI18nValue`, params)
        .then(function (response) {
          that.obj = response?.data?.data || {};
        })
        .catch(function (error) {
          this.$message.error(error);
        });
    },
    // 请求密码规则校验
    getRules() {
      let that = this;
      axios
        .post(`${this.admin}/uaa/passwordStrengthRules`, {})
        .then(function (response) {
          that.text = response.data.data || [];
          response?.data?.data?.forEach((item, index) => {
            item.regexExpression = new RegExp(item.regexExpression);
            that.rulesAll.push({ [index]: false });
          });
        })
        .catch(function (error) {
          that.$message.error(error);
        });
    },
    passwordSave(evt) {
      if (evt.keyCode === 13) {
        this.save();
      }
    },
    save() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid)
          return this.$message({
            message: this.obj["msg.modify.password.p_fillInPassword"],
            type: "warning",
          });
          console.log('ikosdoihaoishfou--------------');
        this.$emit("save", this.form);
      });
    },
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
}
.content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
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
  /* 需使用项目配置色  先预留 */
  background-color: var(--color-background);
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
.weak,
.centre,
.strong {
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
.content /deep/ .el-form-item__content {
  margin-bottom: 10px;
}
.content /deep/ .el-form--label-top .el-form-item__label {
  padding: 0;
}
.content /deep/ .el-popover {
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
</style>
