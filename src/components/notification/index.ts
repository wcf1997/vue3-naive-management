import { createVNode, render, type VNode } from "vue";
import emit from "./emit";
import Toast from "./toast-model.vue";
import type { IToastItem } from "./types";

export class NotificationService {
  static instance: NotificationService 
  vm: VNode | undefined = undefined
  message: IToastItem[] = []
  static vm = createVNode(Toast)
  constructor() {
    if (!NotificationService.instance) {
      NotificationService.instance = this
      this.renderVm()
    }
    return NotificationService.instance
  }
  createVm() {
    if (!this.vm) {
      this.vm = createVNode(Toast, {
        messages: this.message
      })

      const wrap = document.createElement('div')
      render(this.vm, wrap)
      document.body.appendChild(wrap.firstElementChild as Element)
    }
  }
  renderVm() {
    const wrap = document.createElement('div')
    render(NotificationService.vm, wrap)
    document.body.appendChild(wrap.firstElementChild as Element)
  }
  add(data?: IToastItem) {
    // if (!this.vm) {
    //   this.createVm();
    // }
    emit.emit('addToast', data)
  }
}
