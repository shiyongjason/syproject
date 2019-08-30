import instance from '@/api/axios_new.js'
import { B2bUrl, interfaceUrl } from '@/api/config'

// 商品列表
export const findProducts = (params) => instance.get(B2bUrl + 'product/api/boss/products/', { params })
// 商品上下架
export const updateProductStatus = (params) => instance.put(B2bUrl + 'product/api/boss/products/status', params)
// 获取商品来源
export const findProductSource = (params) => instance.get(B2bUrl + 'product/api/boss/products/source', params)
// 商品类目
export const findProductCategory = (params) => instance.get(B2bUrl + 'product/api/categories/all')
// 查询类目属性
export const findCategoryAttribute = (params) => instance.get(B2bUrl + 'product/api/categories/setupthe', { params })
// 查询关联列表品牌
export const findRelationBrand = (params) => instance.get(B2bUrl + 'product/api/categories/relation', { params })
// 保存商品
export const createProduct = (params) => instance.post(B2bUrl + 'product/api/boss/products', params)
// 商品详情
export const findProductDetails = (params) => instance.get(B2bUrl + `product/api/boss/products/${params.id}`)
// 商品修改
export const updateProduct = (params) => instance.put(B2bUrl + `product/api/boss/products/${params.id}`, params)
// 审核通过
export const reviewPass = (params) => instance.put(B2bUrl + `product/api/boss/products/success/${params.id}`, params)
// 审核驳回
export const reviewReject = (params) => instance.put(B2bUrl + `product/api/boss/products/reject/${params.id}`, params)
// 共享商品分页
export const findPublicShop = (params) => instance.get(B2bUrl + `product/api/categories/share`, { params })
// 共享商品启用/停用
export const updatePublicShop = (params) => instance.put(B2bUrl + `product/api/categories/share/disable-enable`, params)
// 共享商品公司及平台公司查询
export const findCompanyList = (params) => instance.get(interfaceUrl + `ims/organization/short-list`)
// 批量删除共享商品类目
export const deleteCategory = (params) => instance.delete(B2bUrl + `product/api/categories/batch/share`, { params })
// 批量添加共享商品
export const createPublicShop = (params) => instance.post(B2bUrl + `product/api/categories/batch/share`, params)
// 查询平台公司及共享平台公司下的二级类目
export const findPublicShopCategory = (params) => instance.get(B2bUrl + `product/api/categories/company-share`, { params })
// // 商品导入
export const importProductList = (params) => instance.post(B2bUrl + `product/api/products/import`, params)
