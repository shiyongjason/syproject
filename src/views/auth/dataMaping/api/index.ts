
import { IPagePrepaymentResponse } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'

export const findOrganizationTree: () => AxiosPromise<any> = () => {
    return axios.get('/uaa/api/organization/tree', { })
}

export const findEhrTree: () => AxiosPromise<any> = () => {
    return axios.get('/uaa/department/getDepartmentTree', { })
}

export const updateOrganization: (params) => AxiosPromise<any> = (params) => {
    return axios.get('/uaa/api/organization', { params })
}