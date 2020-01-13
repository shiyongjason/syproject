import axios from 'axios'

// 用户权益查询-用户权益
export function getAggregate (params) {
    return axios.get(`/service/api/user-rights/aggregate-query`, { params })
}
// 用户权益查询-权益操作记录
export function getUserRightsTrace (params) {
    return axios.get(`/service/api/user-rights/trace`, { params })
}

// 工单管理-工单信息新增(用户权益入口)
export const createWorkUserRights = (params) => {
    return axios.post(`service/api/work-orders/for-user-right`, params)
}
