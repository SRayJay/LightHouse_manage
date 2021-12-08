import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
// import config from './config'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
console.log("环境变量=>",import.meta.env)

const app = createApp(App)

app.use(router)
app.use(Antd)



app.mount('#app')
