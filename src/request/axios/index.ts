import axios from "axios";
import type { AxiosInstance } from "axios";
import type { BaseRequestInterceptors, BaseRequestConfig } from "./type";

import errorMessage from "./errorMessage";
import { NotificationService } from "@/components/notification";
import { userStore } from "@/stores/user-store";
import cache from "@/utils/cache";
// import router from '@/router'

axios.defaults.headers.post["Content-Type"] = "application/json";

const notification = new NotificationService();

const DEAFULT_LOADING = false;
// const message = useNotification()
class BaseRequest {
  instance: AxiosInstance;
  interceptors?: BaseRequestInterceptors;
  showLoading: boolean;
  loading?: any;

  constructor(config: BaseRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config);
    // this.instance.defaults.headers.post["Content-Type"] =
    //   "application/json;application/x-www-form-urlencoded";

    // 保存基本信息
    this.showLoading = config.showLoading ?? DEAFULT_LOADING;
    this.interceptors = config.interceptors;
    // this.loading = Toast;

    // 使用拦截器
    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      config => {
        const userInfo = cache.getSSCache("user") || {};
        if (
          userInfo.tokenvalue &&
          config.baseURL &&
          config.baseURL?.indexOf("https://api.wxls.pro/cms/pass/video") < 0
        ) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          // config.headers['Bearer  '] = userInfo.token
          config.headers[userInfo.tokenname] = `${userInfo.tokenvalue}`;
        }
        if (this.showLoading) {
          this.loading.loading({
            message: "加载中...",
            duration: 0,
            forbidClick: true,
            loadingType: "spinner"
          });
        }
        return config;
      },
      err => {
        return err;
      }
    );

    this.instance.interceptors.response.use(
      res => {
        // 将loading移除
        // this.loading?.clear();
        // Toast.hide()
        if (res.status === 200 && !res.data.success) {
          notification.add({
            type: "error",
            message: res.data.message
          });

          if (res.data.code === "60003") {
            cache.removeSSCache("user");
            location.href = location.origin + "/";
          }
        }

        return res.status === 200
          ? Promise.resolve(res.data)
          : Promise.reject(res);
      },
      err => {
        // 将loading移除
        this.loading?.clear();
        // Toast.hide()
        if (err && err.response) {
          notification.add({
            type: "error",
            message: errorMessage[err.response.status]
          });
        } else {
          // 网络超时
          notification.add({
            type: "error",
            message: "网络连接超时，请稍后重试！"
          });
        }
        return Promise.reject(err);
      }
    );
  }

  request<T>(config: BaseRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config);
      }

      // 2.判断是否需要显示loading
      if (config.showLoading) {
        this.showLoading = config.showLoading;
      }

      this.instance
        .request<any, T>(config)
        .then(res => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res);
          }
          // 2.将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;

          // 3.将结果resolve返回出去
          resolve(res);
        })
        .catch(err => {
          // 将showLoading设置true, 这样不会影响下一个请求
          this.showLoading = DEAFULT_LOADING;
          reject(err);
          return err;
        });
    });
  }

  get<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "GET"
    });
  }
  post<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      headers: {
        "Content-Type": "application/json"
      },
      ...config,
      method: "POST"
    });
  }
  put<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "PUT"
    });
  }
  delete<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "DELETE"
    });
  }
  patch<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: "PATCH"
    });
  }
}

export default BaseRequest;
