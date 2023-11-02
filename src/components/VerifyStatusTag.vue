<template>
  <div>
    <n-tag :type="tagMap[status].type"> {{ tagMap[status].text }} </n-tag>
  </div>
</template>

<script setup lang="ts">
import { NTag } from 'naive-ui'
const props = defineProps<{ status: -1 | 0 | 1 }>()
const tagMap: {
  [propName: string]: {
    text: string
    type: 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'
  }
} = {
  '-1': {
    text: '审核不通过',
    type: 'error'
  },
  '0': { text: '待审核', type: 'warning' },
  '1': { text: '审核通过', type: 'success' }
}
</script>

<style scoped></style>
