<template>
  <span :class="[type]">
    <slot></slot>
  </span>
</template>

<script setup lang="ts">
defineProps<{ type: 'success' | 'primary' | 'warning' | 'error' }>()
</script>

<style scoped>
.success {
  color: #19a058;
}
.warning {
  color: #f0a020;
}
.error {
  color: #ff3d71ff;
}
.primary {
  color: #2080f0;
}
</style>
