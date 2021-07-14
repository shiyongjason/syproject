import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/comfortCloud',
        meta: {
            title: '舒适云概览',
            isMenu: true,
            icon: 'hosjoy_shushiyun'
        },
        component: Layout,
        children: [
            {
                path: 'userOverview',
                name: 'userOverview',
                meta: {
                    title: '用户概览',
                    tagName: '用户概览',
                    parentName: '舒适云概览',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/userOverview.vue')
            },
            {
                path: 'equipmentOverview',
                meta: {
                    title: '设备管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'equipemtOverview',
                        name: 'equipemtOverview',
                        meta: {
                            title: '设备概览',
                            tagName: '设备概览',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/equipemtOverview.vue')
                    },
                    {
                        path: 'cloudAlarm',
                        name: 'cloudAlarm',
                        meta: {
                            title: '告警监控',
                            tagName: '告警监控',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/alarm/alarm.vue')
                    },
                    {
                        path: 'cloudComfortableScene',
                        name: 'cloudComfortableScene',
                        meta: {
                            title: '舒适度场景',
                            tagName: '舒适度场景',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/comfortableScene/comfortableScene.vue')
                    },
                    {
                        path: 'equipmentError',
                        name: 'equipmentError',
                        meta: {
                            title: '设备故障',
                            tagName: '设备故障',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/equipmentError/equipmentError.vue')
                    },
                    {
                        path: 'deviceIDImport',
                        name: 'deviceIDImport',
                        meta: {
                            title: '设备ID入库',
                            tagName: '设备ID入库',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/deviceIDImport/deviceIDImport.vue')
                    },
                    {
                        path: 'warehouseManagement',
                        name: 'warehouseManagement',
                        meta: {
                            title: '出库管理',
                            tagName: '出库管理',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/warehouseManagement.vue')
                    },
                    {
                        path: 'deviceDetail',
                        name: 'deviceDetail',
                        meta: {
                            title: '设备详情',
                            tagName: '设备详情',
                            parentName: '设备管理',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/equipcoms/deviceDetail.vue')
                    },
                    {
                        path: 'deviceUnbind',
                        name: 'deviceUnbind',
                        meta: {
                            title: '设备解绑',
                            tagName: '设备解绑',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/deviceUnbind/deviceUnbind.vue')
                    },
                    {
                        path: 'unbindRecord',
                        name: 'unbindRecord',
                        meta: {
                            title: '解绑记录',
                            tagName: '解绑记录',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/deviceUnbind/unbindRecord.vue')
                    }
                ]
            },
            {
                path: 'homeOverview',
                name: 'homeOverview',
                meta: {
                    title: '家庭概览',
                    tagName: '家庭概览',
                    parentName: '舒适云概览',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/homeOverview/index.vue')
            },
            {
                path: 'homedetail',
                name: 'homedetail',
                meta: {
                    title: '家庭详情',
                    tagName: '家庭详情',
                    parentName: '舒适云概览',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/homeOverview/homedetail.vue')
            },
            {
                path: 'membermanage',
                name: 'membermanage',
                meta: {
                    title: '会员管理',
                    tagName: '会员管理',
                    parentName: '舒适云概览',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/memberManage.vue')
            },
            {
                path: 'memberdetail',
                name: 'memberdetail',
                meta: {
                    title: '会员登录详情',
                    tagName: '会员登录详情',
                    parentName: '舒适云概览',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/memberDetail.vue')
            },
            {
                path: 'knowledgeEdit',
                name: 'knowledgeEdit',
                meta: {
                    title: '知识库管理编辑',
                    tagName: '知识库管理编辑',
                    parentName: '舒适云概览',
                    isMenu: false,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/knowledge/knowledgeEdit.vue')
            },
            {
                path: 'operationsManagement',
                meta: {
                    title: '运营管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'cloudList',
                        name: 'cloudlist',
                        meta: {
                            title: '活动管理',
                            tagName: '活动管理',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/cloudActivity/cloudList.vue')
                    },
                    {
                        path: 'cloudActedit',
                        name: 'cloudActedit',
                        meta: {
                            title: '活动管理',
                            tagName: '活动管理',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/cloudActivity/cloudActedit.vue')
                    },
                    {
                        path: 'smartPlay',
                        name: 'smartPlay',
                        meta: {
                            title: '智能玩法',
                            tagName: '智能玩法',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/smartPlay/smartPlay.vue')
                    },
                    {
                        path: 'smartPlayEdit',
                        name: 'smartPlayEdit',
                        meta: {
                            title: '智能玩法编辑',
                            tagName: '智能玩法编辑',
                            parentName: '智能玩法',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/smartPlay/smartPlayEdit.vue')
                    },
                    {
                        path: 'comfortEncyclopedia',
                        name: 'comfortEncyclopedia',
                        meta: {
                            title: '舒适小百科',
                            tagName: '舒适小百科',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/comfortEncyclopedia/comfortEncyclopedia.vue')
                    },
                    {
                        path: 'comfortEncyclopediaEdit',
                        name: 'comfortEncyclopediaEdit',
                        meta: {
                            title: '文章编辑',
                            tagName: '文章编辑',
                            parentName: '舒适小百科',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/comfortEncyclopedia/comfortEncyclopediaEdit.vue')
                    },
                    {
                        path: 'sendMessage',
                        name: 'sendMessage',
                        meta: {
                            title: '消息推送',
                            tagName: '消息推送',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/sendMessage/sendMessage.vue')
                    },
                    {
                        path: 'sendMessageEdit',
                        name: 'sendMessageEdit',
                        meta: {
                            title: '创建消息',
                            tagName: '创建消息',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/sendMessage/sendMessageEdit.vue')
                    },
                    {
                        path: 'sendMessageDetail',
                        name: 'sendMessageDetail',
                        meta: {
                            title: '推送效果',
                            tagName: '推送效果',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/sendMessage/sendMessageDetail.vue')
                    },
                    {
                        path: 'splashScreenManagement',
                        name: 'splashScreenManagement',
                        meta: {
                            title: '闪屏管理',
                            tagName: '闪屏管理',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/splashScreenManagement/index.vue')
                    },
                    {
                        path: 'adpop',
                        name: 'adpop',
                        meta: {
                            title: '广告弹窗',
                            tagName: '广告弹窗',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/adpop/index.vue')
                    },
                    {
                        path: 'splashScreenDetail',
                        name: 'splashScreenDetail',
                        meta: {
                            title: '闪屏管理信息',
                            tagName: '闪屏管理信息',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/splashScreenManagement/detail.vue')
                    },
                    {
                        path: 'adPopDetail',
                        name: 'adPopDetail',
                        meta: {
                            title: '广告弹窗信息',
                            tagName: '广告弹窗信息',
                            parentName: '舒适云概览',
                            isMenu: false,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/adpop/detail.vue')
                    },
                    {
                        path: 'knowledge',
                        name: 'knowledge',
                        meta: {
                            title: '知识库管理',
                            tagName: '知识库管理',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/knowledge')
                    }
                ]
            },
            {
                path: 'serviceManage',
                meta: {
                    title: '服务管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'serivceOrder',
                        name: 'serivceOrder',
                        meta: {
                            title: '服务订单',
                            tagName: '服务订单',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/serviceManage/serivceOrder.vue')
                    },
                    {
                        path: 'userFeedback',
                        name: 'userFeedback',
                        meta: {
                            title: '用户反馈',
                            tagName: '用户反馈',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/userFeedback/userFeedback.vue')
                    },
                    {
                        path: 'serviceRecord',
                        name: 'serviceRecord',
                        meta: {
                            title: '客服记录',
                            tagName: '客服记录',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/homeOverview/serviceRecord.vue')
                    },
                    {
                        path: 'complaintOrder',
                        name: 'complaintOrder',
                        meta: {
                            title: '投诉工单',
                            tagName: '投诉工单',
                            parentName: '舒适云概览',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/comfortcloud/serviceManage/complaintOrder.vue')
                    }
                ]
            }
        ]
    }
]
