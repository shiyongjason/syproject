export const MONTH_DATA = [
    {
        label: '一月',
        value: '1'
    },
    {
        label: '二月',
        value: '2'
    },
    {
        label: '三月',
        value: '3'
    },
    {
        label: '四月',
        value: '4'
    },
    {
        label: '五月',
        value: '5'
    },
    {
        label: '六月',
        value: '6'
    },
    {
        label: '七月',
        value: '7'
    },
    {
        label: '八月',
        value: '8'
    },
    {
        label: '九月',
        value: '9'
    },
    {
        label: '十月',
        value: '10'
    },
    {
        label: '十一月',
        value: '11'
    },
    {
        label: '十二月',
        value: '12'
    }
]
export const PAY_METHOD_OPTIONS = [
    { label: '全部', value: '' },
    { label: '快捷支付（信用卡）', value: 21 },
    { label: '快捷支付（储蓄卡）', value: 22 },
    { label: '微信支付', value: 40 },
    { label: '微信支付（小程序）', value: 42 },
    { label: '支付宝支付', value: 50 },
    { label: '账期支付', value: 1 },
    { label: '公司转账', value: 2 },
    { label: '余额支付', value: 10 }
]

export const PAY_METHOD_MAP = new Map([
    [21, '快捷支付（信用卡）'],
    [22, '快捷支付（储蓄卡）'],
    [40, '微信支付'],
    [42, '微信支付（小程序）'],
    [50, '支付宝支付'],
    [1, '账期支付'],
    [2, '公司转账'],
    [10, '余额支付']
])