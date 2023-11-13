<template>
  <el-radio-group v-model="radio">
    <el-radio :label="3">备选项</el-radio>
    <el-radio :label="6">备选项</el-radio>
    <el-radio :label="9">备选项</el-radio>
  </el-radio-group>
</template>
<script>
export default {
  name: "",
  components: {},
  props: {},
  data() {
    return {
      radio: 9,
      answer:[
        {title:'第一项答案',problemmsg:'A'},
        {title:'第二项答案',problemmsg:'B'},
        {title:'第三项答案',problemmsg:'C'},
        {title:'第四项答案',problemmsg:'D'},
      ]
    };
  },
  created() {},
  methods: {},
};
</script>
<style scoped>
</style>