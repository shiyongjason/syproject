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
export const SUPERVISION_METHOD = [
    { value: '', label: '请选择' },
    { value: 0, label: '将仓库移至我司指定的第三方仓库进行管理' },
    { value: 1, label: '接受我司指定的第三方对仓库进行监管' },
    { value: 2, label: '设立单独库区 ,接受我司定期盘点' },
    { value: 3, label: '不接受' }
]
// 财务外派资金监管可选项
export const FUND_SUPERVISION = [
    { value: '', label: '请选择' },
    { value: 0, label: '财务委派' },
    { value: 1, label: '财务外派' }
]
// KPI 校验字段
export const kpiValidProps = new Set(['assessmentList', 'dueFinanceBasic.riskDisclosure', 'dueFinanceBasic.analysisDescription'])
// 盈利能力(必填) 校验字段
export const profitabilityValidProps = new Set(['grossMargin', 'rate', 'profitRatio'])
// 偿债能力(必填) 校验字段
export const solvencyValidProps = new Set(['liquidityRatio', 'quickRatio'])
// 营运能力(必填) 校验字段
export const operationAbilityValidProps = new Set(['daysOfReceivable', 'daysOfInventory', 'totalAssetsTurnover', 'returnOnEquity'])
// 资金风险评估(必填) 校验字段
export const capitalRiskAssessmentValidProps = new Set(['shareholdersBorrowsCompany', 'companyBorrowsShareholders', 'shareholdersDebt', 'capitalRiskAssessment'])
// 税务合规(必填) 校验字段
export const taxComplianceValidProps = new Set(['annualTaxableBusinessIncome', 'taxableIncomeRatio', 'taxBearingRate'])
// 资产负债表（必填一项）校验字段
export const balanceSheetValidProps = new Set(['assetsLiabilities.assetListT', 'assetsLiabilities.assetListB', 'assetsLiabilities.assetListL'])
// 利潤表 校验字段
export const profitStatementValidProps = new Set(['dueFinanceProfit.contentListT', 'dueFinanceProfit.contentListB', 'dueFinanceProfit.contentListL'])