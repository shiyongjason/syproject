/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let uploadUrl = ''
let ossUrl = ''
let iframeUrl = ''
var env = process.env.NODE_ENV === 'development' ? 'development' : (process.env.VUE_APP_TITLE === 'dev' ? 'dev' : process.env.VUE_APP_TITLE === 'test' ? 'test' : 'production')
switch (env) {
    case 'development':
        interfaceUrl = 'http://172.16.168.8:30000/'
        ossUrl = 'http://172.16.168.8:8089/'
        // interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        break
    case 'dev':
        interfaceUrl = 'http://172.16.168.8:30000/'
        ossUrl = 'http://172.16.168.8:8089/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        iframeUrl = 'http://devcrm.hosjoy.com/'
        break
    case 'test':
        interfaceUrl = 'https://testhbp.hosjoy.com:4832/'
        ossUrl = 'https://testroute.hosjoy.com:4832/'
        uploadUrl = 'https://testhbp.hosjoy.com:4832/tms'
        iframeUrl = 'https://test.hosjoy.com/'
        break
    case 'production':
        // TODO: 给产品调用
        interfaceUrl = 'https://hbp.hosjoy.com/'
        ossUrl = 'https://route.hosjoy.com:4832/'
        uploadUrl = 'https://hbp.hosjoy.com/tms'
        iframeUrl = 'https://boss.hosjoy.com/'
        break
}
export {
    interfaceUrl,
    uploadUrl,
    ossUrl,
    iframeUrl
}
