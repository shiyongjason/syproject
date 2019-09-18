import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import { interfaceUrl } from './config'

const TIME_OUT = 6000 // 连接超时时间
const token = sessionStorage.getItem('token')

const configUrl = [{ method: 'get', url: 'api/login/bossLogin' }]
/* const http = axios.create({
    baseURL: `${interfaceUrl}`,
    timeout: TIME_OUT
}) */
axios.defaults.baseURL = interfaceUrl
axios.defaults.timeout = TIME_OUT
const requestArr = []
/** 声明一个数组用于存储每个请求的取消函数和标识(请求如果还在pending，同个请求就被取消) */
const cancelRequst = (config) => {
    for (const key in requestArr) {
        if (requestArr[key].url === `${config.url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
            requestArr[key].cancel('取消重复请求') // 执行取消操作
            requestArr.splice(Number(key), 1) // 把这条记录从数组中移除
        }
    }
}

// 添加请求拦截器、取消请求
const CancelToken = axios.CancelToken
axios.interceptors.request.use(
    (config) => {
        token && (config.headers['Authorization'] = `Bearer ${token}`)
        cancelRequst(config) // 在一个请求发送前执行一下取消操作
        config.cancelToken = new CancelToken(cancelMethod => {
            requestArr.push({ url: `${config.url}&${config.method}`, cancel: cancelMethod })
        })
        // store.commit('LOAD_STATE', true)
        return config
    },
    (error) => {
        Promise.reject(error)
    }
)
// 添加响应拦截器
axios.interceptors.response.use(
    (response) => {
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
        console.log(error)
        if (error.message && error.message == '取消重复请求') {
            return Promise.reject(error)
        }
        let errorMessage = ''
        if (error.response && error.response.status === 400) {
            errorMessage = error.response.data.message
        } else {
            errorMessage = '服务器响应错误：' + error
        }
        store.commit('LOAD_STATE', false)
        Message({
            message: errorMessage,
            type: 'error'
        })
        return Promise.reject(error)
    }
)

// export default http