// 合作模式
export const COOPERATE_TYPE_MAP = new Map([
    [0, '现有模式'],
    [1, '新合作模式']
])
// 主营品类
export const CATEGORY_MAP = new Map([
    [0, '冷暖'],
    [1, '新风'],
    [2, '净水'],
    [3, '智能'],
    [4, '其他']
])
// 销售形势
export const SALES_TYPE_MAP = new Map([
    [0, '线上'],
    [1, '线下']
])
// 主营业务可选项
export const BUSINESS_MAP = new Map([
    ['0', '零售为主，批发、工程为辅'],
    ['1', '零售为主，批发为辅'],
    ['2', '零售为主，工程为辅'],
    ['3', '批发为主，零售、工程为辅'],
    ['4', '批发为主，零售为辅'],
    ['5', '批发为主，工程为辅'],
    ['6', '工程为主，零售、批发为辅'],
    ['7', '工程为主，批发为辅'],
    ['8', '工程为主，零售为辅']
])
// 主营业务可选项
export const BUSINESS_OPTIONS = [
    { value: '', label: '请选择' },
    { value: '0', label: '零售为主，批发、工程为辅' },
    { value: '1', label: '零售为主，批发为辅' },
    { value: '2', label: '零售为主，工程为辅' },
    { value: '3', label: '批发为主，零售、工程为辅' },
    { value: '4', label: '批发为主，零售为辅' },
    { value: '5', label: '批发为主，工程为辅' },
    { value: '6', label: '工程为主，零售、批发为辅' },
    { value: '7', label: '工程为主，批发为辅' },
    { value: '8', label: '工程为主，零售为辅' }
]
