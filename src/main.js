// 入口文件

import Vue from 'vue'

// 导入路由
import VueRouter from 'vue-router'
// 安装路由
Vue.use(VueRouter)

// 导入 axios
import axios from 'axios'
// import VueAxios from 'vue-axios'
// 安装 axios
// Vue.use(axios)
Vue.prototype.$axios = axios
axios.defaults.baseURL = 'http://localhost:8080/';

// 导入MUI的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'

// 按需导入 Mint-UI 中的组件
import { Header, Swipe, SwipeItem, Button} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
Vue.component(Button.name, Button);


// 导入路由模块，router.js
import router from './router'

// 导入格式化时间的插件
import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', (dataStr,pattern = 'YYYY-MM-DD HH:mm:SS') => {
  return moment(dataStr).format(pattern)
})

// 导入App根组件
import app from './App.vue' 

var vm = new Vue({  
  el: '#app',
  data: {},
  methods: {},
  router,
  render: h => h(app),
  
})