import axios from 'axios'
//
export function getProject (params) {
    return axios.get(`/memeber/openapi/project/page`, { params })
}

export const findCrmdep = (params) => axios.get(`/uaa/department/general/${params.pkDeptDoc}/${params.deptType}/${params.jobNumber}/${params.authCode}`)

export const getProjectDetail = (params) => axios.get(`/memeber/openapi/project/${params}`)

export const putProjectDetail = (params) => axios.put(`/memeber/openapi/project`, params)

export const saveStatus = (params) => axios.post(`/memeber/openapi/project/status`, params)

export const updateAudit = (params) => axios.post(`/memeber/openapi/project/audit`, params)

export const getProjectloan = (params) => axios.get(`/memeber/openapi/project/loan`, { params })

export const getProjectrecord = (params) => axios.get(`/memeber/openapi/project/audit/${params}`)
export const getPunchlist = (params) => axios.get(`/memeber/api/punch/list`, { params })
// 资料详情
export const getRiskprojecData = (params) => axios.get(`/memeber/openapi/project/approve-docs/${params.projectId}/${params.status}/${params.bizType}?authFlag=1`)

// 打回材料
export const refuseDoc = (params) => axios.post(`/fms/api/doc-template/project/refuse`, params)
// 打回记录
export const getRefuseDoc = (params) => axios.get(`/fms/api/doc-template/project/refuse/${params}`)
// 材料状态提交
export const submitProjectdoc = (params) => axios.post(`/fms/api/risk-check/submit/project-doc`, params)
// 工程项目终审
export const updateFinalStatus = (params) => axios.post(`/memeber/openapi/project/final-approve`, params)

export const saveProjectdoc = (params) => axios.post(`/fms/api/risk-check/save/project-doc`, params)

// 审核（签约和放款使用）
export const signAudit = (params) => axios.post(`/memeber/openapi/project/sign-audit`, params)

export const checkTemplatedoc = (params) => axios.post(`/fms/api/risk-check/project/template-doc`, params)

// 设置 服务费 项目等级
export const saveCreditLevel = (params) => axios.put(`/memeber/openapi/project/levels`, params)
// 查询项目评级和对应经销商评级
export const getProjectLevels = (projectId) => axios.get(`/memeber/openapi/project/levels/${projectId}`)
// 设置项目等级&项目服务费
export const setProjectLevels = (params) => axios.put(`/memeber/openapi/project/levels`, params)
export const downLoadZip = (params) => axios.get(`memeber/openapi/project/docs-download/${params.projectId}/${params.status}/${params.bizType}`)
// 天眼查列表搜索
export const getTYCList = (params) => axios.get(`/memeber/api/tianyancha/searches`, { params })

// 评审决议详情
export const getResolutions = (params) => axios.get(`/memeber/api/resolutions/boss/${params}`)

// 保存客户信息
export const resCustomer = (params) => axios.patch(`/memeber/api/resolutions/boss/customer`, params)

// 保存 采购单
export const resPurchase = (params) => axios.patch(`/memeber/api/resolutions/boss/purchase`, params)

// 评议记录
export const getRecordList = (params) => axios.get(`/memeber/api/resolutions/boss/${params}/record-list`)

// 评审决议通过 钉钉回调
export const initiateDing = (params) => axios.post(`/memeber/api/resolutions/boss/initiate-ding`, params)
// 评审决议不通过
export const finalApproveNo = (params) => axios.put(`/memeber/api/resolutions/boss/final-approve-not-pass`, params)
// 新增空采购单
export const addEmptyPurchase = (params) => axios.post(`/project/api/purchase-orders/boss-save`, params)
// 删除采购单
export const deletePurchase = (params) => axios.delete(`/project/api/purchase-orders/boss/${params}`)
