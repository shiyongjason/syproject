import { iotUrl } from '@/api/config'
import axios from 'axios'
// 用户实时统计数据
export const getRealreport = (params) => {
    return axios.get(iotUrl + '/uc/user/statistics/real/report', { params })
}