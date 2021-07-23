import { IPageRespBossB2bSkuPage } from '@/interface/hbp-shop'
import axios, { AxiosPromise } from 'axios'

/** 商品sku管理列表（拉取列表） */
export const getSkuList: (params: any) => AxiosPromise<IPageRespBossB2bSkuPage> = (params) => {
    return axios.get(`shop/api/skus/boss/main-sku/page`, { params })
}

// 拉取
export const pullSku: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/skus/boss/sku`, params)
}
// 批量拉取
export const bulkPullSku: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/skus/boss/batch-sku`, params)
}

// 类目
export const getCategoryList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`shop/api/categories/main/tree`, { params })
}