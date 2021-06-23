import { v4 as generateFileNameByUUID } from 'uuid'
import OSS from 'ali-oss'
import { getOssSTS } from '@/api'
import { ossBucket, ossRegion, ossOldBucket } from '@/api/config'

function generateBaseUrl () {
    const date = new Date()
    return `hbp/files/${date.getFullYear()}${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${Date.now()}/`
}

const REFRESH_TOKEN_TIME = 1000 * 60 * 30

let FILE_TIMEOUT_SECOND = 60 * 30
// 如果接口失败了一次本次加载其他调用方法不会触发getOssSTS接口
let serverResponseError = false

let OSSConfig = {
    region: ossRegion,
    bucket: ossBucket
}

async function getCredentials () {
    try {
        if (!serverResponseError) {
            const { data } = await getOssSTS()
            OSSConfig = {
                ...OSSConfig,
                accessKeyId: data.accessKeyId,
                accessKeySecret: data.accessKeySecret,
                stsToken: data.securityToken
            }
        }
    } catch (e) {
        serverResponseError = true
    }
}

const initOssSTS = (function () {
    let client = null
    let timer = null
    return async function () {
        if (!client) {
            try {
                await getCredentials()
                client = new OSS({
                    ...OSSConfig
                })
            } catch (e) {
                client = null
            }
            timer = setTimeout(() => {
                client = null
                clearTimeout(timer)
            }, REFRESH_TOKEN_TIME)
        }
        return client
    }
})()
/**
 * 文件名规则注意事项
 * 上传：
 * 【2020年公户流水%#￥@%&&（）（——+】 这种文件名在企业微信自带的浏览器打开会展示编码乱字符文件名，导致下载失败
 * 为了解决兼容性问题，屏蔽上传文件名规则，所以改成了，上传去时候除了特殊符号的 /[^\w\u4e00-\u9fa5.]/g
 * 在文件名所有都是特殊字符的情况下，会随机生成一个字符串的文件名
 * 下载、预览：
 * 数据库有 "https://XXX/%E6%B5%8B%E8%AF%95%2698%EF%BC%89%EF%BC%88%23%40%EF%BF%A5.%2C%27%3B%5D%5B.jpg"老数据，
 * 阿里云访问的时候如果是特殊字符必须编码访问，其他中文类型等的文件名可以直接访问。
 * 为了解决老数据问题，鉴权时先解码，后鉴权的操作
 */
const generateFileName = (filename, isRandomName) => {
    const suffix = filename.slice(filename.lastIndexOf('.'))
    let resultName = ''
    if (isRandomName) {
        resultName = generateFileNameByUUID() + suffix
    } else {
        let orRandomName = false
        try {
            decodeURIComponent(filename)
        } catch (e) {
            orRandomName = true
        }
        if (orRandomName) {
            // eslint-disable-next-line no-useless-escape
            resultName = filename.replace(/[^\w\u4e00-\u9fa5\.\+\-\uFF08\uFF09\(\)\[\]\{\}]/g, '_')
            if (resultName.length <= 0) {
                resultName = generateFileNameByUUID() + suffix
            }
        } else {
            resultName = `${filename}`
        }
    }
    return `${generateBaseUrl() + resultName}`
}
export default {
    async uploadFile (file, isRandomName = false) {
        let result
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.put(
                generateFileName(file.name, isRandomName),
                new Blob([file], {
                    type: file.type,
                    size: file.size
                })
            )
            result.name = result.name.slice(result.name.lastIndexOf('/') + 1)
            result.url = decodeURIComponent(result.url)
        } catch (e) {
            result = ''
        }
        return result
    },
    /**
     * @param url 需要授权处理的URL
     * @returns {Promise<string>}
     */
    async getUrl (url) {
        console.log('🚀 --- getUrl --- url', url)
        if (url && url.indexOf(ossOldBucket + '.') > -1) {
            return url
        }
        let result
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.signatureUrl(url.replace(this.hostReg, ''), { expires: FILE_TIMEOUT_SECOND })
        } catch (e) {
            result = url
        }
        return result
    },

    /**
     * @param url String
     * @param process String
     *   缩放 'image/resize,m_fixed,w_100,h_100'
     裁剪 'image/crop,w_100,h_100,x_100,y_100,r_1'
     旋转 'image/rotate,90'
     锐化 'image/sharpen,100'
     水印 'image/watermark,text_SGVsbG8g5Zu-54mH5pyN5YqhIQ'
     格式转换 'image/format,png'
     图片信息 'image/info'
     * @returns {Promise<string>}
     */
    async getImageSelfStyle (url, process) {
        let result
        if (url && url.indexOf(ossOldBucket + '.') > -1) {
            let _url = this.translateFileNameIsOk(url)
            if (_url.indexOf('image/auto-orient') > -1) {
                return `${_url},${process}`
            }
            return `${_url}?x-oss-process=${process}`
        }
        const ossUtil = await initOssSTS()
        const params = {
            expires: FILE_TIMEOUT_SECOND,
            process: process
        }
        if (!process) {
            delete params.process
        }
        try {
            result = await ossUtil.signatureUrl(url.replace(this.hostReg, ''), params)
        } catch (e) {
            result = ''
        }
        return result
    },
    translateFileNameIsOk (url) { // hack 特殊的文件名_
        let urlTemp = url.split('/')
        let filename = urlTemp.pop()
        let decodeUrl
        try {
            decodeUrl = decodeURIComponent(filename)
        } catch (e) {
            decodeUrl = filename
        }
        urlTemp.push(encodeURIComponent(decodeUrl))
        return urlTemp.join('/')
    },
    // eslint-disable-next-line
    hostReg: /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)/g
}
