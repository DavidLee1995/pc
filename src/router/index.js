import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/home.vue'
import Welcome from '@/views/Welcome.vue'
import Users from '@/views/User.vue'
import Roles from '@/views/power/Roles.vue'
import Rights from '@/views/power/Rights.vue'
import Goods from '@/views/goods/Goods.vue'
import Categories from '@/views/goods/Category.vue'
import Params from '@/views/goods/Params.vue'
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
    }, { name: 'users', path: 'users', component: Users },
    { name: 'roles', path: 'roles', component: Roles },
    { name: 'rights', path: 'rights', component: Rights },
    { name: 'goods', path: 'goods', component: Goods },
    { name: 'categories', path: 'categories', component: Categories },
    { name: 'params', path: 'params', component: Params }]
  }]
})
