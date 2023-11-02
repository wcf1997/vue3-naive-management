<template>
  <SF
    :columns="formColumns"
    :on-submit="onSubmit"
    @on-cancel="close(false)"
    :init-value="initValue"
  ></SF>
</template>

<script setup lang="ts">
import type {
  ISF_Item,
  TSFInputConfig,
  TSFRadioConfig,
  TSFSelectConfig
} from "@/components/base-form/types";
import SF from "@/components/base-form/SF.vue";
import { useInject, type IModalInject, useTryCatch } from "v3-usehook";
import { userStore } from "@/stores/user-store";
import { userService } from "@/services/user/user-service";
const { close, args } = useInject<IModalInject>();
const initValue = args.params && {
  ...args.params,
  rid: Number(args.params.rid),
  photo: args.params.photo && [{ url: args.params.photo }]
  // rid: args.params.rid.split(',').map((v: any) => Number(v))
};
const user = userStore().userInfo;
const formColumns: ISF_Item[] = [
  // {
  //   title: "头像",
  //   key: "photo",
  //   type: "upload",
  //   config: {
  //     multiple: false,
  //     max: 1
  //   }
  // },
  { title: "姓名", key: "username", required: true },
  { title: "手机号", key: "phone", required: true, validator: "mobile" },
  { title: "账号", key: "loginId", required: true },
  {
    title: "密码",
    key: "pw",
    required: args.params && args.params.id ? false : true,
    // hide: args.params,
    config: {
      type: "password",
      showPasswordOn: "click",
      inputProps: {
        autocomplete: "on"
      }
    } as TSFInputConfig,
    validator(text, record) {
      const reg =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[`~!@#$%^&*()_+-={}[\]|\\:;"'<>,.?/])[A-Za-z\d`~!@#$%^&*()_+-={}[\]|\\:;"'<>,.?/]{8,}$/;
      if (!text) return new Error("请输入密码");
      return (
        reg.test(text) ||
        new Error(
          "密码至少包含一个小写字母、大写字母、数字、特殊符号，密码长度大于8"
        )
      );
    }
  }
  // {
  //   title: "性别",
  //   key: "sex",
  //   type: "radio",
  //   config: {
  //     options: [
  //       { value: "1", label: "男" },
  //       { value: "0", label: "女" }
  //     ],
  //     defaultValue: "0"
  //   } as TSFRadioConfig
  // }
];

async function onSubmit(val: any) {
  const METHODS = args.params ? "update" : "add";
  let [res] = await useTryCatch(userService[METHODS], {
    ...val,
    id: args && args.params && args.params.id
    // photo: val.photo && val.photo[0] && val.photo[0].url
  });
  if (!res.success) return;
  close(true);
}
</script>

<style scoped></style>
