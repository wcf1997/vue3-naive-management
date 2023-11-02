import type {
  SelectProps,
  InputProps,
  RadioProps,
  CascaderProps,
  InputNumberProps,
  TreeProps,
  DatePickerProps,
  UploadProps,
  CheckboxProps,
  TimePickerProps,
  DynamicInputProps
} from "naive-ui";
import type { Shortcuts } from "naive-ui/es/date-picker/src/interface";

export interface IOption {
  label: string;
  value: any;
}
interface IBaseConfig {
  default?: any;
  params?: any;
  requestApi?: (...args: any) => any;
  onValueChange?: (data: any, formValue: any) => any;
  /** 使用自定义过滤 */
  customFilter?: (data: any) => boolean;
  defaultValue?: any;
  defaultIndex?: number;
}

export interface IAliyunUplaodConfig {
  /**  上传到视频点播的地域，默认值为'cn-shanghai' */
  region: string;
  /**分片大小默认1 MB，不能小于100 KB（100*1024）*/
  partSize: number;
  /** 并行上传分片个数，默认5 */
  parallel: number;
  /** 网络原因失败时，重新上传次数，默认为3 */
  retryCount: number;
  /** 网络原因失败时，重新上传间隔时间，默认为2秒 */
  retryDuration: number;
  /** 设置超时时间 */
  timeout: number;
  /** 阿里云用户ID */
  userId: number;
  /** 此参数是禁用服务端缓存，不影响断点续 */
  localCheckpoint: boolean;
  // 添加文件成功
  addFileSuccess: (data: any) => any;
  // 开始上传
  onUploadstarted: (data: any) => any;
  // 文件上传成功
  onUploadSucceed: (data: {
    userData: string;
    ri: string;
    // fileHash: string
    // fileMd5: string
    endpoint: string;
    bucket: string;
    object: string;
    region: string;
    videoId: string;
    fileName: string;
    fileSize: number;
    filetype: string;
  }) => any;
  // 文件上传失败
  onUploadFailed: (data: any) => any;
  // 取消文件上传
  onUploadCanceled: (data: any) => any;
  // 文件上传进度，单位：字节, 可以在这个函数中拿到上传进度并显示在页面上
  onUploadProgress: (data: any) => any;
  // 上传凭证超时
  onUploadTokenExpired: (data: any) => any;
  // 全部文件上传结束
  onUploadEnd: (data: any) => any;
}
export type TSFDynamicInput = IBaseConfig &
  DynamicInputProps & {
    fieldName?: string;
    properties?: { [propName: string]: any };
  };
export type TSFInputConfig = IBaseConfig & InputProps;
export type TSFSelectConfig = IBaseConfig &
  SelectProps & { /** 使用自定义过滤 */ customFilter?: (data: any) => boolean };
export type TSFRadioConfig = IBaseConfig & RadioProps & { options?: IOption[] };
export type TSFCascaderConfig = IBaseConfig & CascaderProps;
export type TSFInputNumber = IBaseConfig & InputNumberProps;
export type TSFTreeConfig = IBaseConfig & TreeProps;
export type TSFDatePickerConfig = IBaseConfig & DatePickerProps;
export type TSFTimePickerConfig = IBaseConfig & TimePickerProps;
export type TSFUploadConfig = IBaseConfig & UploadProps;
export type TSFAliyunUploadConfig = IBaseConfig &
  UploadProps &
  IAliyunUplaodConfig;
export type TSFCheckboxConfig = IBaseConfig &
  CheckboxProps & {
    labelField?: string;
    valueField?: string;
    options?: IOption[];
    showCheckAll?: boolean;
  };
export type TValidatorType = "mobile" | "cardNo";
export interface ISF_Item<T = any> {
  type?:
    | "input"
    | "select"
    | "radio"
    | "cascader"
    | "inputNumber"
    | "tree"
    | "datePicker"
    | "upload"
    | "checkbox"
    | "timePicker"
    | "dynamicInput";
  span?: number | string;
  title: string;
  key: string;
  hide?: boolean | ((formValue: any) => boolean);
  default?: any;
  config?:
    | TSFInputConfig
    | TSFInputNumber
    | TSFSelectConfig
    | TSFRadioConfig
    | TSFCascaderConfig
    | TSFDatePickerConfig
    | TSFTreeConfig
    | TSFUploadConfig
    | TSFCheckboxConfig
    | TSFTimePickerConfig
    | TSFDynamicInput;

  required?: boolean;
  validator?: TValidatorType | ((text: any, record: T) => any);
}
export interface IFormConfig {
  span?: string | number;
}
