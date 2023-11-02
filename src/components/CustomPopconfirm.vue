<template>
  <n-popconfirm v-model:show="show">
    <template #trigger>
      <slot name="trigger"></slot>
    </template>
    <template #action>
      <n-button size="small" @click="show = false" class="mr-10px"> 取消 </n-button>
      <n-button size="small" type="primary" @click="onConfirm" :loading="loading"> 确定 </n-button>
    </template>
    <slot></slot>
  </n-popconfirm>
</template>

<script setup lang="ts">
import { NPopconfirm, NButton } from 'naive-ui'
import { useTryCatch } from 'v3-usehook'
import { ref } from 'vue'
const loading = ref(false)
const props = defineProps<{ onPositiveClick: () => any }>()
const show = ref<boolean>(false)
async function onConfirm() {
  loading.value = true
  await useTryCatch(props.onPositiveClick)
  loading.value = false
  show.value = false
}
</script>

<style scoped></style>
