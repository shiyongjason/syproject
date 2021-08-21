import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'
import { BrandDetailResponse, BrandShopExtendUpdateRequest, IPageBrandShopExtendResponse } from '@/interface/hbp-shop'

export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}

// BOSS：品牌管理分页
export const getListApi: (params: any) => AxiosPromise<IPageBrandShopExtendResponse> = (params) => {
    return axios.get(`shop/api/brands/boss/page`, { params })
}

// 品牌修改
export const postBrands: (params: BrandShopExtendUpdateRequest) => AxiosPromise<any> = (params) => {
    return axios.put(`shop/api/brands/boss`, params)
}

// 品牌详情
export const getBrands: (brandId: BrandDetailResponse) => AxiosPromise<BrandDetailResponse> = (brandId) => {
    return axios.get(`shop/api/brands/crm/${brandId}/detail`, {})
}