import axios from 'axios'
import { interfaceUrl, ossUrl } from '@/api/config'
// 台账列表
export const getAccountList = (params) => axios.get(interfaceUrl + `backend/account`, { params })
// 还款明细表
export const getRepaymentList = (params) => axios.get(interfaceUrl + 'backend/account/repayment/page', { params })
// 查询平台公司
export const findPaltList = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })
// 发展在线 分部查询
export const findDepList = (params) => axios.get(ossUrl + 'api/httpH5/3107', { params })
// 分部列表查询
export const findBranchList = (params) => axios.get(interfaceUrl + 'rms/dept/queryDeptList', { params })
// 新增各类台账
export const addAccount = (params) => axios.post(interfaceUrl + 'backend/account', params)

export const findPlatformslist = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })

// 查询台账基础信息
export const getAccountBasic = (id) => axios.get(interfaceUrl + `backend/account/basic/${id}`)
// 修改台账基础信息
export const setAccountBasic = (params) => axios.post(interfaceUrl + 'backend/account/basic', params)

// 查询贷款信息
export const getLoan = (id) => axios.get(interfaceUrl + `backend/account/loan/${id}`)
// 修改贷款信息
export const setLoan = (params) => axios.put(interfaceUrl + 'backend/account/loan', params)
// 查询还款信息
export const getRespAccountRepaymentPlan = (accountId) => axios.get(interfaceUrl + `backend/account/plan/${accountId}`)
// 修改还款信息
export const setPlan = (params) => axios.put(interfaceUrl + 'backend/account/plan', params)
// 利率计算
export const setCount = (params) => axios.post(interfaceUrl + 'backend/account/interest/count', params)
// 切换台账支付类型
export const transformPlanType = (params) => axios.get(interfaceUrl + `backend/account/plan/account-type`, { params })
// 台账汇总表
export const getSummaryList = (params) => axios.get(interfaceUrl + `backend/account/summary`, { params })
