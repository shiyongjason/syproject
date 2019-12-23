import axios from 'axios'

// 用户权益查询-用户权益
export function getAggregate (params) {
    return axios.get(`/service/api/user-rights/aggregate-query`, { params })
}
// 用户权益查询-权益操作记录
export function getUserRightsTrace (params) {
    return axios.get(`/service/api/user-rights/trace`, { params })
}
