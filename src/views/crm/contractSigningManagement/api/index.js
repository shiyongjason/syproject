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
// 废止合同
export const getAbolish = (params) => axios.post('/project/api/contracts/abolish', params)
// 合同审批
export const approveContracts = (params) => axios.post('/project/api/contract-approval/approval', params)
// 合同驳回
export const rejectContracts = (params) => axios.post('/project/api/contract-approval/reject', params)
// 提交修订
export const submitApprove = (params) => axios.post('/project/api/contracts/submit-approve', params)
// 查看无模板合同
export const getNoTempContracts = (params) => axios.get(`/project/api/contracts/contract-pics/${params}`)
// 下载无模板合同
export const downNoTempContracts = (params) => axios.get(`/project/api/contracts/download/${params}`)
// 更新归档
export const signContractarchive = (params) => axios.post(`/project/api/contract-signs/contract-archive`, params)