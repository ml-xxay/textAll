import Vue from "vue";
import VueRouter from "vue-router";
const Home = () => import("../views/Home.vue");
const Data = () => import("../views/Date.vue");
const Upload = () => import("../views/Upload.vue");
const ExportExcel = () => import("../views/ExportExcel.vue");
const Table = () => import("../views/biaoge.vue");
const donwphone = () => import("../views/donwphone.vue");
const xnlbFather = () => import("../views/xnlbFather.vue");
const y = () => import("../views/y.vue");
const psd = () => import("../views/changePassword.vue"); //修改密码

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/psd",
    // redirect: '/table',
    // redirect: "/date",
  },
  {
    path: "/y",
    name: "y",
    component: y,
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
];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
