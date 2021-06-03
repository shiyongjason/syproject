import Vue from 'vue'
import App from './App.vue'
// @ts-ignore
import router from './router'
// @ts-ignore
import store from '@/store/index'
// @ts-ignore
import '@/api/axios.js'
// @ts-ignore
import ElementUI from 'element-ui'
// @ts-ignore
import 'element-ui/lib/theme-chalk/display.css'
// import 'element-ui/lib/theme-chalk/index.css'
// @ts-ignore
import HosjoyUI from 'hosjoy-ui'
// @ts-ignore
import 'hosjoy-ui/lib/hosjoy-ui.css'
// @ts-ignore
import '../src/theme/index.css'
// @ts-ignore
import '@/assets/style/common.scss'
// @ts-ignore
import TreeTable from 'tree-table-vue'
// @ts-ignore
import filters from './utils/filters'
// @ts-ignore
import commonFun from './utils/common'
// @ts-ignore
import basicTable from './components/CommonTable/CommonTable'
// @ts-ignore
import searchBarOpenAndClose from './components/SearchBarOpenAndClose/index'
// @ts-ignore
import moment from 'moment'
// @ts-ignore
import '@/utils/validate/index.js'
// fix前端精度问题
// @ts-ignore
import precisionMethods from '@/utils/bignumber.js'

// 接入 sentry
// @ts-ignore
// import * as Sentry from '@sentry/browser'
// import { Vue as VueIntegration } from '@sentry/integrations'
// if (process.env.NODE_ENV === 'production') {
//     Sentry.init({
//         dsn: 'https://96d38d85c5da49bfacdada98edca3ea7@sentry.hosjoy.com/4',
//         integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })],
//         release: process.env.RELEASE_VERSION,
//         environment: process.env.VUE_APP_TITLE || process.env.NODE_ENV
//     })
// }

Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.use(ElementUI)
Vue.use(TreeTable)
Vue.use(HosjoyUI)
Vue.use(commonFun)
// table公共组件
Vue.component(
    'basicTable', basicTable
)
Vue.component(
    'searchBarOpenAndClose', searchBarOpenAndClose
)

Vue.filter('formatDate', (time, param) => {
    if (!time) return '-'
    if (param) {
        return moment(time).format(param)
    }
    return moment(time).format('YYYY-MM-DD HH:mm')
})

// 过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})
/**
 * 精确加法
 */
Vue.prototype.$plus = (num1, num2, ...others) => {
    // @ts-ignore
    return precisionMethods.plus(num1, num2, ...others)
}
/**
 * 精确减法
 */
Vue.prototype.$minus = (num1, num2, ...others) => {
    return precisionMethods.minus(num1, num2, ...others)
}
/**
 * 精确除法
 */
Vue.prototype.$dividedBy = (num1, num2, ...others) => {
    return precisionMethods.dividedBy(num1, num2, ...others)
}
/**
 * 精确乘法
 */
Vue.prototype.$multipliedBy = (num1, num2, ...others) => {
    return precisionMethods.multipliedBy(num1, num2, ...others)
}

Vue.mixin({
    methods: {
        hosAuthCheck (id) {
            const auth: any = sessionStorage.getItem('authResourceKeys')
            return auth.includes(id)
        }
    }
})

new Vue({
    // @ts-ignore
    router,
    store,
    render: h => h(App)
}).$mount('#app')
