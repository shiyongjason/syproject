import axios from 'axios'

export const contractSigningList = (params) => axios.get('/project/api/contracts/page', { params })
export const contractTypes = (params) => axios.get('/project/api/contract-template/types', { params })
// 无确认函
export const contractTypesNotConfirm = (params) => axios.get('/project/api/contract-template/types/not-confirm', { params })
export const contractStatic = (params) => axios.get('/project/api/contracts/status-static', { params })
export const getContractsContent = (params) => axios.get('/project/api/contract-approval/content', { params })
export const getCheckHistory = (params) => axios.get('/project/api/contract-approval/check-history', { params })
// 查询对比合同内容
export const getDiffApi = (params) => axios.get('/project/api/contract-approval/compare', { params })
