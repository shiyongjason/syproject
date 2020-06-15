import axios from 'axios'

export const getVipmanage = (params) => axios.get(`/memeber/company/vip/manager`, { params })

export const getViprules = (params) => axios.get(`/memeber/company/vip/rules`, { params })
