import { B2bUrl } from '@/api/config'
import instance from '@/api/axios_new.js'

// 品牌列表
export const findBrandList = (params) => {
    return instance.get(B2bUrl + 'product/api/brands', {
        params
    })
}
// 品牌新增
export const createBrand = (params) => {
    return instance.post(B2bUrl + 'product/api/brands', params)
}
// 品牌修改
export const updateBrand = (id, params) => {
    return instance.put(B2bUrl + 'product/api/brands/' + id, params)
}
// 品牌状态修改
export const updateBrandStatus = (params) => {
    return instance.put(B2bUrl + 'product/api/brands/status', params)
}
// 品牌详情
export const findBrandDetails = (id) => {
    return instance.get(B2bUrl + 'product/api/brands/' + id)
}
