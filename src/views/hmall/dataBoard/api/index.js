import { B2bUrl } from '@/api/config'
import axios from 'axios'
// 会员活跃明细
export const findCommonMemberData = (params) => axios.get('ets/api/b2b/bi/member/spu/page', { params })
export const findSeckillMemberData = (params) => axios.get('ets/api/b2b/bi/member/sku/page', { params })
// 特价活动
export const findSpikePriceData = (params) => axios.get(B2bUrl + 'ops/openapi/spike/bi', { params })
export const findSpikePriceInfo = (params) => axios.get(B2bUrl + 'order/api/bi/activity/details', { params })
// 专题活动
export const findSpecialPriceData = (params) => axios.get(B2bUrl + 'ops/openapi/bi/theme-activity/page', { params })
export const findSpecialPriceInfo = (params) => axios.get('ets/api/b2b/bi/theme-activities/detail', { params })
// 优惠券
export const findCouponUseData = (params) => axios.get(B2bUrl + 'ops/api/coupon/statistics/use-detail/page', { params })
// 会员注册明细
export const getMemberDetailInfo = (params) => axios.get(B2bUrl + 'order/api/statistics/member-detailed', { params })
// 会员注册明细导出
export function downloadMemberDetailInfo (params) {
    axios.defaults.responseType = 'blob'
    axios.get(B2bUrl + `order/api/statistics/member-detailed/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '会员注册明细表.xlsx'
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
                a.download = '商品明细-普通商品.xlsx'
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
                a.download = '商品明细-秒杀商品.xlsx'
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
