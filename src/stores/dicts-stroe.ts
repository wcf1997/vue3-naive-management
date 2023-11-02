import { dictsService } from '@/services/dicts/dicts-service'
import type { IDicts } from '@/services/dicts/types'
import cache from '@/utils/cache'
import { defineStore } from 'pinia'
import { useTryCatch } from 'v3-usehook'

export const dictsStore = defineStore('dicts', {
  state: (): {
    dicts: { [propName: number | string]: any }
  } => ({
    dicts: {}
  }),
  actions: {
    async getDicts() {
      const obj: any = {}
      const [res] = await useTryCatch(dictsService.getList)
      if (!res.success) return
      res.data.forEach((item: IDicts) => {
        obj[item.id] = item.ivalue
      })
      this.dicts = obj
      cache.setLSCache('dicts', obj)
    },
    setDicts(data: any) {
      this.dicts = data
    }
  },
  getters: {
    dictsGetter(state): any {
      return state.dicts
    }
  }
})
