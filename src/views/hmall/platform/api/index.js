import axios from 'axios'
import {
    ossUrl, interfaceUrl
} from '@/api/config'

// 查询平台公司信息列表
export const findplatformList = (params) => {
    return axios.get(ossUrl + 'api/organization/company-list', {
        params
    })
}
// 机构在线的 分部查询
export const findDepList = (params) => {
    return axios.get(ossUrl + 'api/httpH5/3107', {
        params
    })
}

// 查询省市区
export const findProvinceAndCity = (params) => {
    return axios.get(interfaceUrl + 'develop/developbasicinfo/findProvinceAndCity', {
        params
    })
}
// 开启
export const createOpen = (params) => {
    return axios.post(interfaceUrl + 'api/organization/start-b2b', params)
}
