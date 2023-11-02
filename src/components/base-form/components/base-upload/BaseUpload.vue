<template>
  <div class="w-1/1">
    <n-upload
      :value="value"
      action="/upfile/upSixtyFour"
      v-model:file-list="fileList"
      list-type="image-card"
      @preview="handlePreview"
      @remove="handleRemove"
      :custom-request="customRequest"
      v-bind="config"
    >
      点击上传
    </n-upload>
    <n-modal
      v-model:show="showModal"
      preset="card"
      style="width: 600px"
      title=""
    >
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  type UploadFileInfo,
  NUpload,
  type UploadCustomRequestOptions,
  NModal
} from "naive-ui";
import type { TSFUploadConfig } from "../../types";
import { useTryCatch } from "v3-usehook";
import { commonApi } from "@/services/common";
const props = defineProps<{
  value: any;
  config: TSFUploadConfig;
  formValue?: any;
}>();
const emits = defineEmits(["update:value", "onUploading", "onUploadFinished"]);

const fileList = ref<UploadFileInfo[]>([]);
const showModal = ref<boolean>(false);
const previewImageUrl = ref("");

function handlePreview(file: UploadFileInfo) {
  const { url } = file;
  previewImageUrl.value = url as string;
  showModal.value = true;
}
let key = true;
watch(
  () => props.value,
  n => {
    const newData = n
      ? n
          .filter((v: any) => v.url)
          .map((v: any, i: number) => ({ ...v, status: "finished", id: i }))
      : [];
    fileList.value.splice(0, fileList.value.length, ...newData);

    // key = false
  },
  {
    immediate: true
  }
);
/** 自定义上传 */
const customRequest = async ({
  file,
  data,
  headers,
  withCredentials,
  action,
  onFinish,
  onError,
  onProgress
}: UploadCustomRequestOptions) => {
  emits("onUploading");
  key = false;
  const formData = new FormData();
  if (data) {
    Object.keys(data).forEach(key => {
      formData.append(
        key,
        data[key as keyof UploadCustomRequestOptions["data"]]
      );
    });
  }

  // formdata 方式文件上传
  formData.append("photo", file.file as File);
  onProgress({ percent: 90 });
  let [res] = await useTryCatch(commonApi.uploadFile, formData);
  if (!res.success) {
    file.status = "error";
    emits("onUploadFinished");
    onError();
    return;
  }
  onProgress({ percent: 100 });
  file.url = res.data;
  onFinish();
  // fileList.value.push(file)
  emits("onUploadFinished");
  emits("update:value", fileList.value);
};

function handleRemove(options: {
  file: UploadFileInfo;
  fileList: Array<UploadFileInfo>;
}) {
  const file = options.file;
  const fileIndex = options.fileList.findIndex(v => v.id === file.id);
  const files = JSON.parse(JSON.stringify(options.fileList));
  files.splice(fileIndex, 1);
  let tiemr = setTimeout(() => {
    emits("update:value", fileList.value);
    clearTimeout(tiemr);
  });
  return true;
}
</script>

<style scoped></style>
