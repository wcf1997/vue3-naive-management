/** 权限类型 */
export const resourceTypeOptions: { label: string; value: number }[] = [
  {
    label: "目录",
    value: 1
  },
  {
    label: "路由",
    value: 2
  },
  {
    label: "接口",
    value: 3
  },
  {
    label: "数据",
    value: 4
  }
];

/** 是否启用 **/
export const enableOptions = [
  {
    label: "启用",
    value: 1
  },
  {
    label: "未启用",
    value: 0
  }
];

/** 基本请求类型 */
export const baseRequestOptions = [
  {
    label: "列表",
    value: "GET"
  },
  {
    label: "新增",
    value: "POST"
  },
  {
    label: "修改",
    value: "PUT"
  },
  {
    label: "删除",
    value: "DELETE"
  }
];

/** 性别 */
export const genderOptions = [
  {
    label: "男",
    value: "1"
  },
  {
    label: "女",
    value: "0"
  }
];

export const roleTypeOptions = [
  {
    label: "菜单权限角色",
    value: 1
  },
  {
    label: "下学期",
    value: 2
  }
];

export const areaOptions = [
  // { value: '330000', label: '浙江省' },
  // { value: '331100', label: '丽水市' },
  { value: "331101", label: "市本级" },
  { value: "331102", label: "莲都区" },
  { value: "331121", label: "青田县" },
  { value: "331122", label: "缙云县" },
  { value: "331123", label: "遂昌县" },
  { value: "331124", label: "松阳县" },
  { value: "331125", label: "云和县" },
  { value: "331126", label: "庆元县" },
  { value: "331127", label: "景宁县" },
  { value: "331151", label: "开发区" },
  { value: "331181", label: "龙泉市" }
];

/** 积分变动类型 */
export const intergalOptions = [
  {
    value: 1,
    label: "收入"
  },
  {
    value: 0,
    label: "支出"
  }
];

/** 订单状态 */
export const orderStatusMap: {
  [propName: number]: { text: string; status: string };
} = {
  10: {
    text: "待支付",
    status: "warning"
  },
  20: {
    text: "已支付",
    status: "primary"
  },
  30: {
    text: "已核销",
    status: "suuccess"
  }
};

/**  订单状态下拉数据 */
export const orderStatusOptions = [
  {
    label: "待支付",
    value: 10
  },
  {
    label: "已支付",
    value: 20
  },
  {
    label: "已核销",
    value: 30
  }
];

/** 课堂类型 */
export const courseTypeOptions = [
  {
    label: "视频",
    value: 1
  },
  {
    label: "图文",
    value: 0
  }
];

/** 审核状态 */
export const verifyStatusOptions = [
  {
    label: "审核不通过",
    value: -1
  },
  {
    label: "待审核",
    value: 0
  },
  {
    label: "审核通过",
    value: 1
  }
];

/** 卷类型 */
export const couponTypeOptions = [{ label: "按日", value: "1" }];
