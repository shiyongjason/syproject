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
import Bestrouter from './router/Bestrouter'
import Wisdomrouter from './router/Wisdomrouter'
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
    Wisdomrouter,
    Bestrouter,
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
