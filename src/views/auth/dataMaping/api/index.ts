
import { IPagePrepaymentResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const findOrganizationTree: (type) => AxiosPromise<any> = (type) => {
    return axios.get(`/uaa/api/organization/tree/${type}`, { })
}

export const findEhrTree: () => AxiosPromise<any> = () => {
    return axios.get('/uaa/department/getDepartmentTree', { })
}

export const updateOrganizationTree: (params) => AxiosPromise<any> = (params) => {
    return axios.post('/uaa/api/organization/tree', params)
}

export const updateOrganizationNode: (params) => AxiosPromise<any> = (params) => {
    return axios.post('/uaa/api/organization', params)
}

export const editOrganizationNode: (params) => AxiosPromise<any> = (params) => {
    return axios.put('/uaa/api/organization', params)
}

export const deleteOrganizationNode: (id) => AxiosPromise<any> = (id) => {
    return axios.delete(`/uaa/api/organization/${id}`)
}