<template>
  <n-space vertical>
    <n-layout has-sider class="layout-body">
      <n-layout-sider
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        :inverted="inverted"
        :collapsed="collapsed"
        @collapse="collapsed = true"
        @expand="collapsed = false"
        class="round"
      >
        <div class="h-1/1 text-center pt-50px">
          <div class="text-[0]">
            <svg
              t="1687652809025"
              class="icon w-50px h-50px"
              viewBox="0 0 1024 1024"
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              p-id="3541"
              width="200"
              height="200"
            >
              <path
                d="M512 1013.76l-245.1968-213.3504S358.912 875.52 512 875.52c149.8112 0 245.1968-75.008 245.1968-75.008z"
                fill="#FFFFFF"
                p-id="3542"
              ></path>
              <path
                d="M512 430.08m-419.84 0a419.84 419.84 0 1 0 839.68 0 419.84 419.84 0 1 0-839.68 0Z"
                fill="#AED866"
                opacity=".9"
                p-id="3543"
              ></path>
              <path
                d="M654.4384 220.7232a113.5104 113.5104 0 0 1 51.2 5.12 100.3008 100.3008 0 0 1 36.4032 22.2208 84.6848 84.6848 0 0 1 20.8384 32.9216 82.7392 82.7392 0 0 1-8.0384 72.7552 72.2432 72.2432 0 0 1-30.1056 26.4704q-25.1904 12.9024-51.2 24.064a479.8976 479.8976 0 0 1-47.9744 17.6128 250.88 250.88 0 0 1-42.5984 9.472A99.0208 99.0208 0 0 1 547.84 430.08q-8.2944 39.7312-13.1072 80.0768a721.5104 721.5104 0 0 0-5.12 89.1904c0 14.1824 0.3072 28.416 0.9216 42.5984s1.28 27.1872 2.0992 38.9632c0.768 13.4144 1.7408 26.368 2.9696 38.9632h-87.04c0.4096-7.7312 0.9728-17.8688 1.792-30.4128 0.4096-10.5472 0.768-24.3712 1.1776-41.4208s0.6144-37.9392 0.6144-62.72a668.3136 668.3136 0 0 1 5.5808-90.624q5.12-39.2192 13.7216-77.9776a107.1616 107.1616 0 0 1-49.4592-0.5632 209.92 209.92 0 0 1-52.48-20.48 291.0208 291.0208 0 0 1-50.6368-35.2768 319.7952 319.7952 0 0 1-43.52-45.3632 87.04 87.04 0 0 1-16.6912-31.6928 71.3216 71.3216 0 0 1-1.4848-31.0272 83.1488 83.1488 0 0 1 10.7008-28.6208A135.6288 135.6288 0 0 1 286.72 199.3728a65.7408 65.7408 0 0 1 22.6816-13.9776 90.4704 90.4704 0 0 1 28.2624-5.4784 136.7552 136.7552 0 0 1 31.0272 2.4064 139.776 139.776 0 0 1 30.72 9.7792 214.1696 214.1696 0 0 1 31.8976 19.7632A268.3392 268.3392 0 0 1 463.9744 240.64a318.2592 318.2592 0 0 1 29.2352 34.4064 241.8176 241.8176 0 0 1 22.3232 36.5056 151.6032 151.6032 0 0 1 25.0368-32.5632 209.92 209.92 0 0 1 34.304-27.6992 227.1232 227.1232 0 0 1 39.3216-20.48 143.36 143.36 0 0 1 40.2432-10.24z m0 0"
                fill="#FFFFFF"
                p-id="3544"
              ></path>
            </svg>
          </div>
          <h1
            class="text-20px ml-10px text-[#fff] font-boldhidden"
            v-show="!collapsed"
          >
            源·汽修服务
          </h1>
        </div>
        <n-menu
          :inverted="inverted"
          :collapsed-width="64"
          :collapsed-icon-size="22"
          :options="menuOptions"
          @update-value="handleMenuClick"
          :collapsed="collapsed"
        />
      </n-layout-sider>
      <n-layout class="px-15px layout-content">
        <div
          class="layout-header flex w-1/1 h-70px items-center px-20px justify-between"
        >
          <div class="flex-3">
            <BaseBreadcrumb></BaseBreadcrumb>
          </div>

          <div class="flex-1 flex-grow-0 min-w-200px items-center">
            <n-dropdown :options="options">
              <div class="flex items-center">
                <NAvatar
                  round
                  :src="user.userInfo.headPic"
                  fallback-src="https://gw.alipayobjects.com/zos/rmsportvvval/BiazfanxmamNRoxxVxka.png"
                ></NAvatar>
                <span class="ml-10px"
                  >{{ user.userInfo.userName }}，欢迎您！</span
                >
              </div>
            </n-dropdown>
          </div>
        </div>

        <RouterView></RouterView>
      </n-layout>
    </n-layout>
  </n-space>
