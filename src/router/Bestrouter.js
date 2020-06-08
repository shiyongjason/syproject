import Layout from '@/views/layout/Default.vue'

export default {
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
                component: '@/views/bestonline/apply/index'
            },
            component: () => import('@/views/bestonline/apply/index')
        },
        {
            path: 'review',
            name: 'review',
            meta: {
                title: '现场尽调',
                tagName: '现场尽调',
                isMenu: true,
                icon: '',
                component: '@/views/bestonline/review'
            },
            component: () => import('@/views/bestonline/review')
        },
        {
            path: 'reviewform',
            name: 'reviewform',
            meta: {
                title: '修改',
                isMenu: false,
                icon: '',
                component: '@/views/bestonline/reviewform',
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
            component: () => import('@/views/bestonline/reviewform')
        },
        {
            path: 'piecevote',
            name: 'piecevote',
            meta: {
                title: '一项否决配置',
                tagName: '一项否决配置',
                isMenu: true,
                icon: '',
                component: '@/views/bestonline/piecevote'
            },
            component: () => import('@/views/bestonline/piecevote')
        },
        {
            path: 'pointscode',
            name: 'pointscode',
            meta: {
                title: '评分规则配置',
                tagName: '评分规则配置',
                isMenu: true,
                icon: '',
                component: '@/views/bestonline/pointscode'
            },
            component: () => import('@/views/bestonline/pointscode')
        },
        {
            path: 'standard',
            name: 'standard',
            meta: {
                title: '标准分数配置',
                tagName: '标准分数配置',
                isMenu: true,
                icon: '',
                component: '@/views/bestonline/standard'
            },
            component: () => import('@/views/bestonline/standard')
        },
        {
            path: 'applyform',
            name: 'applyform',
            meta: {
                title: '尽调申请详情',
                tagName: '尽调申请详情',
                isMenu: false,
                icon: '',
                component: '@/views/bestonline/apply/applyForm'
            },
            component: () => import('@/views/bestonline/apply/applyForm')
        }
    ]
}
