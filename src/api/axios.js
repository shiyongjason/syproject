import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import { interfaceUrl } from './config'

// const TIME_OUT = 60000 // 连接超时时间

const configUrl = [{ method: 'get', url: 'api/login/bossLogin' }]
/* const http = axios.create({
    baseURL: `${interfaceUrl}`,
    timeout: TIME_OUT
}) */
axios.defaults.baseURL = interfaceUrl
// axios.defaults.timeout = TIME_OUT
axios.defaults.headers['AccessKeyId'] = '5ksbfewexbfc'
const requestArr = []
/** 声明一个数组用于存储每个请求的取消函数和标识(请求如果还在pending，同个请求就被取消) */
const cancelRequst = (config) => {
    for (const key in requestArr) {
        if (requestArr[key].url === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
            console.log(`${config.url}&${config.method}`)
            requestArr[key].cancel('取消重复请求') // 执行取消操作
            requestArr.splice(Number(key), 1) // 把这条记录从数组中移除
        }
    }
}

// 添加请求拦截器、取消请求
// const CancelToken = axios.CancelToken
axios.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token')
        const refreshToken = sessionStorage.getItem('refreshToken')
        token && (config.headers['Authorization'] = `Bearer ${token}`)
        refreshToken && (config.headers['RefreshToken'] = `${refreshToken}`)
        // cancelRequst(config) // 在一个请求发送前执行一下取消操作
        // config.cancelToken = new CancelToken(cancelMethod => {
        //     requestArr.push({ url: `${config.url}&${config.method}`, cancel: cancelMethod })
        // })
        store.commit('LOAD_STATE', true)
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
        response.headers.new_access_token && sessionStorage.setItem('token', response.headers.new_access_token)
        response.headers.new_refresh_token && sessionStorage.setItem('refreshToken', response.headers.new_refresh_token)
        cancelRequst(response.config)// 请求响应后，把已经完成的请求从requestArr中移除
        // TODO 处理 老boss用户不存在不提示错误直接进入首页
        const config = response.config
        const oldOss = configUrl.filter(item => item.method === config.method && config.url.indexOf(item.url) > -1)
        if (oldOss.length > 0) {
            store.commit('LOAD_STATE', false)
            return response
        }
        if (response.data.code && response.data.code != 200) {
            Message({
                message: response.data.msg || response.data.message,
                type: 'error'
            })
            store.commit('LOAD_STATE', false)
            return Promise.reject(response)
        }
        store.commit('LOAD_STATE', false)
        return response
    },
    (error) => {
        if (axios.isCancel(error)) {
            console.log('Rquest canceled：', error.response.data.message)
            return Promise.reject(error)
        }
        // TODO: 后面还是按照后台返回401解决 error.response.status === 401
        if (error.config.url.indexOf('/uaa/api/auth/details') > -1 && error.config.timeout === 0) {
            Message({
                message: '权限无效，已为你重定向到登录页',
                type: 'error'
            })
            setTimeout(function () {
                location.href = '/login'
            }, 1200)
            return Promise.reject(error)
        }

        // console.log(error)
        // if (error.response && error.response.status) {
        //     switch (error.response.status) {
        //         case 401:
        //             Message({
        //                 message: '权限无效，已为你重定向到登录页',
        //                 type: 'error'
        //             })
        //             setTimeout(() => {
        //                 location.href = '/login'
        //             }, 1200)
        //             return Promise.reject(error)
        //         case 400:
        //             console.log(error.response)
        //             errorMessage = error.response.data.message
        //             break
        //         default:
        //     }
        // }
        store.commit('LOAD_STATE', false)
        const data = error.response.data
        let message = '服务器响应错误：' + error
        if (error.response.status === 400 && data.message !== '') {
            message = data.message
        }
        Message({
            message: message,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

// export default http
