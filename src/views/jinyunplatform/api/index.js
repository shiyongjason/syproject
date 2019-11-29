import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 企业CA认证申请
export const signCa = (params) => axios.post(interfaceUrl + `backend/signs`, params)
// 查询企业CA认证详情
export const getSignsDetail = (params) => axios.get(interfaceUrl + `backend/signs/${params}`)
// 分页查询服务订单
export const getSignList = (params) => axios.get(interfaceUrl + `backend/signs/page`, { params })
// 上传印章
export const signImage = (params) => axios.post(interfaceUrl + `backend/signs/image-seals`, params)
// 通过企业类型查询企业信息
export const getSignSelector = (params) => axios.get(interfaceUrl + `backend/signs/company-list`, { params })
/*
额度利率
*/
// 额度利率导入
export const rateImport = (params) => axios.post(interfaceUrl + `backend/amount/rate/import`, params)
// 额度利率分页查询
export const getRateList = (params) => axios.get(interfaceUrl + `backend/amount/rate/page`, { params })
// 额度利率导入复核
export const rateStatus = (params) => axios.put(interfaceUrl + `backend/amount/rate/status`, params)