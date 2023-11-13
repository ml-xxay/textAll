import Vue from 'vue'
import VueRouter from 'vue-router'
const Home = () => import('../views/Home.vue')

const Data = () =>
  import('../views/Date.vue')
const Upload = () =>
  import('../views/Upload.vue')
const Radio = () =>
  import('../views/Radio.vue')
const ExportExcel = () =>
  import('../views/ExportExcel.vue')
const Table = () => import('../views/biaoge.vue')
const donwphone = () =>
  import('../views/donwphone.vue')
const nlxh = () => import('../views/nlxh.vue')
const xnlbFather = () => import('../views/xnlbFather.vue')
const y = () => import('../views/y.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    // redirect: '/table',
    redirect: '/date',
  },
  {
    path: '/y',
    name: 'y',
    component: y
  },
 
  {
    path: '/table',
    name: 'Table',
    component: Table
  },
  {
    path: '/xnlbfather',
    name: 'xnlbFather',
    component: xnlbFather
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  }, {
    path: '/date',
    name: 'Data',
    component: Data
  },
  {
    path: '/nlxh',
    name: 'nlxh',
    component: nlxh
  }, {
    path: '/upload',
    name: 'Upload',
    component: Upload
  }, {
    path: '/radio',
    name: 'Radio',
    component: Radio
  },
  {
    path: '/exportexcel',
    name: 'ExportExcel',
    component: ExportExcel
  },
  {
    path: '/donwphone',
    name: 'donwphone',
    component: donwphone
  }]

const router = new VueRouter({
  routes,
  mode: 'history'
})

export default router