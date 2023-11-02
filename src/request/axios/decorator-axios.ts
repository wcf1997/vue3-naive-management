import router from '@/router'
import cache from '@/utils/cache'
import axios, { type AxiosInstance } from 'axios'
import errorMessage from './errorMessage'
import type { BaseRequestConfig } from './type'

export class AxiosClass {
  private instance: AxiosInstance
  // interceptors?: BaseRequestInterceptors
  // abstract timerout;
  constructor(config: BaseRequestConfig) {
    // 创建axios实例
    this.instance = axios.create(config)

    // 保存基本信息
    // this.interceptors = config.interceptors
    // 使用拦截器
    // 2.添加所有的实例都有的拦截器
    this.instance.interceptors.request.use(
      (config) => {
        // const userInfo = cache.getSSCache('user') || {}

        // if (userInfo.token) {
        //   // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   // @ts-ignore
        //   // config.headers['Bearer  '] = userInfo.token
        //   config.headers['Authorization'] = `${userInfo.tokenType} ${userInfo.token}`
        // }

        return config
      },
      (err) => {
        return err
      }
    )

    this.instance.interceptors.response.use(
      (res) => {
        // 将loading移除
        // this.loading?.clear();
        // Toast.hide()
        // if (res.status === 200 && !res.data.success) {
        //   notification.add({
        //     type: 'error',
        //     message: res.data.message
        //   })
        //   if (res.data.code === '401') {
        //     cache.removeSSCache('user')
        //     router.push('/')
        //   }
        // }

        return res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)
      },
      (err) => {
        // 将loading移除
        // Toast.hide()
        // if (err && err.response) {
        //   notification.add({
        //     type: 'error',
        //     message: errorMessage[err.response.status]
        //   })
        // } else {
        //   // 网络超时
        //   notification.add({
        //     type: 'error',
        //     message: '网络连接超时，请稍后重试！'
        //   })
        // }
        return Promise.reject(err)
      }
    )
  }

  request<T>(config: BaseRequestConfig<T>): Promise<T> {
    return new Promise((resolve, reject) => {
      // 1.单个请求对请求config的处理
      if (config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }

      // 2.判断是否需要显示loading

      this.instance
        .request<any, T>(config)
        .then((res) => {
          // 1.单个请求对数据的处理
          if (config.interceptors?.responseInterceptor) {
            res = config.interceptors.responseInterceptor(res)
          }

          // 3.将结果resolve返回出去
          resolve(res)
        })
        .catch((err) => {
          reject(err)
          return err
        })
    })
  }

  get<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'GET'
    })
  }
  post<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      headers: {
        'Content-Type': 'application/json'
      },
      ...config,
      method: 'POST'
    })
  }
  put<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PUT'
    })
  }
  delete<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'DELETE'
    })
  }
  patch<T = any>(config: BaseRequestConfig<T>): Promise<T> {
    return this.request<T>({
      ...config,
      method: 'PATCH'
    })
  }
}
