import axios from 'axios'
const shy = 'http://192.168.20.168:31090'
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
export const getPlanDeclare = (params) => axios.get(shy + `/fundplan/query/current`, { params })
// 查询资金申报数据（该区域/分部/大区/所有，代办和已办）
export const getFundPlanAll = (params) => axios.get(shy + `/fundplan/query/all`, { params })
// 查询资金申报明细数据
export const getFundDetail = (params) => axios.get(shy + `/fundplan/query/detail/${params}`)
// 申请资金申报数据
export const applyFundplan = (params) => axios.post(shy + `/fundplan/apply`, params)
// 审批资金申报数据
export const approveFundplan = (params) => axios.post(shy + `/fundplan/approve`, params)