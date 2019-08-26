/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let uploadUrl = ''
let ossUrl = ''
let iframeUrl = ''
let jinyun = ''
let ccpBaseUrl = ''
let B2bUrl = ''
let fileUploadUrl = ''
var env = process.env.NODE_ENV === 'development' ? 'development' : (process.env.VUE_APP_TITLE === 'dev' ? 'dev' : process.env.VUE_APP_TITLE === 'test' ? 'test' : 'production')
switch (env) {
    case 'development':
        interfaceUrl = 'http://192.168.20.248:30000/'
        ossUrl = 'http://192.168.20.248:8089/'
        // interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        uploadUrl = 'http://192.168.20.248:30000/tms'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        B2bUrl = 'http://192.168.20.248:40000/'
        fileUploadUrl = 'http://192.168.20.248:30000/'

        // interfaceUrl = 'https://testhbp.hosjoy.com:4832/'
        // ossUrl = 'https://testroute.hosjoy.com:4832/'
        // uploadUrl = 'https://testhbp.hosjoy.com:4832/tms'
        // iframeUrl = 'https://test.hosjoy.com:4832/'
        break
    case 'dev':
        interfaceUrl = 'http://192.168.20.248:30000/'
        ossUrl = 'http://192.168.20.248:8089/'
        uploadUrl = 'http://192.168.20.248:30000/tms'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'http://192.168.20.248:40000/'
        break
    case 'test':
        interfaceUrl = 'https://testhbp.hosjoy.com:4832/'
        ossUrl = 'https://testroute.hosjoy.com:4832/'
        uploadUrl = 'https://testhbp.hosjoy.com:4832/tms'
        iframeUrl = 'https://test.hosjoy.com:4832/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        fileUploadUrl = 'https://testhbp.hosjoy.com:4832/'
        break
    case 'production':
        // TODO: 给产品调用
        interfaceUrl = 'https://hbp.hosjoy.com/'
        ossUrl = 'https://route.hosjoy.com/'
        uploadUrl = 'https://hbp.hosjoy.com/tms'
        iframeUrl = 'https://boss.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://b2b-gateway.hosjoy.com/'
        fileUploadUrl = 'https://hbp.hosjoy.com/'
        break
}
export {
    interfaceUrl,
    uploadUrl,
    ossUrl,
    iframeUrl,
    jinyun,
    FileUploadUrl,
    ccpBaseUrl,
    B2bUrl,
    fileUploadUrl
}
