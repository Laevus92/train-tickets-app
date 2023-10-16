import '@quasar/extras/material-icons/material-icons.css'
import 'quasar/src/css/index.sass'
import { Quasar, Dialog } from 'quasar'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './App.vue'

const myApp = createApp(App)

myApp.use(createPinia()).use(Quasar, {
  plugins: { Dialog }, // import Quasar plugins and add here
})

// Assumes you have a <div id="app"></div> in your index.html
myApp.mount('#app')
