import Vue from 'vue'
import Vuex from 'vuex'
import jwtDecode from 'jwt-decode'
import mutations from './mutations'
import actions from './action'
import dueDiligence from '@/views/bestonline/store/index'
import hmall from '@/views/hmall/store/index.js'
import layout from '@/views/layout/store/index.js'
import eventManage from './modules/eventManage'
import fundsData from '@/views/wisdom/fundsData/store/index.js'
import fundsPlan from '@/views/wisdom/fundsPlan/store/index.js'
import fundsOverdue from '@/views/wisdom/fundsOverdue/store/index.js'
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
import crmRecommeder from '@/views/crm/recommender/store/index'
import crmAwardManage from '@/views/crm/awardManage/store/index'
import caCertiManage from '@/views/crm/caCertiManage/store/index'
import projectInformation from '@/views/crm/projectInformation/store/projectInformation'
import crmPurchaseOrder from '@/views/crm/purchaseOrder/store/index'
import crmPaymentOrder from '@/views/crm/paymentOrder/store/index'
import crmFunds from '@/views/crm/funds/store/index'
import riskManage from '@/views/crm/riskManage/store/riskManage'
import vipManage from '@/views/crm/vipmanage/store/vipManage'
import creditManage from '@/views/crm/creditmanage/store/creditManage'
import vipApply from '@/views/crm/vipapplication/store/vipApplication'
import wxMember from '@/views/crm/wechatcustomer/store/wxMember'
import contractTemp from '@/views/crm/contractTemp/store/index'
import projectStore from '@/views/crm/projectList2_0/store/index'
import threadStore from '@/views/crm/thread/store/index'
Vue.use(Vuex)

const token = localStorage.getItem('token')
let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
if (!userInfo && token) {
    userInfo = jwtDecode(token)
    sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
}
// const userInfo = sessionStorage.getItem('userInfo')
// const userdata = sessionStorage.getItem('user_data')
const store = new Vuex.Store({
    state: {
        'loading': false,
        'userInfo': userInfo || {},
        'tagsList': sessionStorage.getItem('tagsList') ? JSON.parse(sessionStorage.getItem('tagsList')) : [],
        'isSaving': false,
        'isFirst': true,
        'menuList': [],
        'isCollapse': false,
        'cachedInclude': [],
        'cachedExclude': [],
        'devDepList': [],
        'platformData': [], // Boss后台统一权限 平台公司list
        'regionList': [], // 大区列表
        'branchList': [], // 分部列表
        'areaList': [] // 区域列表
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
        fundsOverdue,
        crmstatic,
        crmRecommeder,
        crmAwardManage,
        caCertiManage,
        projectInformation,
        riskManage,
        vipManage,
        vipApply,
        creditManage,
        wxMember,
        crmPurchaseOrder,
        crmPaymentOrder,
        crmFunds,
        contractTemp,
        projectStore,
        threadStore
    }
})
export default store
