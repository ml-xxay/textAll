<template>
  <div class="change_password">
    <textpsd @save="save" :i8="'123'"></textpsd>
  </div>
</template>

<script>
import textpsd from "@/components/modifypasssd/modifypasssd";
export default {
  name: "psd",
  components: {
    textpsd,
  },
  data() {
    return {};
  },
  methods:{
    save(){
      console.log('我监听子组件的保存方法了');
    }
  }
};
</script>
<style scoped>
.change_password {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>
