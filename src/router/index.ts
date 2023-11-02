import { createRouter, createWebHistory } from "vue-router";
import LayoutView from "../views/LayoutView.vue";
import LoginView from "../views/LoginView.vue";
import ROUTES_LIST from "./routes";
// import { userStore } from "@/stores/user-store";
import cache from "@/utils/cache";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginView,
    meta: {
      noLogin: true
    }
  },
  {
    path: "/home",
    name: "layout",
    component: LayoutView,
    meta: {
      pageName: "首页"
    },
    children: [
      {
        path: "",
        name: "home",
        component: () => import("@/views/HomeView.vue")
      },

      ...ROUTES_LIST
    ]
  },

  {
    path: "/:pathMatch(.*)*",
    name: "error",
    alias: "/no-found",
    meta: { noLogin: true },
    component: () => import("@/views/NoFoundView.vue")
  }
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const user = cache.getSSCache("user");
  if (to.meta.noLogin) return next();
  if (!to.meta.noLogin) {
    if (user && user.tokenvalue) {
      return next();
    } else {
      return next("/");
    }
  }
  return next("/no-found");
});

export default router;
