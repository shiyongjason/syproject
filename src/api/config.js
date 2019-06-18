/**
 * 配置访问后端接口的域名端口
 */
let interfaceUrl = ''
let uploadUrl = ''
let ossUrl = ''
var env = process.env.NODE_ENV === 'development' ? 'development' : process.env.VUE_APP_TITLE === 'test' ? 'test' : 'production'
switch (env) {
    case 'development':
        interfaceUrl = 'http://172.16.168.8:30000/'
        ossUrl = 'http://172.16.168.8:8089/'
        // interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        break
    case 'dev':
        interfaceUrl = 'http://172.16.168.8:30000/'
        ossUrl = 'http://172.16.168.8:8089/'
        uploadUrl = 'http://172.16.168.8:30000/tms'
        break
    case 'test':
        interfaceUrl = 'https://testb2b-gateway.hosjoy.com:4832/'
        ossUrl = 'http://172.16.168.8:8090/'
        uploadUrl = 'https://testhbp.hosjoy.com:4832/tms'
        break
    case 'production':
        // TODO: 给产品调用
        interfaceUrl = 'https://b2b-gateway.hosjoy.com/'
        ossUrl = 'http://172.16.168.8:8090/'
        uploadUrl = 'https://hbp.hosjoy.com/tms'
        break
}
export {
    interfaceUrl,
    uploadUrl,
    ossUrl
}
