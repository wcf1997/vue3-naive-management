<template>
  <n-checkbox
    v-if="props.config.showCheckAll"
    key="allChecked"
    label="全选"
    @change="hadnleAllChecked"
  ></n-checkbox>
  <n-checkbox-group :value="value" @update:value="handleChange($event as any)">
    <n-space item-style="display: flex;">
      <n-checkbox
        v-for="item in options"
        :key="item.value"
        :value="item[props.config?.valueField || 'value']"
        :label="item[props.config?.labelField || 'label']"
      />
    </n-space>
  </n-checkbox-group>
</template>

<script setup lang="ts">
import { NSpace, NCheckbox, NCheckboxGroup } from 'naive-ui'
import type { TSFCheckboxConfig } from '../../types'
import { ref } from 'vue'
import { useTryCatch } from 'v3-usehook'
const props = defineProps<{ value: any; config: TSFCheckboxConfig }>()
const emits = defineEmits(['update:value'])
const options = ref<any[]>([])

function getOptions() {
  if (!props.config.requestApi) {
    options.value = props.config?.options || []
  } else {
    requsetOptions()
  }
}
getOptions()
async function requsetOptions() {
  let [res] = await useTryCatch(props.config.requestApi, props.config?.params || '')
  if (!res.success) return
  // 判断是否需要经过一层过滤
  if (props.config?.customFilter) {
    options.value = res.data.filter((v: any) => (props.config as any).customFilter(v))
  } else {
    options.value = res.data
  }
}
function hadnleAllChecked() {
  handleChange(options.value.map((v: any) => v[props.config.valueField || 'value']))
}
function handleChange(e: any) {
  emits('update:value', e)
}
</script>

<style scoped></style>
