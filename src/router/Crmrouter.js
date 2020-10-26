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
            },
            {
                path: 'creditDetail',
                name: 'creditDetail',
                meta: {
                    title: '授信材料上传',
                    tagName: '授信材料上传',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/crm/creditmanage/creditDetail')
            },
            {
                path: 'creditApprove',
                name: 'creditApprove',
                meta: {
                    title: '授信材料',
                    tagName: '授信材料',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/crm/creditmanage/creditApprove')
            },
            {
                path: 'datatemp',
                name: 'datatemp',
                meta: {
                    title: '材料清单配置',
                    tagName: '材料清单配置',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/riskManage/dataTemplate.vue')
            },
            {
                path: 'tempdetail',
                name: 'tempdetail',
                meta: {
                    title: '材料清单配置详情',
                    tagName: '材料清单配置详情',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/datatemp'
                },
                component: () => import('@/views/crm/riskManage/templateDetail.vue')
            },
            // {
            //     path: 'projectInformationList',
            //     name: 'projectInformationList',
            //     meta: {
            //         title: '好橙工项目资料',
            //         tagName: '好橙工项目资料',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/crm/projectInformation/list.vue')
            // },
            {
                path: 'informationDetail',
                name: 'informationDetail',
                meta: {
                    title: '好橙工项目资料详情',
                    tagName: '好橙工项目资料详情',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/projectlist'

                },
                component: () => import('@/views/crm/projectInformation/detail.vue')
            },
            {
                path: 'approvalDetails',
                name: 'approvalDetails',
                meta: {
                    title: '好橙工项目资料详情',
                    tagName: '好橙工项目资料详情',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/projectInformationList'

                },
                component: () => import('@/views/crm/projectInformation/approvalDetails.vue')
            },
            {
                path: 'wechatList',
                name: 'wechatList',
                meta: {
                    title: '企业微信客户管理',
                    tagName: '企业微信客户管理',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/wechatList'
                },
                component: () => import('@/views/crm/wechatcustomer/list.vue')
            },
            {
                path: 'recommender',
                name: 'recommender',
                meta: {
                    title: '推荐官管理',
                    tagName: '推荐官管理',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/recommender'

                },
                component: () => import('@/views/crm/recommender/recommender.vue')
            },
            {
                path: 'awardManage',
                name: 'awardManage',
                meta: {
                    title: '奖励管理',
                    tagName: '奖励管理',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/awardManage'

                },
                component: () => import('@/views/crm/awardManage/awardManage.vue')
            }
        ]
    }

]
