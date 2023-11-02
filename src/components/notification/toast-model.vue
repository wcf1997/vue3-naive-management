<template>
  <div class="p-toast p-component p-toast-top-right">
    <transition-group name="p-toast-message" tag="div">
      <BaseToast
        v-for="msg of messages"
        :key="msg.id"
        :message="msg"
        :closeIcon="closeIcon"
        :infoIcon="infoIcon"
        :warnIcon="warnIcon"
        :errorIcon="errorIcon"
        :successIcon="successIcon"
        @close="remove($event)"
      />
    </transition-group>
  </div>
</template>

<script setup lang="ts">
import { onUnmounted, ref, TransitionGroup, } from "vue";
import BaseToast from "./base-toast.vue";
import type { IToastItem } from "./types";
import emit from "./emit";

const id = ref<number>(0);
const props = withDefaults(
  defineProps<{
    closeIcon?: string;
    infoIcon?: string;
    warnIcon?: string;
    errorIcon?: string;
    successIcon?: string;
  }>(),
  {
    closeIcon: "pi pi-times",
    infoIcon: "pi pi-info-circle",
    warnIcon: "pi pi-exclamation-triangle",
    errorIcon: "pi pi-times",
    successIcon: "pi pi-check",
  }
);

//@ts-ignore
emit.on("addToast", add);

let messages = ref<IToastItem[]>([]);

function add(item: IToastItem) {
  messages.value.push({ ...item, id: ++id.value });
}
function remove(message: IToastItem) {
  let index = -1;
  for (let i = 0; i < messages.value.length; i++) {
    if (messages.value[i].id === message.id) {
      index = i;
      break;
    }
  }

  messages.value.splice(index, 1);
 
}

onUnmounted(() => {
  emit.off("addToast");
});
</script>

<style scoped lang="less">
.p-toast {
  z-index: 999999999;
}
.p-component,
.p-component * {
  box-sizing: border-box;
  font-size: 1rem;
  font-weight: normal;
}
.p-message {
  margin: 1rem 0;
  border-radius: 6px;
}
.p-toast-bottom-center {
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.p-toast {
  position: fixed;
  width: 25rem;
  opacity: 0.9;
}
.p-toast-top-right {
  right: 20px;
  top: 20px;
}
// 动画效果
.p-toast-message-enter-from {
  opacity: 0;
  -webkit-transform: translateY(50%);
  -ms-transform: translateY(50%);
  transform: translateY(50%);
}
.p-toast-message-leave-from {
  max-height: 1000px;
}
.p-toast .p-toast-message.p-toast-message-leave-to {
  max-height: 0;
  opacity: 0;
  margin-bottom: 0;
  overflow: hidden;
}
.p-toast-message-enter-active {
  -webkit-transition: transform 0.3s, opacity 0.3s;
  transition: transform 0.3s, opacity 0.3s;
}
.p-toast-message-leave-active {
  -webkit-transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s,
    margin-bottom 0.3s;
  transition: max-height 0.45s cubic-bezier(0, 1, 0, 1), opacity 0.3s,
    margin-bottom 0.3s;
}
</style>
