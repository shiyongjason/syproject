import instance from '@/api/axios_new.js'
import { B2bUrl } from '@/api/config'

// 商品审核列表
export const findCheckProducts = (params) => instance.get(B2bUrl + 'product/api/boss/products/check-status', { params })
// 商品类目
export const findProductCategory = (params) => instance.get(B2bUrl + 'product/api/categories/all')
// 商品详情
export const findProductDetails = (params) => instance.get(B2bUrl + `product/api/boss/products/${params.id}`)
// 查询类目属性
export const findCategoryAttribute = (params) => instance.get(B2bUrl + 'product/api/categories/setupthe', { params })
// 查询关联列表品牌
export const findRelationBrand = (params) => instance.get(B2bUrl + 'product/api/categories/relation', { params })
// 审核通过
export const reviewPass = (params) => instance.put(B2bUrl + `product/api/boss/products/success/${params.id}`, params)
// 审核驳回
export const reviewReject = (params) => instance.put(B2bUrl + `product/api/boss/products/reject/${params.id}`, params)
