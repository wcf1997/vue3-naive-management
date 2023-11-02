<template>
  <div>
    
  </div>
</template>

<script lang="ts">
import { useNotification } from 'naive-ui'
import { defineComponent } from 'vue'

// content
export default defineComponent({
  setup() {
    window.$message = useNotification()
  }
})
</script>

<style scoped></style>
