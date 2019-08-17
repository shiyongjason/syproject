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
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(TreeTable)
Vue.use(HosjoyUI)

// 过滤器
Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
})

// table公共组件
Vue.component(
    'basicTable', basicTable
)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
