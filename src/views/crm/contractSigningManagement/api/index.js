import axios from 'axios'

export const contractSigningList = (params) => axios.get('/project/api/contracts/page', { params })
export const contractTypes = (params) => axios.get('/project/api/contract-template/types', { params })
export const contractStatic = (params) => axios.get('/project/api/contracts/status-static', { params })
export const getContractsContent = (params) => axios.get('/project/api/contract-approval/content', { params })
export const getCheckHistory = (params) => axios.get('/project/api/contract-approval/check-history', { params })
