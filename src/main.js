import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import "vue-select/dist/vue-select.css";

let app = createApp(App)
app.use(router)
app.mount('#app')
