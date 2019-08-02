import instance from '@/api/axios_new.js'
import { B2bUrl } from '@/api/config'

// 属性列表
export const findAttributeList = (params) => {
    return instance.get(B2bUrl + 'product/api/parameters', {
        params
    })
}
// 新增属性
export const createAttribute = (params) => {
    return instance.post(B2bUrl + 'product/api/parameters', params)
}
// 修改属性
export const updateAttribute = (id, params) => {
    return instance.put(B2bUrl + 'product/api/parameters/' + id, params)
}
// 属性详情
export const findAttributeDetails = (id) => {
    return instance.get(B2bUrl + 'product/api/parameters/' + id)
}
// 更新属性状态
export const updateAttributeStatus = (params) => {
    return instance.put(B2bUrl + 'product/api/parameters/status', params)
}

// 查询一级类目
export const findCategoryList = () => {
    return instance.get(B2bUrl + 'product/api/categories/0')
}
