// main.ts
import 'virtual:uno.css'
import './assets/main.less'
import '@wangeditor/editor/dist/css/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { registerPlugins } from './plugins'
import { reloadStore } from './stores'

const app = createApp(App)
registerPlugins(app)
app.use(createPinia())
reloadStore()
app.use(router)

app.mount('#app')
