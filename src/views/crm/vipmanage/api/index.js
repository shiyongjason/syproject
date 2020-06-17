import axios from 'axios'

export const getVipmanage = (params) => axios.get(`/memeber/company/vip/manager`, { params })

export const getViprules = (params) => axios.get(`/memeber/company/vip/rules`, { params })

export const postCompanyvip = (params) => axios.post(`/memeber/company/vip`, params)

export const putCompanyvip = (params) => axios.put(`/memeber/company/vip`, params)

export const getVippage = (params) => axios.get(`/memeber/company/vip/list`, { params })

export const getVippagedetail = (params) => axios.get(`/memeber/company/vip/${params}`)

export const getVippageLoan = (params) => axios.get(`/memeber/company/vip/manager/loan`, { params })
