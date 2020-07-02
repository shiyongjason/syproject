import axios from 'axios'
import { interfaceUrl } from '@/api/config'
// 资金效率分页查询
export const getEfficiencyList = (params) => axios.get(interfaceUrl + `backend/api/account-efficiency`, { params })
// 资金效率保存备注信息
export const updataRemark = (params) => axios.post(interfaceUrl + `backend/api/account-efficiency/remark`, params)
// 资金效率表合计
export const getEfficiencyTotal = (params) => axios.get(interfaceUrl + `backend/api/account-efficiency/total`, { params })
export function exportEfficiencyList (params) {
    axios.defaults.responseType = 'blob'
    axios.get(`backend/api/account-efficiency/total/export`, { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '资金效率表.xlsx'
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
