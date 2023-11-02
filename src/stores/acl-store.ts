import { menuIcon } from "@/configs/common-options";
import { commonApi } from "@/services/common";
import { roleServices } from "@/services/system/role-services";
import type { IResource } from "@/services/system/types";
import cache from "@/utils/cache";
import { NIcon } from "naive-ui";
import { defineStore } from "pinia";
import { useTryCatch } from "v3-usehook";
import { type Component, h } from "vue";

function renderIcon(icon: Component) {
  return () => h(NIcon, null, { default: () => h(icon) });
}
export const aclsStore = defineStore("acls", {
  state: (): {
    acls: IResource[];
  } => ({
    acls: []
  }),
  actions: {
    async getAcls(phone: any) {
      const [res] = await useTryCatch(commonApi.getUserRole, phone);
      if (!res.success) return;

      this.acls = res.data;
      cache.setLSCache("acls", res.data);
    },
    setAcls(data: any[]) {
      this.acls = data;
    }
  },
  getters: {
    aclsGetter(state): IResource[] {
      return state.acls;
    },
    menusAcls(state): IResource[] {
      return state.acls
        .filter(v => v.type <= 2)
        .map(v => ({ ...v, icon: renderIcon((menuIcon as any)[v.icon]) }));
    }
  }
});
