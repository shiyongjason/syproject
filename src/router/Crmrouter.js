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
        },
        {
            path: 'staticlist',
            name: 'staticlist',
            meta: {
                title: '好橙工台账',
                tagName: '好橙工台账',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/crm/crmstatic/staticlist')
        },
        {
            path: 'datatemp',
            name: 'datatemp',
            meta: {
                title: '材料清单配置',
                tagName: '材料清单配置',
                isMenu: true,
                icon: ''
            },
            component: () => import('@/views/crm/riskManage/dataTemplate.vue')
        },
        {
            path: 'tempdetail',
            name: 'tempdetail',
            meta: {
                title: '材料清单配置详情',
                tagName: '材料清单配置详情',
                isMenu: false,
                icon: '',
                showMenuAs: '/goodwork/datatemp'
            },
            component: () => import('@/views/crm/riskManage/templateDetail.vue')
        }, {
            path: 'projectInformationList',
            name: 'projectInformationList',
            meta: {
                title: '好橙工项目资料',
                tagName: '好橙工项目资料',
                isMenu: true,
                icon: ''

            },
            component: () => import('@/views/crm/projectInformation/list.vue')
        },
        {
            path: 'informationDetail',
            name: 'informationDetail',
            meta: {
                title: '好橙工项目资料详情',
                tagName: '好橙工项目资料详情',
                isMenu: false,
                icon: '',
                showMenuAs: '/goodwork/projectInformationList'

            },
            component: () => import('@/views/crm/projectInformation/detail.vue')
        },
        {
            path: 'approvalDetails',
            name: 'approvalDetails',
            meta: {
                title: '好橙工项目资料详情',
                tagName: '好橙工项目资料详情',
                isMenu: false,
                icon: '',
                showMenuAs: '/goodwork/projectInformationList'

            },
            component: () => import('@/views/crm/projectInformation/approvalDetails.vue')
        }

    ]
}
