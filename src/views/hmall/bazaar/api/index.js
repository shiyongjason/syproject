import instance from '@/api/axios_new.js'

// 集市商品列表
export const findBazaarList = (params) => instance.get('product/api/market', { params })
// 集市商品列表
export const findBazaarLists = (params) => instance.get('product/api/spu', { params })
// 查询商品类目
export const findCategory = (params) => instance.get('product/api/categories/all', { params })