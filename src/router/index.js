import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/Welcome.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    name: 'login',
    path: '/login',
    component: Login
  }, {
    name: 'home',
    path: '/',
    component: Home,
    redirect: {name: 'welcome'},
    children: [{
      name: 'welcome',
      path: 'welcome',
      component: Welcome
    }]
  }]
})
