import axios from 'axios'
// boss 资金列表
export const getFundsList = (params) => axios.get('/api/fund/query-page', { params })
// 资金确认
export const updateFundsEnter = (params) => axios.post('/api/fund/confirm', params)
