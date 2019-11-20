import axios from 'axios'
import { jinyunTemporary } from '@/api/config'
// 企业CA认证申请
export const signCa = (params) => axios.post(jinyunTemporary + `/signs`, params)
// 查询企业CA认证详情
export const getSignsDetail = (params) => axios.get(jinyunTemporary + `/signs/${params}`)
// 分页查询服务订单
export const getSignList = (params) => axios.get(jinyunTemporary + `/signs/page`, { params })
// 上传印章
export const signImage = (params) => axios.post(jinyunTemporary + `/signs/image-seals`, params)
// 通过企业类型查询企业信息
export const getSignSelector = (params) => axios.get(jinyunTemporary + `/signs/company-list`, { params })
/*
额度利率
*/
// 额度利率导入
export const rateImport = (params) => axios.post(jinyunTemporary + `/amount/rate/import`, params)
// 额度利率分页查询
export const getRateList = (params) => axios.get(jinyunTemporary + `/amount/rate/page`, { params })
// 额度利率导入复核
export const rateStatus = (params) => axios.put(jinyunTemporary + `/amount/rate/status`, params)