import Layout from '@/views/layout/Default.vue'
// 非菜单，权限控制二级菜单下的tab权限
import { tabAuth } from './const'

export default [
    {
        path: '/fundsData',
        meta: {
            title: '好智慧-资金数据',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'standingBook',
                name: 'standingBook',
                meta: {
                    title: '资金借款台账',
                    tagName: '资金借款台账',
                    parentName: '好智慧-资金数据',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/wisdom/fundsData/Ledger.vue')
            },
            {
                path: 'newFlowdialog',
                name: 'newFlowdialog',
                meta: {
                    title: '新增台账',
                    tagName: '新增台账',
                    parentName: '好智慧-资金数据',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/wisdom/fundsData/components/newFlowdialog.vue')
            },
            ...tabAuth
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
            },
            {
                path: 'commitValue',
                name: 'commitValue',
                meta: {
                    title: '承诺值管理',
                    tagName: '承诺值管理',
                    isMenu: true,
                    icon: '',
                    component: '@/views/wisdom/commitValue'
                },
                component: () => import('@/views/wisdom/commitValue')
            }
        ]
    },
    {
        path: '/fundsPlan',
        meta: {
            title: '销售及资金用款计划',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'fundPlan',
                name: 'fundPlan',
                meta: {
                    title: '计划申报',
                    tagName: '计划申报',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/jinyunplatform/fundPlan/planToDeclare')
            }
        ]
    },
    {
        path: '/developonline',
        meta: {
            title: '机构在线',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'developlist',
                name: 'developlist',
                meta: {
                    title: '发展在线',
                    tagName: '发展在线',
                    isMenu: true,
                    icon: '',
                    component: '@/views/wisdom/developOline/developList'
                },
                component: () => import('@/views/wisdom/developOline/developList')
            },
            {
                path: 'addplatform',
                name: 'addplatform',
                meta: {
                    title: '添加/编辑平台公司',
                    tagName: '添加/编辑平台公司',
                    isMenu: false,
                    icon: '',
                    component: '@/views/wisdom/developOline/addPlatform'
                },
                component: () => import('@/views/wisdom/developOline/addPlatform')
            }
        ]
    },
    {
        path: '/fundsPlan',
        meta: {
            title: '销售及资金用款计划',
            isMenu: true,
            icon: 'hosjoy_operation'
        },
        component: Layout,
        children: [
            {
                path: 'planToDeclare',
                name: 'planToDeclare',
                meta: {
                    title: '资金计划',
                    tagName: '资金计划',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/jinyunplatform/fundPlan/index')
            },
            {
                path: 'planTotal',
                name: 'planTotal',
                meta: {
                    title: '计划汇总分析表',
                    tagName: '计划汇总分析表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/jinyunplatform/fundPlan/planTotal')
            }
        ]
    }
]
