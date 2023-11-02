<template>
  <n-tree block-line :data="options" checkable expand-on-click selectable v-bind="config" />
</template>

<script setup lang="ts">
import { NTree, type CascaderOption } from 'naive-ui'
import { useTryCatch } from 'v3-usehook'
import type { TSFTreeConfig } from '../../types'
import { ref } from 'vue'
const props = withDefaults(defineProps<{ value: any; config: TSFTreeConfig }>(), {})
const emits = defineEmits(['update:value'])
const options = ref<CascaderOption[]>([])
function getOptions() {
  if (!props.config.requestApi) {
    options.value = props.config.data || []
  } else {
    requsetOptions()
  }
}
getOptions()
async function requsetOptions() {
  let [res] = await useTryCatch(props.config.requestApi, props.config?.params || '')
  if (!res.success) return
  options.value = res.data
}

function handleChange(val: any) {
  emits('update:value', val)
}
</script>

<style scoped></style>
