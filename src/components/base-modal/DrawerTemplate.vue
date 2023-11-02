<template>
  <n-drawer v-model:show="visible" :default-width="initWidth" resizable ref="drawerRef">
    <n-drawer-content>
      <template #header>
        <div clas>
          <span @click="close(false)">
            <ExitOutline
              class="inline-block w-30px h-30px mr-15px text-[#999] cursor-pointer"
            ></ExitOutline
          ></span>
          <span style="vertical-align: 7px">{{ args && args.title }}</span>
        </div>
      </template>
      <component :is="content"></component>
      <template #footer v-if="args && !args.hideFooter">
        <NSpace class="text-right" justify="end">
          <n-button @click="onConfirm" :loading="loading" type="primary">确定</n-button
          ><n-button @click="handleClose">取消</n-button>
        </NSpace>
      </template>
    </n-drawer-content>
  </n-drawer>
</template>

<script setup lang="ts">
import { ExitOutline } from '@vicons/ionicons5'
import { NDrawer, NDrawerContent, NButton, NSpace } from 'naive-ui'
import { useInject, type IModalInject } from 'v3-usehook'
import { ref } from 'vue'
const { visible, args, content, close, loading, onConfirm } = useInject<IModalInject>()
const screenWidth = window.innerWidth
const initWidth = screenWidth < 675 ? screenWidth : screenWidth - 240
const drawerRef = ref()
function handleClose() {
  close(false)
}
</script>

<style scoped></style>
