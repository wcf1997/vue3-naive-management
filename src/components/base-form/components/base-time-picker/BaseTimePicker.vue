<template>
  <n-time-picker
    :value="value"
    @update:value="hanldeChange($event)"
    value-format="hh:mm:ss"
    v-bind="config"
  />
</template>

<script setup lang="ts">
import { NTimePicker } from 'naive-ui'
import type { TSFTimePickerConfig } from '../../types'
const props = defineProps<{ value: any; config: TSFTimePickerConfig; formValue?: any }>()
const emits = defineEmits(['update:value'])
function hanldeChange(val: any) {
  emits('update:value', val)
  if (props.config.onValueChange) {
    props.config.onValueChange(val, props?.formValue)
  }
}
</script>

<style scoped></style>
