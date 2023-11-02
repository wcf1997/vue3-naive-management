import type { RouteRecordRaw } from "vue-router";

const routes: RouteRecordRaw[] = [
  {
    path: "/user-manage",
    name: "UserManage",
    meta: {
      pageName: "用户管理"
    },
    component: () => import("@/views/user-manage/UserView.vue")
  }
];
export default routes;
