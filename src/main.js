// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css'
import '../static/layui/css/layui.css'
import ElementUI from 'element-ui'
import store from './store'
import axios from 'axios'
import './assets/icon/user/iconfont.css' // 引入第三方样式
import './assets/icon/display/iconfont.css' // 引入第三方样式

Vue.use(ElementUI)
Vue.prototype.$axios = axios
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
