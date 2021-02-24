import { v4 as generateFileNameByUUID } from 'uuid'
import OSS from 'ali-oss'
import { getOssSTS } from '@/api'
import { ossBucket, ossRegion, ossOldBucket } from '@/api/config'

function generateBaseUrl () {
    const date = new Date()
    return `hbp/files/${date.getFullYear()}${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/${Date.now()}/`
}

const REFRESH_TOKEN_TIME = 1000 * 60 * 30
// todo 60 * 60 * 2
let FILE_TIMEOUT_SECOND = 60
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

export default {
    async uploadFile (file, isRandomName = false) {
        let result
        const suffix = file.name.slice(file.name.lastIndexOf('.'))
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.put(
                generateBaseUrl() + (isRandomName ? generateFileNameByUUID() + suffix : file.name),
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
        // 以前的老数据不处理
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
            return `${url}?x-oss-process=${process}`
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
            // URL兼容性 {@link https://developer.mozilla.org/en-US/docs/Web/API/URL/URL}
            result = await ossUtil.signatureUrl(new URL(url).pathname, params)
        } catch (e) {
            result = ''
        }
        return result
    },
    // eslint-disable-next-line
    hostReg: /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)/g
}
