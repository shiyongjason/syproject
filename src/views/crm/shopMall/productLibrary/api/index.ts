import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'
import { IPageRespBossSku, IPageRespBossSpuPage, ReqBossSkuUpdate, ReqBossSpuUpdate, RespBossSpuDetail } from '@/interface/hbp-shop'

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

export const getSpudetail: (spuId: any) => AxiosPromise<RespBossSpuDetail> = (spuId) => {
    return axios.get(`shop/api/boss/spu/detail/${spuId}`, {})
}

// spu提交
export const submitSpu: (params: ReqBossSpuUpdate) => AxiosPromise<any> = (params) => {
    return axios.post(`shop/api/boss/spu/submit-spu`, params)
}

// 修改SKU
export const putSKU: (params: ReqBossSkuUpdate) => AxiosPromise<any> = (params) => {
    return axios.put(`shop/api/skus/boss/sku`, params)
}
// 类目tree
export const getTreeCateGroy: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`shop/api/categories/tree`, { params })
}