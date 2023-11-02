// service统一出口
import BaseRequest from "./axios";
import { BASE_URL, TIME_OUT } from "./axios/config";

// import localCache from "@/utils/cache";
import type { AxiosRequestConfig } from "axios";
const httpService = new BaseRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config: AxiosRequestConfig) => {
      // 携带token的拦截
      // const token = localCache.getSSCache("token");
      // if (token && config && config.headers) {
      //   config.headers.token = token;
      // }
      return config;
    },
    requestInterceptorCatch: err => {
      return err;
    },
    responseInterceptor: res => {
      return res;
    },
    responseInterceptorCatch: err => {
      return err;
    }
  }
});

export default httpService;
