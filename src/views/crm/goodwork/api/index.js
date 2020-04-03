import axios from 'axios'
//
export function getProject (params) {
    return axios.get(`/memeber/api/project/page`, { params })
}

export const getProjectDetail = (params) => axios.get(`/memeber/api/project/${params}`)

export const putProjectDetail = (params) => axios.put(`/memeber/api/project`, params)

export const saveStatus = (params) => axios.post(`/memeber/api/project/status`, params)

export const updateAudit = (params) => axios.post(`/memeber/api/project/audit`, params)
