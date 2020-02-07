import Layout from '@/views/layout/Default.vue'

export default {
    path: '/jinyun',
    meta: {
        title: '金云系统',
        isMenu: true,
        icon: 'hosjoy_stay_online'
    },
    component: Layout,
    children: [
        {
            path: 'jyindex',
            name: 'jyindex',
            meta: {
                title: '金云',
                tagName: '金云',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/jinyunplatform/index')
        },
        {
            path: 'enterpriseCA',
            name: 'enterpriseCA',
            meta: {
                title: '企业CA',
                tagName: '企业CA',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/jinyunplatform/enterpriseCA')
        },
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
        },
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
}
