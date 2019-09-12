// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import WeVue from 'we-vue'
import 'we-vue/lib/style.css'

import axios from 'axios'
Vue.prototype.axios = axios;
// axios.defaults.baseURL = "http://localhost:9999";
// 请求拦截器，在拦截器中请求头设置携带token
axios.interceptors.request.use(function (config) {
  // console.log(config)
  if(!config.url.endsWith('/login') && !config.url.endsWith('/register')){
    // 如果请求不是登录和注册，设置请求头
    config.headers['Authorization'] = localStorage.getItem('token');
  }
  return config;
});

//引入重置的样式
import './assets/new.css'


Vue.use(WeVue)


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
