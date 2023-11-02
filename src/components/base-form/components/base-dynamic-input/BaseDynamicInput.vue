<template>
  <NDynamicInput
    :value="value"
    :on-create="onCreate"
    @update:value="hanldeChange($event)"
    v-bind="config"
  >
    <template #default="{ value }">
      <NSpace>
        <n-input
          v-for="(item, propName, index) of properties"
          v-model:value="value[propName]"
          type="text"
          v-bind="item"
        />
      </NSpace>
    </template>
  </NDynamicInput>
</template>

<script setup lang="ts">
import { NDynamicInput, NInput, NSpace } from "naive-ui";
import type { TSFDynamicInput } from "../../types";
import { ref } from "vue";
const props = defineProps<{ value: any; config: TSFDynamicInput }>();
const properties = props.config.properties;
const emits = defineEmits(["update:value"]);
function hanldeChange(val: any) {
  emits("update:value", val);
}

function handleInputChange(data: any, index: number) {
  let fileValue = [...props.value];
  fileValue[index][props.config.fieldName || ""] = data;
  emits("update:value", fileValue);
}

function onCreate() {
  let obj: any = {};
  if (properties) {
    Object.keys(properties).forEach(v => {
      obj[v] = properties[v].defaultValue ? properties[v].defaultValue : null;
    });
  }
  return obj;
}
</script>

<style scoped></style>
