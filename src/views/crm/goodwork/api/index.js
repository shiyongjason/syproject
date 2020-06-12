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

export const saveProjectdoc = (params) => axios.post(`/fms/api/risk-check/save/project-doc`, params)
