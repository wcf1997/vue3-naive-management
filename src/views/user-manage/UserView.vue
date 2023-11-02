<template>
  <div>
    <NCard class="mb-20px mt-10px" content-style="padding-bottom:0">
      <SF
        ref="sf"
        :columns="schemaColumn"
        :on-submit="handleSearch"
        @on-cancel="() => reload()"
        :form-config="{
          colSpan: 9,
          inline: true,
          labelPlacement: 'left',
          labelWidth: 'auto',
          responsive: true,
          footerStyle: 'text-align:left',
          cancelText: '重置',
          submitText: '搜索'
        }"
      ></SF>
    </NCard>

    <NCard>
      <div class="text-right pb-15px">
        <NButton type="primary" @click="() => showAddForm()">新增用户</NButton>
      </div>
      <STComponent></STComponent
    ></NCard>
  </div>
</template>

<script setup lang="ts">
import { useST } from "@/components/base-table";
import { NButton, NCard } from "naive-ui";
import { h } from "vue";
// import UserForm from "./UserForm.vue";
import { usePopup, useTryCatch } from "v3-usehook";
import type { InternalRowData } from "naive-ui/es/data-table/src/interface";
// import CustomPopconfirm from "@/components/CustomPopconfirm.vue";
import type { ISF_Item, TSFSelectConfig } from "@/components/base-form/types";
import SF from "@/components/base-form/SF.vue";

import { userStore } from "@/stores/user-store";
import { userService } from "@/services/user/user-service";
import type { IUserInfo } from "@/services/user/type";
import CustomtTableCell from "@/components/CustomtTableCell.vue";
import UserForm from "./UserForm.vue";
import CustomPopconfirm from "@/components/CustomPopconfirm.vue";

const user = userStore().userInfo;

const { useModal, useDrawer } = usePopup();
const schemaColumn: ISF_Item[] = [
  { title: "姓名", key: "name" },
  { title: "手机号", key: "phone" }
];
const { STComponent, reload, search, refresh } = useST<IUserInfo>({
  columns: [
    {
      title: "姓名",
      key: "username"
    },

    {
      title: "联系方式",
      key: "phone"
    },

    {
      title: "操作",
      key: "actions",
      render(row) {
        return [
          h(
            CustomtTableCell,
            { title: "操作" },
            {
              default: () => [
                h(
                  NButton,
                  {
                    strong: true,
                    size: "small",
                    type: "primary",
                    class: "mr-10px ",
                    onClick: () => {
                      showAddForm(row);
                    }
                  },
                  { default: () => "编辑" }
                ),
                h(
                  CustomPopconfirm,
                  {
                    strong: true,
                    type: "error",
                    size: "small",
                    onPositiveClick: () => onDelete(row.id)
                  },
                  {
                    default: () => "您确定要删除该数据吗？",
                    trigger: () =>
                      h(
                        NButton,
                        { strong: true, type: "error", size: "small" },
                        { default: () => "删除" }
                      )
                  }
                )
              ]
            }
          )
        ];
      }
    }
  ],

  requestApi: userService.page
});
function showAddForm(data?: InternalRowData) {
  useModal(UserForm, {
    title: data ? "用户修改" : "新增用户",
    hideFooter: true,
    params: data
  }).then(res => res && refresh());
}

async function onDelete(id: any) {
  let [res] = await useTryCatch(userService.del, id);
  if (!res.success) return;
  refresh();
}
async function handleSearch(vals: any) {
  search({
    ...vals
  });
}
</script>

<style scoped></style>
