import axios from 'axios'

export const contractKeyValue = (params) => axios.get(`/project/api/contract-template/types/${params}/params`)
export const getContractsContent = (params) => axios.get('/project/api/contract-approval/content', { params })
// 新增合同编辑记录
export const saveContent = (params) => axios.post('/project/api/contract-approval/save-content', params)
// 合同审批
export const approvalContent = (params) => axios.post('/project/api/contract-approval/approval', params)
//
export const getCheckHistory = (params) => axios.get('/project/api/contract-approval/check-history', { params })
// 查询对比合同内容
export const getDiffApi = (params) => axios.get('/project/api/contract-approval/compare', { params })

// 查询对比合同内容
export const getPurchaseOrderList = (params) => axios.get(`/project/api/purchase-order-contracts/list`, { params })

// 天眼查列表搜索
export const getTYCList = (params) => axios.get(`/memeber/api/tianyancha/searches`, { params })

export const getCaList = (params) => axios.get(`/project/api/ca/org/list`, { params })
