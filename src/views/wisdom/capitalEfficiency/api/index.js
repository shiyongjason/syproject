import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 资金效率分页查询
export const getEfficiencyList = (params) => axios.get(interfaceUrl + `backend/api/efficiency`, { params })
// 资金效率保存备注信息
export const updataRemark = (params) => axios.post(interfaceUrl + `backend/api/efficiency/remark`, params)
// 资金效率表合计
export const getEfficiencyTotal = (params) => axios.get(interfaceUrl + `backend/api/efficiency/total`, { params })