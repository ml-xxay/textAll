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
        <!-- 新密码 -->
        <el-form-item
          :label="obj['msg.modify.password.newPassword'] || '新密码'"
          prop="newPassword"
        >
          <el-input
            v-model.trim="form.newPassword"
            @focus="visible = true"
            @blur="visible = false"
            show-password
          ></el-input>
          <!-- 弹框提示 -->
          <el-popover
            placement="bottom"
            width="250"
            trigger="manual"
            :visible-arrow="true"
            v-model="visible"
          >
            <div>
              <h4 class="tit">
                {{ obj["msg.modify.password.passwordMustMeet"] }}:
              </h4>
              <div class="p_dialog" v-if="text.length > 0">
                <!-- 改用后端顶的校验贵则 -->
                <div class="item" v-for="(item, index) in text">
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
                <!-- 弱 -->
                <div class="weak" :class="{ weakactive: weakFlag }">
                  {{ obj["msg.modify.password.weak"] }}
                </div>
                <!-- 中 -->
                <div class="centre" :class="{ centreactive: centreFlag }">
                  {{ obj["msg.modify.password.centre"] }}
                </div>
                <!-- 强 -->
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
          <el-input v-model.trim="form.confirmPassword" show-password></el-input>
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
  name: "psd",
  props: {
    // 国际化请求api
    i8: {
      type: String,
      default: function () {
        return "/uaa/queryI18nValue";
      },
    },
    // 校验规则请求
    formRules: {
      type: String,
      default: function () {
        return "/uaa/passwordStrengthRules";
      },
    },
    // 语言
    language: {
      type: String,
      default: function () {
        return "zh_CN";
      },
    },
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
      },
      rules: {
        newPassword: [],
        confirmPassword: [{ validator: checkPassword, trigger: "blur" }],
      },
      rulesAll: [],
      text: [ // 模拟后端数据
        {
          descriptionMsgKey: "msg.password.length.required.8.characters",
          regexExpression: "^.{8,}$",
          desc: "密码最小长度8位",
          i18nDesc: "密码最小长度8位",
        },
        {
          descriptionMsgKey: "msg.password.must.contain.uppercase.char",
          regexExpression: "[A-Z]",
          desc: "密码必须包含大写字母",
          i18nDesc: "密码必须包含大写字母",
        },
        {
          descriptionMsgKey: "msg.password.must.contain.lowercase.char",
          regexExpression: "[a-z]",
          desc: "密码必须包含小写字母",
          i18nDesc: "密码必须包含小写字母",
        },
        {
          descriptionMsgKey: "msg.password.must.contain.numbers",
          regexExpression: "[0-9]",
          desc: "密码必须包含数字",
          i18nDesc: "密码必须包含数字",
        },
        {
          descriptionMsgKey: "msg.password.must.contain.special.char",
          regexExpression: "[!@#\\$%\\^&\\*\\(\\)\\-\\+=_{}\\[\\]:;'\"<>,.?/]",
          desc: "密码必须包含特殊字符",
          i18nDesc: "密码必须包含特殊字符",
        },
      ],
    };
  },
  created() {
    this.getI8Data(this.language, this.i8);
    this.getRules(this.formRules);
    this.initRules();
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
    getI8Data(language, proxy) {
      let that = this;
      var params = {
        locale: language,
        i18nKeys: [
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
        .post(`http://10.13.77.218:8080/uaa/queryI18nValue`, params)
        .then(function (response) {
          // axios.post(`${proxy}`, params).then(function (response) {
          that.obj = response?.data?.data || {};
        })
        .catch(function (error) {
          this.$message.error(error);
        });
    },
    // 请求密码规则校验
    getRules(formRules) {
      let that = this;
      axios
        .post(`http://10.13.77.218:8080/uaa/passwordStrengthRules`, {})
        .then(function (response) {
          // axios.post(`${formRules}`, {}).then( function (response) {
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
    save() {
      this.$refs.ruleForm.validate(async (valid) => {
        if (!valid)
          return this.$message({
            message: this.obj["msg.modify.password.p_fillInPassword"],
            type: "warning",
          });
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
  background: url("~@/assets/logo.png") no-repeat top;
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
