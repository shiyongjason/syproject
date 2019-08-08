import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store/index'
import '@/api/axios.js'
import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
import '../src/theme/index.css'
import '@/assets/style/common.scss'
// import HosjoyUI from 'hosjoy-ui'
import filters from './utils/filters'
import moment from 'moment'
import basicTable from './components/CommonTable/CommonTable'
Vue.config.productionTip = false
moment.locale('zh-cn')
Vue.use(ElementUI)
// Vue.use(HosjoyUI)

// table公共组件
Vue.component(
    'basicTable', basicTable
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

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')