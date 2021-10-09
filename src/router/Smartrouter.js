import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/comfortSmart',
        meta: {
            title: '舒适云智能化',
            isMenu: true,
            icon: 'shushiyunlogo'
        },
        component: Layout,
        children: [
            {
                path: 'projectManager',
                name: 'projectManager',
                meta: {
                    title: '项目管理',
                    tagName: '项目管理',
                    parentName: '舒适云智能化',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/smart/projectManager.vue')
            },
            {
                path: 'equipmentUpgrade',
                name: 'equipmentUpgrade',
                meta: {
                    title: '设备升级',
                    tagName: '设备升级',
                    parentName: '舒适云智能化',
                    isMenu: true,
                    icon: ''
                },
                component: () => import('@/views/comfortcloud/smart/equipmentUpgrade.vue')
            }
        ]
    }
]
