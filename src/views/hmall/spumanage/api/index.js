import axios from 'axios'
import { B2bUrl, interfaceUrl } from '@/api/config'

// 商品列表
// export const findProducts = (params) => axios.get(B2bUrl + 'product/api/boss/products/', { params })
export const findProducts = (params) => axios.get(B2bUrl + 'product/api/spu/boss/page', { params })
// 商品上下架
export const updateProductStatus = (params) => axios.put(B2bUrl + 'product/api/boss/products/status', params)
// 获取商品来源
export const findBossSource = (params) => axios.get(B2bUrl + 'product/api/spu/source', { params })
// 商品类目
export const findProductCategory = (params) => axios.get(B2bUrl + 'product/api/categories/all')
// 查询类目属性
export const findCategoryAttribute = (params) => axios.get(B2bUrl + 'product/api/categories/setupthe', { params })
// 查询关联列表品牌
export const findRelationBrand = (params) => axios.get(B2bUrl + 'product/api/categories/relation', { params })
// 保存商品
export const createProduct = (params) => axios.post(B2bUrl + 'product/api/boss/products', params)
// 商品详情
export const findProductDetails = (params) => axios.get(B2bUrl + `product/api/boss/products/${params.id}`)
// 商品修改
export const updateProduct = (params) => axios.put(B2bUrl + `product/api/boss/products/${params.id}`, params)
// 审核通过
export const reviewPass = (params) => axios.put(B2bUrl + `product/api/boss/products/success/${params.id}`, params)
// 审核驳回
export const reviewReject = (params) => axios.put(B2bUrl + `product/api/boss/products/reject/${params.id}`, params)
// 共享商品分页
export const findPublicShop = (params) => axios.get(B2bUrl + `product/api/categories/share`, { params })
// 共享商品启用/停用
export const updatePublicShop = (params) => axios.put(B2bUrl + `product/api/categories/share/disable-enable`, params)
// 共享商品公司及平台公司查询
export const findCompanyList = (params) => axios.get(interfaceUrl + `ims/organization/short-list`)
// 批量删除共享商品类目
export const deleteCategory = (params) => axios.delete(B2bUrl + `product/api/categories/batch/share`, { params })
// 批量添加共享商品
export const createPublicShop = (params) => axios.post(B2bUrl + `product/api/categories/batch/share`, params)
// 查询平台公司及共享平台公司下的二级类目
export const findPublicShopCategory = (params) => axios.get(B2bUrl + `product/api/categories/company-share`, { params })
// 商品导入
export const importProductList = (params) => axios.post(B2bUrl + `product/api/products/import`, params)
// 获取二级类目下是否有品牌
export const getHaveBrand = (params) => axios.get(B2bUrl + `product/api/brands/category/${params}`)
/**
 * SKU设置接口
 * @param {*} params
 */
// 属性列表
export const findAttributeList = (params) => { return axios.get(B2bUrl + 'product/api/parameters', { params }) }
// 新增属性
export const createAttribute = (params) => { return axios.post(B2bUrl + 'product/api/parameters', params) }
// 修改属性
export const updateAttribute = (id, params) => { return axios.put(B2bUrl + 'product/api/parameters/' + id, params) }
// 属性详情
export const findAttributeDetails = (id) => { return axios.get(B2bUrl + 'product/api/parameters/' + id) }
// 更新属性状态
export const updateAttributeStatus = (params) => { return axios.put(B2bUrl + 'product/api/parameters/status', params) }
// 根据父类目获取类目信息
export const findCategoryByParent = (params) => axios.get(`product/api/categories/${params.parentId}`, {})

// 更新商品spu
export const putSpu = (params) => axios.put('product/api/spu', params)
// 启用禁用spu
export const changeSpustatus = (params) => axios.put('product/api/spu/boss/enable', params)
// 查询spu详情
export const findSpudetails = (params) => axios.get('product/api/spu/spu-edit-info', { params })
// 查询spu详情
export const auditSpu = (params) => axios.put(`product/api/spu/boss/audit`, params)

// 下拉可选品牌
export const getBrands = (params) => axios.get(`product/api/brands/select-brands`, { params })

/**
 * 2020-05 商品改造
 */
// 新建商品spu
export const saveSpu = (params) => axios.post(B2bUrl + 'product/api/spu', params)
// 模糊查询品牌
export const findBrands = (params) => {
    return axios.get(B2bUrl + 'product/api/brands/search', { params })
}
// 根据2级类目 查询 所有属性
export const findSpuAttr = (params) => axios.get(B2bUrl + `product/api/categories/specifications/${params.categoryId}`)
