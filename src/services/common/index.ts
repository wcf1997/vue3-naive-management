import httpService from "@/request";
import type { IBaseResponse } from "@/request/axios/type";
import type { AxiosInterceptorOptions } from "axios";
import type { IAliyunFileDetail, IAliyunFileInfo } from "./types";
const API = "/common";
const LOGIN_API = "/login";
const FILE_API = "/upfile";

export const commonApi = {
  /** 文件上传 */
  uploadFile: async (
    data: any,
    config?: AxiosInterceptorOptions
  ): Promise<IBaseResponse> => {
    return httpService.post({
      url: `/upfile`,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      data,
      ...config
    });
  }
};
