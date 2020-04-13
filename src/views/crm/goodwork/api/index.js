import axios from 'axios'
//
export function getProject (params) {
    return axios.get(`/memeber/openapi/project/page`, { params })
}

export const getProjectDetail = (params) => axios.get(`/memeber/openapi/project/${params}`)

export const putProjectDetail = (params) => axios.put(`/memeber/openapi/project`, params)

export const saveStatus = (params) => axios.post(`/memeber/openapi/project/status`, params)

export const updateAudit = (params) => axios.post(`/memeber/openapi/project/audit`, params)

export const getProjectloan = (params) => axios.get(`/memeber/openapi/project/loan`, { params })
