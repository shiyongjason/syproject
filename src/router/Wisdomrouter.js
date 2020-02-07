import Layout from '@/views/layout/Default.vue'

export default {
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
            path: 'manageoverview',
            name: 'manageoverview',
            meta: {
                title: '经营概览',
                tagName: '经营概览',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/manageoverview'
            },
            component: () => import('@/views/wisdom/manageoverview')
        },
        {
            path: 'branchTarget',
            name: 'branchTarget',
            meta: {
                title: '分部目标管理',
                tagName: '分部目标管理',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/branchTarget'
            },
            component: () => import('@/views/wisdom/branchTarget')
        },
        {
            path: 'platformTarget',
            name: 'platformTarget',
            meta: {
                title: '平台目标管理',
                tagName: '平台目标管理',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/platformTarget'
            },
            component: () => import('@/views/wisdom/platformTarget')
        },

        {
            path: 'platcompanyinfo',
            name: 'platcompanyinfo',
            meta: {
                title: '平台公司基本信息',
                tagName: '平台公司基本信息',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/platcompanyinfo'
            },
            component: () => import('@/views/wisdom/platcompanyinfo')
        },

        {
            path: 'platformSale',
            name: 'platformSale',
            meta: {
                title: '平台销售分析',
                tagName: '平台销售分析',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/platformSale'
            },
            component: () => import('@/views/wisdom/platformSale')
        },
        {
            path: 'branchSale',
            name: 'branchSale',
            meta: {
                title: '分部销售分析',
                tagName: '分部销售分析',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/branchSale'
            },
            component: () => import('@/views/wisdom/branchSale')
        },
        {
            path: 'categorySale',
            name: 'categorySale',
            meta: {
                title: '品类销售分析',
                tagName: '品类销售分析',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/categorySale'
            },
            component: () => import('@/views/wisdom/categorySale')
        },
        {
            path: 'profitStatistics',
            name: 'profitStatistics',
            meta: {
                title: '利润统计',
                tagName: '利润统计',
                isMenu: true,
                icon: '',
                component: '@/views/wisdom/profitStatistics'
            },
            component: () => import('@/views/wisdom/profitStatistics')
        }
    ]
}