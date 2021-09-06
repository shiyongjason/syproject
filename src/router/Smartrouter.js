import Layout from '@/views/layout/Default.vue'
import InterlayerContainer from '@/views/layout/InterlayerContainer.vue'

export default [
    {
        path: '/comfortSmart',
        meta: {
            title: '舒适云智能化',
            isMenu: true,
            icon: 'hosjoy_shushiyun'
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
            }
        ]
    }
]
