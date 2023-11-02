<template>
  <div class="w-1/1">
    <n-upload
      :value="value"
      action="/upfile/upSixtyFour"
      :default-file-list="fileList"
      @remove="handleRemove"
      :custom-request="customRequest"
      :multiple="false"
      :max="1"
      v-bind="config"
    >
      <n-upload-dragger v-if="config.directoryDnd">
        <div style="margin-bottom: 12px">
          <n-icon size="48" :depth="3">
            <ArchiveOutline />
          </n-icon>
        </div>
        <n-text style="font-size: 16px"> 点击或者拖动文件到该区域来上传 </n-text>
        <n-p depth="3" style="margin: 8px 0 0 0">
          请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
        </n-p>
      </n-upload-dragger>
      <span v-if="!config.listType">点击上传</span>
    </n-upload>
    <n-modal v-model:show="showModal" preset="card" style="width: 600px" title="">
      <img :src="previewImageUrl" style="width: 100%" />
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import {
  type UploadFileInfo,
  NUpload,
  type UploadCustomRequestOptions,
  NModal,
  NUploadDragger,
  NP,
  NText,
  NIcon,
  useMessage
} from 'naive-ui'
import type { TSFAliyunUploadConfig } from '../../types'
import { useTryCatch } from 'v3-usehook'
import { ArchiveOutline } from '@vicons/ionicons5'
import { commonApi } from '@/services/common'
// import axios from 'axios'
const props = defineProps<{ value: any; config: TSFAliyunUploadConfig; formValue?: any }>()
const message = useMessage()
const emits = defineEmits(['update:value'])
const fileList = ref<UploadFileInfo[]>([])
const showModal = ref<boolean>(false)
const previewImageUrl = ref('')
const uploadStatus = reactive({
  authProgress: 0,
  uploadDisabled: true,
  resumeDisabled: true,
  pauseDisabled: true,
  statusText: ''
})
/** 缓存上传凭证 */
let uploadSingalCache: any
// let uploader: any = new AliyunUpload.Vod({
//   timeout: props.config.timeout || 60000,
//   partSize: Math.round(props.config.partSize || 3048576),
//   parallel: props.config.parallel || 5,
//   retryCount: props.config.retryCount || 3,
//   retryDuration: props.config.retryDuration || 2,
//   region: props.config.region,
//   userId: props.config.userId,
//   //此参数是禁用服务端缓存，不影响断点续,
//   localCheckpoint: true,
//   addFileSuccess(uploadInfo) {
//     uploadStatus.uploadDisabled = false
//     uploadStatus.resumeDisabled = false
//     uploadStatus.statusText = '添加文件成功, 等待上传...'
//     console.log('addFileSuccess: ' + uploadInfo.file.name)
//   },
//   async onUploadstarted(uploadInfo) {
//     // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
//     // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
//     // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
//     // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
//     // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
//     // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
//     let [res] = await useTryCatch(commonApi.uploadVideoByYxw, { filename: uploadInfo.file.name })
//     uploadSingalCache = res.data
//     let uploadAuth = res.data.uploadAuth
//     let uploadAddress = res.data.uploadAddress
//     let videoId = res.data.videoId

//     uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
//     uploadStatus.statusText = '文件开始上传...'
//     console.log(
//       'onUploadStarted:' +
//         uploadInfo.file.name +
//         ', endpoint:' +
//         uploadInfo.endpoint +
//         ', bucket:' +
//         uploadInfo.bucket +
//         ', object:' +
//         uploadInfo.object
//     )
//   },
//   // 文件上传成功
//   onUploadSucceed: function (uploadInfo) {
//     console.log(
//       'onUploadSucceed: ' +
//         uploadInfo.file.name +
//         ', endpoint:' +
//         uploadInfo.endpoint +
//         ', bucket:' +
//         uploadInfo.bucket +
//         ', object:' +
//         uploadInfo.object
//     )
//     uploadStatus.statusText = '文件上传成功!'
//   },
//   // 文件上传失败
//   onUploadFailed: function (uploadInfo, code, message) {
//     console.log(
//       'onUploadFailed: file:' + uploadInfo.file.name + ',code:' + code + ', message:' + message
//     )
//     uploadStatus.statusText = '文件上传失败!'
//   },
//   // 取消文件上传
//   onUploadCanceled: function (uploadInfo, code, message) {
//     console.log(
//       'Canceled file: ' + uploadInfo.file.name + ', code: ' + code + ', message:' + message
//     )
//     uploadStatus.statusText = '文件已暂停上传'
//   },
//   // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
//   onUploadProgress: function (uploadInfo, totalSize, progress) {
//     console.log(
//       'onUploadProgress:file:' +
//         uploadInfo.file.name +
//         ', fileSize:' +
//         totalSize +
//         ', percent:' +
//         Math.ceil(progress * 100) +
//         '%'
//     )
//     let progressPercent = Math.ceil(progress * 100)
//     uploadInfo.authProgress = progressPercent
//     uploadStatus.statusText = '文件上传中...'
//   },
//   // 上传凭证超时
//   onUploadTokenExpired: function (uploadInfo) {
//     // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
//     // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
//     // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth

