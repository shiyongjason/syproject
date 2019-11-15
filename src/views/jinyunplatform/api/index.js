import axios from 'axios'
import { jinyunTemporary } from '@/api/config'
const temporary = 'http://192.168.20.249:9633'
// 企业CA认证申请
export const signCa = (params) => axios.post(jinyunTemporary + `/signs`, params)
// 查询企业CA认证详情
export const getSignsDetail = (params) => axios.get(jinyunTemporary + `/signs/${params}`)
// 分页查询服务订单
export const getSignList = (params) => axios.get(jinyunTemporary + `/signs/page`, { params })
// 上传印章
export const signImage = (params) => axios.post(jinyunTemporary + `/signs/image-seals`, { params })
// // 
export const getSignSelector = (params) => axios.get(jinyunTemporary + `/signs/company-list`, { params })