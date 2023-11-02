<template>
  <div class="vsible-select">
    <span :class="[value === null ? 'active' : '']" @click="handleSelectAll">全部</span>
    <span
      v-for="(item, index) of options"
      :key="(item as any)[valueField]"
      :class="item[valueField] === value ? 'active' : ''"
      @click="() => handleSelect(item, index)"
      >{{ item[labelField] }}</span
    >
  </div>
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
const valueField: any = props.config.valueField || 'value'
const labelField = props.config.labelField || 'label'

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
function handleSelect(data: any, index: number) {
  emits('update:value', data[valueField])
  setValueChange(data)
}
function handleSelectAll() {
  emits('update:value', null)
  setValueChange(null)
}
function setValueChange(data: any) {
  if (props.config.onValueChange && !props.config.multiple) {
    // 非多选模式下的valueChange事件
    props.config.onValueChange(
      options.value.find((v) => v[valueField] === data[valueField]),
      props?.formValue
    )
  }
  // if (props.config.onValueChange && props.config.multiple) {
  //   props.config.onValueChange(
  //     val.map((v: any) => {
  //       return options.value.find((v2) => v2[props.config.valueField || 'id'] === v)
  //     }),
  //     props?.formValue
  //   )
  // }
}

defineExpose({
  setOptions: (data: any[]) => {
    options.value = [...data]
  }
})
</script>

<style lang="less">
.vsible-select {
  font-size: 14px;
  line-height: 35px;
  span {
    display: inline-block;
    padding: 0 6px;
    margin-bottom: 10px;
    color: #999;
    cursor: pointer;
    &.active {
      color: #3366ffff;
    }
  }
}
</style>
