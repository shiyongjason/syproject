import axios from 'axios'
const URL = 'http://192.168.20.248:30100'
export const getContratTemp = (params) => axios.get(`/project/api/contract-templates`, { params })

// 合同模板详情
export const getContratDetail = (params) => axios.get(`/project/api/contract-templates/{params}`)

// 模板type
export const getContratType = (params) => axios.get(`/project/api/contract-template/types`)

// 合同约定字段
export const getContratParam = (params) => axios.get(`/project/api/contract-template/types/${params}/params`)

// 新增模板
export const addContractTemp = (params) => axios.post(`/project/api/contract-templates`, params)

export const getAllparams = (params) => axios.get(`/project/api/contract-template/types/${params}/params`)
