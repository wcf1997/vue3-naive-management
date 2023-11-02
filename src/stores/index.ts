import cache from "@/utils/cache";
import { userStore } from "./user-store";
// import { aclsStore } from "./acl-store";
// import { dictsStore } from "./dicts-stroe";

export function reloadStore() {
  const userInfo = cache.getSSCache("user");
  const acls = cache.getLSCache("acls");
  const dicts = cache.getLSCache("dicts") || {};
  userStore().setUserInfo(userInfo);
  // aclsStore().setAcls(acls)
  // dictsStore().setDicts(dicts)
}
