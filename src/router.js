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
                    icon: 'hosjoy_home',
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
            icon: 'hosjoy_cloud_service',
            component: './views/jinyunplatform/index'
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
                    icon: 'hosjoy_home'
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
            icon: 'hosjoy_cloud_service',
            component: './views/jinyunplatform/index'
        }
    },
    {
        path: '/auth',
        meta: {
            title: '权限管理',
            isMenu: true,
            icon: 'hosjoy_cloud_service'
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
                    icon: 'hosjoy_cloud_service',
                    component: './views/auth/organization'
                },
                component: () => import('./views/auth/organization')
            },
            {
                path: 'role',
                name: 'jinyunPlatform',
                meta: {
                    title: '角色模版设置',
                    tagName: '角色模版设置',
                    isMenu: true,
                    icon: 'hosjoy_cloud_service',
                    component: './views/auth/role'
                },
                component: () => import('./views/auth/role')
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

async function getMenu () {
    const { data } = await findMenuList()
    let authMenuTemp = routerMapping.filter((value1) => {
        let valueTemp = false
        data.forEach((value2) => {
            if (value2.authUri === value1.path) {
                value1.meta.id = value2.id
                value1.meta.auth = true
                valueTemp = value1
            }
        })
        return valueTemp
    })
    router.addRoutes(authMenuTemp)
}

let isFirst = true
router.beforeEach(async (to, from, next) => {
    const isLogin = to.name === 'login'
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 非登录的情况下
    if (!isLogin) {
        if (!userInfo) {
            return next({
                name: 'login'
            })
        }
    }
    // 不加这个判断，路由会陷入死循环
    if (isFirst) {
        await getMenu()
        isFirst = false
        next({ ...to, replace: true })
    }
    next()
})

export default router
export {
    routerMapping
}
