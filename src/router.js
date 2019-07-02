import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Default.vue'
import { ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE } from '@/common/const'

Vue.use(Router)

const routerMapping = [

    {
        path: '/',
        name: 'index',
        meta: {
            title: '首页',
            isMenu: true,
            icon: 'hosjoy_home'
        },
        component: Layout,
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                    title: '首页',
                    isMenu: false,
                    icon: 'hosjoy_home'
                },
                component: () => import('./views/index/index')
            }
        ]
    },
    {
        path: '/jinyunPlatform',
        name: 'jinyunPlatform',
        meta: {
            title: '金云平台',
            isMenu: true,
            icon: 'hosjoy_cloud_service'
        },
        component: Layout,
        children: [
            {
                path: '',
                name: 'home',
                meta: {
                    title: '金云平台',
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
            icon: 'hosjoy_cloud_service'
        },
        component: () => import('./views/jinyunplatform/index')
    },
    {
        path: '/auth',
        name: 'auth',
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
                    isMenu: true,
                    icon: 'hosjoy_cloud_service'
                },
                component: () => import('./views/auth/organization')
            },
            {
                path: '',
                name: 'jinyunPlatform',
                meta: {
                    title: '角色模版设置',
                    isMenu: true,
                    icon: 'hosjoy_cloud_service'
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
            meta: {
                isMenu: false,
                role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
            },
            component: () => import('./views/error/403'),
            hidden: true
        },
        ...routerMapping
    ]
})

router.beforeEach((to, from, next) => {
    const isLogin = to.name === 'login'
    // const is403 = to.name === '403'  暂时没有
    let userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    // 非登录的情况下
    if (!isLogin) {
        if (!userInfo) {
            return next({
                name: 'login'
            })
        }
    }
    next()
})

export default router
export {
    routerMapping
}
