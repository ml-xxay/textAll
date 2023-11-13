<template>
  <div>
    <!-- <el-link  target="_blank" :href="Img" :underline="false"> -->
    <el-button @click="download(Img)">下载图片</el-button>
    <!-- </el-link> -->
  </div>
</template>
<script>
// import img from '../../static/logo.png'
export default {
  name: '',
  components: {},
  props: {},
  data() {
    return {
      // Img: img,
      Img: '../../static/logo.png',
    }
  },
  computed: {},
  watch: {},
  created() {},
  methods: {
    download(imgsrc, name) {
      var a = document.createElement('a')
      a.href = this.Img
      a.download = 'pic'
      a.click()
    },
  },

  mounted() {},
}
</script>
<style scoped lang="less"></style>
