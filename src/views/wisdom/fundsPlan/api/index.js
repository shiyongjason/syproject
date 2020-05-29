import axios from 'axios'
// 资金计划汇总数据
export const getPlanTotalList = (params) => axios.get(`backend/api/fund-plan/summary`, { params })

// 下载故障模板
export function downloadPlanTotalList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(`backend/api/fund-plan/summary/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '计划汇总分析表.xlsx'
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

// 查询当月资金申报数据
export const getPlanDeclare = (params) => axios.get(`backend/api/fund-plan/query/current`, { params })
// 查询资金申报数据（该区域/分部/大区/所有，代办和已办）
export const getFundPlanAll = (params) => axios.get(`backend/api/fund-plan/query/all`, { params })
// 查询资金申报明细数据
export const getFundDetail = (params) => axios.get(`backend/api/fund-plan/query/detail/${params}`)
// 申请资金申报数据
export const applyFundplan = (params) => axios.post(`backend/api/fund-plan/apply`, params)
// 审批资金申报数据
export const approveFundplan = (params) => axios.post(`backend/api/fund-plan/approve`, params)
// 获取系统时间
export const getServeTime = () => axios.get(`backend/api/fund-plan/businessDate`)
// 借款明细
export const getLoanDetail = (params) => axios.get(`backend/api/fund-plan/query/loan-detail`, { params })
// 资金计划审批列表
export function getPlanApprovalList (params) {
    return axios.get(`backend/api/overdue/annual/funplan/approve/value/list`, { params })
}
// 资金计划审批列表总计
export function getPlanApprovalTotal (params) {
    return axios.get(`backend/api/overdue/annual/funplan/approve/value/total`, { params })
}
