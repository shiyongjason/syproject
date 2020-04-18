import Layout from '@/views/layout/Default.vue'

export default {
    path: '/goodwork',
    meta: {
        title: '好橙工',
        isMenu: true,
        icon: 'hosjoy_hcg'
    },
    component: Layout,
    children: [
        {
            path: 'projectlist',
            name: 'projectlist',
            meta: {
                title: '好橙工项目',
                tagName: '好橙工项目',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/crm/goodwork/projectlist')
        },
        {
            path: 'authenlist',
            name: 'authenlist',
            meta: {
                title: '企业管理',
                tagName: '企业管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/crm/crmauthen/authenlist')
        }
    ]
}
