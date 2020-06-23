import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'
import dueDiligence from '@/views/bestonline/store/index'
import hmall from '@/views/hmall/store/index.js'
import layout from '@/views/layout/store/index.js'
import eventManage from './modules/eventManage'
import fundsData from '@/views/wisdom/fundsData/store/index.js'
import fundsPlan from '@/views/wisdom/fundsPlan/store/index.js'
import membership from './modules/membership'
import payment from './modules/payment'
import userRealreport from './modules/userRealreport'
// import cloudmanage from './modules/cloudManage'
import developmodule from '@/views/wisdom/store/developmodule'
import jinyunplatform from '@/views/jinyunplatform/store/index.js'
import cloudmanage from '@/views/comfortcloud/store/cloudManage'
import crmmanage from '@/views/crm/goodwork/store/crmManage'
import crmauthen from '@/views/crm/crmauthen/store/crmAuthen'
import crmstatic from '@/views/crm/crmstatic/store/crmStatic'
import projectInformation from '@/views/crm/projectInformation/store/projectInformation'
import riskManage from '@/views/crm/riskManage/store/riskManage'
import vipManage from '@/views/crm/vipManage/store/vipManage'
import creditManage from '@/views/crm/creditmanage/store/creditmanage'
import vipApply from '@/views/crm/vipApplication/store/vipApplication'
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
        platformData: [], // Boss后台统一权限 平台公司list
        regionList: [], // 大区列表
        branchList: [], // 分部列表
        areaList: [] // 区域列表
    },
    mutations,
    actions: actions,
    modules: {
        // 视图的 store 这里 大写
        dueDiligence,
        hmall,
        layout,
        eventManage,
        fundsData,
        membership,
        payment,
        userRealreport,
        cloudmanage,
        crmmanage,
        developmodule,
        jinyunplatform,
        crmauthen,
        fundsPlan,
        crmstatic,
        projectInformation,
        riskManage,
        vipManage,
        vipApply,
        creditManage
    }
})
export default store