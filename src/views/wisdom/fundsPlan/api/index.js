import axios from 'axios'

// 资金计划汇总数据
export const getPlanTotalList = (params) => axios.get(`develop/fundplan/summary`, { params })

// 下载故障模板
export function downloadPlanTotalList () {
    axios.defaults.responseType = 'blob'
    axios.get(`/develop/fundplan/summary/export`).then(function (response) {
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
export const getPlanDeclare = (params) => axios.get(`backend/fundplan/query/current`, { params })