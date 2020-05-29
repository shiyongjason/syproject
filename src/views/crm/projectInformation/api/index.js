import axios from 'axios'
//

export const findCrmdep = (params) => axios.get(`/uaa/department/general/${params.pkDeptDoc}/${params.deptType}/${params.jobNumber}/${params.authCode}`)

export const getProjectDetail = (params) => axios.get(`/memeber/openapi/project/${params}`)

export const putProjectDetail = (params) => axios.put(`/memeber/openapi/project`, params)

export const saveStatus = (params) => axios.post(`/memeber/openapi/project/status`, params)

export const updateAudit = (params) => axios.post(`/memeber/openapi/project/audit`, params)

export const getProjectloan = (params) => axios.get(`/memeber/openapi/project/loan`, { params })

export const getProjectrecord = (params) => axios.get(`/memeber/openapi/project/audit/${params}`)
export const getPunchlist = (params) => axios.get(`/memeber/api/punch/list`, { params })
// 工程资料list
export function getProject (params) {
    return axios.get(`/fms/api/risk-check/page`, { params })
}
// 查询工程的详情 初审tab
export const getProjectInformationDetail = (projectId) => axios.get(`/fms/api/risk-check/project/${projectId}`, {})
// 查询工程的点击修改获取详情
export const getInformationEditDetail = (params) => axios.get(`/memeber/openapi/project/approve-docs/${params.projectId}/${params.status}/${params.bizType}`, {})
// 查询工程审批结果和项目资料（项目资料收集中，立项，终审）
export const getInformationDetail = (params) => axios.get(`/memeber/openapi/project/approve-docs/${params.projectId}/${params.status}/${params.bizType}`, {})
// 资料保存
export const saveDoc = (params) => axios.post(`/fms/api/risk-check/save/project-doc`, params)
// 资料保存
export const submitDoc = (params) => axios.post(`/fms/api/risk-check/submit/project-doc`, params)
