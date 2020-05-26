import axios from 'axios'

export const getDoctemplist = (params) => axios.get(`/fms/api/doc-template/list`, { params })

// 模板配置详情
export const getDoctempDetail = (params) => axios.get(`/fms/api/doc-template/${params}`)
