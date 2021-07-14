import * as Shops from '@/interface/hbp-shop'
import axios, { AxiosPromise } from 'axios'

export const getCateGoryList: (params:any) => AxiosPromise<Shops.IPageBossFrontCategoryPageResponse> = (params) => {
    return axios.get('/shop/api/boss/front-categories/page', { params })
}

// 上移
export const moveUpCategroy: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/front-categories/${params}/move-up`)
}

// 下移
export const moveDownCategroy: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/front-categories/${params}/move-down`)
}
// 删除
export const deleteCategory: (params:any) => AxiosPromise<void> = (params) => {
    return axios.delete(`/shop/api/boss/front-categories/${params}`)
}
// 删除品类校验接口
export const getComfirCateGory: (params:any) => AxiosPromise<Shops.BossFrontCategoryFloorSpuResponse[]> = (params) => {
    return axios.get(`/shop/api/boss/front-categories/${params}/confirm-deleting/list`)
}

// 类目tree
export const getTreeCateGroy: (params:any) => AxiosPromise<Shops.CategoryTreeResponse[]> = (params) => {
    return axios.get(`/shop/api/categories/tree`, { params })
}