import axios from 'axios'
import { ccpBaseUrl } from '@/api/config'

// 埋点请求
export const tracking = (params) => axios.post('ets/api/event-tracks', params)
// oss 文件操作获取身份
export const getOssSTS = () => {
    return axios.get('common/oss/credentials')
}
export const uploadFiles = (params) => axios.post(ccpBaseUrl + `common/files/upload-base64`, params)