import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 台账列表
export const getAccountList = (params) => {
    return axios.get(interfaceUrl + `backend/account`, { params })
}
// 查询平台公司
export const findPaltList = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })
// 分部列表查询
export const findBranchList = (params) => axios.get(interfaceUrl + 'rms/dept/queryDeptList', { params })

// 分部列表查询
export const findBranchListNew = (params) => axios.get(interfaceUrl + 'rms/subsectiontarget/subsection', { params })

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