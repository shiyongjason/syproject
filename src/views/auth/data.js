//  机构树,后面待删除文件

var data = [
    {
        label: '好享家',
        children: [{
            label: '浙江分部',
            children: [{
                label: '杭州万达连',
                children: [
                    {
                        label: '小马会员店'
                    }
                ]
            }]
        }]
    }
]

// 列表
var pageList = {
    current: 1,
    pages: 9,
    records: [],
    size: 10,
    total: 89
}

var data = [
    {
        'id': 1,
        'authName': '首页',
        'menuIcon': null,
        'menuType': 1,
        'authUri': '/',
        'authLevel': 0,
        'remark': null,
        'parentId': 0,
        'sort': 1,
        'pageConfig': [],
        'childAuthList': [],
        'have': true
    },
    {
        'id': 51,
        'authName': '金云平台',
        'menuIcon': null,
        'menuType': 1,
        'authUri': '/jinyunPlatform',
        'authLevel': 0,
        'remark': null,
        'parentId': 0,
        'sort': 2,
        'pageConfig': [],
        'childAuthList': [],
        'have': true
    },
    {
        'id': 101,
        'authName': '老系统',
        'menuIcon': null,
        'menuType': 1,
        'authUri': '/oldsystem',
        'authLevel': 0,
        'remark': null,
        'parentId': 0,
        'sort': 3,
        'pageConfig': [],
        'childAuthList': [],
        'have': true
    },
    {
        'id': 151,
        'authName': '权限管理',
        'menuIcon': null,
        'menuType': 1,
        'authUri': '/auth',
        'authLevel': 0,
        'remark': null,
        'parentId': 0,
        'sort': 4,
        'pageConfig': [],
        'childAuthList': [
            {
                'id': 1511,
                'authName': '机构/人员管理',
                'menuIcon': null,
                'menuType': 1,
                'authUri': 'organization',
                'authLevel': 0,
                'remark': null,
                'parentId': 151,
                'sort': 1,
                'pageConfig': [],
                'childAuthList': [],
                'have': false
            },
            {
                'id': 1512,
                'authName': '角色模版设置',
                'menuIcon': null,
                'menuType': 1,
                'authUri': 'role',
                'authLevel': 0,
                'remark': null,
                'parentId': 151,
                'sort': 2,
                'pageConfig': [],
                'childAuthList': [],
                'have': false
            }
        ],
        'have': false
    }
]
