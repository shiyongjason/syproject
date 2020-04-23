import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import dueDiligence from '@/views/bestonline/store/index'
import hmall from '@/views/hmall/store/index.js'
import layout from '@/views/layout/store/index.js'
import serviceManagement from './modules/serviceManagement'
import eventManage from './modules/eventManage'
import membership from './modules/membership'
import payment from './modules/payment'
import fundsData from '@/views/wisdom/fundsData/store/index.js'
import userRealreport from './modules/userRealreport'
import supplier from './modules/supplier'
// import cloudmanage from './modules/cloudManage'
import developmodule from '@/views/wisdom/store/developmodule'
import jinyunplatform from '@/views/jinyunplatform/store/index.js'
import cloudmanage from '@/views/comfortcloud/store/cloudManage'
import crmmanage from '@/views/crm/goodwork/store/crmManage'
import crmauthen from '@/views/crm/crmauthen/store/crmAuthen'
import crmstatic from '@/views/crm/crmstatic/store/crmStatic'

Vue.use(Vuex)

const userInfo = sessionStorage.getItem('userInfo')
// const userdata = sessionStorage.getItem('user_data')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo ? JSON.parse(userInfo) : {},
        'tagsList': sessionStorage.getItem('tagsList') ? JSON.parse(sessionStorage.getItem('tagsList')) : [],
        'isSaving': false,
        'isFirst': true,
        'menuList': [],
        'isCollapse': false,
        'cachedInclude': [],
        'cachedExclude': [],
        'devDepList': [],
        // Boss后台统一权限
        platformData: [], // 平台公司list
        branchList: [] // 分部列表
    },
    mutations,
    actions: actions,
    modules: {
        // 视图的 store
        dueDiligence,
        hmall,
        layout,
        eventManage,
        fundsData,
        membership,
        serviceManagement,
        payment,
        supplier,
        userRealreport,
        cloudmanage,
        crmmanage,
        developmodule,
        jinyunplatform,
        crmauthen,
        crmstatic
    }
})

export default store
