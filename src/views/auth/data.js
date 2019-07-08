//  机构树,后面待删除文件

var data = [
    {
        label: '一级 1',
        children: [{
            label: '二级 1-1',
            children: [{
                label: '三级 1-1-1'
            }]
        }]
    }, {
        label: '一级 2',
        children: [{
            label: '二级 2-1',
            children: [{
                label: '三级 2-1-1'
            }]
        }, {
            label: '二级 2-2',
            children: [{
                label: '三级 2-2-1'
            }]
        }]
    }, {
        label: '一级 3',
        children: [{
            label: '二级 3-1',
            children: [{
                label: '三级 3-1-1'
            }]
        }, {
            label: '二级 3-2',
            children: [{
                label: '三级 3-2-1'
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

    {
        "departmentNodeVOS": [{
            "pkDeptdoc": "1050V3100000000F6HHM",
            "innercode": "06010D04",
            "deptcode": "F001",
            "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
            "deptname": "安徽分部",
            "deptattr": "采购、销售部门",
            "depttype": "普通部门",
            "pkFathedept": "1050V3100000000F6H0B",
            "childNodeList": null
        },
            {
                "pkDeptdoc": "1050V3100000000F6J5Z",
                "innercode": "06010D06",
                "deptcode": "F002",
                "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                "deptname": "河南分部",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J6B",
                "innercode": "06010D07",
                "deptcode": "F015",
                "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                "deptname": "浙江分部",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J6N",
                "innercode": "06010D08",
                "deptcode": "F010",
                "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                "deptname": "上海分部",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J7N",
                "innercode": "06010D0B",
                "deptcode": "D111",
                "crmDeptCode": "eeddd1d0-9ab0-4ffa-bceb-52e65a91498e",
                "deptname": "西南大区",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": [{
                    "pkDeptdoc": "1050V3100000000F6H0B",
                    "innercode": "06010D",
                    "deptcode": "100321",
                    "crmDeptCode": "top",
                    "deptname": "好享家分部",
                    "deptattr": "采购、销售部门",
                    "depttype": "普通部门",
                    "pkFathedept": null,
                    "childNodeList": null
                },
                    {
                        "pkDeptdoc": "1050V3100000000F6H0E",
                        "innercode": "06010D0M01",
                        "deptcode": "F008",
                        "crmDeptCode": "1aad7c94-2830-11e8-ace9-000c290bec91",
                        "deptname": "南京分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6HHM",
                        "innercode": "06010D04",
                        "deptcode": "F001",
                        "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
                        "deptname": "安徽分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J5Z",
                        "innercode": "06010D06",
                        "deptcode": "F002",
                        "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                        "deptname": "河南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6B",
                        "innercode": "06010D07",
                        "deptcode": "F015",
                        "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                        "deptname": "浙江分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6N",
                        "innercode": "06010D08",
                        "deptcode": "F010",
                        "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                        "deptname": "上海分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7T",
                        "innercode": "06010D0U",
                        "deptcode": "F011",
                        "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                        "deptname": "四川分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7W",
                        "innercode": "06010D0V",
                        "deptcode": "F016",
                        "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                        "deptname": "重庆分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J85",
                        "innercode": "06010D0Q",
                        "deptcode": "F003",
                        "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J88",
                        "innercode": "06010D0R",
                        "deptcode": "F004",
                        "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖南分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI26",
                        "innercode": "06010D0W",
                        "deptcode": "F111",
                        "crmDeptCode": null,
                        "deptname": "贵州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI29",
                        "innercode": "06010D0X",
                        "deptcode": "F112",
                        "crmDeptCode": null,
                        "deptname": "江西分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O40",
                        "innercode": "06010D0M06",
                        "deptcode": "F014",
                        "crmDeptCode": "ab947bb7-61f1-4bcb-bdc3-dacbc43365f9",
                        "deptname": "扬州分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O92",
                        "innercode": "06010D0S01",
                        "deptcode": "F013",
                        "crmDeptCode": "34b3caaa-403a-4cbd-ae7f-ab45336fa461",
                        "deptname": "徐州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166ONT",
                        "innercode": "06010D0S02",
                        "deptcode": "F005",
                        "crmDeptCode": "c2a395a4-1e87-4fe9-af46-69130f47460a",
                        "deptname": "淮安分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOA",
                        "innercode": "06010D0S03",
                        "deptcode": "F009",
                        "crmDeptCode": "bfcc49a5-5377-447a-bd2b-f9a702a798f3",
                        "deptname": "南通分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOW",
                        "innercode": "06010D0T",
                        "deptcode": "F012",
                        "crmDeptCode": null,
                        "deptname": "苏州分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQ3",
                        "innercode": "06010D0P01",
                        "deptcode": "F006",
                        "crmDeptCode": "2b8b77ad-0d3a-4f45-bb92-a3c72b089666",
                        "deptname": "鲁北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQI",
                        "innercode": "06010D0P02",
                        "deptcode": "F007",
                        "crmDeptCode": "51c2ee8d-aee7-42b3-a31b-ef2066999530",
                        "deptname": "鲁西南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    }]
            },
            {
                "pkDeptdoc": "1050V3100000000F6J7T",
                "innercode": "06010D0U",
                "deptcode": "F011",
                "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                "deptname": "四川分部",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J7W",
                "innercode": "06010D0V",
                "deptcode": "F016",
                "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                "deptname": "重庆分部",
                "deptattr": "管理部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J85",
                "innercode": "06010D0Q",
                "deptcode": "F003",
                "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                "deptname": "湖北分部",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000F6J88",
                "innercode": "06010D0R",
                "deptcode": "F004",
                "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                "deptname": "湖南分部",
                "deptattr": "管理部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000NJI26",
                "innercode": "06010D0W",
                "deptcode": "F111",
                "crmDeptCode": null,
                "deptname": "贵州分部",
                "deptattr": "其他部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000NJI29",
                "innercode": "06010D0X",
                "deptcode": "F112",
                "crmDeptCode": null,
                "deptname": "江西分部",
                "deptattr": "其他部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V3100000000TROKT",
                "innercode": "06010D0M",
                "deptcode": "D001",
                "crmDeptCode": "5fd87b7f-d5a0-4dbc-8035-f996734b6a54",
                "deptname": "南京大区",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": [{
                    "pkDeptdoc": "1050V3100000000F6H0B",
                    "innercode": "06010D",
                    "deptcode": "100321",
                    "crmDeptCode": "top",
                    "deptname": "好享家分部",
                    "deptattr": "采购、销售部门",
                    "depttype": "普通部门",
                    "pkFathedept": null,
                    "childNodeList": null
                },
                    {
                        "pkDeptdoc": "1050V3100000000F6H0E",
                        "innercode": "06010D0M01",
                        "deptcode": "F008",
                        "crmDeptCode": "1aad7c94-2830-11e8-ace9-000c290bec91",
                        "deptname": "南京分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6HHM",
                        "innercode": "06010D04",
                        "deptcode": "F001",
                        "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
                        "deptname": "安徽分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J5Z",
                        "innercode": "06010D06",
                        "deptcode": "F002",
                        "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                        "deptname": "河南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6B",
                        "innercode": "06010D07",
                        "deptcode": "F015",
                        "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                        "deptname": "浙江分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6N",
                        "innercode": "06010D08",
                        "deptcode": "F010",
                        "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                        "deptname": "上海分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7T",
                        "innercode": "06010D0U",
                        "deptcode": "F011",
                        "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                        "deptname": "四川分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7W",
                        "innercode": "06010D0V",
                        "deptcode": "F016",
                        "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                        "deptname": "重庆分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J85",
                        "innercode": "06010D0Q",
                        "deptcode": "F003",
                        "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J88",
                        "innercode": "06010D0R",
                        "deptcode": "F004",
                        "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖南分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI26",
                        "innercode": "06010D0W",
                        "deptcode": "F111",
                        "crmDeptCode": null,
                        "deptname": "贵州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI29",
                        "innercode": "06010D0X",
                        "deptcode": "F112",
                        "crmDeptCode": null,
                        "deptname": "江西分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O40",
                        "innercode": "06010D0M06",
                        "deptcode": "F014",
                        "crmDeptCode": "ab947bb7-61f1-4bcb-bdc3-dacbc43365f9",
                        "deptname": "扬州分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O92",
                        "innercode": "06010D0S01",
                        "deptcode": "F013",
                        "crmDeptCode": "34b3caaa-403a-4cbd-ae7f-ab45336fa461",
                        "deptname": "徐州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166ONT",
                        "innercode": "06010D0S02",
                        "deptcode": "F005",
                        "crmDeptCode": "c2a395a4-1e87-4fe9-af46-69130f47460a",
                        "deptname": "淮安分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOA",
                        "innercode": "06010D0S03",
                        "deptcode": "F009",
                        "crmDeptCode": "bfcc49a5-5377-447a-bd2b-f9a702a798f3",
                        "deptname": "南通分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOW",
                        "innercode": "06010D0T",
                        "deptcode": "F012",
                        "crmDeptCode": null,
                        "deptname": "苏州分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQ3",
                        "innercode": "06010D0P01",
                        "deptcode": "F006",
                        "crmDeptCode": "2b8b77ad-0d3a-4f45-bb92-a3c72b089666",
                        "deptname": "鲁北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQI",
                        "innercode": "06010D0P02",
                        "deptcode": "F007",
                        "crmDeptCode": "51c2ee8d-aee7-42b3-a31b-ef2066999530",
                        "deptname": "鲁西南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    }]
            },
            {
                "pkDeptdoc": "1050V3100000000TRQU6",
                "innercode": "06010D0N",
                "deptcode": "D112",
                "crmDeptCode": "7d7c2814-d20c-4dcb-88c9-f558de13ef8a",
                "deptname": "华中大区",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": [{
                    "pkDeptdoc": "1050V3100000000F6H0B",
                    "innercode": "06010D",
                    "deptcode": "100321",
                    "crmDeptCode": "top",
                    "deptname": "好享家分部",
                    "deptattr": "采购、销售部门",
                    "depttype": "普通部门",
                    "pkFathedept": null,
                    "childNodeList": null
                },
                    {
                        "pkDeptdoc": "1050V3100000000F6H0E",
                        "innercode": "06010D0M01",
                        "deptcode": "F008",
                        "crmDeptCode": "1aad7c94-2830-11e8-ace9-000c290bec91",
                        "deptname": "南京分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6HHM",
                        "innercode": "06010D04",
                        "deptcode": "F001",
                        "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
                        "deptname": "安徽分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J5Z",
                        "innercode": "06010D06",
                        "deptcode": "F002",
                        "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                        "deptname": "河南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6B",
                        "innercode": "06010D07",
                        "deptcode": "F015",
                        "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                        "deptname": "浙江分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6N",
                        "innercode": "06010D08",
                        "deptcode": "F010",
                        "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                        "deptname": "上海分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7T",
                        "innercode": "06010D0U",
                        "deptcode": "F011",
                        "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                        "deptname": "四川分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7W",
                        "innercode": "06010D0V",
                        "deptcode": "F016",
                        "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                        "deptname": "重庆分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J85",
                        "innercode": "06010D0Q",
                        "deptcode": "F003",
                        "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J88",
                        "innercode": "06010D0R",
                        "deptcode": "F004",
                        "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖南分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI26",
                        "innercode": "06010D0W",
                        "deptcode": "F111",
                        "crmDeptCode": null,
                        "deptname": "贵州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI29",
                        "innercode": "06010D0X",
                        "deptcode": "F112",
                        "crmDeptCode": null,
                        "deptname": "江西分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O40",
                        "innercode": "06010D0M06",
                        "deptcode": "F014",
                        "crmDeptCode": "ab947bb7-61f1-4bcb-bdc3-dacbc43365f9",
                        "deptname": "扬州分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O92",
                        "innercode": "06010D0S01",
                        "deptcode": "F013",
                        "crmDeptCode": "34b3caaa-403a-4cbd-ae7f-ab45336fa461",
                        "deptname": "徐州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166ONT",
                        "innercode": "06010D0S02",
                        "deptcode": "F005",
                        "crmDeptCode": "c2a395a4-1e87-4fe9-af46-69130f47460a",
                        "deptname": "淮安分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOA",
                        "innercode": "06010D0S03",
                        "deptcode": "F009",
                        "crmDeptCode": "bfcc49a5-5377-447a-bd2b-f9a702a798f3",
                        "deptname": "南通分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOW",
                        "innercode": "06010D0T",
                        "deptcode": "F012",
                        "crmDeptCode": null,
                        "deptname": "苏州分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQ3",
                        "innercode": "06010D0P01",
                        "deptcode": "F006",
                        "crmDeptCode": "2b8b77ad-0d3a-4f45-bb92-a3c72b089666",
                        "deptname": "鲁北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQI",
                        "innercode": "06010D0P02",
                        "deptcode": "F007",
                        "crmDeptCode": "51c2ee8d-aee7-42b3-a31b-ef2066999530",
                        "deptname": "鲁西南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    }]
            },
            {
                "pkDeptdoc": "1050V310000000166OOW",
                "innercode": "06010D0T",
                "deptcode": "F012",
                "crmDeptCode": null,
                "deptname": "苏州分部",
                "deptattr": "管理部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": null
            },
            {
                "pkDeptdoc": "1050V310000000166OPZ",
                "innercode": "06010D0P",
                "deptcode": "D002",
                "crmDeptCode": "b9a213f9-7cf1-49df-b2f5-090309e90d97",
                "deptname": "山东大区",
                "deptattr": "采购、销售部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": [{
                    "pkDeptdoc": "1050V3100000000F6H0B",
                    "innercode": "06010D",
                    "deptcode": "100321",
                    "crmDeptCode": "top",
                    "deptname": "好享家分部",
                    "deptattr": "采购、销售部门",
                    "depttype": "普通部门",
                    "pkFathedept": null,
                    "childNodeList": null
                },
                    {
                        "pkDeptdoc": "1050V3100000000F6H0E",
                        "innercode": "06010D0M01",
                        "deptcode": "F008",
                        "crmDeptCode": "1aad7c94-2830-11e8-ace9-000c290bec91",
                        "deptname": "南京分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6HHM",
                        "innercode": "06010D04",
                        "deptcode": "F001",
                        "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
                        "deptname": "安徽分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J5Z",
                        "innercode": "06010D06",
                        "deptcode": "F002",
                        "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                        "deptname": "河南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6B",
                        "innercode": "06010D07",
                        "deptcode": "F015",
                        "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                        "deptname": "浙江分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6N",
                        "innercode": "06010D08",
                        "deptcode": "F010",
                        "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                        "deptname": "上海分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7T",
                        "innercode": "06010D0U",
                        "deptcode": "F011",
                        "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                        "deptname": "四川分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7W",
                        "innercode": "06010D0V",
                        "deptcode": "F016",
                        "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                        "deptname": "重庆分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J85",
                        "innercode": "06010D0Q",
                        "deptcode": "F003",
                        "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J88",
                        "innercode": "06010D0R",
                        "deptcode": "F004",
                        "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖南分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI26",
                        "innercode": "06010D0W",
                        "deptcode": "F111",
                        "crmDeptCode": null,
                        "deptname": "贵州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI29",
                        "innercode": "06010D0X",
                        "deptcode": "F112",
                        "crmDeptCode": null,
                        "deptname": "江西分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O40",
                        "innercode": "06010D0M06",
                        "deptcode": "F014",
                        "crmDeptCode": "ab947bb7-61f1-4bcb-bdc3-dacbc43365f9",
                        "deptname": "扬州分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O92",
                        "innercode": "06010D0S01",
                        "deptcode": "F013",
                        "crmDeptCode": "34b3caaa-403a-4cbd-ae7f-ab45336fa461",
                        "deptname": "徐州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166ONT",
                        "innercode": "06010D0S02",
                        "deptcode": "F005",
                        "crmDeptCode": "c2a395a4-1e87-4fe9-af46-69130f47460a",
                        "deptname": "淮安分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOA",
                        "innercode": "06010D0S03",
                        "deptcode": "F009",
                        "crmDeptCode": "bfcc49a5-5377-447a-bd2b-f9a702a798f3",
                        "deptname": "南通分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOW",
                        "innercode": "06010D0T",
                        "deptcode": "F012",
                        "crmDeptCode": null,
                        "deptname": "苏州分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQ3",
                        "innercode": "06010D0P01",
                        "deptcode": "F006",
                        "crmDeptCode": "2b8b77ad-0d3a-4f45-bb92-a3c72b089666",
                        "deptname": "鲁北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQI",
                        "innercode": "06010D0P02",
                        "deptcode": "F007",
                        "crmDeptCode": "51c2ee8d-aee7-42b3-a31b-ef2066999530",
                        "deptname": "鲁西南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    }]
            },
            {
                "pkDeptdoc": "1050V31000000017XS90",
                "innercode": "06010D0S",
                "deptcode": "D003",
                "crmDeptCode": "b30d8f31-6231-4343-9dae-4b26598d95cf",
                "deptname": "苏北大区",
                "deptattr": "其他部门",
                "depttype": "普通部门",
                "pkFathedept": "1050V3100000000F6H0B",
                "childNodeList": [{
                    "pkDeptdoc": "1050V3100000000F6H0B",
                    "innercode": "06010D",
                    "deptcode": "100321",
                    "crmDeptCode": "top",
                    "deptname": "好享家分部",
                    "deptattr": "采购、销售部门",
                    "depttype": "普通部门",
                    "pkFathedept": null,
                    "childNodeList": null
                },
                    {
                        "pkDeptdoc": "1050V3100000000F6H0E",
                        "innercode": "06010D0M01",
                        "deptcode": "F008",
                        "crmDeptCode": "1aad7c94-2830-11e8-ace9-000c290bec91",
                        "deptname": "南京分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6HHM",
                        "innercode": "06010D04",
                        "deptcode": "F001",
                        "crmDeptCode": "1abc7f57-2830-11e8-ace9-000c290bec91",
                        "deptname": "安徽分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J5Z",
                        "innercode": "06010D06",
                        "deptcode": "F002",
                        "crmDeptCode": "1ac17ad6-2830-11e8-ace9-000c290bec91",
                        "deptname": "河南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6B",
                        "innercode": "06010D07",
                        "deptcode": "F015",
                        "crmDeptCode": "1ab6b145-2830-11e8-ace9-000c290bec91",
                        "deptname": "浙江分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J6N",
                        "innercode": "06010D08",
                        "deptcode": "F010",
                        "crmDeptCode": "1ab9ccf6-2830-11e8-ace9-000c290bec91",
                        "deptname": "上海分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7T",
                        "innercode": "06010D0U",
                        "deptcode": "F011",
                        "crmDeptCode": "1aca257a-2830-11e8-ace9-000c290bec91",
                        "deptname": "四川分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J7W",
                        "innercode": "06010D0V",
                        "deptcode": "F016",
                        "crmDeptCode": "1acd606f-2830-11e8-ace9-000c290bec91",
                        "deptname": "重庆分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J85",
                        "innercode": "06010D0Q",
                        "deptcode": "F003",
                        "crmDeptCode": "1ac496ea-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000F6J88",
                        "innercode": "06010D0R",
                        "deptcode": "F004",
                        "crmDeptCode": "1ac6eb52-2830-11e8-ace9-000c290bec91",
                        "deptname": "湖南分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI26",
                        "innercode": "06010D0W",
                        "deptcode": "F111",
                        "crmDeptCode": null,
                        "deptname": "贵州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V3100000000NJI29",
                        "innercode": "06010D0X",
                        "deptcode": "F112",
                        "crmDeptCode": null,
                        "deptname": "江西分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O40",
                        "innercode": "06010D0M06",
                        "deptcode": "F014",
                        "crmDeptCode": "ab947bb7-61f1-4bcb-bdc3-dacbc43365f9",
                        "deptname": "扬州分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000TROKT",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166O92",
                        "innercode": "06010D0S01",
                        "deptcode": "F013",
                        "crmDeptCode": "34b3caaa-403a-4cbd-ae7f-ab45336fa461",
                        "deptname": "徐州分部",
                        "deptattr": "其他部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166ONT",
                        "innercode": "06010D0S02",
                        "deptcode": "F005",
                        "crmDeptCode": "c2a395a4-1e87-4fe9-af46-69130f47460a",
                        "deptname": "淮安分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOA",
                        "innercode": "06010D0S03",
                        "deptcode": "F009",
                        "crmDeptCode": "bfcc49a5-5377-447a-bd2b-f9a702a798f3",
                        "deptname": "南通分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V31000000017XS90",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OOW",
                        "innercode": "06010D0T",
                        "deptcode": "F012",
                        "crmDeptCode": null,
                        "deptname": "苏州分部",
                        "deptattr": "管理部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V3100000000F6H0B",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQ3",
                        "innercode": "06010D0P01",
                        "deptcode": "F006",
                        "crmDeptCode": "2b8b77ad-0d3a-4f45-bb92-a3c72b089666",
                        "deptname": "鲁北分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    },
                    {
                        "pkDeptdoc": "1050V310000000166OQI",
                        "innercode": "06010D0P02",
                        "deptcode": "F007",
                        "crmDeptCode": "51c2ee8d-aee7-42b3-a31b-ef2066999530",
                        "deptname": "鲁西南分部",
                        "deptattr": "采购、销售部门",
                        "depttype": "普通部门",
                        "pkFathedept": "1050V310000000166OPZ",
                        "childNodeList": null
                    }]
            }]
    }
