import {
  createRouter,
  createWebHistory,
  Router,
  RouteRecordRaw,
} from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    name: "Home",
    path: "/",
    component: () => import("@/views//Home/index.vue"),
  },
  {
    name: "data",
    path: "/DiseaseInfo",
    component: () => import("@/views/DiseaseInfo/index.vue"),
  },
  {
    name: "cams",
    path: "/cams",
    component: () => import("@/views/cams.vue"),
  },
];

const router: Router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