</template>

<script lang="ts" setup>
import { h, ref, type Component, onUnmounted, computed } from "vue";
import {
  NIcon,
  NSpace,
  NLayout,
  NLayoutSider,
  NLayoutHeader,
  NMenu,
  type MenuOption,
  NDropdown,
  NAvatar
} from "naive-ui";
import {
  BookOutline as BookIcon,
  PersonOutline as PersonIcon,
  PeopleOutline,
  SchoolOutline,
  SettingsOutline,
  IdCardOutline,
  CalendarOutline,
  WineOutline as WineIcon,
  ShareSocialOutline,
  HappyOutline,
  NewspaperOutline,
  BusinessOutline,
  EaselOutline,
  LibraryOutline,
  FastFoodOutline,
  LogOutOutline,
  PersonOutline,
  FingerPrintOutline,
  LeafOutline,
  CopyOutline,
  CreateOutline,
  OptionsOutline,
  CalculatorSharp,
  FileTrayFullOutline,
  ImagesOutline,
  CartOutline,
  LogoYen,
  BagOutline,
  BookOutline,
  CardOutline,
  TicketOutline
} from "@vicons/ionicons5";
import { useRouter } from "vue-router";
import { useThrottle } from "@/utils";
// import { aclsStore } from "@/stores/acl-store";
import { userStore } from "@/stores/user-store";
import BaseBreadcrumb from "@/components/BaseBreadcrumb.vue";
// import type { IResource } from '@/services/system/types'
const user = userStore();

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
let inverted = ref(false);
const router = useRouter();
const collapsed = ref<boolean>(false);
const options = [
  // {
  //   label: '用户资料',
  //   key: 'profile',
  //   icon: renderIcon(PeopleOutline)
  // },
  // {
  //   label: '编辑用户资料',
  //   key: 'editProfile',
  //   icon: renderIcon(NewspaperOutline)
  // },
  {
    label: "退出登录",
    key: "logout",
    icon: renderIcon(LogOutOutline),
    props: {
      onClick: () => {
        user.logout();
        router.replace("/");
      }
    }
  }
];
// const acls = aclsStore()
//   .aclsGetter.filter((v) => (v.type === 'CATEGORY' || v.type === 'ROUTE') && v.path)
//   .map((v) => v.path)

const menuOptions = [
  {
    label: "用户管理",
    key: "/user-manage",
    icon: renderIcon(PeopleOutline)
  },
  {
    label: "优惠卷管理",
    key: "/coupon-manage",
    icon: renderIcon(TicketOutline)
  },
  {
    label: "横幅管理",
    key: "/banner-manage",
    icon: renderIcon(LibraryOutline)
  },
  {
    label: "商铺管理",
    key: "/shops-manage",
    icon: renderIcon(BusinessOutline),
    children: [
      {
        label: "商铺",
        key: "/shops-manage/shop",
        icon: renderIcon(BusinessOutline)
      }
      // {
      //   label: "优惠卷",
      //   key: "/shop-manage/coupon",
      //   icon: renderIcon(TicketOutline)
      // }
    ]
  }
];
// const roleMenus = computed(() => dataChangeForTree(aclsStore().menusAcls))

