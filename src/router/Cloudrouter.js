import Layout from '@/views/layout/Default.vue'

export default {
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
                parentName: '智能玩法',
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
        }
    ]
}
