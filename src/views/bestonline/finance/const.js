// 费用合理性可选项
export const COST_RATIONALITY_OPTIONS = [
    { label: '请选择', value: '' },
    { label: '合理', value: 0 },
    { label: '不合理', value: 1 }
]
// 风险可选项
export const RISK_OPTIONS = [
    { value: '', label: '请选择' },
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// 仓库摆放有序程度可选项
export const WAREHOUSE_ORDER_OPTIONS = [
    { value: '', label: '请选择' },
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// 仓库形式
export const WAREHOUSE_FORM = [
    { value: '', label: '请选择' },
    { value: 0, label: '自有' },
    { value: 1, label: '租赁' },
    { value: 2, label: '第三方监督' }
]
// 仓库接受好享家仓库监管方式
export const SUPERVISION_METHOD  = [
    { value: '', label: '请选择' },
    { value: 0, label: '将仓库移至我司指定的第三方仓库进行管理' },
    { value: 1, label: '接受我司指定的第三方对仓库进行监管' },
    { value: 2, label: '设立单独库区 ,接受我司定期盘点' },
    { value: 3, label: '不接受' }
]
// 财务外派资金监管可选项
export const FUND_SUPERVISION = [
    { value: '', label: '请选择' },
    { value: 0, label: '资金和货物双重监管' },
    { value: 1, label: '资金监管-高' },
    { value: 2, label: '资金监管-低' },
    { value: 3, label: '不接受' }
]