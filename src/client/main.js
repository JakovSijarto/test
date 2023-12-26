import { createApp } from 'vue'
import './style.css'
import Router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'


const pinia = createPinia()

createApp(App).use(Router).use(pinia).mount('#app')
