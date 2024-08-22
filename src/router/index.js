import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/Home.vue");//vuex用法
const Data = () => import("../views/Date.vue");//echarts各种示例
const Upload = () => import("../views/Upload.vue");//上传文件
const ExportExcel = () => import("../views/ExportExcel.vue");//导出excel
const Table = () => import("../views/biaoge.vue");//封装的表格
const donwphone = () => import("../views/donwphone.vue");//下载图片
const xnlbFather = () => import("../views/xnlbFather.vue");//虚拟列表
const y = () => import("../views/y.vue");//x轴不等分
const psd = () => import("../views/changePassword.vue"); //修改密码
const tableTz = () => import("../views/tableTz.vue"); //修改密码
const Select = () => import('../views/select.vue')
const atils = () => import('../views/atils.vue')

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/atils",
    // redirect: '/table',
    // redirect: "/tabletz",
  },
  {
    path: "/atils",
    name: "atils",
    component: atils,
  },
  {
    path: "/y",
    name: "y",
    component: y,
  },
  {
    path:'select',
    name:'select',
    component:Select
  },

  {
    path: "/table",
    name: "Table",
    component: Table,
  },
  {
    path: "/xnlbfather",
    name: "xnlbFather",
    component: xnlbFather,
  },
  {
    path: "/home",
    name: "Home",
    component: Home,
  },
  {
    path: "/date",
    name: "Data",
    component: Data,
  },
  {
    path: "/upload",
    name: "Upload",
    component: Upload,
  },
  {
    path: "/exportexcel",
    name: "ExportExcel",
    component: ExportExcel,
  },
  {
    path: "/donwphone",
    name: "donwphone",
    component: donwphone,
  },
  {
    path: "/psd",
    name: "psd",
    component: psd,
  },
  {
    path:'/tabletz',
    name:'tabletz',
    component:tableTz
  }
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
