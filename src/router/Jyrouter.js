import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/creditManage',
        meta: {
            title: '授信管理',
            isMenu: true,
            icon: 'hosjoy_stay_online'
        },
        component: Layout,
        children: [
            {
                path: 'contractManage',
                meta: {
                    title: '合同管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'enterpriseCA',
                        name: 'enterpriseCA',
                        meta: {
                            title: 'CA认证',
                            tagName: 'CA认证',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/jinyunplatform/enterpriseCA')
                    },
                    {
                        path: 'faceRecognition',
                        name: 'faceRecognition',
                        meta: {
                            title: '人脸识别',
                            tagName: '人脸识别',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/jinyunplatform/faceRecognition')
                    }
                ]
            },
            {
                path: 'quotaManage',
                meta: {
                    title: '额度管理',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'amountImport',
                        name: 'amountImport',
                        meta: {
                            title: '额度导入',
                            tagName: '额度导入',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/jinyunplatform/amountImport')
                    }
                ]
            },
            {
                path: 'jinyun',
                meta: {
                    title: '用信申请',
                    isMenu: true,
                    icon: ''
                },
                component: InterlayerContainer,
                children: [
                    {
                        path: 'accountImport',
                        name: 'accountImport',
                        meta: {
                            title: '账户导入',
                            tagName: '账户导入',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/jinyunplatform/accountImport')
                    },
                    {
                        path: 'processManage',
                        name: 'processManage',
                        meta: {
                            title: '流程查询',
                            tagName: '流程查询',
                            isMenu: true,
                            icon: ''
                        },
                        component: () => import('@/views/jinyunplatform/processManage')
                    }
                ]
            }
        ]
    }
]