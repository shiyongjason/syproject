import { B2bUrl } from '@/api/config'
import axios from 'axios'

export const findSpikePriceData = (params) => axios.get(B2bUrl + 'ops/openapi/spike/bi', { params })
export const findSpikePriceInfo = (params) => axios.get(B2bUrl + 'order/api/bi/activity/details', { params })
