// import { reject } from "core-js/fn/promise";
import Vue from "vue";
import Vuex from "vuex";
//1挂载插件
Vue.use(Vuex)


const moduleA = {
  state: {
    name: 'zhangsan'
  },
  mutations: {
    // 外界也是通过 this.$store.commit('updateName') 来调用这个方法  不过优先去 下面的store的vuex实例里面看看mutations里面有没有调用的这个方法   有则优先执行   没有在执行模块化里面的   这两个地方的方法名不要重复  
    updateName(state, payload) {
      state.name = payload
    }
  },
  getters: {// 外界也是通过 this.$store.getters.fullName  来调用
    fullName(state) {
      return state.name + '111111'
    },
    fullName2(state, getters) {//getters 就是父亲getters
      return getters.fullName + '2222' //调用父亲里面的fullName方法  拼接上222
    },
    fullName3(state, getters, rootState) { //rootState根元素里面的state
      //rootState.count  大白话就是  调用store实例里面的state
      return getters.fullName2 + rootState.count
    }
  },
  actions: {
    aupdateName(context) {
      // 异步修改 name  
      setTimeout(() => {
        context.commit('updateName', 'wangwu')//这里commit只能commit moduleA 里面的 mutations
      }, 1000)
    }
  }
}

// 2想用vuex  要实例化
const store = new Vuex.Store({
  // state  是共享状态的  相当与组件里面的data数据
  state: {
    count: 3,
    student: [
      { id: 110, name: 'why', age: 18 },
      { id: 111, name: 'kobe', age: 21 },
      { id: 112, name: 'luck', age: 25 },
      { id: 113, name: 'lilei', age: 30 },
    ],
    info: {
      name: 'kuli',
      age: 40,
      height: 1.98
    }
  },
  //mutations记录修改状态的  主修改  外界通过commit调用mutations   
  // /mutations 中的每个方法尽可能完成的事件比较单一一点   所以把addCart放在actions里
  mutations: {
    // 让count++  state 默认的参数
    jia(state) {
      state.count++
    },
    // 让count--   state 默认的参数
    jian(state) {
      state.count--
    },
    //普通方式 让count 每次增加传过来的值
    addcount(state, num) { //传过来的参数
      state.count += num
    },
    // 特殊方式 让count 每次增加传过来的值
    // addcount(state, payload) { //这次payload是个对象了
    //   state.count += payload.num
    // },
    // 添加学生
    addstudent(state, student) {
      state.student.push(student)
    },
    // 同步响应式修改info
    xiugaiinfo(state) {
      state.info.name = 'mm' //state里面本身定义好的  修改都是响应的
      // setTimeout(() => {
      //   state.info.name = 'ml' //异步的时候就不是响应的了  所以异步操作不能从这里修改
      // })

      // state.info['add'] = '你好' //这种不是响应式的
      // 要修改的对象  属性名或者索引  修改的值
      //Vue.set(state.info, 'add', '你好') //这种是响应式的
    },
    // 异步修改  从actions 执行这个方法
    yibuxiugaiinfo(state, payload) { //payload参数  是从action里面传过来的
      // console.log(payload);
      state.info.name = 'ml'
    }

  },
  // actions 是行为  是操作异步的  context 默认参数
  actions: {
    // 异步修改 state 里面的info
    yibuxiugaiinfo({ commit }, payload) { //context 默认的参数  paylod是接收的参数

      console.log(payload); //这里面也是可以携带参数的
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          commit('yibuxiugaiinfo', payload)
          // 执行完commit之后   回调  告诉外面执行完了
          resolve('回调参数')
        }, 3000)
      })
    }
  },

  // // 类似于组件里面的计算属性   
  getters: {
    // 处理数据  返还count的平方  state默认的参数
    powerCounter(state) {
      return state.count * state.count
    },
    chuliarr(state) {
      return state.student.filter(s => s.age > 20) //大于20的数据的项
    },
    chuliarrLength(state, getters) { //getters 就是父亲对象   可以直接调用这里面定义的方法
      return getters.chuliarr.length //大于20的长度
    }
  },
  // 模块
  modules: {
    // 最终这个   a:moduleA   会放在vuex的state里面
    a: moduleA
  }
})

// 3.导出store对象
export default store