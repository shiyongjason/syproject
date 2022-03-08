import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 台账列表
export const getAccountList = (params) => axios.get(interfaceUrl + `backend/api/account`, { params })
// 台账列表
export const getAccountTotal = (params) => axios.get(interfaceUrl + `backend/api/account/total`, { params })

// 还款明细表
export const getRepaymentList = (params) => axios.get(interfaceUrl + 'backend/api/account/repayment/page', { params })
// 还款明细表合计
export const getRepaymentTotal = (params) => axios.get(interfaceUrl + 'backend/api/account/repayment/total', { params })

// 查询平台公司
export const findPaltList = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })
// 新增各类台账
export const addAccount = (params) => axios.post(interfaceUrl + 'backend/api/account', params)

export const findPlatformslist = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })

// 查询台账基础信息
export const getAccountBasic = (id) => axios.get(interfaceUrl + `backend/api/account/basic/${id}`)
// 修改台账基础信息
export const setAccountBasic = (params) => axios.post(interfaceUrl + 'backend/api/account/basic', params)

// 查询贷款信息
export const getLoan = (id) => axios.get(interfaceUrl + `backend/api/account/loan/${id}`)
// 修改贷款信息
export const setLoan = (params) => axios.put(interfaceUrl + 'backend/api/account/loan', params)
// 查询还款信息
export const getRespAccountRepaymentPlan = (accountId) => axios.get(interfaceUrl + `backend/api/account/plan/${accountId}`)
// 修改还款信息
export const setPlan = (params) => axios.put(interfaceUrl + 'backend/api/account/plan', params)
// 利率计算
export const setCount = (params) => axios.post(interfaceUrl + 'backend/api/account/interest/count', params)
// 切换台账支付类型
export const transformPlanType = (params) => axios.get(interfaceUrl + `backend/api/account/plan/account-type`, { params })
// 台账汇总表
export const getSummaryList = (params) => axios.get(interfaceUrl + `backend/api/account/summary`, { params })
// 台账汇总表合计
export const getSummaryTotal = (params) => axios.get(interfaceUrl + `backend/api/account/summary/total`, { params })
// 台账数据导出
export function downloadCloudAlarmList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(interfaceUrl + `backend/api/account/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '台账数据.xlsx'
                a.href = e.target.result
                document.querySelector('body').appendChild(a)
                a.click()
                document.querySelector('body').removeChild(a)
            }
            axios.defaults.responseType = 'json'
        } catch (e) {
            axios.defaults.responseType = 'json'
        }
    }).catch(function () {
        axios.defaults.responseType = 'json'
    })
}

// 根据机构id查询机构：大区 | 分部 | 区域列表
export const findDepartment = (params) => axios.get(`/uaa/department/${params.pkDeptDoc}/${params.deptType}`)

// 查看日志
export const findAccountRecords = (params) => axios.get(`backend/api/account/edit-record/page`, { params })

// 审核
export const updateAccountRecords = (params) => axios.patch(`backend/api/account/edit-record/audit`, params)