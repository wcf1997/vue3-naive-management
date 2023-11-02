/// <reference types="vite/client" />

interface IAliyunUplaodConfig {
  /**  上传到视频点播的地域，默认值为'cn-shanghai' */
  region: string
  /**分片大小默认1 MB，不能小于100 KB（100*1024）*/
  partSize: number
  /** 并行上传分片个数，默认5 */
  parallel: number
  /** 网络原因失败时，重新上传次数，默认为3 */
  retryCount: number
  /** 网络原因失败时，重新上传间隔时间，默认为2秒 */
  retryDuration: number
  /** 设置超时时间 */
  timeout: number
  /** 阿里云用户ID */
  userId: any
  /** 此参数是禁用服务端缓存，不影响断点续 */
  localCheckpoint: boolean
  // 添加文件成功
  addFileSuccess: (uploadInfo: any) => any
  // 开始上传
  onUploadstarted: (uploadInfo: any) => any
  // 文件上传成功
  onUploadSucceed: (uploadInfo: any) => any
  // 文件上传失败
  onUploadFailed: (uploadInfo, code, message) => any
  // 取消文件上传
  onUploadCanceled: (uploadInfo, code, message) => any
  // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
  onUploadProgress: (uploadInfo, code, message) => any
  // 上传凭证超时
  onUploadTokenExpired: (uploadInfo: any) => any
  // 全部文件上传结束
  onUploadEnd: (uploadInfo: any) => any
}
interface Window {
  $message: any
}

class Vod {
  constructor(config: Partial<IAliyunUplaodConfig>) {
    return config
  }
}
declare const AliyunUpload = {
  Vod: Vod
}
