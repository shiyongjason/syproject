import axios from 'axios'
// 平台公司逾期汇总列表
export const getCompanyOverdueList = (params) => axios.get(`backend/api/company/overdue/summary`, { params })
// 平台公司逾期汇总合计
export const getCompanyOverdueListTotal = (params) => axios.get(`backend/api/company/overdue/summary/total`, { params })

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