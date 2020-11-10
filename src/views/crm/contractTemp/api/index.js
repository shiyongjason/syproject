import axios from 'axios'
const URL = 'http://192.168.20.248:30100'
export const getContratTemp = (params) => axios.get(URL + `/api/contract-templates`, { params })

// 合同模板详情
export const getContratDetail = (params) => axios.get(URL + `/api/contract-templates/{params}`)
