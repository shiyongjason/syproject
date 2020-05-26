import axios from 'axios'
//
export function getProject (params) {
    return axios.get(`/fms/api/risk-check/page`, { params })
}

export const findCrmdep = (params) => axios.get(`/uaa/department/general/${params.pkDeptDoc}/${params.deptType}/${params.jobNumber}/${params.authCode}`)

export const getProjectDetail = (params) => axios.get(`/memeber/openapi/project/${params}`)

export const putProjectDetail = (params) => axios.put(`/memeber/openapi/project`, params)

export const saveStatus = (params) => axios.post(`/memeber/openapi/project/status`, params)

export const updateAudit = (params) => axios.post(`/memeber/openapi/project/audit`, params)

export const getProjectloan = (params) => axios.get(`/memeber/openapi/project/loan`, { params })

export const getProjectrecord = (params) => axios.get(`/memeber/openapi/project/audit/${params}`)
export const getPunchlist = (params) => axios.get(`/memeber/api/punch/list`, { params })
