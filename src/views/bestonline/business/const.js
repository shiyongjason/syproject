export const MAIN_COMMERCIAL_OPTIONS = [
    { value: '请选择', key: '' },
    { value: '零售', key: 0 },
    { value: '批发', key: 1 },
    { value: '工程', key: 2 }
]

export const MAIN_COMMERCIAL_OPTIONS_COPY = [
    { value: '零售', key: 0 },
    { value: '批发', key: 1 },
    { value: '工程', key: 2 }
]

export const MAIN_CATEGORY_OPTIONS = [
    { value: '请选择', key: '' },
    { value: '冷暖', key: 0 },
    { value: '新风', key: 1 },
    { value: '智能', key: 2 },
    { value: '净水', key: 3 },
    { value: '冰洗', key: 4 },
    { value: '黑电', key: 5 },
    { value: '厨卫', key: 6 },
    { value: '其他', key: 7 }
]

export const MAIN_CATEGORY_OPTIONS_COPY = [
    { value: '冷暖', key: 0 },
    { value: '新风', key: 1 },
    { value: '智能', key: 2 },
    { value: '净水', key: 3 },
    { value: '冰洗', key: 4 },
    { value: '黑电', key: 5 },
    { value: '厨卫', key: 6 },
    { value: '其他', key: 7 }
]

// 下拉是否
export const DOWN_OPTIONS = [
    { value: '请选择', key: '' },
    { value: '否', key: 0 },
    { value: '是', key: 1 }
]
export const SELECT_OPTIONS = [
    { value: '请选择', key: '' },
    { value: '是', key: 0 },
    { value: '否', key: 1 }
]

// KPI 校验字段
export const kpiValidProps = new Set(['dueBusinessAssessmentCreateFormList', 'share', 'riskDisclosure', 'analysisDescription'])
// 业务模式 校验字段
export const businessModelValidProps = new Set(['mainBusinessFormatOneId', 'businessFormatOneRatio', 'mainCategoryOneId', 'categoryOneSalesRatio', 'mainBrandOneName', 'brandOneSalesRatio'])
// 销售业绩(含税)（万元）校验字段
export const salesPerformanceValidProps = new Set(['dueBusinessSaleCreateFormList', 'firstTenMonthsDown'])
// 上游-供应商结构 校验字段
export const UpstreamSupplierStructureValidProps = new Set(['supplierName', 'purchaseAmount', 'proportion', 'isProvideContract'])
// 下游-客户结构 校验字段
export const DownstreamCustomerValidProps = new Set(['dueBusinessCustomerCreateFormList'])
// 新合资公司规划 校验字段
export const NewJointVenturePlanningValidProps = new Set(['webServiceCategory', 'webBusinessCategory', 'brandManagement', 'annualSalesScale', 'netProfitRate', 'downstreamSwitchChannelsCustomers', 'marketingChannelsPlans', 'fundingRequirements'])