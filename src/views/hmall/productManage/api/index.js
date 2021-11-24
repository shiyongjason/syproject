import { B2bUrl } from '@/api/config'
import axios from 'axios'
// 省市区
export function errImportResults (params) {
    axios.defaults.responseType = 'blob'
    axios.get(B2bUrl + 'product/boss/main-spu/import-result', { params }).then(function (response) {
        try {
            const reader = new FileReader()
            reader.readAsDataURL(response.data)
            reader.onload = function (e) {
                const a = document.createElement('a')
                a.download = '失败明细.xlsx'
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
// 下载问题模板
// export function downloadQuestionTemp () {
//     axios.defaults.responseType = 'blob'
//     axios.get(iotUrl + `/api/helpCenter/download-template`).then(function (response) {
//         try {
//             const reader = new FileReader()
//             reader.readAsDataURL(response.data)
//             reader.onload = function (e) {
//                 const a = document.createElement('a')
//                 a.download = '订单明细模板.xlsx'
//                 a.href = e.target.result
//                 document.querySelector('body').appendChild(a)
//                 a.click()
//                 document.querySelector('body').removeChild(a)
//             }
//             axios.defaults.responseType = 'json'
//         } catch (e) {
//             axios.defaults.responseType = 'json'
//         }
//     }).catch(function () {
//         axios.defaults.responseType = 'json'
//     })
// }
