<template>
  <span>
    <span class="mobile-td-name md:hidden inline-block text-[#999]">{{ title }}：</span>
    <span
      ><slot>{{ value }}</slot></span
    >
  </span>
</template>

<script setup lang="ts">
defineProps<{ title: string; value?: any }>()
</script>

<style scoped></style>
