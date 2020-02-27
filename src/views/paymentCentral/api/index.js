import axios from 'axios'
import { B2bUrl } from '@/api/config'
// 线下转账白名单-列表
export const getPaymentWhite = (params) => {
    return axios.get(B2bUrl + 'payment/api/accounts/offline-payment-white-list', { params })
}