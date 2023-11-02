<template>
  <div
    class="p-message-wrapper"
    :class="containerClass"
    role="alert"
    aria-live="assertive"
    aria-atomic="true"
  >
    <div class="p-toast-message-content" :class="message.contentStyleClass">
      <span :class="iconClass"></span>
      <div class="p-toast-message-text">
        <span class="p-toast-summary">{{ message.title }}</span>
        <div class="p-toast-detail">{{ message.message }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import type { IToastItem } from "./types";
const props = defineProps<{
  message: any;
  infoIcon: string;
  warnIcon: string;
  errorIcon: string;
  successIcon: string;
}>();
const emits = defineEmits<{ (e: "close", message: IToastItem): void }>();
let timer: any = setTimeout(() => {
  close();
  clearTimeout(timer);
}, 3000);

function close() {
  emits("close", props.message);
}
const containerClass = computed(() => [
  "p-toast-message",
  props.message.styleClass,
  {
    "p-toast-message-info": props.message.type === "info",
    "p-toast-message-warn": props.message.type === "warn",
    "p-toast-message-error": props.message.type === "error",
    "p-toast-message-success": props.message.type === "success",
  },
]);
const iconClass = computed(() => [
  "p-toast-message-icon",
  {
    [props.infoIcon]: props.message.type === "info",
    [props.warnIcon]: props.message.type === "warn",
    [props.errorIcon]: props.message.type === "error",
    [props.successIcon]: props.message.type === "success",
  },
]);
</script>

<style lang="less" scoped>
.p-message-close,
.p-message-wrapper {
  align-items: center;
  display: flex;
  margin: 1rem 0;
  border-radius: 6px;
}
.p-message-wrapper {
  padding: 1.25rem 1.75rem;
}
.p-toast-message-success {
  background: #e4f8f0;
  border: solid #1ea97c;
  border-width: 0 0 0 6px;
  color: #1ea97c;
}

.p-toast-message-warn {
  background: #fff2e2;
  border: solid #cc8925;
  border-width: 0 0 0 6px;
  color: #cc8925;
}
.p-toast-message-error {
  background: #ffe7e6;
  border: solid #ff5757;
  border-width: 0 0 0 6px;
  color: #ff5757;
}
.p-toast-message-info {
  background: #e6f3ff;
  border: solid #1a43b6;
  border-width: 0 0 0 6px;
  color: #1a43b6;
}
.p-toast-message-primary {
  background: #e9e9ff;
  border: solid #696cff;
  border-width: 0 0 0 6px;
  color: #696cff;
}
</style>
