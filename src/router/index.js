import Vue from 'vue'
import Router from 'vue-router'
import Home from './home/home'
import Collect from './collect/collect'
import Center from './center/center'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      redirect: '/home'
    },
    Home,
    Collect,
    Center
  ]
})
