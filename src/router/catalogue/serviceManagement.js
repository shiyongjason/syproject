import Layout from '@/views/layout/Default.vue'

export default {
    path: '/serviceManagement',
    meta: {
        title: '服务管理',
        isMenu: true,
        icon: 'hosjoy_cloud_service'
    },
    component: Layout,
    children: [
        {
            path: 'customerManagement',
            name: 'customerManagement',
            meta: {
                title: '客户管理',
                tagName: '客户管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/customerManagement/customer.vue')
        },
        {
            path: 'houseKeeperManagement',
            name: 'houseKeeperManagement',
            meta: {
                title: '管家管理',
                tagName: '管家管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/houseKeeperManagement/houseKeeperManagement.vue')
        },
        {
            path: 'orderCenter',
            name: 'orderCenter',
            meta: {
                title: '订单中心',
                tagName: '订单中心',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/orderCenter/order.vue')
        },
        {
            path: 'workOrder',
            name: 'workOrder',
            meta: {
                title: '工单信息',
                tagName: '工单信息',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/workOrder/index.vue')
        },
        {
            path: 'customerRecord',
            name: 'customerRecord',
            meta: {
                title: '客户档案',
                tagName: '客户档案',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/customerRecord/index.vue')
        },
        {
            path: 'customerRecordDetail',
            name: 'customerRecordDetail',
            meta: {
                title: '档案详情',
                tagName: '档案详情',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/customerRecord/detail.vue')
        },
        {
            path: 'customerReport',
            name: 'customerReport',
            meta: {
                title: '客户报告',
                tagName: '客户报告',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/customerReport/index.vue')
        },
        {
            path: 'customerReportDetail',
            name: 'customerReportDetail',
            meta: {
                title: '报告详情',
                tagName: '报告详情',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/customerReport/detail.vue')
        },
        {
            path: 'orderDetails',
            name: 'serviceManagementOrderDetails',
            meta: {
                title: '有赞订单详情',
                tagName: '有赞订单详情',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/orderCenter/orderDetails.vue')
        },
        {
            path: 'orderChannelDetails',
            name: 'serviceManagementOrderChannelDetails',
            meta: {
                title: '渠道订单详情',
                tagName: '渠道订单详情',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/orderCenter/orderChannelDetails.vue')
        },
        {
            path: 'orderChannelEdit',
            name: 'serviceManagementOrderChannelEdit',
            meta: {
                title: '渠道订单修改',
                tagName: '渠道订单修改',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/orderCenter/orderChannelEdit.vue')
        },
        {
            path: 'tags',
            name: 'serviceManagementTags',
            meta: {
                title: '标签管理',
                tagName: '标签管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/tags/tags.vue')
        },
        {
            path: 'channelManagement',
            name: 'channelManagement',
            meta: {
                title: '渠道管理',
                tagName: '渠道管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/channelManagement/channelManagement.vue')
        },
        {
            path: 'userPower',
            name: 'userPower',
            meta: {
                title: '用户权益查询',
                tagName: '用户权益查询',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/userPower/userPower.vue')
        },
        {
            path: 'serviceCategory',
            name: 'serviceCategory',
            meta: {
                title: '服务资源类目管理',
                tagName: '服务资源类目管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/serviceCategory/category.vue')
        },
        {
            path: 'serviceResource',
            name: 'serviceResource',
            meta: {
                title: '服务资源模板管理',
                tagName: '服务资源模板管理',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/serviceResource/resource.vue')
        },
        {
            path: 'serviceResourceDetails',
            name: 'serviceResourceDetails',
            meta: {
                title: '服务资源信息',
                tagName: '服务资源信息',
                isMenu: false,
                icon: ''
            },
            component: () => import('@/views/serviceManagement/serviceResource/addOrEditOrDetails.vue')
        }
    ]
}
