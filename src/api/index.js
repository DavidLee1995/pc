import axios from 'axios'

// 设置基本路径
axios.defaults.baseURL = 'http://127.0.0.1:8888/api/private/v1'
// 设置拦截器
axios.interceptors.request.use(function (config) {
  // Do something before request is sent
  let mytoken = localStorage.getItem('myToken') || ''
  if (mytoken) {
    config.headers['Authorization'] = mytoken
  }
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
// 设置登录函数封装请求
export const handleLogin = obj => axios.post('/login', obj).then(res => res.data)
// 设置用户列表
export const userList = obj => axios.get('/users', {params: obj}).then(res => res.data)
