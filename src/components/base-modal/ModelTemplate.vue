<template>
  <n-modal v-model:show="visible" transform-origin="mouse">
    <n-card
      style="width: 600px"
      :title="args && args.title"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header-extra>
        <Close class="w-20px h-20px bg-[#eee] cursor-pointer" @click.stop="handleClose"></Close>
      </template>
      <component :is="content"></component>
      <template #footer v-if="args && !args.hideFooter">
        <NSpace class="text-right" justify="end">
          <n-button @click="onConfirmEvent" :loading="loading" type="primary">确定</n-button
          ><n-button @click="handleClose">取消</n-button>
        </NSpace>
      </template>
    </n-card>
  </n-modal>
</template>

<script setup lang="ts">
import { NModal, NCard, NButton, NSpace } from 'naive-ui'
import { Close } from '@vicons/ionicons5'
import { useInject, type IModalInject } from 'v3-usehook'

const { visible, args, content, close, loading, onConfirmEvent } = useInject<IModalInject>()

function handleClose() {
  close(false)
}
</script>

<style scoped></style>
