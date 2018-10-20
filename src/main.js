// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App'
import router from './router'
import '@/styles/index.scss'
// 引入数据表组件
import ECharts from 'vue-echarts'
import moment from 'moment/moment'
// 引入vue-amap
import VueAMap from 'vue-amap'
Vue.filter('moment', function (value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(value).format(formatString)
})
Vue.use(VueAMap)
// 引入数据表组件
Vue.component('chart', ECharts)

Vue.config.productionTip = false
Vue.use(ElementUI)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

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
