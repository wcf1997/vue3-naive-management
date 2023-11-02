<template>
  <n-input-number
    :value="value"
    type="text"
    @update:value="hanldeChange($event)"
    clearable
    v-bind="config"
  />
</template>

<script setup lang="ts">
import { NInputNumber } from 'naive-ui'
import type { TSFInputNumber } from '../../types'
defineProps<{ value: any; config: TSFInputNumber }>()
const emits = defineEmits(['update:value'])
function hanldeChange(val: any) {
  emits('update:value', val)
}
</script>

<style scoped></style>
