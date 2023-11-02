export interface IAliyunFileInfo {
  /** bucket **/
  bucket: string
  /** 视频时长 **/
  duration: string
  /** 视频格式 **/
  format: string
  /** location **/
  location: string
  /** 视频id **/
  videoId: string
  /** 视频地址 **/
  videoUrl: string
  /** 视频封面 */
  videoPic: string
}

export interface IAliyunFileDetail {
  coverUrl: string
  fileUrl: string
  playInfoList: { definition: number; format: string; fps: number; playUrl: string }[]
  videoId: string
  title: string
}
