import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout/Default.vue'
import { ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE } from '@/common/const'

Vue.use(Router)

const routerMapping = [
    {
        path: '/',
        component: Layout,
        name: 'index',
        meta: {
            title: '首页',
            icon: 'hosjoy_cloud_service',
            isMenu: true,
            role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
        },
        children: [
            {
                path: '',
                meta: {
                    isMenu: false,
                    tagName: '首页',
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
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
            icon: 'hosjoy_cloud_service',
            isMenu: true
        },
        component: Layout,
        children: [
            {
                path: '',
                meta: {
                    tagName: '金云平台',
                    isMenu: false,
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
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
        children: [
            {
                path: '',
                meta: {
                    isMenu: false,
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
                },
                component: () => import('./views/jinyunplatform/index')
            }

        ]
    },
    {
        path: '/member',
        name: 'member',
        component: Layout,
        meta: {
            title: '会员管理',
            redirect: 'noredirect',
            icon: 'hosjoy_cloud_service',
            isMenu: true,
            role: [ROLE_ADMIN, ROLE_TRADER, ROLE_FINANCE]
        },
        children: [
            {
                path: 'memberInfo',
                name: 'memberInfo',
                meta: {
                    title: '会员信息',
                    tagName: '会员信息',
                    isMenu: true,
                    role: [ROLE_ADMIN, ROLE_TRADER]
                },
                component: () => import('./views/jinyunplatform/index')
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
