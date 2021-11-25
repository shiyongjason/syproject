export const PROCESS_LIST =
    [
        { key: 1, value: '项目跟踪阶段' },
        { key: 2, value: '招投标' },
        { key: 3, value: '合同已签订' },
        { key: 4, value: '项目已开工' }
    ]

// 删除待签约、待放款、贷中、合作完成 增加终审通过和终审为通过状态
export const STATUS_LIST =
    [
        { key: 1, value: '项目消息' },
        { key: 10, value: '信息待完善' },
        { key: 2, value: '初审中' },
        { key: 3, value: '资料收集中' },
        { key: 12, value: '资料待审核' },
        { key: 4, value: '待立项' },
        { key: 11, value: '待终审' },
        { key: 15, value: '钉钉审批中' },
        { key: 13, value: '终审通过' },
        { key: 14, value: '终审未通过' },
        { key: 5, value: '审核未通过' }
    ]

export const TYPE_LIST =
    [
        { key: 1, value: '地产项目' },
        { key: 2, value: '政府公建项目' },
        { key: 3, value: '市政工程' },
        { key: 4, value: '办公楼' },
        { key: 5, value: '厂房' },
        { key: 6, value: '其他' }
    ]

export const DEVICE_LIST = [
    { key: 1, value: '空调' },
    { key: 2, value: '采暖' },
    { key: 3, value: '新风' },
    { key: 4, value: '净水' },
    { key: 5, value: '智能化' },
    { key: 6, value: '辅材' },
    { key: 7, value: '电梯' },
    { key: 9, value: '电器' },
    { key: 10, value: '热水器' },
    { key: 8, value: '其他' }

]

export const UPSTREAM_LIST = [{ key: 1, value: '厂商' }, { key: 2, value: '代理商' }, { key: 3, value: '经销商' }]

// export const STATUS_TYPE = [
//     { key: 2, value: '初审' }, { key: 3, value: '资料收集中' }, { key: 4, value: '立项' },
//     { key: 5, value: '合作关闭' }, { key: 6, value: '待签约' }, { key: 7, value: '待放款' }, { key: 8, value: '贷中' }, { key: 9, value: '合作完成' }
// ]

export const NEW_STATUS_TYPE = [
    { key: 2, value: '初审', num: 0 }, { key: 3, value: '资料收集中', num: 1 }, { key: 12, value: '资料待审核', num: 2 }, { key: 4, value: '待立项', num: 3 }, { key: 11, value: '待终审', num: 4 },
    { key: 6, value: '待签约', num: 5 }, { key: 7, value: '待放款', num: 6 }, { key: 8, value: '贷中', num: 7 }, { key: 9, value: '合作完成', num: 8 },
    { key: 5, value: '合作完成', num: 8 }, { key: 10, value: '信息待完善', num: 1 }
]

export const BUS_TYPE_LIST = [
    { key: 1, value: '体系内' },
    { key: 2, value: '体系外' }
]

export const RISK_TYPE_LIST = [
    { key: 2, value: '白名单' },
    { key: 1, value: '黑名单' },
    { key: 3, value: '待审核' }
]

export const AUTEHEN_LIST = [
    { key: 1, value: '已认证' },
    { key: 2, value: '未认证' }
]
// 合作进度(好橙工项目资料)
// 合作进度 1：待提交2：初审中 3：资料收集中 4：待立项 5：合作关闭 11：待终审 6：待签约 7：待放款 8：贷中 9：合作完成 10：信息待完善
export const COOPERATION_PROGRESS_LIST = [
    { key: 10, value: '信息待完善' },
    { key: 2, value: '初审中' },
    { key: 3, value: '资料收集中' },
    { key: 12, value: '资料待审核' },
    { key: 4, value: '待立项' },
    { key: 11, value: '待终审' },
    { key: 6, value: '待签约' },
    { key: 7, value: '待放款' },
    { key: 8, value: '贷中' },
    { key: 9, value: '合作完成' },
    { key: 5, value: '审核未通过' }

]
// 上游供应商类型
export const UPSTREAMSUPPLIERTYPE = [
    { key: 1, value: '厂商' },
    { key: 2, value: '代理商' },
    { key: 3, value: '经销商' }
]
// 上游接受的付款方式
export const UPSTREAMPAYTYPE = [
    { key: 1, value: '银行转账' },
    { key: 2, value: '承兑' }
]
// 信用等级
export const CREDITLEVEL = [
    { key: 1, value: 'A+' },
    { key: 2, value: 'A' },
    { key: 3, value: 'B+' },
    { key: 4, value: 'B' },
    { key: 5, value: 'C+' },
    { key: 6, value: 'C' },
    { key: 8, value: 'C-' },
    { key: 7, value: 'D' }
]
// 项目评级
export const PROJECTLEVEL = [
    { key: 1, value: 'A+' },
    { key: 2, value: 'A' },
    { key: 3, value: 'B+' },
    { key: 4, value: 'B' },
    { key: 5, value: 'C+' },
    { key: 6, value: 'C' },
    { key: 7, value: 'D' }
]
// 资料状态
export const MATELIST = [
    { key: 1, value: '待提交' },
    { key: 2, value: '已提交' },
    { key: 3, value: '已通过' },
    { key: 4, value: '已打回' }
]

// 类型

// 是否注册
export const REGISTEROR = [
    { key: '', value: '全部' },
    { key: true, value: '是' },
    { key: false, value: '否' }
]
// 代理级别
export const AGENTLEVEL = [
    { key: 1, value: '一级代理商（囤货商）' },
    { key: 2, value: '经销商' },
    { key: 3, value: '其他' }
]
// 近3年的年度工程规模
export const THREEYEARPROJECTSCALE = [
    { key: 1, value: '1000万以内' },
    { key: 2, value: '1001万～3000万' },
    { key: 3, value: '3001万～5000万' },
    { key: 4, value: '5001万～1亿' },
    { key: 5, value: '1亿～2亿' },
    { key: 6, value: '2亿以上' }
]
// 主辅材渠道
export const MATERIALSCHANNEL = [
    { key: '1', value: '厂商直采' },
    { key: '2', value: '一级囤货商采购' },
    { key: '3', value: '经销商采购' }
]
