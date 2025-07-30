import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Trainee from './Trainee.vue'
import router from './router'

const app = createApp(Trainee)

app.use(createPinia())
app.use(router)

app.mount('#app')
