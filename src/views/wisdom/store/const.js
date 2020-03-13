export const BUS_TYPE = [
    {
        name: '全部',
        value: ''
    },
    {
        name: '批发',
        value: '批发'
    },
    {
        name: '零售',
        value: '零售'
    },
    {
        name: '工程',
        value: '工程'
    }
]
// 2= 分部  1 = 大区 0 总部
export const DEPT_TYPE = [
    0, 1, 2
]
// 公司类型
export const DICTINFO_TYPE = 'DICTINFO_TYPE'

// 主要业态
export const FORMAT_LIST = [
    { value: 0, name: '零售' },
    { value: 1, name: '批发' },
    { value: 2, name: '工程' },
    { value: 3, name: '零售>批发、工程' },
    { value: 4, name: '批发>零售、工程' },
    { value: 5, name: '工程>批发、零售' }
]