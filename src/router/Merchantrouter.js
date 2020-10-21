import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/comfortCloud',
        meta: {
            title: '经销商后台',
            isMenu: true,
            icon: 'hosjoy_shushiyun'
        },
        component: Layout,
        children: [
            {
                path: 'merchant',
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
                path: 'merchant',
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
                    }
                ]
            }
        ]
    }
]