function handleMenuClick(key: string, item: MenuOption) {
  router.push(key);
}
// console.log(dataChangeForTree(aclsStore().menusAcls), '...............')
// function dataChangeForTree(data: Pick<IResource, 'pid'>[], result: any[] = []) {
//   const obj: any = {}
//   data.forEach((v) => {
//     if (!obj[v.pid]) {
//       obj[v.pid] = [v]
//     } else {
//       obj[v.pid] = [...obj[v.pid], v]
//     }
//   })
//   function deep(arr: any[]) {
//     for (let item of arr) {
//       if (obj[item.id]) {
//         item.children = [...obj[item.id]]
//         deep(item.children)
//       }
//     }
//   }
//   deep(obj['0'])

//   return obj['0']
// }
/** 获取权限菜单 */
function getResourceMenu(
  menus: any[],
  rights: string[] = [],
  target: any[] = []
) {
  if (!menus.length) return [];
  if (!rights.length) return [];

  for (let item of menus) {
    if (!item.children || !item.children.length) {
      if (rights?.includes(item.key)) {
        target.push(item);
      }
    } else {
      let tempItem = { ...item, children: [] };
      let tempArr: any[] = [];
      for (let child of item.children) {
        if (rights?.includes(child.key)) {
          tempArr.push(child);
        }
      }

      if (tempArr.length) {
        tempItem.children = [...tempArr];
        target.push(tempItem);
      }
    }
  }

  return target;
}
// 监听窗口大小变化
function handleWindowResize() {
  const width = window.innerWidth;
  if (width <= 1024) {
    if (collapsed.value) return;
    collapsed.value = true;
  } else {
    if (!collapsed.value) return;
    collapsed.value = false;
  }
}
const handleWindowResizeDep = useThrottle(handleWindowResize);
window.addEventListener("resize", handleWindowResizeDep);
onUnmounted(() => {
  window.removeEventListener("resize", handleWindowResizeDep);
});
</script>

<style lang="less" scoped>
:deep(.n-layout-sider) {
  // background-color: #1739a4;
  background-color: #336699;
  // box-shadow: 2px 0 8px 0 rgba(29, 35, 41, 0.05);
  color: #fff;

  &.round {
    border-radius: 0 30px 30px 0;
  }
}

:deep(.n-layout-header) {
  box-shadow: 0 8px 24px -2px rgba(0, 0, 0, 0.05);
}

:deep(.n-menu .n-submenu .n-submenu-children) {
  overflow: initial;
}
:deep(.n-menu-item) {
  .n-menu-item-content {
    transition: padding-left 0.3s var(--n-bezier),
      border-color 0.3s var(--n-bezier);
  }
  .n-menu-item-content:not(.n-menu-item-content--disabled):hover::before {
    background-color: transparent;
  }

  .n-menu-item-content--selected {
    position: relative;
    background-color: #f5f7fc;
    // padding-top: 15px;
    // padding-bottom: 15px;
    &::before {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      right: -6px;
      top: -15px;
      left: auto;
      background: radial-gradient(
        circle at 0 0,
        #336699 50%,
        #f5f7fc 50%,
        #f5f7fc 100%
      );
      transition: none;
      border-radius: 0;
    }
    &::after {
      content: "";
      width: 20px;
      height: 20px;
      position: absolute;
      right: -6px;
      bottom: -14px;
      left: auto;
      background: radial-gradient(
        circle at 0 bottom,
        #336699 50%,
        #f5f7fc 50%,
        #f5f7fc 100%
      );
      transition: none;
      border-radius: 0;
    }
  }
}
:deep(.n-layout-scroll-container) {
  min-height: 100vh;
  background-color: #f5f7fc;
}
.layout-header {
  // box-shadow: 0 8px 24px -2px red;
}
.layout-content {
  // background-color: #f0f2f5;
  background-color: #f5f7fc;
}
</style>
