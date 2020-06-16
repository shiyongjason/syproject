import { B2bUrl } from '@/api/config'
import axios from 'axios'

// 交易额明细
export const getTransactionInfo = (params) => axios.get(B2bUrl + 'order/api/statistics/turnover-detailed', { params })

// 交易额明细导出
export function downloadTransactionInfoList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(B2bUrl + `order/api/statistics/turnover-detailed/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '交易额明细表.xlsx'
                a.href = e.target.result
                document.querySelector('body').appendChild(a)
                a.click()
                document.querySelector('body').removeChild(a)
            }
            axios.defaults.responseType = 'json'
        } catch (e) {
            axios.defaults.responseType = 'json'
        }
    }).catch(function () {
        axios.defaults.responseType = 'json'
    })
}