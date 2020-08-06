import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import '@/api/axios.js'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/theme/index.css'
import '@/assets/style/common.scss'
import HosjoyUI from 'hosjoy-ui'
import TreeTable from 'tree-table-vue'
import filters from './utils/filters'
import basicTable from './components/CommonTable/CommonTable'
import searchBarOpenAndClose from './components/SearchBarOpenAndClose/index'
import moment from 'moment'
import '@/utils/validate/index.js'
// fix前端精度问题
import precisionMethods from '@/utils/bignumber.js'

// 接入 sentry
import * as Sentry from '@sentry/browser'
import { Vue as VueIntegration } from '@sentry/integrations'
if (process.env.VUE_APP_TITLE === 'production' || process.env.VUE_APP_TITLE === 'preview') {
    Sentry.init({
        dsn: 'https://96d38d85c5da49bfacdada98edca3ea7@sentry.hosjoy.com/4',
        integrations: [new VueIntegration({ Vue, attachProps: true, logErrors: true })],
        release: process.env.RELEASE_VERSION,
        environment: process.env.VUE_APP_TITLE
    })
}

Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.use(ElementUI)
Vue.use(TreeTable)
Vue.use(HosjoyUI)
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
            const auth = sessionStorage.getItem('authResourceKeys')
            return auth.includes(id)
        }
    }
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
