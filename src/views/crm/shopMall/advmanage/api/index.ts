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
export const onEnableFloor: (params: any) => AxiosPromise<Shops.ShopFloorBrandPromptResponse[]> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/enable`)
}

export const onConfirmFloor: (params: any) => AxiosPromise<Shops.ShopFloorBrandPromptResponse[]> = (params) => {
    return axios.patch(`/shop/api/boss/shop/floor/${params}/enable/confirm`)
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

// spu
export const getSpuPage: (params:any) => AxiosPromise<Shops.IPageRespBossSpuPage> = (params) => {
    return axios.get(`/shop/api/boss/spu/page`, { params })
}
// 新增楼层
export const saveFloor: (params:any) => AxiosPromise<Shops.ReqBossFloorAdd> = (params) => {
    return axios.post(`/shop/api/boss/shop/floor`, params)
}
//  更新楼层
export const editFloor: (params:any) => AxiosPromise<Shops.ReqBossFloorUpdate> = (params) => {
    return axios.put(`/shop/api/boss/shop/floor`, params)
}
// bananerlist
export const getBannerPage: (params:any) => AxiosPromise<Shops.IPageShopBannerResponse > = (params) => {
    return axios.get(`/shop/api/boss/banners/page`, { params })
}
// 启用
export const bannerEnable: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/banners/${params}/enable`)
}
// 停用
export const bannerDisable: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/banners/${params}/disable`)
}
// 下移
export const bannerMoveDown: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/banners/${params}/move-down`)
}
// 上移
export const bannerMoveUp: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/banners/${params}/move-up`)
}
// 删除banner
export const bannerDelete: (params:any) => AxiosPromise<void> = (params) => {
    return axios.delete(`/shop/api/boss/banners/${params}`)
}
// banner 详情
export const getBannerDetail: (params:any) => AxiosPromise<Shops.ShopBannerResponse> = (params) => {
    return axios.get(`/shop/api/boss/banners/${params}`)
}
// 新增
export const addBanner: (params:any) => AxiosPromise<void> = (params) => {
    return axios.post(`/shop/api/boss/banners`, params)
}
// 修改
export const editBanner:(params:any)=>AxiosPromise<void> = (params) => {
    return axios.put(`/shop/api/boss/banners`, params)
}
// 品类列表
export const findCategories:(params:any)=>AxiosPromise<Shops.IPageBossFrontCategoryRecommendResponse> = (params) => {
    return axios.get(`/shop/api/boss/front-category/recommends/page`, { params })
}
// 上移品类
export const categoryMoveUp: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/front-category/recommends/${params}/move-up`)
}
// 下移
export const categoryMoveDown: (params:any) => AxiosPromise<void> = (params) => {
    return axios.patch(`/shop/api/boss/front-category/recommends/${params}/move-down`)
}
// 所有品类
export const findCategoriesList:()=>AxiosPromise<Shops.BossFrontCategoryResponse> = () => {
    return axios.get(`/shop/api/boss/front-categories/list`)
}
//  新增
export const addCategory:(param:any)=>AxiosPromise<void> = (params) => {
    return axios.post(`/shop/api/boss/front-category/recommends/add`, params)
}

// 取消推荐
export const cancelCategory:(param:any)=>AxiosPromise<void> = (params) => {
    return axios.delete(`/shop/api/boss/front-category/recommends/cancel/${params}`)
}

// 查询所有品类
export const getListCategory:()=>AxiosPromise<Shops.BossFrontCategoryResponse[]> = () => {
    return axios.get(`/shop/api/boss/front-categories/list`)
}
// 楼层 banner 数量
export const getEnableNum:()=>AxiosPromise<Shops.FloorAndBannerEnableNumResponse> = () => {
    return axios.get(`/shop/api/boss/shop/floor/enable-num`)
}