/* eslint-disable */
import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Default.vue'
import { findMenuList, tracking } from '@/views/layout/api'
import store from '@/store/index'
import { makeMenus, handleMenuResources } from '@/utils/auth'
import axios from 'axios'
import { B2bUrl } from './api/config'
import qs from 'qs'
import jwtDecode from 'jwt-decode'
import ServiceManagement from './router/catalogue/serviceManagement'
import B2brouter from './router/B2brouter'
import Jyrouter from './router/Jyrouter'
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
        path: '/sysAdmin',
        meta: {
            title: '系統管理',
            isMenu: true,
            icon: 'hosjoy_set',
            redirect: 'noredirect'
        },
        component: Layout,
        children: [
            {
                path: 'routerConfig',
                name: 'routerConfig',
                meta: {
                    title: '路由配置',
                    tagName: '路由配置',
                    isMenu: true,
                    icon: '',
                    component: './views/routerConfig'
                },
                component: () => import('./views/routerConfig')
            }
        ]
    },
    {
        path: '/jinyunPlatform',
        meta: {
            title: '金云平台',
            isMenu: true,
            icon: 'hosjoy_stay_online'
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
    },
    {
        path: '/appUpdate',
        meta: {
            title: 'App管理',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'versionUpdating',
                name: 'versionUpdating',
                meta: {
                    title: '版本更新',
                    tagName: '版本更新',
                    parentName: 'App管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/appUpdate/index.vue')
            }
        ]
    },
    ServiceManagement,
    B2brouter,
    Jyrouter
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
        }
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
    // const menu = makeMenus(routerMapping, resourceList)
    const menu = routerMapping
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
    // TODO 获取B2b token 项目路径 hmall（重新获取token）
    if (to.path.indexOf('hmall') > 0) {
        console.log(2)
        // 登录token带到请求的头部中，用于校验登录状态
        const token = sessionStorage.getItem('tokenB2b')
        if (token) {
            axios.defaults.headers['Authorization'] = 'Bearer ' + token
        } else {
            const newInstance = axios.create({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            const { data } = await newInstance.post(B2bUrl + 'uaa/oauth/token', qs.stringify({
                'grant_type': 'client_credentials',
                'client_id': 'boss',
                'client_secret': 'boss',
                'scope': 'boss'
            }))
            sessionStorage.setItem('tokenB2b', data.access_token)
            axios.defaults.headers['Authorization'] = 'Bearer ' + data.access_token
        }
    }
    next()
})
export default router
export {
    routerMapping
}
