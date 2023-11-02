<template>
  <n-breadcrumb class="rounded-5px mt-15px">
    <n-breadcrumb-item v-for="item of routePath" :key="item.url" @click="jump(item.url)"
      >{{ item.name }}
    </n-breadcrumb-item>
  </n-breadcrumb>
</template>

<script setup lang="ts">
import { NBreadcrumb, NBreadcrumbItem } from 'naive-ui'
import { computed, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

// const routePath =
//   route.matched && route.matched.map((v) => ({ name: v.meta && v.meta.pageName, url: v.path }))
const routePath = computed(
  () =>
    route.matched &&
    route.matched.map((v, i) => ({
      name: v.meta && v.meta.pageName,
      url: v.name || v.redirect ? v.path : ''
    }))
)
function jump(url: string) {
  if (!url) return
  router.push(url)
}
</script>

<style scoped></style>
