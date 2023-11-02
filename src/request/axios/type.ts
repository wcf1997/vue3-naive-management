import type { AxiosRequestConfig, AxiosResponse } from "axios";

export interface BaseRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig;
  requestInterceptorCatch?: (error: any) => any;
  responseInterceptor?: (res: T) => T;
  responseInterceptorCatch?: (error: any) => any;
}

export interface BaseRequestConfig<T = AxiosResponse>
  extends AxiosRequestConfig {
  interceptors?: BaseRequestInterceptors<T>;
  showLoading?: boolean;
  isRight?: boolean;
}

export interface IBaseResponse<T = any> {
  data?: T;
  code?: string;
  message?: string;
  success?: boolean;
  tipText?: string;
}

export interface IResponseRecord<T = any> {
  current: number;
  pages: number;
  records: T[];
  size: number;
  total: number;
}
