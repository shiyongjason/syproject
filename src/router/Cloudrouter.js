import Layout from '@/views/layout/Default.vue'

export default {
    path: '/comfortCloud',
    meta: {
        title: '舒适云概览',
        isMenu: true,
        icon: 'hosjoy_operation'
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
            path: 'equipemtOverview',
            name: 'equipemtOverview',
            meta: {
                title: '设备概览',
                tagName: '设备概览',
                parentName: '舒适云概览',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/comfortcloud/equipemtOverview.vue')
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
            component: () => import('@/views/comfortcloud/homeManage.vue')
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
            component: () => import('@/views/comfortcloud/homedetail.vue')
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
            path: 'cloudList',
            name: 'cloudlist',
            meta: {
                title: '运营管理',
                tagName: '运营管理',
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
        }
    ]
}