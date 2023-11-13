<template>
   <div>
      <h1>-----------------hello-vuex子组件-------</h1>
     <h2>{{ $store.state.count }}-->这是vuex里面的数据</h2>
   </div>
</template>
<script>
  export default {
    name: 'HelloVuex',
    components:{},
    props:{},
    data(){
      return {
      }
    },
  created(){},
  methods:{},
  }
</script>
<style scoped>

</style>