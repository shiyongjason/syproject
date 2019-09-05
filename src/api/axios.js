/**
* axios 全局配置
*/
import axios from 'axios'
import {
interfaceUrl
} from './config'
import {
Message
} from 'element-ui'
import store from '@/store/index'

// 配置全局axios请求前缀
axios.defaults.baseURL = interfaceUrl
const configUrl = [
{ method: 'get', url: 'api/login/bossLogin' }
]
// 配置request过滤器
axios.interceptors.request.use(function (config) {
const token = sessionStorage.getItem('token')
if (token) {
config.headers['Authorization'] = 'Bearer ' + token
}
return config
}, function (error) {
return Promise.reject(error)
})

// 配置response过滤器
axios.interceptors.response.use(function (response) {
// TODO 处理 老boss用户不存在不提示错误直接进入首页
const config = response.config
const oldOss = configUrl.filter(item => item.method === config.method && config.url.indexOf(item.url) > -1)
if (oldOss.length > 0) {
store.commit('LOAD_STATE', false)
return response
}
// TODO status==200 异常处理 200 || '200'
if (response.data.code && response.data.code != 200) {
Message({ message: response.data.msg || response.data.message, type: 'error' })
return Promise.reject(response)
}
store.commit('LOAD_STATE', false)
return response
}, function (error) {
// TODO: 后面还是按照后台返回401解决 error.response.status === 401
if (error.config.url.indexOf('/uaa/api/auth/details') > -1 && error.config.timeout === 0) {
Message({ message: '权限无效，已为你重定向到登录页', type: 'error' })
setTimeout(function () {
location.href = '/login'
}, 1200)
return Promise.reject(error)
}
// if (error.request.status === 0 && error.request.readyState === 4 && error.request.timeout === 0) {
// Message({ message: '网络异常，请检查网络链接', type: 'error' })
// return Promise.reject(error)
// }
store.commit('LOAD_STATE', false)
const data = error.response.data
let message = '服务器响应错误：' + error
if (error.response.status === 400 && data.message !== '') {
message = data.message
}
// TODO: 异常统一处理
Message({
message,
type: 'error'
})
return Promise.reject(error)
})