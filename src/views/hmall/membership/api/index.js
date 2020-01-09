import { ccpBaseUrl } from '@/api/config'
import instance from '@/api/axios_new.js'
import axios from 'axios'
// 省市区
export const getChiness = (params) => {
    return axios.get(ccpBaseUrl + 'common/region/provinces/nesting', { params })
}