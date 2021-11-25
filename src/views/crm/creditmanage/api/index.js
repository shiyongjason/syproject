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
// export const temporaryQuotaUpdate = (params) => axios.put('/memeber/api/quota/temporary-quota', params)
// 手动失效
export const manualLose = (params) => axios.post('/memeber/api/quota/temporary-quota/status', params)
// 支付单申请 额度冻结
// export const quotaFreeze = (params) => axios.post('/memeber/api/quota/quota-freeze', params)
// 查询公司列表（共享企业标签）
export const shareCompanyList = (params) => axios.get('/memeber/openapi/company/label/list', { params })
// 公司企业额度共享关联企业
export const creditShareAdd = (params) => axios.post('/memeber/company/credit/credit-share/add', params)
// 公司企业额度共享关联企业
export const creditShareCancel = (params) => axios.put('/memeber/company/credit/credit-share/cancel', params)
// 查询共享企业列表
export const shareCompanies = (params) => axios.get(`/memeber/company/credit/${params.companyId}/share-companies`, params)
// 查询公司信用修改列表
export const creditUpdatRecord = (params) => axios.get(`/memeber/company-credit-change-records/${params.companyId}/list`, params)
// 查询企业信用详情
export const companyDetail = (params) => axios.get(`/memeber/company/credit/boss/${params.companyId}/detail`, params)
// 企业解冻
export const updateCreditUnFreeze = (companyId) => axios.post(`/memeber/company/credit/credit-unfreeze/${companyId}`, {})
// 企业冻结
export const updateCreditFreeze = (params) => axios.post(`/memeber/company/credit/credit-freeze`, params)
