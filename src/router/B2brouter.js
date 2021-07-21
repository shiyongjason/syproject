import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'
// 备注没用
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
                path: 'product',
                name: 'product',
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
                        path: 'productList',
                        name: 'productList',
                        meta: {
                            title: '商品库管理',
                            tagName: '商品库管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/productManage/productList/index.vue')
                    },
                    {
                        path: 'createProduct',
                        name: 'createProduct',
                        meta: {
                            title: '商品创建/修改',
                            tagName: '商品创建/修改',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/product/productList'
                        },
                        component: () => import('@/views/hmall/productManage/productList/createProduct.vue')
                    },
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
                        path: 'productAuditList',
                        name: 'productAuditList',
                        meta: {
                            title: '商品审核',
                            tagName: '商品审核',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/productManage/productAuditList/index.vue')
                    },
                    {
                        path: 'editSpuAudit',
                        name: 'editSpuAudit',
                        meta: {
                            title: 'SPU商品审核',
                            tagName: 'SPU商品审核',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/product/productAuditList'
                        },
                        component: () => import('@/views/hmall/productManage/productAuditList/editSpuAudit.vue')
                    },
                    {
                        path: 'spuAudit',
                        name: 'spuAudit',
                        meta: {
                            title: 'SPU商品查看',
                            tagName: 'SPU商品查看',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/product/productAuditList'
                        },
                        component: () => import('@/views/hmall/productManage/productAuditList/editSpuAudit.vue')
                    },
                    {
                        path: 'editSkuAudit',
                        name: 'editSkuAudit',
                        meta: {
                            title: 'SKU商品审核',
                            tagName: 'SKU商品审核',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/product/productAuditList'
                        },
                        component: () => import('@/views/hmall/productManage/productAuditList/editSkuAudit.vue')
                    },
                    {
                        path: 'skuAudit',
                        name: 'skuAudit',
                        meta: {
                            title: 'SKU商品查看',
                            tagName: 'SKU商品查看',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/product/productAuditList'
                        },
                        component: () => import('@/views/hmall/productManage/productAuditList/editSkuAudit.vue')
                    },
                    {
                        path: 'marketStore',
                        name: 'marketStore',
                        meta: {
                            title: '商家商品管理',
                            tagName: '商家商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/spumanage/marketStore.vue')
                    }
                ]
            },
            {
                path: 'market',
                name: 'market',
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
                        path: 'seckillManage',
                        name: 'seckillManage',
                        meta: {
                            title: '特价活动管理',
                            tagName: '特价活动管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/marketManage/seckillManage/index')
                    },
                    {
                        path: 'createSeckill',
                        name: 'createSeckill',
                        meta: {
                            title: '创建/编辑活动',
                            tagName: '创建/编辑活动',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/market/seckillManage'
                        },
                        component: () => import('@/views/hmall/marketManage/seckillManage/createSeckill')
                    },
                    {
                        path: 'eventStatistics',
                        name: 'eventStatistics',
                        meta: {
                            title: '数据监测',
                            tagName: '数据监测',
                            isMenu: false,
                            showMenuAs: '/b2b/market/seckillManage'
                        },
                        component: () => import('@/views/hmall/marketManage/seckillManage/eventStatistics')
                    },
                    {
                        path: 'addSeckillProducts',
                        name: 'addSeckillProducts',
                        meta: {
                            title: '添加商品',
                            tagName: '添加商品',
                            isMenu: false,
                            showMenuAs: '/b2b/market/seckillManage'
                        },
                        component: () => import('@/views/hmall/marketManage/seckillManage/addSeckillProducts')
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
                    // {
                    //     path: 'orderRecord',
                    //     name: 'orderRecord',
                    //     meta: {
                    //         title: '订单／收款记录查询',
                    //         tagName: '订单／收款记录查询',
                    //         isMenu: true,
                    //         icon: ''
                    //     },
                    //     component: () => import('@/views/hmall/order/order.vue')
                    // }
                    {
                        path: 'shippingOrder',
                        name: 'shippingOrder',
                        meta: {
                            title: '运费订单',
                            tagName: '运费订单',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/shippingOrder/index')
                    },
                    {
                        path: 'shippingorderDetail',
                        name: 'shippingorderDetail',
                        meta: {
                            title: '订单查看',
                            tagName: '订单查看',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/shippingorderDetail/index')
                    },
                    {
                        path: 'onlinefreightDetails',
                        name: 'onlinefreightDetails',
                        meta: {
                            title: '线上运费明细',
                            tagName: '线上运费明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/onlinefreightDetails/index')
                    },
                    {
                        path: 'freightDetails',
                        name: 'freightDetails',
                        meta: {
                            title: '运费资金管理',
                            tagName: '运费资金管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/freightDetails/index')
                    },
                    {
                        path: 'withdrawalFreight',
                        name: 'withdrawalFreight',
                        meta: {
                            title: '提现',
                            tagName: '提现',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/withdrawalFreight/index')
                    }
                ]
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
            },
            {
                path: 'dataBoard',
                name: 'dataBoard',
                meta: {
                    title: '数据看板',
                    tagName: '数据看板',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'couponsUseInfo',
                        name: 'couponsUseInfo',
                        meta: {
                            title: '优惠券使用明细',
                            tagName: '优惠券使用明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/couponsUseInfo.vue')
                    },
                    {
                        path: 'activityUseInfo',
                        name: 'activityUseInfo',
                        meta: {
                            title: '活动使用明细',
                            tagName: '活动使用明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/activityUseInfo.vue')
                    },
                    {
                        path: 'commonMemberActive',
                        name: 'commonMemberActive',
                        meta: {
                            title: '会员活跃明细（普通）',
                            tagName: '会员活跃明细（普通）',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/commonMemberActive.vue')
                    },
                    {
                        path: 'seckillMemberActive',
                        name: 'seckillMemberActive',
                        meta: {
                            title: '会员活跃明细（秒杀）',
                            tagName: '会员活跃明细（秒杀）',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/seckillMemberActive.vue')
                    },
                    {
                        path: 'transactionInfo',
                        name: 'transactionInfo',
                        meta: {
                            title: '交易额明细',
                            tagName: '交易额明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/transactionInfo.vue')
                    },
                    {
                        path: 'memberRegistrationInfo',
                        name: 'memberRegistrationInfo',
                        meta: {
                            title: '会员注册明细',
                            tagName: '会员注册明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/memberRegistrationInfo.vue')
                    },
                    {
                        path: 'biGoodDetail',
                        name: 'biGoodDetail',
                        meta: {
                            title: '商品明细',
                            tagName: '商品明细',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/dataBoard/biGoodDetail.vue')
                    }
                ]
            },
            {
                path: 'searchProject',
                name: 'searchProject',
                meta: {
                    title: '搜索方案',
                    tagName: '搜索方案',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'searchData',
                        name: 'searchData',
                        meta: {
                            title: '搜索数据报表',
                            tagName: '搜索数据报表',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/searchProject/searchData.vue')
                    },
                    {
                        path: 'searchLexicon',
                        name: 'searchLexicon',
                        meta: {
                            title: '增加词库',
                            tagName: '增加词库',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/searchProject/searchLexicon.vue')
                    },
                    {
                        path: 'searchSynonym',
                        name: 'searchSynonym',
                        meta: {
                            title: '增加同义词',
                            tagName: '增加同义词',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/searchProject/searchSynonym.vue')
                    }
                ]
            },
            {
                path: 'fundAudit',
                name: 'fundAudit',
                meta: {
                    title: '代采资金管理',
                    tagName: '代采资金管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'fundAuditList',
                        name: 'fundAuditList',
                        meta: {
                            title: '资金审核列表',
                            tagName: '资金审核列表',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/fundAudit/fundAuditList.vue')
                    },
                    {
                        path: 'auditFundList',
                        name: 'auditFundList',
                        meta: {
                            title: '商家代采订单审核列表',
                            tagName: '商家代采订单审核列表',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/fundAudit/auditFundList.vue')
                    },
                    {
                        path: 'listFundInfo',
                        name: 'fundInfo',
                        meta: {
                            title: '查看',
                            tagName: '查看',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/auditFundList'
                        },
                        component: () => import('@/views/hmall/fundAudit/fundInfo.vue')
                    },
                    {
                        path: 'aduitFundInfo',
                        name: 'fundInfo',
                        meta: {
                            title: '审核',
                            tagName: '审核',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/auditFundList'
                        },
                        component: () => import('@/views/hmall/fundAudit/fundInfo.vue')
                    },
                    {
                        path: 'advancePayment',
                        name: 'advancePayment',
                        meta: {
                            title: '商家代采订单预付款确认',
                            tagName: '商家代采订单预付款确认',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/fundAudit/advancePayment.vue')
                    },
                    {
                        path: 'advanceFundInfo',
                        name: 'fundInfo',
                        meta: {
                            title: '查看',
                            tagName: '查看',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/advancePayment'
                        },
                        component: () => import('@/views/hmall/fundAudit/fundInfo.vue')
                    },
                    {
                        path: 'auditFundStatus',
                        name: 'auditFundStatus',
                        meta: {
                            title: '商家代采订单状态确认',
                            tagName: '商家代采订单状态确认',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/fundAudit/auditFundStatus.vue')
                    },
                    {
                        path: 'statusFundInfo',
                        name: 'fundInfo',
                        meta: {
                            title: '查看',
                            tagName: '查看',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/auditFundStatus'
                        },
                        component: () => import('@/views/hmall/fundAudit/fundInfo.vue')
                    },
                    {
                        path: 'prepayment',
                        name: 'prepayment',
                        meta: {
                            title: '商家提前还款确认',
                            tagName: '商家提前还款确认',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/fundAudit/prepayment.vue')
                    },
                    {
                        path: 'merchantsDetail',
                        name: 'merchantsDetail',
                        meta: {
                            title: '代采资金管理',
                            tagName: '代采资金管理提现',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/finance/miningManage/merchantsDetail.vue')
                    },
                    {
                        path: 'withdrawalMerchant',
                        name: 'withdrawalMerchant',
                        meta: {
                            title: '提现',
                            tagName: '提现',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/merchantsDetail'
                        },
                        component: () => import('@/views/hmall/finance/miningManage/withdrawalMerchant.vue')
                    },
                    {
                        path: 'merchantBehalf',
                        name: 'merchantBehalf',
                        meta: {
                            title: '商家详情',
                            tagName: '商家详情',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/fundAudit/merchantsDetail'
                        },
                        component: () => import('@/views/hmall/finance/miningManage/merchantBehalf.vue')
                    }
                ]
            },
            {
                path: 'warehouse',
                name: 'warehouse',
                meta: {
                    title: '仓配运费管理',
                    tagName: '仓配运费管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'freightComputeRule',
                        name: 'freightComputeRule',
                        meta: {
                            title: '运费计算规则',
                            tagName: '运费计算规则',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/warehouseManage/freightComputeRule/index.vue')
                    },
                    {
                        path: 'warehouseProductList',
                        name: 'warehouseProductList',
                        meta: {
                            title: '仓配商品管理',
                            tagName: '仓配商品管理',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/hmall/warehouseManage/warehouseProduct/index.vue')
                    },
                    {
                        path: 'createWarehouse',
                        name: 'createWarehouse',
                        meta: {
                            title: '批量添加仓配商品',
                            tagName: '批量添加仓配商品',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/warehouse/warehouseProductList'
                        },
                        component: () => import('@/views/hmall/warehouseManage/warehouseProduct/createWarehouse.vue')
                    },
                    {
                        path: 'addWarehouseProducts',
                        name: 'addWarehouseProducts',
                        meta: {
                            title: '选择商品',
                            tagName: '选择商品',
                            isMenu: false,
                            icon: '',
                            showMenuAs: '/b2b/warehouse/warehouseProductList'
                        },
                        component: () => import('@/views/hmall/warehouseManage/warehouseProduct/addWarehouseProducts.vue')
                    }
                ]
            }
        ]
    }
]
