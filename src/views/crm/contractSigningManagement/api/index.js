import axios from 'axios'

export const contractSigningList = (params) => axios.get('/project/api/contracts/page', { params })
export const contractTypes = (params) => axios.get('/project/api/contract-template/types', { params })
