import {
  PeopleOutline,
  SchoolOutline,
  SettingsOutline,
  IdCardOutline,
  ShareSocialOutline,
  NewspaperOutline,
  BusinessOutline,
  EaselOutline,
  LibraryOutline,
  FileTrayFullOutline,
  ImagesOutline,
  CartOutline,
  BagOutline,
  BookOutline,
  CardOutline
} from "@vicons/ionicons5";
import { NIcon } from "naive-ui";
import { type Component, h } from "vue";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
export const menuOptions = [
  {
    label: "学校管理",
    key: "/school",
    icon: renderIcon(BookOutline),
    children: [
      {
        label: "轮播图管理",
        key: "/school/carousel-banner",
        icon: renderIcon(ImagesOutline)
      },
      {
        label: "教师管理",
        key: "/school/teacher",
        icon: renderIcon(PeopleOutline)
      },

      {
        label: "新闻管理",
        key: "/school/news",
        icon: renderIcon(NewspaperOutline)
      },
      {
        label: "云课堂",
        key: "/school/cloud-course",
        icon: renderIcon(EaselOutline)
      },
      {
        label: "约课",
        key: "/school/appointment-course",
        icon: renderIcon(PeopleOutline)
      }
    ]
  },
  {
    label: "审核管理",
    key: "/verify-manage",
    icon: renderIcon(CardOutline),
    children: [
      {
        label: "教师审核",
        key: "/verify-manage/teacher",
        icon: renderIcon(CartOutline)
      }
    ]
  },
  {
    label: "商品/订单",
    key: "/shop-manage",
    icon: renderIcon(NewspaperOutline),
    children: [
      {
        label: "商品管理",
        key: "/shop-manage/shop",
        icon: renderIcon(CartOutline)
      },
      {
        label: "订单管理",
        key: "/shop-manage/order",
        icon: renderIcon(BagOutline)
      }
    ]
  },

  {
    label: "系统管理",
    key: "/system",
    icon: renderIcon(SettingsOutline),
    children: [
      {
        label: "用户管理",
        key: "/system/user",
        icon: renderIcon(PeopleOutline)
      },
      {
        label: "栏目管理",
        key: "/system/column",
        icon: renderIcon(LibraryOutline)
      },
      {
        label: "校园管理",
        key: "/system/school-manage",
        icon: renderIcon(BusinessOutline)
      },
      {
        label: "学科管理",
        key: "/system/subject",
        icon: renderIcon(SchoolOutline)
      },
      {
        label: "积分管理",
        key: "/system/integral",
        icon: renderIcon(EaselOutline)
      },
      {
        label: "用户积分管理",
        key: "/system/user-integral-records",
        icon: renderIcon(EaselOutline)
      },
      {
        label: "角色管理",
        key: "/system/role",
        icon: renderIcon(IdCardOutline)
      },
      {
        label: "资源管理",
        key: "/system/resources",
        icon: renderIcon(ShareSocialOutline)
      },
      {
        label: "字典管理",
        key: "/system/dicts",
        icon: renderIcon(FileTrayFullOutline)
      }
    ]
  }
];