//     uploader.resumeUploadWithAuth(uploadSingalCache.uploadAuth)
//     uploadStatus.statusText = '文件超时...'
//   },
//   // 全部文件上传结束
//   onUploadEnd: function (uploadInfo) {
//     console.log('onUploadEnd: uploaded all the files')
//     uploadStatus.statusText = '文件上传完毕'
//   }
// })
let uploader: any

watch(
  () => props.value,
  (n, o) => {
    console.log(n, o, getTypeof(n))

    if (getTypeof(n) === 'array') {
      fileList.value.push(
        ...props.value
          .filter((v: any) => v.url)
          .map((v: any, i: number) => ({ ...v, status: 'finished', id: i }))
      )
    } else {
      if (n) {
        //@ts-ignore
        fileList.value.push({
          id: '1',
          status: 'finished',
          url: n,
          name: '视频'
        })
      }
    }
  },
  {
    // immediate: true
  }
)

function createAliyunUpload(
  onFinsh: () => any,
  onError: () => any,
  onProgress: (e: { percent: number }) => any
) {
  uploader = new AliyunUpload.Vod({
    timeout: props.config.timeout || 60000,
    partSize: Math.round(props.config.partSize || 3048576),
    parallel: props.config.parallel || 5,
    retryCount: props.config.retryCount || 3,
    retryDuration: props.config.retryDuration || 2,
    region: props.config.region,
    userId: props.config.userId || '1303984639806000',
    //此参数是禁用服务端缓存，不影响断点续,
    localCheckpoint: true,
    addFileSuccess(uploadInfo) {
      uploadStatus.uploadDisabled = false
      uploadStatus.resumeDisabled = false
      // uploadStatus.statusText = '添加文件成功, 等待上传...'
      // message.success('添加文件成功, 等待上传...')
      console.log('addFileSuccess: ' + uploadInfo.file.name)
    },
    async onUploadstarted(uploadInfo) {
      // 如果是 UploadAuth 上传方式, 需要调用 uploader.setUploadAuthAndAddress 方法
      // 如果是 UploadAuth 上传方式, 需要根据 uploadInfo.videoId是否有值，调用点播的不同接口获取uploadauth和uploadAddress
      // 如果 uploadInfo.videoId 有值，调用刷新视频上传凭证接口，否则调用创建视频上传凭证接口
      // 注意: 这里是测试 demo 所以直接调用了获取 UploadAuth 的测试接口, 用户在使用时需要判断 uploadInfo.videoId 存在与否从而调用 openApi
      // 如果 uploadInfo.videoId 存在, 调用 刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)
      // 如果 uploadInfo.videoId 不存在,调用 获取视频上传地址和凭证接口(https://help.aliyun.com/document_detail/55407.html)
      let [res] = await useTryCatch(commonApi.uploadVideoByYxw, { filename: uploadInfo.file.name })
      uploadSingalCache = res.data
      let uploadAuth = res.data.uploadAuth
      let uploadAddress = res.data.uploadAddress
      let videoId = res.data.videoId

      uploader.setUploadAuthAndAddress(uploadInfo, uploadAuth, uploadAddress, videoId)
      // uploadStatus.statusText = '文件开始上传...'
      console.log(
        'onUploadStarted:' +
          uploadInfo.file.name +
          ', endpoint:' +
          uploadInfo.endpoint +
          ', bucket:' +
          uploadInfo.bucket +
          ', object:' +
          uploadInfo.object
      )
    },
    // 文件上传成功
    onUploadSucceed: function (uploadInfo) {
      console.log(
        'uploadInfo',
        uploadInfo,
        'onUploadSucceed: ' +
          uploadInfo.file.name +
          ', endpoint:' +
          uploadInfo.endpoint +
          ', bucket:' +
          uploadInfo.bucket +
          ', object:' +
          uploadInfo.object
      )
      // uploadStatus.statusText = '文件上传成功!'
      // message.success('文件上传成功')
      onFinsh()
      const fileDataFormatter = {
        userData: uploadInfo.userData,
        ri: uploadInfo.ri,
        endpoint: uploadInfo.endpoint,
        bucket: uploadInfo.bucket,
        object: uploadInfo.object,
        region: uploadInfo.region,
        videoId: uploadInfo.videoId,
        fileName: uploadInfo.file.name,
        fileSize: uploadInfo.file.size,
        filetype: uploadInfo.file.type
      }
      emits('update:value', [fileDataFormatter])
      props.config &&
        props.config.onUploadSucceed &&
        props.config.onUploadSucceed(fileDataFormatter)
    },
    // 文件上传失败
    onUploadFailed: function (uploadInfo, code, errMessage) {
      console.log(
        'onUploadFailed: file:' +
          uploadInfo.file.name +
          ',code:' +
          code +
          ', errMessage:' +
          errMessage
      )
      // uploadStatus.statusText = '文件上传失败!'
      message.error('文件上传失败!')
      onError()
    },
    // 取消文件上传
    onUploadCanceled: function (uploadInfo, code, msg) {
      console.log('Canceled file: ' + uploadInfo.file.name + ', code: ' + code + ', msg:' + msg)
      // uploadStatus.statusText = '文件已暂停上传'
      message.warning('文件已暂停上传!')
    },
    // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
    onUploadProgress: function (uploadInfo, totalSize, progress) {
      console.log(
        'onUploadProgress:file:' +
          uploadInfo.file.name +
          ', fileSize:' +
          totalSize +
          ', percent:' +
          Math.ceil(progress * 100) +
          '%'
      )
      let progressPercent = Math.ceil(progress * 100)
      uploadInfo.authProgress = progressPercent
      // uploadStatus.statusText = '文件上传中...'
      onProgress({ percent: progressPercent })
    },
    // 上传凭证超时
    onUploadTokenExpired: function (uploadInfo) {
      // 上传大文件超时, 如果是上传方式一即根据 UploadAuth 上传时
      // 需要根据 uploadInfo.videoId 调用刷新视频上传凭证接口(https://help.aliyun.com/document_detail/55408.html)重新获取 UploadAuth
      // 然后调用 resumeUploadWithAuth 方法, 这里是测试接口, 所以我直接获取了 UploadAuth

      uploader.resumeUploadWithAuth(uploadSingalCache.uploadAuth)
      // uploadStatus.statusText = '文件超时...'
      message.error('文件超时...')
    },
    // 全部文件上传结束
    onUploadEnd: function (uploadInfo) {
      console.log('onUploadEnd: uploaded all the files')
      // uploadStatus.statusText = '文件上传完毕'
      message.success('文件上传成功')
    }
  })
}
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
  createAliyunUpload(onFinish, onError, onProgress)
  fileChange(file)
  authUpload()
}

