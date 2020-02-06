import { B2bUrl, ccpBaseUrl } from '@/api/config'
import instance from '@/api/axios_new.js'
import axios from 'axios'

// 订单记录
export const findOrderList = (params) => {
    return instance.get(B2bUrl + '/api/boss/payments/receive', {
        params
    })
}
// 收款记录
export const findReceivablesList = (params) => {
    return instance.get(B2bUrl + 'payment/api/boss/payments', {
        params
    })
}
// 分部列表
export const findBrandsList = (params) => {
    return instance.get(B2bUrl + 'common/api/organizations/branches', {
        params
    })
}
// 商品统计列表
export const findProductTotalList = (params) => {
    return instance.get(B2bUrl + 'order/api/boss/order-products', {
        params
    })
}
// 商品统计导出列表
export const exportTotalList = (params) => {
    let url = B2bUrl + '/api/boss/payments/receive/export?'
    for (let key in params) {
        url += ('&' + key + '=' + params[key])
    }
    return url
}
// 收款纪录导出列表
export const exportTabReceivables = (params) => {
    let url = B2bUrl + 'payment/api/boss/payments/export?'
    for (let key in params) {
        url += ('&' + key + '=' + params[key])
    }
    return url
}
// 收款纪录导出列表
export const exportTabOrder = (params) => {
    let url = B2bUrl + 'order/api/boss/orders/export?'
    for (let key in params) {
        url += ('&' + key + '=' + params[key])
    }
    return url
}
// new-获取子订单列表
export const findChildOrder = (params) => instance.get(B2bUrl + `order/api/orders/${params.orderId}/subOrder`, {})

// 省市区
export const getChiness = (params) => {
    return axios.get(ccpBaseUrl + 'common/region/provinces/nesting', { params })
}

// 新的商品统计
export const orderPage = (params) => instance.get(B2bUrl + `order/api/boss/order-products/page`, { params })