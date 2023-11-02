class LocalCache {
  PREFIX = "car_service_admin_";
  static instance: LocalCache;
  constructor() {
    if (!LocalCache.instance) {
      LocalCache.instance = this;
    }
    return LocalCache.instance;
  }
  setSSCache(key: string, value: any) {
    if (!value) return;
    sessionStorage.setItem(this.PREFIX + key, JSON.stringify(value));
  }
  setLSCache(key: string, value: any) {
    if (!value) return;
    localStorage.setItem(this.PREFIX + key, JSON.stringify(value));
  }
  getSSCache(key: string) {
    const value = sessionStorage.getItem(this.PREFIX + key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  getLSCache(key: string) {
    const value = localStorage.getItem(this.PREFIX + key);
    if (value) {
      return JSON.parse(value);
    }
    return undefined;
  }
  removeSSCache(key: string) {
    sessionStorage.removeItem(this.PREFIX + key);
  }
  removeLSCache(key: string) {
    localStorage.removeItem(this.PREFIX + key);
  }
  clearSSCache() {
    sessionStorage.clear();
  }
}

export default new LocalCache();
