import axios from 'axios'
// 埋点请求
export const tracking = (params) => axios.post('ets/api/event-tracks', params)
// oss 文件操作获取身份
export const getOssSTS = () => {
    return axios.post('http://192.168.20.248:8021/common/files/credentials')
}
