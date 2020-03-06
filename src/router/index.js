import Vue from "vue";
import VueRouter from "vue-router";
import Feed from "../views/Feed";
import Detail from "../views/Detail";

Vue.use(VueRouter);

const routes = [
  { path: "/", component: Feed },
  {
    path: "/detail/:id",
    component: Detail
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
