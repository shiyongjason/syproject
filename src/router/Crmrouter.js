import Layout from '@/views/layout/Default.vue'

export default [
    {
        path: '/goodwork',
        meta: {
            title: '好橙工',
            isMenu: true,
            icon: 'hosjoy_hcg'
        },
        component: Layout,
        children: [
            {
                path: 'projectlist',
                name: 'projectlist',
                meta: {
                    title: '好橙工项目',
                    tagName: '好橙工项目',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/goodwork/projectlist')
            },
            {
                path: 'authenlist',
                name: 'authenlist',
                meta: {
                    title: '企业管理',
                    tagName: '企业管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/crmauthen/authenlist')
            },
            {
                path: 'staticlist',
                name: 'staticlist',
                meta: {
                    title: '好橙工台账',
                    tagName: '好橙工台账',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/crmstatic/staticlist')
            },
            {
                path: 'applicationList',
                name: 'applicationList',
                meta: {
                    title: '好橙工VIP申请列表',
                    tagName: '好橙工VIP申请列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/vipapplication/applicationList')
            },
            {
                path: 'vipmanlist',
                name: 'vipmanlist',
                meta: {
                    title: '好橙工VIP管理列表',
                    tagName: '好橙工VIP管理列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/vipmanage/vipmanlist')
            },
            {
                path: 'creditmanlist',
                name: 'creditmanlist',
                meta: {
                    title: '好橙工信用管理列表',
                    tagName: '好橙工信用管理列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/creditmanage/creditmanlist')
            }
        ]
    }
]
