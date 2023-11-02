import { commonApi } from '@/services/common'
import type { ILoginInfo, IUserInfo } from '@/services/system/types'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'
import { useTryCatch } from 'v3-usehook'

export const userStore = defineStore('user', {
  state: (): { user: Partial<IUserInfo & ILoginInfo> } => {
    return { user: {} }
  },
  actions: {
    setUserInfo(data: any) {
      this.$state.user = data
      cache.setSSCache('user', data)
    },
    logout() {
      this.$state.user = {}
      cache.removeSSCache('user')
      cache.removeLSCache('acls')
    },
    async setSchoolInfo(phone: string) {
      const [res] = await useTryCatch(commonApi.getUserSchool, phone)
      if (!res) return
      console.log(res.data)
    }
  },
  getters: {
    userInfo(state): Required<IUserInfo> {
      return state.user as Required<IUserInfo>
    }
  }
})
