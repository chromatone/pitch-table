import { createApp } from 'vue'
import App from './App.vue'
import 'virtual:windi.css'
import '@vueform/slider/themes/default.css'
import { GesturePlugin } from '@vueuse/gesture'
import slider from '@vueform/slider'
const app = createApp(App)

app.use(GesturePlugin)
app.component('slider', slider)
app.mount('#app')
