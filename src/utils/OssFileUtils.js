import { v4 as generateFileNameByUUID } from 'uuid'
import OSS from 'ali-oss'
import { getOssSTS } from '@/api'
import imageCompression from 'browser-image-compression'
import { ossBucket, ossRegion } from '@/api/config'

function genraterBaseUrl () {
    const date = new Date()
    return `hbp/files/${date.getFullYear()}${date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1}${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}/`
}
// sdk方法扩展比较简单，不想改了。移动端和boss不一样实现
const TIMEOUT_SERVER = 1000 * 60 * 30
let TIMEOUT_CLIENT = 1000 * 60 * 30
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
            }, TIMEOUT_SERVER)
        }
        return client
    }
})()

const Event = (function () {
    let Event
    let eventLoop = []
    let pending = false
    Event = (function () {
        let listen = async function () {
            let fn = Array.prototype.shift.call(arguments)
            eventLoop.push(fn.bind(null, ...arguments))
            if (!pending) {
                trigger()
            }
        }
        let trigger = async function () {
            pending = true
            for (const fn of eventLoop) {
                await fn()
            }
            eventLoop = []
            pending = false
        }
        let clear = function () {
            eventLoop = []
            pending = false
        }
        return {
            listen,
            clear
        }
    })()
    return Event
})()

export default {
    /**
     * @param file 需要构造的参数
     * @returns {(string|Blob)[]} {@String 生成的文件名}, {@Blob 生成Blob的数据}
     */
    getFileNameAndTranslateBlob (file) {
        const suffix = file.name.slice(file.name.lastIndexOf('.'))
        return [
            generateFileNameByUUID() + suffix,
            new Blob([file], { type: file.type, size: file.size })
        ]
    },
    async doUpload (fileName, fileBlob) {
        let result
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.put(genraterBaseUrl() + fileName, fileBlob)
        } catch (e) {
            result = ''
        }
        return result
    },
    async uploadFile (file) {
        return this.doUpload(...this.getFileNameAndTranslateBlob(file))
    },
    /**
     * @param file 上传文件
     * @param optionsSetting 覆盖默认的 options，更多字段  { @link  https://github.com/Donaldcwl/browser-image-compression }
     * @returns {Promise<*>}
     */
    async uploadImageCompressor (file, optionsSetting) {
        const options = {
            maxSizeMB: 2.5,
            maxWidthOrHeight: 1920,
            useWebWorker: true,
            ...optionsSetting
        }
        const getName = this.getFileNameAndTranslateBlob(file)
        try {
            const compressedFile = await imageCompression(getName[1], options)
            return this.doUpload(getName[0], compressedFile)
        } catch (e) {
            console.log(e, '这里需要做监控-----')
        }
        return ''
    },
    /**
     * @param url 需要授权处理的URL
     * @returns {Promise<null>}
     */
    async getUrl (url) {
        let result
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.signatureUrl(decodeURI(new URL(url).pathname), { expires: TIMEOUT_CLIENT })
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
     * @returns {Promise<null>}
     */
    async getImageSelfStyle (url, process) {
        let result
        const ossUtil = await initOssSTS()
        const params = {
            expires: TIMEOUT_CLIENT,
            process: process
        }
        if (!process) {
            delete params.process
        }
        try {
            result = await ossUtil.signatureUrl(new URL(url).pathname, params)
        } catch (e) {
            result = ''
        }
        return result
    },
    // eslint-disable-next-line
    hostReg: /^((http:\/\/)|(https:\/\/))?([a-zA-Z0-9]([a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?\.)+[a-zA-Z]{2,6}(\/)/g,
    Event
}
