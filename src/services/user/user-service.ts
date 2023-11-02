import httpService from "@/request";
import type { IBaseResponse } from "@/request/axios/type";
import type { IUserInfo } from "./type";
const API = "/user";
/** 用户接口 */
export const userService = {
  add: async (data: IUserInfo): Promise<IBaseResponse> => {
    return httpService.post({
      url: `${API}`,
      data
    });
  },
  del: async (id: any): Promise<IBaseResponse> => {
    return httpService.delete({
      url: `${API}/${id}`
      // data: {
      //   id
      // }
    });
  },
  update: async (data: IUserInfo): Promise<IBaseResponse> => {
    return httpService.put({
      url: `${API}`,
      data
    });
  },
  page: async (data: IUserInfo): Promise<IBaseResponse> => {
    return httpService.get({
      url: `${API}/page`,
      data
    });
  },
  doLogin: async (user: {
    loginId: any;
    pw: string;
  }): Promise<IBaseResponse> => {
    return httpService.post({
      url: `${API}/admin/doLogin`,
      data: { data: user }
    });
  }
};
