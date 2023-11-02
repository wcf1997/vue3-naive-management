<template>
  <n-date-picker
    :value="value"
    @update:value="hanldeChange($event)"
    type="date"
    :default-formatted-value="formatStr"
    :format="formatStr"
    v-bind="config"
  />
</template>

<script setup lang="ts">
import { NDatePicker } from 'naive-ui'
import type { TSFDatePickerConfig } from '../../types'
const props = defineProps<{ value: any; config: TSFDatePickerConfig; formValue?: any }>()

const emits = defineEmits(['update:value'])
const formatStr = props.config.type === 'datetimerange' ? 'yyyy/MM/dd HH:mm:ss' : 'yyyy/MM/dd'
function hanldeChange(val: any) {
  emits('update:value', val)
  if (props.config.onValueChange) {
    props.config.onValueChange(val, props?.formValue)
  }
}
</script>

<style scoped></style>
