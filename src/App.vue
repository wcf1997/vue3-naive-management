<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NNotificationProvider } from 'naive-ui'
import { RouterView } from 'vue-router'
import { themeOverrides } from '@/configs/ui-theme'
import BaseNotification from '@/components/BaseNotification.vue'
import { zhCN, dateZhCN } from 'naive-ui'
import { CustomPopupProvide } from 'v3-usehook'
import ModelTemplate from './components/base-modal/ModelTemplate.vue'
import DrawerTemplate from './components/base-modal/DrawerTemplate.vue'
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides" :locale="zhCN" :date-locale="dateZhCN">
    <n-notification-provider>
      <n-message-provider>
        <BaseNotification></BaseNotification>
        <CustomPopupProvide :modal-template="ModelTemplate" :drawer-template="DrawerTemplate">
          <RouterView />
        </CustomPopupProvide>
      </n-message-provider>
    </n-notification-provider>
  </n-config-provider>
</template>

<style scoped lang="less">
@media screen and (max-width: 767px) {
  :deep(.n-data-table-td) {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 8px;
    white-space: inherit;
    text-align: left !important;
    border: none;
  }
  :deep(.n-data-table.n-data-table--bottom-bordered .n-data-table-td.n-data-table-td--last-row) {
    border: none;
  }

  :deep(.n-data-table-thead) {
    display: none;
  }
  :deep(.n-data-table-tr) {
    .n-data-table-td:last-of-type {
      border-bottom: 1px solid #eee;
    }
  }
}
</style>
