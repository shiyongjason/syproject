import { B2bUrl } from '@/api/config'
import axios from 'axios'

export const findSpikePriceData = (params) => axios.get(B2bUrl + 'ops/openapi/spike/bi', { params })
export const findSpikePriceInfo = (params) => axios.get(B2bUrl + 'order/api/bi/activity/details', { params })
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
// 商品明细-普通商品
export const getOrdinaryBiGoodDetail = (params) => axios.get(B2bUrl + 'product/api/statistics/detailed-ordinary', { params })
// 商品明细-秒杀商品
export const getSpikeBiGoodDetail = (params) => axios.get(B2bUrl + 'product/api/statistics/detailed-spike', { params })
// 商品明细-普通商品（导出）
export function downloadOrdinaryBiGoodDetail (params) {
    axios.defaults.responseType = 'blob'
    axios.get(B2bUrl + `product/api/statistics/detailed-ordinary/export`, { params }).then(function (response) {
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
// 商品明细-秒杀商品（导出）
export function downloadSpikeBiGoodDetail (params) {
    axios.defaults.responseType = 'blob'
    axios.get(B2bUrl + `product/api/statistics/detailed-spike/export`, { params }).then(function (response) {
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