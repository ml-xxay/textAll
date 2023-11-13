import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// import '../mock/index'
import store from './store/index.js'
import axios from 'axios'
// 处理日期插件  moment
import moment from 'moment'
Vue.config.productionTip = false
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
Vue.prototype.axios = axios;
// Vue.prototype.$moment = moment //挂载到原型上  一遍别的组件使用
moment.locale('zh-cn') // 这里是进行了汉化 不写这句默认格式是外国的
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')