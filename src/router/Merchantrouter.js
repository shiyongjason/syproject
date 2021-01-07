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
                            title: '订单查询',
                            tagName: '订单查询',
                            parentName: '经销商管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/merchant/merchantOrder.vue')
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
                    }, {
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
                    }
                ]
            }
        ]
    }
]
