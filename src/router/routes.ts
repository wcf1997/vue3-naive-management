import type { RouteRecordRaw } from 'vue-router'

const files: any = import.meta.glob(['./routes/*.ts','./routes/*/*.ts'], { eager: true })
const ROUTES_LIST: RouteRecordRaw[] = []

// 获取所有routes文件夹下的路由
Object.keys(files).forEach((item: any) => {
  const res = files[item].default
  if (res) {
    ROUTES_LIST.push(...res)
  }
})

export default ROUTES_LIST
