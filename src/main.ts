import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import storage from "./utils/storage.js"
// import config from './config'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
console.log("环境变量=>",import.meta.env)

const app = createApp(App)

app.config.globalProperties.$storage = storage;
app.use(router)
app.use(store)
app.use(Antd)



app.mount('#app')
