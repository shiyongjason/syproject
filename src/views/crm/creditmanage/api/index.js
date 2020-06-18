import axios from 'axios'

export const getCreditManager = (params) => axios.get(`/memeber/company/credit/manager`, { params })

export const getCreditPage = (params) => axios.get(`/memeber/company/credit/company-credit`, { params })

export const getCreditDetail = (params) => axios.get(`/memeber/company/credit/${params}`)

export const postCreditDetail = (params) => axios.post(`/memeber/company/credit`, params)

export const getCreditDocument = (params) => axios.get(`/memeber/api/credit-document/${params}/detail`)

// 授信审核通过
export const saveCreditDocument = (params) => axios.post(`/memeber/api/credit-document/submit-document`, { params })

export const putCreditDocument = (params) => axios.delete(`/memeber/api/credit-document/${params}`)

export const getCreditRecords = (params) => axios.get(`/memeber/api/credit-document/${params}/record/list`)

export const refuseCredit = (params) => axios.post(`/memeber/api/credit-document/refuse`, params)

// 上传授信
export const uploadCredit = (params) => axios.post(`/memeber/api/credit-document/upload-file`, params)
