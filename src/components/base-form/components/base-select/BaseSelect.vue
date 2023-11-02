<template>
  <n-select
    :value="value"
    :options="options"
    @clear="hadnleClear"
    @update:value="handleChange($event)"
    v-bind="config"
  />
</template>

<script setup lang="ts">
import { NSelect } from 'naive-ui'
import { ref } from 'vue'
import type { TSFSelectConfig } from '../../types'
import type { SelectMixedOption } from 'naive-ui/es/select/src/interface'
import { useTryCatch } from 'v3-usehook'

const props = defineProps<{
  value: any
  config: TSFSelectConfig
  formValue?: any
  formKey?: string
}>()
const emits = defineEmits(['update:value', 'onClear'])

let options = ref<SelectMixedOption[]>([])
function getOptions() {
  if (!props.config.requestApi) {
    // 判断是否需要经过一层过滤
    if (props.config && props.config.customFilter) {
      options.value = (props.config.options || []).filter((v: any) =>
        props.config.customFilter ? props.config.customFilter(v) : true
      )
    } else {
      options.value = props.config.options || []
    }
  } else {
    requsetOptions()
  }
}
getOptions()
async function requsetOptions() {
  let [res] = await useTryCatch(props.config.requestApi, props.config?.params || '')
  if (!res.success) return
  // 判断是否需要经过一层过滤
  if (props.config.customFilter) {
    options.value = res.data.filter((v: any) => (props.config as any).customFilter(v))
  } else {
    options.value = res.data
  }
}
function handleChange(val: any) {
  emits('update:value', val)
  if (props.config.onValueChange && !props.config.multiple) {
    // 非多选模式下的valueChange事件
    props.config.onValueChange(
      options.value.find((v) => v[props.config.valueField || 'id'] === val),
      props?.formValue
    )
  }

  if (props.config.onValueChange && props.config.multiple) {
    props.config.onValueChange(
      val.map((v: any) => {
        return options.value.find((v2) => v2[props.config.valueField || 'id'] === v)
      }),
      props?.formValue
    )
  }
}
function hadnleClear() {
  emits('onClear', props?.formKey)
}

defineExpose({
  setOptions: (data: any[]) => {
    options.value = [...data]
  }
})
</script>
