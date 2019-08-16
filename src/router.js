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
        path: '/hmall',
        meta: {
            title: 'B2b管理',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '平台目标管理',
                    tagName: '平台目标管理',
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
            {
                path: 'shopManager',
                name: 'shopManager',
                meta: {
                    title: '商品库列表',
                    tagName: '商品库列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopManager/shopManager.vue')
            },
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
                    title: '平台公司功能管理',
                    tagName: '平台公司功能管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/platform/platform.vue')
            },
            {
                path: 'shopReviewList',
                name: 'shopReviewList',
                meta: {
                    title: '商品审核',
                    tagName: '商品审核',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopReview/shopReviewList.vue')
            },
            {
                path: 'attribute',
                name: 'attribute',
                meta: {
                    title: '属性管理',
                    tagName: '属性管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/attribute/attribute.vue')
            },
            {
                path: 'order',
                name: 'order',
                meta: {
                    title: '订单／收款纪录查询',
                    tagName: '订单／收款纪录查询',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/order/order.vue')
            },
            {
                path: 'coupon',
                name: 'coupon',
                meta: {
                    title: '优惠券',
                    tagName: '优惠券',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/coupon/coupon.vue')
            },
            {
                path: 'member',
                name: 'member',
                meta: {
                    title: '会员店审核',
                    tagName: '会员店审核',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/memberStore/member.vue')
            },
            {
                path: 'activity',
                name: 'activity',
                meta: {
                    title: '活动审核',
                    tagName: '活动审核',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/activity/index.vue')
            },
            {
                path: 'publicShop',
                name: 'publicShop',
                meta: {
                    title: '共享商品管理',
                    tagName: '共享商品管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopManager/publicShop.vue')
            },
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
                path: 'merchantReview',
                name: 'merchantReview',
                meta: {
                    title: '商户审核列表',
                    tagName: '商户审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('./views/hmall/shopReview/merchantReview.vue')
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
