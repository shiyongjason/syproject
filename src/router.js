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
    },
    {
        path: '/wisdom',
        meta: {
            title: '好智慧-经营分析',
            isMenu: true,
            icon: 'hosjoy_cloud_service'
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
                    icon: 'hosjoy_cloud_service',
                    component: './views/wisdom/platformTarget'
                },
                component: () => import('./views/wisdom/platformTarget')
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

function makeMenus (Route, Data) {
    return Route.filter((value1) => {
        let valueTemp = true
        Data.forEach((value2) => {
            // console.log(value2)
            if (value2.authUri === value1.path) {
                if (value1.children) {
                    value1.children = makeMenus(value1.children, value2.childAuthList)
                }
                value1.meta.have = value2.have
                valueTemp = value2.have
            }
        })
        if (valueTemp) {
            // delete value1.component
            return value1
        }
        return false
    })
}
function makeIndex (data, next) {
    console.log(data)
    let index = ''
    data.forEach(value => {
        console.log(value)
        index = value.path
        if (value.children) {
            if (value.children.length > 0) {
                index += ('/' + value.children[0].path)
            }
        }
    })
    next({
        path: index
    })
    console.log(index)
}
async function getMenu (next) {
    const { data } = await findMenuList()
    // console.log(data)
    // let authMenuTemp = routerMapping.filter((value1) => {
    //     let valueTemp = false
    //     data.forEach((value2) => {
    //         if (value2.authUri === value1.path) {
    //             if (value1.children) {
    //                 if(value1.children.length>0){
    //
    //                     console.log(value1.children,value1)
    //                     // value1.children = getMenu(value1.children, value2.childAuthList)
    //                 }
    //             }
    //             value1.meta.have = value2.have
    //             valueTemp = value2.have
    //         }
    //     })
    //     return valueTemp
    // })
    // console.log(authMenuTemp)
    const menu = makeMenus(routerMapping, data)
    makeIndex(menu, next)
    // console.log(menu)
    router.addRoutes(menu)
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
            console.log('-------')
            if (isFirst) {
                console.log(222)
                await getMenu(next)
                isFirst = false
                next({ ...to, replace: true })
            }
        }
    }
    next()
})

export default router
export {
    routerMapping
}
