<template>
  <div class="password">
    <div class="content">
      <h2 class="title">重置密码</h2>
      <!-- 密码表单 -->
      <el-form :model="form" :rules="rules" ref="ruleForm" label-width="100px" label-position="top" class="demo-ruleForm">
        <el-form-item label="新密码" prop="newPassword">
          <el-input v-model="form.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
            <el-input v-model="form.confirmPassword"></el-input>
          </el-form-item>
      </el-form>
      <div class="btn">设置</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "psd",
  props: {},
  data() {
    return {
        form: {
         newPassword:'',
         confirmPassword:''
        },
        rules: {
           newPassword: [
            { required: true, message: '请输入新密码', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          confirmPassword:[
          { required: true, message: '请确认密码', trigger: 'blur' }
          ]
        }
    };
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
/* 增加input的下间距--校验提示语显示完全 */
.content /deep/.el-form-item__content {
    margin-bottom: 10px;
}
.content /deep/.el-form--label-top .el-form-item__label {
    padding: 0;
}
</style>
