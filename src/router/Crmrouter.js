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
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/goodwork/projectlist')
            },
            {
                path: 'projectList2_0',
                name: 'projectList2_0',
                meta: {
                    title: '2.0项目列表',
                    tagName: '2.0项目列表',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/projectList2_0/list.vue')
            },
            {
                path: 'authenlist',
                name: 'authenlist',
                meta: {
                    title: '企业管理',
                    tagName: '企业管理',
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/awardManage'

                },
                component: () => import('@/views/crm/awardManage/awardManage.vue')
            },

            {
                path: 'purchaseOrder',
                name: 'purchaseOrder',
                meta: {
                    title: '采购单管理',
                    tagName: '采购单管理',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/purchaseOrder'

                },
                component: () => import('@/views/crm/purchaseOrder/purchaseOrder.vue')
            },
            {
                path: 'paymentOrder',
                name: 'paymentOrder',
                meta: {
                    title: '支付单管理',
                    tagName: '支付单管理',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/paymentOrder'

                },
                component: () => import('@/views/crm/paymentOrder/paymentOrder.vue')
            },
            {
                path: 'funds',
                name: 'funds',
                meta: {
                    title: '账单管理',
                    tagName: '账单管理',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: '',
                    showMenuAs: '/goodwork/funds'

                },
                component: () => import('@/views/crm/funds/funds.vue')
            },
            {
                path: 'batchpay',
                name: 'batchpay',
                meta: {
                    title: '批量支付',
                    tagName: '批量支付',
                    parentName: '好橙工',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/funds'

                },
                component: () => import('@/views/crm/funds/batchPay.vue')
            },
            {
                path: 'batchpsubmit',
                name: 'batchpsubmit',
                meta: {
                    title: '批量支付确认',
                    tagName: '批量支付确认',
                    parentName: '好橙工',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/funds'

                },
                component: () => import('@/views/crm/funds/batchSubmit.vue')
            },
            {
                path: 'contractlist',
                name: 'contractlist',
                meta: {
                    title: '合同模板管理',
                    tagName: '合同模板管理',
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
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
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/caCertiManage/index.vue')
            },
            // {
            //     path: 'bi',
            //     name: 'bi',
            //     meta: {
            //         title: '好橙工BI',
            //         tagName: '好橙工BI',
            //         parentName: '好橙工',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/crm/bi/index.vue')
            // },
            {
                path: 'fullcalendar',
                name: 'fullcalendar',
                meta: {
                    title: '节假日管理',
                    tagName: '节假日管理',
                    parentName: '好橙工',
                    isMenu: false,
                    icon: '',
                    showMenuAs: '/goodwork/holidaylist'
                },
                component: () => import('@/views/crm/holiday/index.vue')
            },
            {
                path: 'holidaylist',
                name: 'holidaylist',
                meta: {
                    title: '节假日管理',
                    tagName: '节假日管理',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/holiday/daylist.vue')
            },
            {
                path: 'noTempApprove',
                name: 'noTempApprove',
                meta: {
                    title: '分财(风控/法务)审核',
                    tagName: '分财(风控/法务)审核',
                    parentName: '好橙工',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/crm/contractSigningManagement/noTempApprove.vue')
            },
            {
                path: 'exportExcelFile',
                name: 'exportExcelFile',
                meta: {
                    title: 'excel导入',
                    tagName: 'excel导入',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/exportExcelFile/index.vue')
            },
            {
                path: 'upstreamPaymentManagement',
                name: 'upstreamPaymentManagement',
                meta: {
                    title: '上游支付管理',
                    tagName: '上游支付管理',
                    parentName: '好橙工',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/crm/upstreamPaymentManagement/index.vue')
            },
            {
                path: 'tianyan',
                name: 'tianyan',
                meta: {
                    title: '天眼查',
                    tagName: '天眼查',
                    parentName: '好橙工',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/crm/crmauthen/tianyan.vue')
            }
        ]
    }

]
