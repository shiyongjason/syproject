import axios from 'axios'
import store from '@/store/index'
import { Message } from 'element-ui'
import { B2bUrl } from './config'

const instance = axios.create({
    baseURL: B2bUrl
})
instance.interceptors.request.use(async function (config) {
    // 登录token带到请求的头部中，用于校验登录状态
    const token = sessionStorage.getItem('token')
    if (token) {
        config.headers['Authorization'] = 'Bearer ' + token
    } else {
        const { data } = await axios.post(B2bUrl + 'uaa/oauth/token', {
            'grant_type': 'client_credentials',
            'client_id': 'boss',
            'client_secret': 'boss',
            'scope': 'boss'
        })
        sessionStorage.setItem('token', data.access_token)
        config.headers['Authorization'] = 'Bearer ' + data.access_token
    }
    store.commit('LOAD_STATE', true)
    return config
}, function (error) {
    return Promise.reject(error)
})

instance.interceptors.response.use(function (response) {
    // 尽调返回code 判断 by-勇哥
    // eslint-disable-next-line
    if (response.data.code && response.data.code != 200) {
        Message({
            dangerouslyUseHTMLString: true,
            message: response.data.msg + '<br>请钉钉联系研发中心赵娟~',
            type: 'error'
        })
        store.commit('LOAD_STATE', false)
        return Promise.reject(response)
    }
    store.commit('LOAD_STATE', false)
    store.commit('IS_SAVING', false)
    return response
}, function (error) {
    // TODO: 异常统一处理
    let errorMessage = ''
    if (error.response && error.response.status === 400) {
        errorMessage = error.response.data.message
    } else {
        errorMessage = '服务器响应错误：' + error
    }
    store.commit('LOAD_STATE', false)
    store.commit('IS_SAVING', false)
    Message({
        message: errorMessage,
        type: 'error'
    })
    return Promise.reject(error)
})

export default instance
