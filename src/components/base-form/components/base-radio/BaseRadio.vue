<template>
  <n-radio-group :value="value" name="radiogroup" @update:value="handleChange($event)">
    <n-space>
      <n-radio v-for="item in options" :key="item.value" :value="item.value">
        {{ item.label }}
      </n-radio>
    </n-space>
  </n-radio-group>
</template>

<script setup lang="ts">
import { NSpace, NRadio, NRadioGroup } from 'naive-ui'
import type { IOption, TSFRadioConfig } from '../../types'
import { ref } from 'vue'
const props = defineProps<{ value: any; config: TSFRadioConfig }>()
const emits = defineEmits(['update:value'])
const options = ref<IOption[]>([])
function handleChange(e: Event) {
  emits('update:value', e)
}
function getOptions() {
  if (!props.config.requestApi) {
    options.value = props.config.options || []
  } else {
    requsetOptions()
  }
}
getOptions()
function requsetOptions() {}
</script>

<style scoped></style>
