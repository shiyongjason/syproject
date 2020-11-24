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
            },
            {
                path: 'contractlist',
                name: 'contractlist',
                meta: {
                    title: '合同模板管理',
                    tagName: '合同模板管理',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/contractlist'

                },
                component: () => import('@/views/crm/contractTemp/contractlist.vue')
            },
            {
                path: 'contractTemp',
                name: 'contractTemp',
                meta: {
                    title: '合同编辑',
                    tagName: '合同编辑',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/contractTemp'

                },
                component: () => import('@/views/crm/contractTemp/contractTemp.vue')
            }, {
                path: 'contractDetail',
                name: 'contractDetail',
                meta: {
                    title: '合同详情',
                    tagName: '合同详情',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/contractDetail'

                },
                component: () => import('@/views/crm/contractTemp/contractDetail.vue')
            },
            {
                path: 'contractSigningManagement',
                name: 'contractSigningManagement',
                meta: {
                    title: '合同签署管理',
                    tagName: '合同签署管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/contractSigningManagement/contractSigningManagement.vue')
            },
            {
                path: 'contractSigningManagementDetail',
                name: 'contractSigningManagementDetail',
                meta: {
                    title: '合同签署管理详情',
                    tagName: '合同详情',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/contractSigningManagement'
                },
                component: () => import('@/views/crm/contractSigningManagementDetail/contractSigningManagementDetail.vue')
            },
            {
                path: 'approveContract',
                name: 'approveContract',
                meta: {
                    title: '审核合同',
                    tagName: '审核合同',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/contractSigningManagement'
                },
                component: () => import('@/views/crm/approveContract/approveContract.vue')
            },
            {
                path: 'caCertiManage',
                name: 'caCertiManage',
                meta: {
                    title: 'CA认证管理',
                    tagName: 'CA认证管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/caCertiManage/index.vue')
            }
        ]
    }

]
