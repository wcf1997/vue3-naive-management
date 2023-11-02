import type { App } from 'vue'
import { regsiterDirectives } from './directives'

export function registerPlugins(app: App) {
  regsiterDirectives(app)
}
