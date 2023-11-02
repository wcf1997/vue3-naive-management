<template>
  <n-input :value="value" type="text" @update:value="hanldeChange($event)" v-bind="config" />
</template>

<script setup lang="ts">
import { NInput } from 'naive-ui'
import type { TSFInputConfig } from '../../types'
defineProps<{ value: any; config: TSFInputConfig }>()
const emits = defineEmits(['update:value'])
function hanldeChange(val: any) {
  emits('update:value', val)
}
</script>

<style scoped></style>
