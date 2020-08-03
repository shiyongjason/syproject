import axios from 'axios'
// 平台公司月度回款及时率
export const getOverduepage = (params) => axios.get(`backend/api/overdue/repayment-timely-rate/page`, { params })
// 合计
export const getOverdueTotal = (params) => axios.get(`backend/api/overdue/repayment-timely-rate/total`, { params })

// 月度回款及时率
export function exportOverdueExcel (params) {
    axios.defaults.responseType = 'blob'
    axios.get(`backend/api/overdue/repayment-timely-rate/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = `月度回款及时率.xlsx`
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