/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let ossUrl = ''
let iframeUrl = ''
let jinyun = ''
let ccpBaseUrl = ''
let B2bUrl = ''
let fileUploadUrl = ''
var env = process.env.NODE_ENV === 'development' ? 'development' : (process.env.VUE_APP_TITLE === 'dev' ? 'dev' : process.env.VUE_APP_TITLE === 'test' ? 'test' : process.env.VUE_APP_TITLE === 'preview' ? 'preview' : 'production')

// var env = process.env.NODE_ENV === 'development' ? 'development' : (process.env.VUE_APP_TITLE === 'dev' ? 'dev' : process.env.VUE_APP_TITLE === 'test' ? 'test' : 'production')
switch (env) {
    case 'development':
        interfaceUrl = 'https://hbp-gateway-dev.hosjoy.com:4832'
        ossUrl = 'http://192.168.20.248:8089/'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        ccpBaseUrl = 'https://ccp-gateway-dev.hosjoy.com:4832/'
        B2bUrl = 'https://b2b-gateway-dev.hosjoy.com:4832/'
        fileUploadUrl = 'https://hbp-gateway-dev.hosjoy.com:4832'

        // interfaceUrl = 'http://192.168.20.248:30000/'
        // ossUrl = 'http://192.168.20.248:8089/'
        // iframeUrl = 'http://devcrm.hosjoy.com/'
        // jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        // ccpBaseUrl = 'http://192.168.20.248:8021/'
        // B2bUrl = 'http://192.168.20.248:40000/'
        // fileUploadUrl = 'http://192.168.20.248:30000/'
        break
    case 'dev':
        interfaceUrl = 'http://192.168.20.248:30000/'
        ossUrl = 'http://192.168.20.248:8089/'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        B2bUrl = 'http://192.168.20.248:40000/'
        fileUploadUrl = 'http://192.168.20.248:30000/'
        break
    case 'test':
        interfaceUrl = 'https://testhbp.hosjoy.com:4832/'
        ossUrl = 'https://testroute.hosjoy.com:4832/'
        iframeUrl = 'https://test.hosjoy.com:4832/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        ccpBaseUrl = 'https://testccp.hosjoy.com:4832/'
        fileUploadUrl = 'https://testhbp.hosjoy.com:4832/'
        break
    case 'preview':
        interfaceUrl = 'https://staging-hbp.hosjoy.com/'
        ossUrl = 'https://staging-route.hosjoy.com/'
        iframeUrl = 'https://staging-boss.hosjoy.com/'
        jinyun = 'https://staging-jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://staging-b2b-gateway.hosjoy.com/'
        ccpBaseUrl = 'https://staging-ccp.hosjoy.com/'
        fileUploadUrl = 'https://staging-hbp.hosjoy.com/'
        break
    case 'production':
        // TODO: 给产品调用
        interfaceUrl = 'https://hbp.hosjoy.com/'
        ossUrl = 'https://route.hosjoy.com/'
        iframeUrl = 'https://boss.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://b2b-gateway.hosjoy.com/'
        ccpBaseUrl = 'https://ccp.hosjoy.com/'
        fileUploadUrl = 'https://hbp.hosjoy.com/'
        break
}
export {
    interfaceUrl,
    ossUrl,
    iframeUrl,
    jinyun,
    ccpBaseUrl,
    B2bUrl,
    fileUploadUrl
}
