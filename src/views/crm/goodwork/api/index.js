import axios from 'axios'
import { crmUrl } from '@/api/config'
//
export function getProject (params) {
    return axios.get(crmUrl + `/api/project/page`, { params })
}

export const getProjectDetail = (params) => axios.get(crmUrl + `/api/project/${params}`)

export const putProjectDetail = (params) => axios.put(crmUrl + `/api/project`, params)
