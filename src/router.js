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
            icon: 'icon-hosjoy_home',
            isMenu: true,
            role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]

        },
        children: [
            {
                path: '',
                meta: {
                    isMenu: false,
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
                },
                component: () => import('./views/index/index')
            }
        ]
    },
    {
        path: '/editPassword',
        component: Layout,
        name: 'editPassword',
        meta: {
            title: '金云平台',
            icon: 'icon-hosjoy_set',
            isMenu: true,
            role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
        },
        children: [
            {
                path: '',
                meta: {
                    isMenu: false,
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
                },
                component: () => import('./views/index/index')
            }
        ]
    },
    {
        path: '/editPassword',
        component: Layout,
        name: 'editPassword',
        meta: {
            title: '修改密码',
            icon: 'icon-hosjoy_set',
            isMenu: true,
            role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
        },
        children: [
            {
                path: '',
                meta: {
                    isMenu: false,
                    role: [ROLE_ADMIN, ROLE_TRADER, ROLE_SALESMAN, ROLE_WAREHOUSE, ROLE_FINANCE]
                },
                component: () => import('./views/index/index')
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
    // const isLogin = to.name === 'login'
    // const is403 = to.name === '403'
    // let userInfo = sessionStorage.getItem('userInfo')
    // userInfo = userInfo && JSON.parse(userInfo)
    // // 非登录的情况下
    // if (!isLogin) {
    //     if (!userInfo) {
    //         return next({
    //             name: 'login'
    //         })
    //     } else if (!is403) {
    //         const menuRoles = to.meta.role
    //         const userRoles = userInfo.authorities
    //         const resultRole = userRoles.filter(item => menuRoles && menuRoles.includes(item))
    //         if (resultRole.length <= 0) {
    //             return next('/403')
    //         }
    //     }
    // } else {
    //     if (userInfo) {
    //         return next('index')
    //     }
    // }
    next()
})

export default router
export {
    routerMapping
}