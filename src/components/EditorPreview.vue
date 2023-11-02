<template>
  <div>
    <div class="phone sticky">
      <div class="camera"></div>
      <div class="speaker"></div>
      <div class="sleep-button"></div>
      <div class="silent-switch"></div>
      <div class="volume up"></div>
      <div class="volume down"></div>
      <div class="screen editor-content-view" style="overflow-y: auto" v-html="html"></div>
      <div class="home-button"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import '@/assets/editor.css'
//@ts-ignore
import { Editor } from '@wangeditor/editor-for-vue'
defineProps<{ html: any }>()
</script>

<style scoped>
.phone {
  position: relative;
  background: #000;
  height: 667px;
  width: 365px;
  border-radius: 25px;
  margin: 0 auto;
}
.camera {
  position: absolute;
  background: #7a7a7a;
  height: 8px;
  width: 8px;
  border-radius: 15px;
  top: 22px;
  left: 85px;
}
.speaker {
  position: absolute;
  background: #7a7a7a;
  height: 6px;
  width: 50px;
  border-radius: 15px;
  top: 22px;
  left: 105px;
}
.sleep-button {
  position: absolute;
  background: #1e1e1e;
  height: 35px;
  width: 3px;
  border-top-right-radius: 3px 3px;
  border-bottom-right-radius: 3px 3px;
  top: 105px;
  left: 250px;
}
.silent-switch {
  position: absolute;
  background: #1e1e1e;
  height: 25px;
  width: 3px;
  border-top-left-radius: 3px 3px;
  border-bottom-left-radius: 3px 3px;
  top: 60px;
  left: -3px;
}
.volume {
  position: absolute;
  background: #1e1e1e;
  width: 3px;
  height: 35px;
  border-top-left-radius: 3px 3px;
  border-bottom-left-radius: 3px 3px;
  left: -3px;
}
.up {
  top: 105px;
}
.down {
  top: 145px;
}
.screen {
  position: absolute;
  overflow: hidden;
  background-color: #fff;
  height: 550px;
  width: 345px;
  top: 50px;
  left: 10px;
  background-size: cover;
}
.home-button {
  position: absolute;
  border: 1px solid #7a7a7a;
  height: 35px;
  width: 35px;
  border-radius: 25px;
  bottom: 12px;
  left: 50%;
  margin-left: -18px;
}
</style>
