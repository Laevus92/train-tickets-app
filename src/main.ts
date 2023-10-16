import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { Quasar, Dialog, Notify } from 'quasar'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const myApp = createApp(App)

myApp.use(createPinia()).use(Quasar, {
  plugins: { Dialog, Notify },
})

myApp.mount('#app')
