import axios from 'axios'

// 供应商查询
export const getSupplierSearchList = (params) => axios.get('/project/api/supplier-accounts/page', { params })
