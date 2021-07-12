import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'
import { IPageRespBossSku, IPageRespBossSpuPage } from '@/interface/hbp-shop'

export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}

export const getSpuList: (params: any) => AxiosPromise<IPageRespBossSpuPage> = (params) => {
    return axios.get(`shop/api/boss/spu/page`, { params })
}

export const getSkuList: (params: any) => AxiosPromise<IPageRespBossSku> = (params) => {
    return axios.get(`shop/api/skus/boss/page`, { params })
}
// 删除sku
export const batchDelete: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/skus/boss/sku/batch-delete`, params)
}
// 上下架sku
export const skuhelftatus: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/skus/boss/sku-shelf-status`, params)
}