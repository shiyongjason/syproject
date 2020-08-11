/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let ossUrl = ''
let iframeUrl = ''
let jinyun = ''
let B2bUrl = ''
let ccpBaseUrl = ''
let fileUploadUrl = ''
let iotUrl = ''
var env = process.env.NODE_ENV === 'development'
    ? 'development' : (process.env.VUE_APP_TITLE === 'dev'
        ? 'dev' : process.env.VUE_APP_TITLE === 'test'
            ? 'test' : process.env.VUE_APP_TITLE === 'preview'
                ? 'preview' : process.env.VUE_APP_TITLE === 'newtest'
                    ? 'newtest' : 'production')

switch (env) {
    case 'development':
        interfaceUrl = 'http://192.168.20.248:30000/'
        ossUrl = 'http://192.168.20.248:8089/'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        B2bUrl = 'http://192.168.20.248:40000/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        iotUrl = 'https://testiot.hosjoy.com:2286'

        break
    case 'dev':
        interfaceUrl = 'http://192.168.20.248:30000/'
        ossUrl = 'http://192.168.20.248:8089/'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        B2bUrl = 'http://192.168.20.248:40000/'
        ccpBaseUrl = 'http://192.168.20.248:8021/'
        iotUrl = 'https://testiot.hosjoy.com:2286'
        break
    case 'test':
        interfaceUrl = 'https://hbp-test.hosjoy.com/'
        ossUrl = 'https://route-test.hosjoy.com/'
        iframeUrl = 'https://crm-test.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://b2b-gateway-test.hosjoy.com/'
        fileUploadUrl = 'https://hbp-test.hosjoy.com/'
        iotUrl = 'https://iot-test.hosjoy.com'
        ccpBaseUrl = 'https://ccp-test.hosjoy.com/'
        break
    case 'newtest':
        interfaceUrl = 'https://hbp-test245.hosjoy.com/'
        ossUrl = 'https://route-test245.hosjoy.com/'
        iframeUrl = 'https://crm-test.hosjoy.com/'
        jinyun = 'https://jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://b2b-gateway-test245.hosjoy.com/'
        fileUploadUrl = 'https://hbp-test245.hosjoy.com/'
        iotUrl = 'https://iot-test.hosjoy.com'
        ccpBaseUrl = 'https://ccp-test245.hosjoy.com/'
        break
    case 'preview':
        interfaceUrl = 'https://staging-hbp.hosjoy.com/'
        ossUrl = 'https://staging-route.hosjoy.com/'
        iframeUrl = 'https://staging-boss.hosjoy.com/'
        jinyun = 'https://staging-jinyun.hosjoy.cn/wfsf/'
        B2bUrl = 'https://staging-b2b-gateway.hosjoy.com/'
        ccpBaseUrl = 'https://staging-ccp.hosjoy.com/'
        fileUploadUrl = 'https://staging-hbp.hosjoy.com/'
        iotUrl = 'https://testiot.hosjoy.com:2286'
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
        iotUrl = 'https://iot.hosjoy.com'
        break
}
export {
    interfaceUrl,
    ossUrl,
    iframeUrl,
    jinyun,
    B2bUrl,
    ccpBaseUrl,
    fileUploadUrl,
    iotUrl
}
