import { B2bUrl } from '@/api/config'
import axios from 'axios'

// 品牌列表
export const findBrandList = (params) => {
    return axios.get(B2bUrl + 'product/api/brands/page', {
        params
    })
}
// 品牌新增
export const createBrand = (params) => {
    return axios.post(B2bUrl + 'product/api/brands', params)
}
// 品牌修改
export const updateBrand = (params) => {
    return axios.put(B2bUrl + 'product/api/brands', params)
}
// 品牌详情
export const findBrandDetail = (id) => {
    return axios.get(B2bUrl + 'product/api/brands/' + id)
}
// 品牌生效
export const brandEnable = (params) => {
    return axios.put(B2bUrl + 'product/api/brands/enable', params)
}
// 品牌失效
export const brandDisable = (params) => {
    return axios.put(B2bUrl + 'product/api/brands/disable', params)
}

/*
09-24 品牌区域
By sunhuiyong
*/
// 查询品牌区域列表
export const findBrandAreaList = (params) => {
    return axios.get(B2bUrl + 'product/api/brands/authorization/page', params)
}
// 新增品牌区域
export const addBrandArea = (params) => {
    return axios.post(B2bUrl + 'product/api/brandarea/add', params)
}
// 查询品牌区域
export const findBrandAreaDetail = (params) => {
    return axios.get(B2bUrl + `product/api/brands/authorization/${params.id}`)
}
// 修改品牌区域
export const updateBrandArea = (params) => {
    return axios.post(B2bUrl + 'product/api/brandarea/update', params)
}

// 审核品牌区域
export const auditBrandArea = (params) => {
    return axios.post(B2bUrl + 'product/api/brandarea/audit', params)
}