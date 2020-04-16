import axios from 'axios'
// 资金计划汇总数据
export const getPlanTotalList = (params) => {
    return axios.get(`develop/fundplan/summary`, { params })
}