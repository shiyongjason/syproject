import axios from 'axios'
import { B2bUrl } from '@/api/config'

// 供应商接口
export const findSupplierlist = (params) => axios.get(B2bUrl + 'product/api/supplier', { params })
// 品牌
export const findBrand = (params) => axios.get(B2bUrl + 'product/api/brands/all', { params })
// 新增
export const addSupplier = (params) => axios.post(B2bUrl + 'product/api/supplier', params)
// 删除
export const deleteSupplier = (params) => axios.delete(B2bUrl + `product/api/supplier/${params}`)
// 详情
export const getSupplierDetail = (params) => axios.get(B2bUrl + `product/api/supplier/${params}`)
// 修改
export const editSupplierDetail = (params) => axios.put(B2bUrl + `product/api/supplier/${params.id}`, params)