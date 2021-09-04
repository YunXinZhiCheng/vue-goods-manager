import { createApp } from 'vue'
// 完整引入element-plus所有组件
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'

// 设置环境变量: 开发模块
import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_APP_URL

const app = createApp(App)

app.use(ElementPlus)
app.mount('#app')
