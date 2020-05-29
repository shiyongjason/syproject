import axios from 'axios'

export const getDoctemplist = (params) => axios.get(`/fms/api/doc-template/${params}/list`)

// 模板配置详情
export const getDoctempDetail = (params) => axios.get(`/fms/api/doc-template/${params}`)

export const saveDoctemp = (params) => axios.put('/fms/api/doc-template', params)
