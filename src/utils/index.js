import store from '@/store/index'
import axios from 'axios'
import { interfaceUrl } from '@/api/config'

const clearCache = function (routerName) {
    store.commit('REMOVE_CACHED_INCLUDE', routerName)
    store.commit('ADD_CACHED_EXCLUDE', routerName)
}
const newCache = function (routerName) {
    store.commit('ADD_CACHED_INCLUDE', routerName)
    store.commit('REMOVE_CACHED_EXCLUDE', routerName)
}

const downloadFile = function (apiUrl) {
    apiUrl = interfaceUrl + apiUrl
    window.open(apiUrl, '_blank')
    /* axios.get(apiUrl, {
        responseType: 'blob' // 指定获取数据的类型为blob
    }).then(res => {
        console.log('🚀 --- downloadFile --- res', res)
        let fileName = ''
        let disposition = res.headers['content-disposition']
        if (disposition && disposition.indexOf('attachment') !== -1) {
            fileName = disposition.match(/filename=(.*)/)[1]
            let blobURL = window.URL.createObjectURL(new Blob([res.data]))
            let link = document.createElement('a')
            link.style.display = 'none'
            link.href = blobURL
            link.setAttribute('download', decodeURIComponent(fileName))
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link) // 下载完成移除元素
            window.URL.revokeObjectURL(blobURL) // 释放blob对象
        } else {
            console.error(' 让后端response的header里面设置Access-Control-Expose-Headers: Content-Disposition， 参考/goodwork/upstreamPaymentManagement onLoanDown的接口')
        }
    }) */
}

export {
    clearCache, newCache, downloadFile
}