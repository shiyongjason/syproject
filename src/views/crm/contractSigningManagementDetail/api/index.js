import axios from 'axios'

export const getContractsContent = (params) => axios.get('/project/api/contract-approval/content', { params })
