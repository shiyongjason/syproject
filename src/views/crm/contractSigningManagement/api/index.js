import axios from 'axios'

export const contractSigningList = (params) => axios.get('/project/api/contracts/page', { params })
