import * as Shops from '@/interface/hbp-shop'
import axios, { AxiosPromise } from 'axios'

export const getFloorPage: (params:any) => AxiosPromise<Shops.IPageRespBossShopFloorPage> = (params) => {
    return axios.get('/shop/api/boss/shop/floor/page', { params })
}
// /** 放款交接信息 */
// export const getLoanHandoverInfoApi: (paymentOrderId: string) => AxiosPromise<RespLoanHandoverInfo> = (paymentOrderId) => {
//     return axios.get(`/project/api/supplier-payments/${paymentOrderId}/loan-handover-info`)
// }
export const onDeleteFloor: (params: any) => AxiosPromise<void> = (params) => {
    return axios.delete(`/shop/api/boss/shop/floor/${params}`)
}
// 启用
export const onEnableFloor: (params: any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/enable`)
}

// 停用
export const onDisableFloor: (params: any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/disable`)
}
// 上移
export const onMoveUpFloor: (params: any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/move-up`)
}
export const onMoveDownFloor: (params: any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/move-down`)
}

// 楼层详情
export const getFloorDetail: (params:any) => AxiosPromise<Shops.RespBossShopFloorDetail> = (params) => {
    return axios.get(`/shop/api/boss/shop/floor/${params}`)
}