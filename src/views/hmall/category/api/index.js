import { B2bUrl } from '@/api/config'
import axios from 'axios'

// 查询所有类目
export const findAllCategory = (params) => axios.get(B2bUrl + 'product/api/categories/tree', { params })
// 根据父类目获取类目信息
export const findCategoryByParent = (params) => axios.get(B2bUrl + `product/api/categories/${params.parentId}`, {})
// 新增类目
export const createCategory = (params) => axios.post(B2bUrl + 'product/api/categories', params)
// 修改类目
export const updateCategory = (params) => axios.put(B2bUrl + 'product/api/categories', params)

// 设置参数
export const linkParams = (params) => axios.post(B2bUrl + 'product/api/categories/setupthe', params)
// 关联品牌
export const linkBrands = (params) => axios.post(B2bUrl + 'product/api/categories/relation', params)
// 获取关联的参数
export const findLinkParams = (params) => axios.get(B2bUrl + 'product/api/categories/setupthe', { params })
// 获取关联的品牌
export const findLinkBrands = (params) => axios.get(B2bUrl + 'product/api/categories/relation', { params })