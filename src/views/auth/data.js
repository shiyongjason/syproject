//  机构树

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
};