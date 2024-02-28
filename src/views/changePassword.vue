<template>
  <div class="change_password">
    <textpsd></textpsd>
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
};
</script>
<style scoped>
.change_password {
  width: 100%;
  height: 100%;
  background-color: skyblue;
}
</style>
