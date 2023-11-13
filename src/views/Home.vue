<template>
  <div class="home">
    <h2>-----------------info数据-----------------------------</h2>
    <h2>{{ $store.state.info }}</h2>
    <button @click="xiugaiinfo">修改info</button>
    <button @click="yibuxiugaiinfo">异步修改info</button>

    <h1>----------------------home父组件-----------------</h1>
    <h2>{{ $store.state.count }} -->这是vuex里面的数据</h2>
    <button @click="add">+</button>
    <button @click="jian">-</button>
    <button @click="addcount(5)">+5</button>
    <button @click="addcount(10)">+10</button>
    <button @click="addstudent">添加学生</button>
    <hello-vuex />

    <h2>--------------getters处理过的数据--------------------</h2>
    <h2>{{ $store.getters.powerCounter }}-->通过vuex的getters处理的数据</h2>
    <h2>{{ $store.getters.chuliarr }}-->大于20 的数据</h2>
    <h2>{{ $store.getters.chuliarrLength }}-->大于20的数据 的长度</h2>

    <h2>--------------modules里的内容--------------------</h2>
    <h2>{{ $store.state.a.name }}:a是modules里面的模块a 放到了state里面</h2>
    <button @click="updateName">修改名字</button>
    <h2>{{ $store.getters.fullName }}</h2>
    <h2>{{ $store.getters.fullName2 }}</h2>
    <h2>{{ $store.getters.fullName3 }}</h2>
    <button @click="aupdateName">异步修改moduleA里面的name</button>
  </div>
</template>

<script>
import HelloVuex from '../components/HelloVuex.vue'
export default {
  name: '',
  components: {
    HelloVuex,
  },
  data() {
    return {
      count: 0,
    }
  },
  computed: {
    // 每个页面都要这样写  太麻烦  我们写在getters里面
    // chuliarr(){
    //   return this.$store.state.student.filter(s=>s.age > 20 )
    // }
  },
  methods: {
    add() {
      // commit('jia')  执行vuex里面mutations定义的 jia 这个方法
      this.$store.commit('jia')
    },
    jian() {
      // commit('jia')  执行vuex里面mutations定义的 jian 这个方法
      this.$store.commit('jian')
    },
    addcount(num) {
      // 普通方式的提交
      this.$store.commit('addcount', num) //执行vuex里面mutations定义的 addcount 这个方法
      // 特殊方式的提交
      // this.$store.commit({
      //   type:'addcount', //执行vuex里面mutations定义的 addcount 这个方法
      //   num:num   //执行方法携带的参数
      // })
    },
    // 添加学生
    addstudent() {
      let stu = { id: 114, name: 'ml', age: 24 }
      this.$store.commit('addstudent', stu)
    },
    //修改info  同步的
    xiugaiinfo() {
      this.$store.commit('xiugaiinfo')
    },
    //修改info  异步的  异步操作要从那个actions 再到mutation
    yibuxiugaiinfo() {
      //dispatch  执行vuex里面actions里面的yibuxiugaiinfo方法
      this.$store.dispatch('yibuxiugaiinfo', '携带的参数').then((res) => {
        console.log(res) //vuex执行完毕后的回调参数
      })
    },

    // moudels
    updateName() {
      //调用moduleA里面的方法  传递参数lisi
      this.$store.commit('updateName', 'lisi')
    },
    aupdateName() {
      this.$store.dispatch('aupdateName')
    },
  },
}
</script>
