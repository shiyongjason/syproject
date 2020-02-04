import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 企业CA认证申请
export const signCa = (params) => axios.post(interfaceUrl + `backend/signs`, params)
// 查询企业CA认证详情
export const getSignsDetail = (params) => axios.get(interfaceUrl + `backend/signs/${params}`)
// 分页查询服务订单（企业ca认证）
export const getSignList = (params) => axios.get(interfaceUrl + `backend/signs/page`, { params })
// 分页查询服务订单（个人ca认证）
export const getSignPersonList = (params) => axios.get(interfaceUrl + `backend/signs/account/page`, { params })
// 查询关联个人CA认证的企业CA集合
export const getPersonRelevence = (accountId) => axios.get(interfaceUrl + `backend/signs/${accountId}/list`)
// 注销企业CA认证
export const logoutConmanyCA = (orgId) => axios.put(interfaceUrl + `backend/signs/delete/org/${orgId}`)
// 注销个人CA认证
export const logoutPersonCA = (accountId) => axios.put(interfaceUrl + `backend/signs/delete/account/${accountId}`)
// 上传印章
export const signImage = (params) => axios.post(interfaceUrl + `backend/signs/image-seals`, params)
// 通过企业类型查询企业信息
export const getSignSelector = (params) => axios.get(interfaceUrl + `backend/signs/company-list`, { params })
/*
额度利率
*/
// 额度利率导入
export const rateImport = (params) => axios.post(interfaceUrl + `backend/amount/rate/import`, params)
// 额度利率分页查询
export const getRateList = (params) => axios.get(interfaceUrl + `backend/amount/rate/page`, { params })
// 额度利率导入复核
export const rateStatus = (params) => axios.put(interfaceUrl + `backend/amount/rate/status`, params)
/*
账户导入
 */
// 银行账户分页查询
export const getBankList = (params) => axios.get(interfaceUrl + `backend/bank-accounts`, { params })
// 银行账户新增
export const bankAccount = (params) => axios.post(interfaceUrl + `backend/bank-accounts`, params)
// 银行账户修改
export const updataBankAccount = (params) => axios.put(interfaceUrl + `backend/bank-accounts`, params)
// 根据accountId删除银行账户
export const deleteBankAccount = (params) => axios.delete(interfaceUrl + `backend/bank-accounts/${params.accountId}`)
/*
流程查询
*/
// 审批流程分页查询
export const getProcessesList = (params) => axios.get(interfaceUrl + `backend/processes`, { params })
// 产品名称列表
export const getProductsArr = (params) => axios.get(interfaceUrl + `backend/processes/products/name`, { params })
/*
人脸识别
*/
// Boss后台分页查询服务订单
export const getRecognitions = (params) => axios.get(interfaceUrl + `backend/face-recognitions/page`, { params })
// 查询未通过人脸识别认证详情
export const getRecognitionsDetail = (params) => axios.get(interfaceUrl + `backend/face-recognitions/${params.id}`)
// 验证
export const artifVali = (params) => axios.put(interfaceUrl + `backend/face-recognitions/${params.id}/certifie`, params)