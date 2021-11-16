import axios from 'axios'

export const getCreditManager = (params) => axios.get(`/memeber/company/credit/manager`, { params })

export const getCreditPage = (params) => axios.get(`/memeber/company/credit/company-credit`, { params })

export const getCreditDetail = (params) => axios.get(`/memeber/company/credit/${params}`)

export const postCreditDetail = (params) => axios.post(`/memeber/company/credit`, params)

export const getCreditDocument = (params) => axios.get(`/memeber/api/credit-document/${params}/1/detail`)

// 授信审核通过
export const saveCreditDocument = (params) => axios.post(`/memeber/api/credit-document/submit-document`, params)

export const putCreditDocument = (params) => axios.delete(`/memeber/api/credit-document/${params}`)

export const getCreditRecords = (params) => axios.get(`/memeber/api/credit-document/${params}/record/list`)

export const refuseCredit = (params) => axios.post(`/memeber/api/credit-document/refuse`, params)

// 上传授信
export const uploadCredit = (params) => axios.post(`/memeber/api/credit-document/upload-file`, params)

// 资料提交
export const submitDoc = (params) => axios.post(`/memeber/api/credit-document/submit-document`, params)
// 保存授信材料
export const submitcreditDoc = (params) => axios.post(`/memeber/api/credit-document/save/credit-documents`, params)
// 授信资料详情
export const getCreditdocumentType = (params) => axios.get(`/memeber/api/credit-document/${params.companyId}/${params.type}/detail`, params)

// 根据ID 查询信用
export const getComcredit = (params) => axios.get(`/memeber/company/credit/companys/${params}`)
export const downLoadZip = (params) => axios.get(`memeber/api/credit-document/download/${params.companyId}/${params.activeName}/detail`)

// 临时额度列表
export const temporaryQuotaList = (params) => axios.get('/memeber/api/quota/temporary-quota/page', { params })
// 临时额度新增
export const temporaryQuotaAdd = (params) => axios.post('/memeber/api/quota/temporary-quota', { request: params })
// 临时额度修改
export const temporaryQuotaUpdate = (params) => axios.put('/memeber/api/quota/temporary-quota', params)
// 手动失效
export const manualLose = (params) => axios.post('/memeber/api/quota/temporary-quota/status', params)
