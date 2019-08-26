import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Default.vue'
import { findMenuList } from '@/views/layout/api'

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
            }
        ]
    },
    {
        path: '/bestonline',
        meta: {
            title: '尽调管理',
            isMenu: true,
            icon: 'hosjoy_operation'
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
                    title: '一项否决',
                    tagName: '一项否决',
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
        }
    ]
})
// // 这边是动态添加路由  未来还可以和渲染菜单一起优化
function makeMenus (Route, Data) {
    return Route.filter(value => {
        if (value.path === '') {
            return true
        }
        const authArr = Data.filter(item => item.authUri === value.path && item.have)
        // const authArr = Data.filter(item => item.authUri === value.path)
        if (value.children && authArr.length > 0) {
            value.children = makeMenus(value.children, authArr[0].childAuthList)
        }
        return authArr.length > 0
    })
}

async function getMenu (to, next) {
    const { data } = await findMenuList()
    const menu = makeMenus(routerMapping, data)
    router.addRoutes(menu)
    next({ ...to, replace: true })
}

let isFirst = true
router.beforeEach(async (to, from, next) => {
    const isLogin = to.name === 'login'
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 非/login下需要验证
    if (!isLogin) {
        // 非登录的情况下
        if (!userInfo) {
            return next({
                name: 'login'
            })
        } else {
            if (isFirst) {
                isFirst = false
                await getMenu(to, next)
            }
        }
    }
    next()
})

export default router
export {
    routerMapping
}
