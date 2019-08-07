export const APPROVAL_STATUS_OPTIONS = [
    { value: '全部', key: '' },
    { value: '未提交', key: 0 },
    { value: '审批中', key: 1 },
    { value: '审批通过', key: 2 },
    { value: '审批驳回', key: 3 }
]
/** =========== 法务尽调常量定义 ============== */
// 公司法律风险可选项
export const COMPANY_LEGAL_RISKS_OPTIONS = [
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// 实际控制人法律风险可选项
export const CONTROLLER_LEGAL_RISKS_OPTIONS = [
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// 实际控制人配偶法律风险可选项
export const CONTROLLER_MATE_LEGAL_RISKS_OPTIONS = [
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// 婚姻状况可选项
export const MARRIAGE_OPTIONS = [
    { value: 0, label: '已婚' },
    { value: 1, label: '未婚' },
    { value: 2, label: '离异' },
    { value: 3, label: '丧偶' }
]
// 学历可选项
export const EDUCATION_OPTIONS = [
    { value: 0, label: '大专' },
    { value: 1, label: '本科' },
    { value: 2, label: '硕士' },
    { value: 3, label: '博士' },
    { value: 4, label: '其他' }
]
// 借款用途可选项
export const DEBT_PURPOSE_OPTIONS = [
    { value: '0', label: '经营借款' },
    { value: '1', label: '消费贷' },
    { value: '2', label: '房贷' },
    { value: '3', label: '车贷' },
    { value: '4', label: '借记贷' },
    { value: '5', label: '其他' }
]
// 投资性质可选项
export const INVESTMENT_TYPE_OPTIONS = [
    { value: 0, label: '债务性投资' },
    { value: 1, label: '权益性投资' },
    { value: 2, label: '混合性投资' }
]
// 诉讼、仲裁及行政处罚事件类型可选项
export const PUNISHMENT_TYPE_OPTIONS = [
    { value: 0, label: '诉讼、仲裁事件' },
    { value: 1, label: '被执行案件' },
    { value: 2, label: '行政处罚' },
    { value: 3, label: '其他' }
]
// 诉讼、仲裁及行政处罚事件严重性可选项
export const PONDERANCE_OPTIONS = [
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]

export const MAIN_COMMERCIAL = [
    { value: '零售', key: 0 },
    { value: '批发', key: 1 },
    { value: '工程', key: 2 }
]

export const MAIN_CATEGORY = [
    { value: '冷暖', key: 0 },
    { value: '新风', key: 1 },
    { value: '智能', key: 2 },
    { value: '净水', key: 3 },
    { value: '冰洗', key: 4 },
    { value: '黑电', key: 5 },
    { value: '厨卫', key: 6 },
    { value: '其他', key: 7 }
]

export const YES_NO_STATUS = [
    { label: '请选择', value: '' },
    { label: '是', value: 1 },
    { label: '否', value: 0 }
]

export const COST_RATIONALITY = [
    { label: '请选择', value: '' },
    { label: '合理', value: 0 },
    { label: '不合理', value: 1 }
]

export const ISPROVIDE_CONTRACT = [
    { value: '是', key: 0 },
    { value: '否', key: 1 }
]

export const IS_DOWN = [
    { value: '否', key: 0 },
    { value: '是', key: 1 }
]

export const IS_HEALTH = [
    { value: '是', key: 0 },
    { value: '否', key: 1 }
]
