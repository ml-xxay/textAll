<template>
  <div class="nlxh">
    <div class="top mb">
      <div
        class="topcentent"
        v-for="(item, index) in arr"
        :key="index"
        :class="isactive == index ? 'isactive' : ''"
        @click="isactive = index"
      >
        {{ item }}
      </div>
    </div>
    <el-card class="centent" v-if="isactive == 0">
      <div class="cententtop">
        <div>
          <div>1</div>
          <div>2</div>
        </div>
        <div></div>
      </div>
      <div class="bom"></div>
    </el-card>
    <div v-if="isactive != 0" class="centent">
      <el-card class="mb">内容2</el-card>
      <el-card class="">内容2</el-card>
    </div>
  </div>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      arr: ['预约规则配置', '调节指令配置'],
      isactive: 0,
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {},
  mounted() {},
}
</script>
<style scoped>
.nlxh {
  width: 100%;
  height: 100%;
}
.top {
  display: flex;
  justify-content: flex-start;
  height: 35px;
  width: 100%;
  font-size: 16px;
  margin-bottom: 15px;
}
.topcentent {
  padding: 0 5px;
  width: 120px;
  height: 100%;
}
.isactive {
  color: #5f8ce5;
  border-bottom: 1px solid #5f8ce5;
}
.centent {
  overflow-y: auto;
  /* height: 1000px; */
  height: calc(100% - 70px);
}
/* .centent /deep/.el-card__body {
  height: 100%;
} */
/* .el-card__body {
  height: calc(100% - 50px) !important;
} */
</style>
