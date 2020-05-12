import axios from 'axios'
// 平台公司逾期汇总列表
export const getCompanyOverdueList = (params) => axios.get(`backend/api/company/overdue/summary`, { params })
// 平台公司逾期汇总合计
export const getCompanyOverdueListTotal = (params) => axios.get(`backend/api/company/overdue/summary/total`, { params })

// 平台公司逾期汇总导出
export function exportCompanyOverdueExcel (params) {
    axios.defaults.responseType = 'blob'
    axios.get(`backend/api/company/overdue/summary/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                console.log(params)
                const a = document.createElement('a')
                let name = ''
                if (params.state == 1) {
                    name = '存量'
                } else {
                    name = '增量'
                }
                a.download = `平台公司逾期${name}汇总表.xlsx`
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