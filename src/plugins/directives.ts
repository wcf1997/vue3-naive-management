import type { App } from 'vue'

const directives: any = {
  template: {
    // created(el, binding, vnode, prevVnode) {
    // 下面会介绍各个参数的细节
    // 在元素被插入到 DOM 前调用
    // beforeMount(el, binding, vnode, prevVnode) {},
    // 在绑定元素的父组件
    // 及他自己的所有子节点都挂载完成后调用
    mounted(el: HTMLDivElement, binding: any) {
      const onClickEvnet = () => {
        const aEl = document.createElement('a')
        const fileName = typeof binding.value === 'string' ? '导入模板' : binding.value.name
        const href = typeof binding.value === 'string' ? binding.value : binding.value.href
        const event = new MouseEvent('click')
        aEl.href = href
        aEl.download = fileName
        aEl.dispatchEvent(event)
      }
      binding.onClickEvent = onClickEvnet
      el.addEventListener('click', binding.onClickEvent)
    },

    // 绑定元素的父组件卸载前调用
    beforeUnmount(el: HTMLDivElement, binding: any) {
      el.removeEventListener('click', binding.onClickEvent)
    }
  }
}

export function regsiterDirectives(app: App) {
  // 批量注册指令
  const keys = Object.keys(directives)
  keys.forEach((v) => {
    app.directive(v, directives[v])
  })
}
