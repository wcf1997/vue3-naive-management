<template>
  <n-cascader
    :value="value"
    :options="options"
    check-strategy="child"
    v-bind="config"
    @update:value="handleChange"
  />
</template>

<script setup lang="ts">
import { NCascader, type CascaderOption } from 'naive-ui'
import { useTryCatch } from 'v3-usehook'
import type { TSFCascaderConfig } from '../../types'
import { ref } from 'vue'
const props = withDefaults(
  defineProps<{ value: any; config: TSFCascaderConfig; formValue: any }>(),
  {}
)
const emits = defineEmits(['update:value'])
const options = ref<CascaderOption[]>([])
function getOptions() {
  if (!props.config.requestApi) {
    options.value = props.config.options || []
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
  if (props.config.onValueChange && !props.config.multiple) {
    // 非多选模式下的valueChange事件
    props.config.onValueChange(deepFindData(options.value, val), props?.formValue)
  }
}

function deepFindData(data: any[], val: any) {
  let result
  function deep(data: any) {
    for (let item of data) {
      if (item[props.config.valueField || 'id'] === val) {
        result = item
        return item
      }
      if (props.config.childrenField && item[props.config.childrenField]) {
        deep(item[props.config.childrenField])
      }
    }
  }
  deep(data)

  return result
}
</script>

<style scoped></style>
