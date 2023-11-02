<template>
  <n-result class="mt-1/6" status="404" title="404 资源不存在">
    <template #footer>
      <n-button type="primary" class="mr-20px" @click="toLogin">跳转登录</n-button>
      <n-button @click="back">返回</n-button>
    </template>
  </n-result>
</template>
<script setup lang="ts">
import { userStore } from '@/stores/user-store'
import { NResult, NButton } from 'naive-ui'
import { useRouter } from 'vue-router'
const router = useRouter()
const user = userStore()
function toLogin() {
  if (user && user.userInfo) {
    user.logout()
    router.replace('/')
  }
}

function back() {
  history.back()
}
</script>
