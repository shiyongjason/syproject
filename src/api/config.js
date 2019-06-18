/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let uploadUrl = ''
var env = process.env.NODE_ENV === 'development' ? 'development' : process.env.VUE_APP_TITLE === 'test' ? 'test' : 'production'
switch (env) {
    case 'development':
        interfaceUrl = 'http://172.16.168.8:30000/'
        // interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        break
    case 'dev':
        interfaceUrl = 'http://172.16.168.8:40000/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        break
    case 'test':
        interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        uploadUrl = 'https://testhbp.hosjoy.com:4832/tms'
        break
    case 'production':
        // TODO: 给产品调用
        interfaceUrl = 'https://b2b-gateway.hosjoy.com/'
        // interfaceUrl = 'http://172.16.168.8:40000/'
        uploadUrl = 'https://hbp.hosjoy.com/tms'
        break
}
export {
    interfaceUrl,
    uploadUrl
}
