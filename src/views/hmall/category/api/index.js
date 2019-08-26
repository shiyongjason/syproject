import instance from '@/api/axios_new.js'

// 查询所有类目
export const findAllCategory = (params) => instance.get('/product/api/categories/all', { params })
// 根据父类目获取类目信息
export const findCategoryByParent = (params) => instance.get(`/product/api/categories/${params.parentId}`, {})
// 新增类目
export const createCategory = (params) => instance.post('/product/api/categories', params)
// 修改类目
export const updateCategory = (params) => instance.put('/product/api/categories', params)
// 上移和下移
export const moveCategory = (params) => instance.put('/product/api/categories/move', params)
// 设置参数
export const linkParams = (params) => instance.post('/product/api/categories/setupthe', params)
// 关联品牌
export const linkBrands = (params) => instance.post('/product/api/categories/relation', params)
// 获取关联的参数
export const findLinkParams = (params) => instance.get('/product/api/categories/setupthe', { params })
// 获取关联的品牌
export const findLinkBrands = (params) => instance.get('/product/api/categories/relation', { params })