function handleRemove(options: { file: UploadFileInfo; fileList: Array<UploadFileInfo> }) {
  const file = options.file
  const fileIndex = fileList.value.findIndex((v) => v.id === file.id)
  fileList.value.splice(fileIndex, 1)
  emits('update:value', fileList.value)

  return true
}

/** oss 文件上传 */
function fileChange(file: UploadFileInfo) {
  const uploadFile = file.file
  if (!uploadFile) {
    alert('请先选择需要上传的文件!')
    return
  }
  var Title = uploadFile.name
  var userData = '{"Vod":{}}'
  if (uploader) {
    uploader.stopUpload()
    uploadStatus.authProgress = 0
    uploadStatus.statusText = ''
  }
  // this.uploader = this.createUploader();
  console.log(userData)
  uploader.addFile(uploadFile, null, null, null, userData)
  uploadStatus.uploadDisabled = false
  uploadStatus.pauseDisabled = true
  uploadStatus.resumeDisabled = true
}
function authUpload() {
  // 然后调用 startUpload 方法, 开始上传
  if (uploader !== null) {
    uploader.startUpload()
    uploadStatus.uploadDisabled = true
    uploadStatus.pauseDisabled = false
  }
}
// 暂停上传
function pauseUpload() {
  if (uploader !== null) {
    uploader.stopUpload()
    uploadStatus.resumeDisabled = false
    uploadStatus.pauseDisabled = true
  }
}
// 恢复上传
function resumeUpload() {
  if (uploader !== null) {
    uploader.startUpload()
    uploadStatus.resumeDisabled = true
    uploadStatus.pauseDisabled = false
  }
}

function getTypeof(data: any) {
  if (data instanceof Array) return 'array'
  if (data instanceof Object) return 'object'
  return typeof data
}
</script>

<style scoped></style>
