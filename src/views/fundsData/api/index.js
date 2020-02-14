import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 台账列表
export const getAccountList = (params) => axios.get(interfaceUrl + `backend/account/list`, params)