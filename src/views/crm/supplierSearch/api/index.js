import axios from 'axios'

// 供应商查询
export const getSupplierSearchList = (params) => axios.get('/project/api/supplier-accounts/page', { params })
// 账号作废
export const updateInvalidNo = (params) => axios.patch(`/project/api/supplier-accounts/${params}/invalid`)
// 账号取消作废
export const updateValidNo = (params) => axios.patch(`/project/api/supplier-accounts/${params}/valid`)
