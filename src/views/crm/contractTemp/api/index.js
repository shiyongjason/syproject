import axios from 'axios'
export const getContratTemp = (params) => axios.get(`/project/api/contract-templates`, { params })

// 合同模板详情
export const getContratDetail = (params) => axios.get(`/project/api/contract-templates/${params}`)

// 模板type
// export const getContratType = (params) => axios.get(`/project/api/contract-template/types`, { params })
export const getContratType = (params) => axios.get(`/project/api/contract-template/types/auth-types`, { params })

// 合同约定字段
export const getContratParam = (params) => axios.get(`/project/api/contract-template/types/${params}/params`)

// 新增模板
export const addContractTemp = (params) => axios.post(`/project/api/contract-templates`, params)

// 编辑保存
export const putContractTemp = (params) => axios.put(`/project/api/contract-templates`, params)

export const getAllparams = (params) => axios.get(`/project/api/contract-template/types/${params}/params`)

// 启用
export const enableTemp = (params) => axios.patch(`/project/api/contract-templates/${params}/enable`)
export const disableTemp = (params) => axios.patch(`/project/api/contract-templates/${params}/disable`)

// CA 企业
export const orgCApage = (params) => axios.get(`/project/api/ca/org/page`, { params })

// 版本记录
export const findver = (params) => axios.get(`/project/api/contract-template/versions`, { params })

export const findVerDetail = (params) => axios.get(`/project/api/contract-template/versions/${params}`)
// 获取合同模板下拉列表
export const getContratList = (params) => axios.get('/project/api/ca/org/list', { params })
