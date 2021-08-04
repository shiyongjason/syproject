import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/comfortCloudMerchant',
        meta: {
            title: '经销商后台',
            isMenu: true,
            icon: 'shushiyun_merchant1'
        },
        component: Layout,
        children: [
            {
                path: 'businessData',
                meta: {
                    title: '经营数据看板',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'businessBI',
                        name: 'businessBI',
                        meta: {
                            title: '经营BI',
                            tagName: '经营BI',
                            parentName: '经营数据看板',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/businessData/businessBI.vue')
                    }
                ]
            },
            {
                path: 'merchantManage',
                meta: {
                    title: '经销商管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantSearch',
                        name: 'merchantSearch',
                        meta: {
                            title: '经销商查询',
                            tagName: '经销商查询',
                            parentName: '经销商管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantSearch.vue')
                    },
                    {
                        path: 'merchantAd',
                        name: 'merchantAd',
                        meta: {
                            title: '招商广告',
                            tagName: '招商广告',
                            parentName: '经销商管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantAd.vue')
                    },
                    {
                        path: 'merchantAdEdit',
                        name: 'merchantAdEdit',
                        meta: {
                            title: '招商广告编辑',
                            tagName: '招商广告编辑',
                            parentName: '经销商管理',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantAdEdit.vue')
                    },
                    {
                        path: 'merchantOrder',
                        name: 'merchantOrder',
                        meta: {
                            title: '代理订单',
                            tagName: '代理订单',
                            parentName: '经销商管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantOrder.vue')
                    },
                    {
                        path: 'merchantAgencyOrderEdit',
                        name: 'merchantAgencyOrderEdit',
                        meta: {
                            title: '代理订单',
                            tagName: '代理订单',
                            parentName: '经销商管理',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantAgencyOrderEdit.vue')
                    }
                ]
            },
            {
                path: 'merchantPrice',
                meta: {
                    title: '商品管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantPriceManage',
                        name: 'merchantPriceManage',
                        meta: {
                            title: '价格管理',
                            tagName: '价格管理',
                            parentName: '商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantPriceManage.vue')
                    },
                    {
                        path: 'merchantRecommendList',
                        name: 'merchantRecommendList',
                        meta: {
                            title: '推荐榜单',
                            tagName: '推荐榜单',
                            parentName: '商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantRecommendList.vue')
                    },
                    {
                        path: 'merchantClassify',
                        name: 'merchantClassify',
                        meta: {
                            title: '产品匹配',
                            tagName: '产品匹配',
                            parentName: '商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantClassify.vue')
                    }
                ]
            },
            {
                path: 'merchantOrderManage',
                meta: {
                    title: '订单管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantOrderList',
                        name: 'merchantOrderList',
                        meta: {
                            title: '订单列表',
                            tagName: '订单列表',
                            parentName: '订单管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantOrderList.vue')
                    }, {
                        path: 'merchantOutOrderList',
                        name: 'merchantOutOrderList',
                        meta: {
                            title: '外部订单列表',
                            tagName: '外部订单列表',
                            parentName: '订单管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantOutOrderList.vue')
                    },
                    {
                        path: 'merchantDispatchManager',
                        name: 'merchantDispatchManager',
                        meta: {
                            title: '营销物料',
                            tagName: '营销物料',
                            parentName: '订单管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantDispatchManager.vue')
                    }
                ]
            },
            {
                path: 'merchantVIP',
                meta: {
                    title: '会员管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantMemberManage',
                        name: 'merchantMemberManage',
                        meta: {
                            title: '会员列表',
                            tagName: '会员列表',
                            parentName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberManage.vue')
                    },
                    {
                        path: 'merchantDistributionManage',
                        name: 'merchantDistributionManage',
                        meta: {
                            title: '分销员管理',
                            tagName: '分销员管理',
                            parentName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantDistributionManage.vue')
                    },
                    {
                        path: 'merchantMemberInvitation',
                        name: 'merchantMemberInvitation',
                        meta: {
                            title: '会员信息',
                            tagName: '会员信息',
                            parentName: '会员管理',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberInvitation.vue')
                    },
                    {
                        path: 'merchantMemberReward',
                        name: 'merchantMemberReward',
                        meta: {
                            title: '奖励管理',
                            tagName: '奖励管理',
                            parentName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberReward.vue')
                    },
                    {
                        path: 'merchantExternalMember',
                        name: 'merchantExternalMember',
                        meta: {
                            title: '销售线索管理',
                            tagName: '销售线索管理',
                            parentName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantExternalMember.vue')
                    },
                    {
                        path: 'merchantExternalInvitation',
                        name: 'merchantExternalInvitation',
                        meta: {
                            title: '客户详情',
                            tagName: '客户详情',
                            parentName: '会员管理',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantExternalInvitation.vue')
                    },
                    {
                        path: 'merchantMemberTag',
                        name: 'merchantMemberTag',
                        meta: {
                            title: '会员标签',
                            tagName: '会员标签',
                            parentName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberTag.vue')
                    }
                ]
            },
            {
                path: 'merchantActive',
                meta: {
                    title: '活动管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantMemberActive',
                        name: 'merchantMemberActive',
                        meta: {
                            title: '活动审核',
                            tagName: '活动审核',
                            parentName: '活动管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberActive.vue')
                    },
                    {
                        path: 'merchantPurchase',
                        name: 'comfortcloudMemberPurchase',
                        meta: {
                            title: '限时抢购',
                            tagName: '限时抢购',
                            parentName: '活动管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantPurchase.vue')
                    }
                ]
            },
            {
                path: 'merchantEngine',
                meta: {
                    title: '工程方案',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantEnginePlan',
                        name: 'merchantEnginePlan',
                        meta: {
                            title: '工程方案',
                            tagName: '工程方案',
                            parentName: '工程方案',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantEnginePlan.vue')
                    },
                    {
                        path: 'merchantEnginePlanEdit',
                        name: 'merchantEnginePlanEdit',
                        meta: {
                            title: '工程方案编辑',
                            tagName: '工程方案编辑',
                            parentName: '工程方案',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantEnginePlanEdit.vue')
                    }
                ]
            },
            {
                path: 'merchantCase',
                meta: {
                    title: '用户方案',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'merchantMemberCase',
                        name: 'merchantMemberCase',
                        meta: {
                            title: '方案列表',
                            tagName: '方案列表',
                            parentName: '用户方案',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantMemberCase.vue')
                    }
                ]
            },
            {
                path: 'merchantMemange',
                meta: {
                    title: '服务管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'serviceOpportunity',
                        name: 'serviceOpportunity',
                        meta: {
                            title: '服务机会',
                            tagName: '服务机会',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/serviceManage/serviceOpportunity.vue')
                    }
                ]
            }
        ]
    }
]
