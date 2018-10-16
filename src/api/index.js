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
// 渲染左侧菜单
export const menuList = obj => axios.get('/menus').then(res => res.data)
// 设置登录函数封装请求
export const handleLogin = obj => axios.post('/login', obj).then(res => res.data)
// 设置用户列表
export const userList = obj => axios.get('/users', { params: obj }).then(res => res.data)
// 删除用户信息
export const delData = id => axios.delete(`/users/${id}`).then(res => res.data)
// 添加用户
export const addUser = obj => axios.post('/users', obj).then(res => res.data)
// 切换用户状态
export const toogleStatus = obj => axios.put(`/users/${obj.id}/state/${obj.type}`).then(res => res.data)
// 编辑用户资料
export const editUser = obj => axios.put(`/users/${obj.id}`, obj).then(res => res.data)
// 角色身份渲染
export const grantRoles = obj => axios.get('/roles').then(res => res.data)
// 角色分配
export const grantGive = obj => axios.put(`/users/${obj.id}/role`, { rid: obj.rid }).then(res => res.data)
// 添加角色
export const addRoles = obj => axios.post(`roles`, obj).then(res => res.data)
// 编辑角色信息
export const eidtoles = obj => axios.put(`roles/${obj.id}`, obj).then(res => res.data)
// 权限列表
export const RightsList = type => axios.get(`/rights/${type}`).then(res => res.data)
// 删除权限
export const delRight = (roleId, rightId) => axios.delete(`/roles/${roleId}/rights/${rightId}`).then(res => res.data)
// 角色授权
export const rightGrant = (roleId, rids) => axios.post(`/roles/${roleId}/rights`, { rids: rids }).then(res => res.data)
// 删除角色
export const deleRoles = id => axios.delete(`/roles/${id}`).then(res => res.data)
// 获得商品分类
export const categories = obj => axios.get(`/categories`, { params: { query: obj.query, pagesize: obj.pagesize, pagenum: obj.pagenum } }).then(res => res.data)
// 练级选择器获取商品列表
export const addGoodsBtn = typemun => axios.get(`/categories`, { params: typemun.type }).then(res => res.data)
// 添加商品分类名称
export const addGoodsName = obj => axios.post(`/categories`, obj).then(res => res.data)
// 删除商品分类
export const delGoodsName = id => axios.delete(`categories/${id}`).then(res => res.data)
// 编辑商品分类
export const editGoodsName = obj => axios.put(`categories/${obj.id}`, {cat_name: obj.cat_name}).then(res => res.data)
