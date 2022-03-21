import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Contents from "../views/Contents.vue";
import Write from "../views/Write.vue";
import View from "../views/View.vue";
import Creater from "../views/Creater.vue";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/:contents",
    name: "Contents",
    component: Contents,
  },
  {
    path: "/creater",
    name: "Creater",
    component: Creater,
  },
  {
    path: "/:contents/write",
    name: "Write",
    component: Write,
    beforeEnter: (to, from, next) => {
      if(sessionStorage.getItem("set") !== null && sessionStorage.getItem("set") !== undefined){
        return next();
      }
      alert("잘못된 접근입니다.");
      return next('/');
    },
  },
  {
    path: "/view/:contents/:title",
    name: "View",
    component: View,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
