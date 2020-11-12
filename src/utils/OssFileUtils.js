import { v4 as generateFileNameByUUID } from 'uuid'
import OSS from 'ali-oss'
import { getOssSTS } from '@/api'
import imageCompression from 'browser-image-compression'
import { ossBucket, ossRegion } from '@/api/config'

const TIMEOUT_SERVER = 1000 * 60 * 30
let TIMEOUT_CLIENT = 10000

let OSSConfig = {
    region: ossRegion,
    bucket: ossBucket
}
async function getCredentials () {
    const { data } = await getOssSTS()
    OSSConfig = {
        ...OSSConfig,
        accessKeyId: data.accessKeyId,
        accessKeySecret: data.accessKeySecret,
        stsToken: data.securityToken
    }
}
const initOssSTS = (function () {
    let client = null
    let timer = null
    return async function () {
        if (!client) {
            await getCredentials()
            client = new OSS({
                ...OSSConfig
            })
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
    let eventLoopTemp = []
    let timer
    let autoTimer
    let pending = false

    setInterval(function () {
        console.log(eventLoop, 'eventLoop----------------------')
        console.log(eventLoopTemp, 'eventLoopTemp----------------------')
    }, TIMEOUT_CLIENT)

    Event = (function () {
        let listen = function () {
            let fn = Array.prototype.shift.call(arguments)
            if (typeof fn === 'function') {
                eventLoop.push(fn.bind(null, ...arguments))
                // eventLoopTemp.push(fn.bind(null, ...arguments))
            }
            if (!pending) {
                trigger()
            }
        }
        let trigger = async function () {
            console.log(Date.now())
            pending = true
            for (const event of eventLoop) {
                try {
                    await event()
                    console.log('我只执行一遍')
                } catch (e) {
                    console.log(e)
                }
            }
            // eventLoop = []
            // const waitToken = eventLoop[Symbol.iterator]()
            // await waitToken.next()
            // const fn = eventLoop.pop()
            // eventLoopTemp.push(fn)
            // while (eventLoop.length > 0) {
            //     const event = eventLoop.pop()
            //     eventLoopTemp.push(fn)
            //     try {
            //         event()
            //     } catch (e) {
            //         console.log(e)
            //     }
            // }
            pending = false
            console.log(Date.now())
        }
        let refreshTime = function () {
            autoTimer = setInterval(async function refreshTime () {
                console.log(eventLoop.length)
                for (const event of eventLoop) {
                    await event()
                }
                clearInterval(timer)
            }, TIMEOUT_CLIENT)
        }
        let unload = function () {
            eventLoop = []
            eventLoopTemp = []
            clearInterval(autoTimer)
        }
        timer = setTimeout(function () {
            refreshTime()
            clearTimeout(timer)
        }, TIMEOUT_CLIENT)
        return {
            listen,
            trigger,
            unload
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
        const suffix = file.name.slice(file.name.indexOf('.'))
        return [
            generateFileNameByUUID() + suffix,
            new Blob([file], { type: file.type, size: file.size })
        ]
    },
    async doUpload (fileName, fileBlob) {
        let result
        const ossUtil = await initOssSTS()
        try {
            result = await ossUtil.put(fileName, fileBlob)
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
            result = await ossUtil.signatureUrl(new URL(url).pathname, { expires: TIMEOUT_CLIENT })
        } catch (e) {
            result = ''
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
    Event
}
