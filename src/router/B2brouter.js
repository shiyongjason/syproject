import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/b2b',
        meta: {
            title: 'B2b管理',
            isMenu: true,
            icon: 'hosjoy_store'
        },
        component: Layout,
        children: [
            {
                path: 'commodity',
                name: 'commodity',
                meta: {
                    title: '商品管理',
                    tagName: '商品管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'category',
                        name: 'category',
                        meta: {
                            title: '类目管理',
                            tagName: '类目管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/category/category.vue')
                    },
                    {
                        path: 'brand',
                        name: 'brand',
                        meta: {
                            title: '品牌管理',
                            tagName: '品牌管理',
                            isMenu: true,
                            icon: '',
                            component: '@/views/hmall/brand/brand'
                        },
                        component: () => import('@/views/hmall/brand/brand.vue')
                    },
                    {
                        path: 'attribute',
                        name: 'attribute',
                        meta: {
                            title: '参数属性管理',
                            tagName: '参数属性管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/attribute/attribute.vue')
                    },
                    {
                        path: 'skuset',
                        name: 'skuset',
                        meta: {
                            title: '商品SKU属性管理',
                            tagName: '商品SKU属性管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/spumanage/skuset')
                    },
                    {
                        path: 'spuauditlist',
                        name: 'spuauditlist',
                        meta: {
                            title: '商品SPU审核',
                            tagName: '商品SPU审核',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/spumanage/spuauditlist')
                    },
                    {
                        path: 'spumange',
                        name: 'spumange',
                        meta: {
                            title: '商品SPU库',
                            tagName: '商品SPU库',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/spumanage/index')
                    },
                    {
                        path: 'marketStore',
                        name: 'marketStore',
                        meta: {
                            title: '商家商品库',
                            tagName: '商家商品库',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/spumanage/marketStore.vue')
                    }
                ]
            },
            {
                path: 'marketing',
                name: 'marketing',
                meta: {
                    title: '营销管理',
                    tagName: '营销管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'coupon',
                        name: 'coupon',
                        meta: {
                            title: '优惠券审核',
                            tagName: '优惠券审核',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/coupon/coupon.vue')
                    },
                    {
                        path: 'activeReview',
                        name: 'activeReview',
                        meta: {
                            title: '活动审核',
                            tagName: '活动审核',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/shopReview/activeReview.vue')
                    },
                    {
                        path: 'memberPull',
                        name: 'memberPull',
                        meta: {
                            title: '会员裂变管理',
                            tagName: '会员裂变管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/memberStore/memberPull.vue')
                    },
                    {
                        path: 'eventMange',
                        name: 'eventMange',
                        meta: {
                            title: '特价活动管理',
                            tagName: '特价活动管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/event/eventManage')
                    }
                ]
            },
            {
                path: 'finance',
                name: 'finance',
                meta: {
                    title: '订单&财务管理',
                    tagName: '订单&财务管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'order',
                        name: 'financeOrder',
                        meta: {
                            title: '订单管理',
                            tagName: '财务订单管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/order.vue')
                    },
                    {
                        path: 'product',
                        name: 'financeProduct',
                        meta: {
                            title: '商品管理',
                            tagName: '财务商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/product.vue')
                    },
                    {
                        path: 'marketing',
                        name: 'financeMarketing',
                        meta: {
                            title: '营销管理',
                            tagName: '财务营销管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/marketing.vue')
                    },
                    {
                        path: 'charge',
                        name: 'financeCharge',
                        meta: {
                            title: '服务费管理',
                            tagName: '财务服务费管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/serviceCharge.vue')
                    },
                    {
                        path: 'withdrawal',
                        name: 'financeWithdrawal',
                        meta: {
                            title: '提现',
                            tagName: '提现',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/withdrawal.vue')
                    },
                    {
                        path: 'order',
                        name: 'order',
                        meta: {
                            title: '订单／收款记录查询',
                            tagName: '订单／收款记录查询',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/order/order.vue')
                    }
                ]
            },
            {
                path: 'payment',
                name: 'payment',
                meta: {
                    title: '支付管理',
                    tagName: '支付管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: []
            },
            {
                path: 'account',
                name: 'account',
                meta: {
                    title: '账号管理',
                    tagName: '账号管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'accountManage',
                        name: 'accountManage',
                        meta: {
                            title: '账号管理',
                            tagName: '账号管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/membership/accountManage')
                    },
                    {
                        path: 'memberManage',
                        name: 'memberManage',
                        meta: {
                            title: '会员管理',
                            tagName: '会员管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/membership/memberManage')
                    },
                    {
                        path: 'bussinessManage',
                        name: 'bussinessManage',
                        meta: {
                            title: '商家管理',
                            tagName: '商家管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/membership/bussinessManage')
                    }
                ]
            }
        ]
    },
    {
        path: '/hmall',
        meta: {
            title: 'B2b管理',
            isMenu: true,
            icon: 'hosjoy_store'
        },
        component: Layout,
        children: [
            {
                path: 'category',
                name: 'category',
                meta: {
                    title: '类目管理',
                    tagName: '类目管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/category/category.vue')
            },
            // {
            //     path: 'category_old',
            //     name: 'category_old',
            //     meta: {
            //         title: '类目管理老',
            //         tagName: '类目管理老',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/category/category_old.vue')
            // },
            {
                path: 'brand',
                name: 'brand',
                meta: {
                    title: '品牌管理',
                    tagName: '品牌管理',
                    isMenu: true,
                    icon: '',
                    component: '@/views/hmall/brand/brand'
                },
                component: () => import('@/views/hmall/brand/brand.vue')
            },
            {
                path: 'selectCategory',
                name: 'selectCategory',
                meta: {
                    title: '商品库管理',
                    tagName: '商品库管理',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/hmall/shopManager/selectCategory.vue')
            },
            // {
            //     path: 'attribute',
            //     name: 'attribute',
            //     meta: {
            //         title: '参数属性管理',
            //         tagName: '参数属性管理',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/attribute/attribute.vue')
            // },
            // {
            //     path: 'order',
            //     name: 'order',
            //     meta: {
            //         title: '订单／收款记录查询',
            //         tagName: '订单／收款记录查询',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/order/order.vue')
            // },
            {
                path: 'coupon',
                name: 'coupon',
                meta: {
                    title: '优惠券审核列表',
                    tagName: '优惠券审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/coupon/coupon.vue')
            },
            {
                path: 'memberPull',
                name: 'memberPull',
                meta: {
                    title: '会员拉新管理',
                    tagName: '会员拉新管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/memberStore/memberPull.vue')
            },
            {
                path: 'activeReview',
                name: 'activeReview',
                meta: {
                    title: '活动审核列表',
                    tagName: '活动审核列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/shopReview/activeReview.vue')
            },
            {
                path: 'wallet',
                name: 'wallet',
                meta: {
                    title: '钱包支付开通情况',
                    tagName: '钱包支付开通情况',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/walletPay/walletPay.vue')
            },
            // {
            //     path: 'merchantReview',
            //     name: 'merchantReview',
            //     meta: {
            //         title: '商户审核列表',
            //         tagName: '商户审核列表',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/shopReview/merchantReview.vue')
            // },
            {
                path: 'brandAudit',
                name: 'brandAudit',
                meta: {
                    title: '品牌授权审核',
                    tagName: '品牌授权审核',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/brand/brandAudit.vue')
            },
            {
                path: 'brandManagement',
                name: 'brandManagement',
                meta: {
                    title: '品牌授权管理',
                    tagName: '品牌授权管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/brand/brandManagement.vue')
            },
            {
                path: 'marketStore',
                name: 'marketStore',
                meta: {
                    title: '商品管理',
                    tagName: '商品管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/marketStore.vue')
            },
            {
                path: 'spumange',
                name: 'spumange',
                meta: {
                    title: 'SPU模板列表',
                    tagName: 'SPU模板列表',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/index')
            },
            {
                path: 'spudetail',
                name: 'spudetail',
                meta: {
                    title: 'SPU管理',
                    tagName: 'SPU管理',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/spudetail')
            },
            {
                path: 'spuauditlist',
                name: 'spuauditlist',
                meta: {
                    title: '商品审核',
                    tagName: '商品审核',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/spumanage/spuauditlist')
            },
            // {
            //     path: 'skuset',
            //     name: 'skuset',
            //     meta: {
            //         title: 'SKU属性管理',
            //         tagName: 'SKU属性管理',
            //         isMenu: true,
            //         icon: ''
            //     },
            //     component: () => import('@/views/hmall/spumanage/skuset')
            // },
            {
                path: 'eventMange',
                name: 'eventMange',
                meta: {
                    title: '活动管理',
                    tagName: '活动管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/event/eventManage')
            },
            {
                path: 'eventStatistics',
                name: 'eventStatistics',
                meta: {
                    title: '数据监测',
                    tagName: '数据监测',
                    isMenu: false
                },
                component: () => import('@/views/hmall/event/eventStatistics')
            },
            {
                path: 'addProducts',
                name: 'addProducts',
                meta: {
                    title: '添加商品',
                    tagName: '添加商品',
                    isMenu: false
                },
                component: () => import('@/views/hmall/event/addProducts')
            },
            {
                path: 'createEditEvent',
                name: 'createEditEvent',
                meta: {
                    title: '创建/编辑活动',
                    tagName: '创建/编辑活动',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/hmall/event/createEditEvent')
            },
            {
                path: 'accountManage',
                name: 'accountManage',
                meta: {
                    title: '账号管理',
                    tagName: '账号管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/membership/accountManage')
            },
            {
                path: 'bussinessManage',
                name: 'bussinessManage',
                meta: {
                    title: '商家管理',
                    tagName: '商家管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/membership/bussinessManage')
            },
            {
                path: 'memberManage',
                name: 'memberManage',
                meta: {
                    title: '会员管理',
                    tagName: '会员管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/membership/memberManage')
            }
        ]
    },
    {
        path: '/hmall/finance',
        meta: {
            title: 'B2b财务管理',
            isMenu: true,
            icon: 'hosjoy_store'
        },
        component: Layout,
        children: [
            {
                path: 'order',
                name: 'financeOrder',
                meta: {
                    title: '订单管理',
                    tagName: '财务订单管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/finance/order.vue')
            },
            {
                path: 'marketing',
                name: 'financeMarketing',
                meta: {
                    title: '营销管理',
                    tagName: '财务营销管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/finance/marketing.vue')
            },
            {
                path: 'product',
                name: 'financeProduct',
                meta: {
                    title: '商品管理',
                    tagName: '财务商品管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/finance/product.vue')
            },
            {
                path: 'charge',
                name: 'financeCharge',
                meta: {
                    title: '服务费管理',
                    tagName: '财务服务费管理',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/hmall/finance/serviceCharge.vue')
            },
            {
                path: 'withdrawal',
                name: 'financeWithdrawal',
                meta: {
                    title: '提现',
                    tagName: '提现',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/hmall/finance/withdrawal.vue')
            }
        ]
    }
]
