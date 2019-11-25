import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Default.vue'
import { findMenuList, tracking } from '@/views/layout/api'
import store from '@/store/index'
import { makeMenus, handleMenuResources } from '@/utils/auth'
import jwtDecode from 'jwt-decode'
Vue.use(Router)

const routerMapping = [
    {
        path: '/',
        component: Layout,
        meta: {
            title: '首页',
            isMenu: true,
            icon: 'hosjoy_home'
        },
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                    title: '首页',
                    tagName: '首页',
                    isMenu: false,
                    icon: '',
                    component: './views/index/index'
                },
                component: () => import('./views/index/index')
            }
        ]
    },
    {
        path: '/jinyunPlatform',
        meta: {
            title: '金云平台',
            isMenu: true,
            icon: 'hosjoy_cloud_service'
        },
        component: Layout,
        children: [
            {
                path: '',
                name: 'jinyunplatform',
                meta: {
                    title: '金云平台',
                    tagName: '金云平台',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('./views/jinyunplatform/index')
            }
        ]
    },
    {
        path: '/oldsystem',
        name: 'oldsystem',
        meta: {
            title: '老系统',
            isMenu: true,
            icon: 'hosjoy_goods',
            component: './views/jinyunplatform/index'
        }
    },
    {
        path: '/auth',
        meta: {
            title: '权限管理',
            isMenu: true,
            icon: 'hosjoy_permissions',
            redirect: 'noredirect'
        },
        component: Layout,
        children: [
            {
                path: 'organization',
                name: 'organization',
                meta: {
                    title: '机构/人员管理',
                    tagName: '机构/人员管理',
                    isMenu: true,
                    icon: '',
                    component: './views/auth/organization'
                },
                component: () => import('./views/auth/organization')
            },
            {
                path: 'postset',
                name: 'postset',
                meta: {
                    title: '岗位设置',
                    tagName: '岗位设置',
                    isMenu: true,
                    icon: '',
                    component: './views/auth/postset'
                },
                component: () => import('./views/auth/postset')
            },
            {
                path: 'role',
                name: 'jinyunPlatform',
                meta: {
                    title: '角色修改',
                    isMenu: false,
                    icon: '',
                    component: './views/auth/role',
                    func: (menus, route) => {
                        const len = menus.length
                        menus.splice(len - 1, 0, {
                            path: '/auth/organization',
                            meta: {
                                title: '机构/人员管理'
                            }
                        })
                    }
                },
                component: () => import('./views/auth/role')
            }
        ]
    },
    {
        path: '/wisdom',
        meta: {
            title: '好智慧-经营分析',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        // redirect: '/wisdom/' + this.children[0].path,
        component: Layout,
        children: [
            {
                path: 'manageoverview',
                name: 'manageoverview',
                meta: {
                    title: '经营概览',
                    tagName: '经营概览',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/manageoverview'
                },
                component: () => import('./views/wisdom/manageoverview')
            },
            {
                path: 'branchTarget',
                name: 'branchTarget',
                meta: {
                    title: '分部目标管理',
                    tagName: '分部目标管理',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/branchTarget'
                },
                component: () => import('./views/wisdom/branchTarget')
            },
            {
                path: 'platformTarget',
                name: 'platformTarget',
                meta: {
                    title: '平台目标管理',
                    tagName: '平台目标管理',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/platformTarget'
                },
                component: () => import('./views/wisdom/platformTarget')
            },

            {
                path: 'platcompanyinfo',
                name: 'platcompanyinfo',
                meta: {
                    title: '平台公司基本信息',
                    tagName: '平台公司基本信息',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/platcompanyinfo'
                },
                component: () => import('./views/wisdom/platcompanyinfo')
            },

            {
                path: 'platformSale',
                name: 'platformSale',
                meta: {
                    title: '平台销售分析',
                    tagName: '平台销售分析',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/platformSale'
                },
                component: () => import('./views/wisdom/platformSale')
            },
            {
                path: 'branchSale',
                name: 'branchSale',
                meta: {
                    title: '分部销售分析',
                    tagName: '分部销售分析',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/branchSale'
                },
                component: () => import('./views/wisdom/branchSale')
            },
            {
                path: 'categorySale',
                name: 'categorySale',
                meta: {
                    title: '品类销售分析',
                    tagName: '品类销售分析',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/categorySale'
                },
                component: () => import('./views/wisdom/categorySale')
            },
            {
                path: 'profitStatistics',
                name: 'profitStatistics',
                meta: {
                    title: '利润统计',
                    tagName: '利润统计',
                    isMenu: true,
                    icon: '',
                    component: './views/wisdom/profitStatistics'
                },
                component: () => import('./views/wisdom/profitStatistics')
            }
        ]
    },
    {
        path: '/bestonline',
        meta: {
            title: '尽调管理',
            isMenu: true,
            icon: 'hosjoy_jindiao'
        },
        // redirect: '/wisdom/' + this.children[0].path,
        component: Layout,
        children: [
            {
                path: 'application',
                name: 'application',
                meta: {
                    title: '尽调申请',
                    tagName: '尽调申请',
                    isMenu: true,
                    icon: '',
                    component: './views/bestonline/apply/index'
                },
                component: () => import('./views/bestonline/apply/index')
            },
            {
                path: 'review',
                name: 'review',
                meta: {
                    title: '现场尽调',
                    tagName: '现场尽调',
                    isMenu: true,
                    icon: '',
                    component: './views/bestonline/review'
                },
                component: () => import('./views/bestonline/review')
            },
            {
                path: 'reviewform',
                name: 'reviewform',
                meta: {
                    title: '修改',
                    isMenu: false,
                    icon: '',
                    component: './views/bestonline/reviewform',
                    func: (menus, route) => {
                        const len = menus.length
                        menus.splice(len - 1, 0, {
                            path: '/bestonline/review',
                            meta: {
                                title: '现场尽调'
                            }
                        })
                    }
                },
                component: () => import('./views/bestonline/reviewform')
            },
            {
                path: 'piecevote',
                name: 'piecevote',
                meta: {
                    title: '一项否决配置',
                    tagName: '一项否决配置',
                    isMenu: true,
                    icon: '',
                    component: './views/bestonline/piecevote'
                },
                component: () => import('./views/bestonline/piecevote')
            },
            {
                path: 'pointscode',
                name: 'pointscode',
                meta: {
                    title: '评分规则配置',
                    tagName: '评分规则配置',
                    isMenu: true,
                    icon: '',
                    component: './views/bestonline/pointscode'
                },
                component: () => import('./views/bestonline/pointscode')
            },
            {
                path: 'standard',
                name: 'standard',
                meta: {
                    title: '标准分数配置',
                    tagName: '标准分数配置',
                    isMenu: true,
                    icon: '',
                    component: './views/bestonline/standard'
                },
                component: () => import('./views/bestonline/standard')
            },
            {
                path: 'applyform',
                name: 'applyform',
                meta: {
                    title: '尽调申请详情',
                    tagName: '尽调申请详情',
                    isMenu: false,
                    icon: '',
                    component: './views/bestonline/apply/applyForm'
                },
                component: () => import('./views/bestonline/apply/applyForm')
            }
        ]
    },
    {
        path: '/hmall',
        meta: {
            title: 'B2b管理',
            isMenu: true,
            icon: 'hosjoy_store'
        },
        component: Layout,
        children: [
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '类目管理',
                    tagName: '类目管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/category/category.vue')
            },
            {
                path: 'brand',
                name: 'brand',
                meta: {
                    title: '品牌管理',
                    tagName: '品牌管理',
                    isMenu: true,
                    icon: '',
                    component: './views/hmall/brand/brand'
                },
                component: () => import('./views/hmall/brand/brand.vue')
            },
            // {
            //     path: 'shopManager',
            //     name: 'shopManager',
            //     meta: {
            //         title: '商品库管理SPU',
            //         tagName: '商品库管理SPU',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('./views/hmall/shopManager/shopManager.vue')
            // },
            {
                path: 'selectCategory',
                name: 'selectCategory',
                meta: {
                    title: '商品库管理',
                    tagName: '商品库管理',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('./views/hmall/shopManager/selectCategory.vue')
            },
            {
                path: 'platform',
                name: 'platform',
                meta: {
                    title: '商家功能管理',
                    tagName: '商家功能管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/platform/platform.vue')
            },
            // {
            //     path: 'shopReviewList',
            //     name: 'shopReviewList',
            //     meta: {
            //         title: '平台公司商品审核列表',
            //         tagName: '平台公司商品审核列表',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('./views/hmall/shopReview/shopReviewList.vue')
            // },
            {
                path: 'attribute',
                name: 'attribute',
                meta: {
                    title: '参数属性管理',
                    tagName: '参数属性管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/attribute/attribute.vue')
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单／收款记录查询',
                    tagName: '订单／收款记录查询',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/order/order.vue')
            },
            {
                path: 'coupon',
                name: 'coupon',
                meta: {
                    title: '优惠券审核列表',
                    tagName: '优惠券审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/coupon/coupon.vue')
            },
            {
                path: 'member',
                name: 'member',
                meta: {
                    title: '会员审核列表',
                    tagName: '会员审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/memberStore/member.vue')
            },
            {
                path: 'memberPull',
                name: 'memberPull',
                meta: {
                    title: '会员拉新管理',
                    tagName: '会员拉新管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/memberStore/memberPull.vue')
            },
            // {
            //     path: 'publicShop',
            //     name: 'publicShop',
            //     meta: {
            //         title: '共享商品管理',
            //         tagName: '共享商品管理',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('./views/hmall/shopManager/publicShop.vue')
            // },
            {
                path: 'activeReview',
                name: 'activeReview',
                meta: {
                    title: '活动审核列表',
                    tagName: '活动审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopReview/activeReview.vue')
            },
            {
                path: 'wallet',
                name: 'wallet',
                meta: {
                    title: '钱包支付开通情况',
                    tagName: '钱包支付开通情况',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/walletPay/walletPay.vue')
            },
            {
                path: 'merchantReview',
                name: 'merchantReview',
                meta: {
                    title: '商户审核列表',
                    tagName: '商户审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopReview/merchantReview.vue')
            },
            // 这期不做
            // {
            //     path: 'memberManagement',
            //     name: 'memberManagement',
            //     meta: {
            //         title: '会员管理',
            //         tagName: '会员管理',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/memberManagement.vue')
            // },
            {
                path: 'brandAreaAudit',
                name: 'brandAreaAudit',
                meta: {
                    title: '品牌区域审核列表',
                    tagName: '品牌区域审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/brand/brandAreaAudit.vue')
            },
            {
                path: 'marketStore',
                name: 'marketStore',
                meta: {
                    title: '商家商品库',
                    tagName: '商家商品库',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/bazaar/marketStore.vue')
            },
            {
                path: 'spumange',
                name: 'spumange',
                meta: {
                    title: 'SPU列表',
                    tagName: 'SPU列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/index')
            },
            {
                path: 'spudetail',
                name: 'spudetail',
                meta: {
                    title: 'SPU管理',
                    tagName: 'SPU管理',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/spudetail')
            },
            {
                path: 'spuauditlist',
                name: 'spuauditlist',
                meta: {
                    title: 'SPU审核列表',
                    tagName: 'SPU审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/spuauditlist')
            },
            {
                path: 'skuset',
                name: 'skuset',
                meta: {
                    title: 'SKU属性管理',
                    tagName: 'SKU属性管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/skuset')
            }
        ]
    },
    {
        path: '/serviceManagement',
        meta: {
            title: '服务管理',
            isMenu: true,
            icon: 'hosjoy_cloud_service'
        },
        component: Layout,
        children: [
            {
                path: 'customerManagement',
                name: 'customerManagement',
                meta: {
                    title: '客户管理',
                    tagName: '客户管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/customerManagement/customer.vue')
            },
            {
                path: 'houseKeeperManagement',
                name: 'houseKeeperManagement',
                meta: {
                    title: '管家管理',
                    tagName: '管家管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/houseKeeperManagement/houseKeeperManagement.vue')
            },
            {
                path: 'orderCenter',
                name: 'orderCenter',
                meta: {
                    title: '订单中心',
                    tagName: '订单中心',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/orderCenter/order.vue')
            },
            {
                path: 'workOrder',
                name: 'workOrder',
                meta: {
                    title: '工单信息',
                    tagName: '工单信息',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/workOrder/index.vue')
            },
            {
                path: 'customerRecord',
                name: 'customerRecord',
                meta: {
                    title: '客户档案',
                    tagName: '客户档案',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/customerRecord/index.vue')
            },
            {
                path: 'customerRecordDetail',
                name: 'customerRecordDetail',
                meta: {
                    title: '档案详情',
                    tagName: '档案详情',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/customerRecord/detail.vue')
            },
            {
                path: 'customerReport',
                name: 'customerReport',
                meta: {
                    title: '客户报告',
                    tagName: '客户报告',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/customerReport/index.vue')
            },
            {
                path: 'customerReportDetail',
                name: 'customerReportDetail',
                meta: {
                    title: '报告详情',
                    tagName: '报告详情',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/customerReport/detail.vue')
            },
            {
                path: 'orderDetails',
                name: 'serviceManagementOrderDetails',
                meta: {
                    title: '有赞订单详情',
                    tagName: '有赞订单详情',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/orderCenter/orderDetails.vue')
            },
            {
                path: 'orderChannelDetails',
                name: 'serviceManagementOrderChannelDetails',
                meta: {
                    title: '渠道订单详情',
                    tagName: '渠道订单详情',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/orderCenter/orderChannelDetails.vue')
            },
            {
                path: 'orderChannelEdit',
                name: 'serviceManagementOrderChannelEdit',
                meta: {
                    title: '渠道订单修改',
                    tagName: '渠道订单修改',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/orderCenter/orderChannelEdit.vue')
            },
            {
                path: 'tags',
                name: 'serviceManagementTags',
                meta: {
                    title: '标签管理',
                    tagName: '标签管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/tags/tags.vue')
            },
            {
                path: 'channelManagement',
                name: 'serviceManagementOrderMessage',
                meta: {
                    title: '渠道管理',
                    tagName: '渠道管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/serviceManagement/channelManagement/channelManagement.vue')
            }
        ]
    },
    {
        path: '/platformCompanyCockpit',
        meta: {
            title: '平台公司驾驶舱',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'archivesList',
                name: 'archivesList',
                meta: {
                    title: '平台公司档案',
                    tagName: '平台公司档案',
                    parentName: '平台公司驾驶舱',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/platformCompanyCockpit/archivesList.vue')
            },
            {
                path: 'archivesManagement',
                name: 'archivesManagement',
                meta: {
                    title: '档案管理',
                    tagName: '档案管理',
                    parentName: '平台公司驾驶舱',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/platformCompanyCockpit/archivesManagement.vue')
            }
        ]
    }
]

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/login',
            name: 'login',
            component: () => import('./views/login/login'),
            hidden: true
        },
        {
            path: '/403',
            name: '403',
            component: () => import('./views/error/403'),
            hidden: true
        },
        ...routerMapping
    ]
})
function makeIndex (data, next, query) {
    let index = []
    if (data.length > 0) {
        for (let i = 0; i < data.length; i++) {
            index.push(data[i].path.replace('/', ''))
            if (data[i].children) {
                if (data[i].children.length > 0) {
                    index.push(data[i].children[0].path.replace('/', ''))
                }
            }
            break
        }
        let path = ''
        if (query.route) {
            path = '/' + query.route.split(',').join('/')
            console.log(path)
        } else {
            path = index.join('/')
        }

        if (!path) {
            path = '/'
        }
        next({ path: path, query: { mobile: query.mobile }, replace: true })
    }
}
async function getMenu (to, next, isMakeIndex, query) {
    const { data } = await findMenuList()
    sessionStorage.setItem('authResourceKeys', data.resourceKeys)
    let resourceList = []
    handleMenuResources(data.employeeAuthDetailsList, resourceList)
    const menu = makeMenus(routerMapping, resourceList)
    // const menu = routerMapping
    sessionStorage.setItem('menuList', JSON.stringify(menu))
    router.addRoutes(menu)

    if (isMakeIndex) {
        makeIndex(menu, next, query)
    } else {
        next({ ...to, replace: true })
    }
}
// let isFirst = true
router.beforeEach(async (to, from, next) => {
    let isFirst = store.state.isFirst
    const isLogin = to.name === 'login'
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 非/login下需要验证
    if (!isLogin) {
        // 提供第三方凭条跳转内部系统
        const query = to.query
        if (to.path === '/redirect' && query.sale === 'hosjoy') {
            sessionStorage.setItem('token', query.access_token)
            sessionStorage.setItem('userInfo', JSON.stringify(jwtDecode(query.access_token)))
            await getMenu(to, next, true, query)
        } else {
            // 非登录的情况下
            if (!userInfo) {
                return next({
                    name: 'login'
                })
            } else {
                if (isFirst) {
                    store.commit('IS_FIRST', false)
                    await getMenu(to, next)
                }
            }
        }
    }
    if (userInfo && !isFirst) {
        tracking({
            type: 2,
            user_name: userInfo.employeeName,
            login_name: userInfo.phoneNumber,
            page_path_name: to.tagName,
            page_name: to.meta.title,
            parent_page_name: to.meta.parentName,
            parent_fullpage_name: to.fullPath,
            from_page_path_name: from.tagName,
            from_page_name: from.meta.title || '',
            user_agent: navigator.userAgent
        })
    }
    next()
})

export default router
export {
    routerMapping
}
