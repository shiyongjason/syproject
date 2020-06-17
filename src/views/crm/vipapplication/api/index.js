import axios from 'axios'

export const getApplyvip = (params) => axios.get(`/memeber/company/vip/apply-list`, { params })

export const postVipsigner = (params) => axios.post(`/memeber/company/vip/signer`, params)

export const seachContract = (params) => axios.get(`/uaa/employee/contracts/${params}`)
