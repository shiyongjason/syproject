import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 资金效率分页查询
export const getEfficiencyList = (params) => axios.get(interfaceUrl + `backend/efficiency`, { params })
// 资金效率保存备注信息
export const updataRemark = (params) => axios.post(interfaceUrl + `backend/efficiency/remark`, params)