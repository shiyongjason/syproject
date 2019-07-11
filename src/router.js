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
                path: 'jinyunplatform',
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
// 这边是动态添加路由  未来还可以和渲染菜单一起优化
function makeMenus (Route, Data) {
    return Route.filter((value1) => {
        let valueTemp = true
        Data.forEach((value2) => {
            if (value2.authUri === value1.path) {
                if (value1.children) {
                    value1.children = makeMenus(value1.children, value2.childAuthList)
                }
                value1.meta.have = value2.have
                valueTemp = value2.have
            }
        })
        if (valueTemp) {
            return true
        }
        return false
    })
}
function makeIndex (data, next) {
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
        console.log(index)
        next({
            path: index.join('/')
        })
    }
}

// 导航route抖动 ？？？
async function getMenu (next) {
    const { data } = await findMenuList()
    const menu = makeMenus(routerMapping, data)
    router.addRoutes(menu)
    makeIndex(menu, next)
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
                await getMenu(next)
            }
        }
    }
    next()
})

export default router
export {
    routerMapping
}
