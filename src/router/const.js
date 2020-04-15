/**
 * @description 非菜单，权限控制二级菜单下的tab权限
 * @source 好智慧-资金数据
 */
export const tabAuth = [
    {
        path: '台账汇总表',
        name: '台账汇总表',
        meta: {
            title: 'Error',
            tagName: 'Error',
            parentName: '好智慧-资金数据',
            isMenu: false,
            icon: ''
        },
        component: () => import('@/views/error/403')
    },
    {
        path: '流贷台账',
        name: '流贷台账',
        meta: {
            title: 'Error',
            tagName: 'Error',
            parentName: '好智慧-资金数据',
            isMenu: false,
            icon: ''
        },
        component: () => import('@/views/error/403')
    },
    {
        path: '敞口台账',
        name: '敞口台账',
        meta: {
            title: 'Error',
            tagName: 'Error',
            parentName: '好智慧-资金数据',
            isMenu: false,
            icon: ''
        },
        component: () => import('@/views/error/403')
    },
    {
        path: '分授信台账',
        name: '分授信台账',
        meta: {
            title: 'Error',
            tagName: 'Error',
            parentName: '好智慧-资金数据',
            isMenu: false,
            icon: ''
        },
        component: () => import('@/views/error/403')
    },
    {
        path: '还款明细表',
        name: '还款明细表',
        meta: {
            title: 'Error',
            tagName: 'Error',
            parentName: '好智慧-资金数据',
            isMenu: false,
            icon: ''
        },
        component: () => import('@/views/error/403')
    }
]

export const tabAuthPath = ['台账汇总表', '流贷台账', '敞口台账', '分授信台账', '还款明细表']