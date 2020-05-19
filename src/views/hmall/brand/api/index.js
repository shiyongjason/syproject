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

// 新增品牌区域
export const addBrandArea = (params) => {
    return axios.post(B2bUrl + 'product/api/brandarea/add', params)
}

// 修改品牌区域
export const updateBrandArea = (params) => {
    return axios.post(B2bUrl + 'product/api/brandarea/update', params)
}

/*
商品改造
*/
// 查询品牌审核列表
export const findBrandAreaList = (params) => {
    return axios.get(B2bUrl + 'product/api/brands/authorization/page', params)
}
// 查询品牌审核详情
export const findBrandAreaDetail = (params) => {
    return axios.get(B2bUrl + `product/api/brands/authorization/${params.id}`)
}
// 审核品牌区域
export const auditBrandArea = (params) => {
    return axios.put(B2bUrl + 'product/api/brands/authorization/audit', params)
}
// 省市区
export const getChiness = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting')
}
