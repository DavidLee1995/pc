// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/styles/index.scss'

Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
// 设置路由守卫
router.beforeEach((to, from, next) => {
  // 判断是否登录
  let mytoken = localStorage.getItem('myToken') || ''
  if (mytoken) {
    next()
  } else {
    if (to.name !== 'login') {
      next({ path: '/login' })
    } else {
      next()
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
