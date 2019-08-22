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
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// 配置request过滤器
axios.interceptors.request.use(function (config) {
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    }
    // if (config.method === 'get') {
    //     config.url += '?t=' + new Date().getTime()
    // }
    // const showLoading = NO_LOADING_REQ.filter(item => item.method == config.method && config.url.indexOf(item.url) > -1)
    // if (showLoading.length < 0) {
    //     store.commit('LOAD_STATE', true)
    // }
    return config
}, function (error) {
    return Promise.reject(error)
})

// 配置response过滤器
axios.interceptors.response.use(function (response) {
    store.commit('LOAD_STATE', false)
    return response
}, function (error) {
    // TODO: 后面还是按照后台返回401解决 error.response.status === 401
    if (error.config.url.indexOf('/uaa/api/') > -1 && error.config.timeout === 0) {
        Message({ message: '权限无效，已为你重定向到登录页', type: 'error' })
        setTimeout(function () {
            location.href = '/login'
        }, 1200)
        return Promise.reject(error)
    }
    if (error.request.status === 0 && error.request.readyState === 4 && error.request.timeout === 0) {
        Message({ message: '网络异常，请检查网络链接', type: 'error' })
        return Promise.reject(error)
    }
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
