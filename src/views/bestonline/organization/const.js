// 实际控制人社会风评可选项
export const SOCIAL_REVIEW_OPTIONS = [
    { value: '', label: '请选择' },
    { value: 0, label: '优' },
    { value: 1, label: '良' },
    { value: 2, label: '差' }
]
// 实际控制人对公司的掌控力可选项
export const CONTROLL_OPTIONS = [
    { value: '', label: '请选择' },
    { value: 0, label: '绝对掌控' },
    { value: 1, label: '中等掌控' },
    { value: 2, label: '一般掌控' }
]
// 组织稳定性可选项
export const STABLE_OPTIONS = [
    { value: '', label: '请选择' },
    { value: 0, label: '高' },
    { value: 1, label: '中' },
    { value: 2, label: '低' }
]
// KPI 校验字段
export const kpiValidProps = new Set(['actualControllerSocialId', 'actualCompanyControllerId', 'organizationalStabilityId', 'riskDisclosure', 'analysisDescription', 'dueOrganizationAssessmentCreateFormList'])
// 实际控制人 校验字段
export const controllerValidProps = new Set(['actualControllerOverview', 'actualControllerBaseline', 'actualControllerHobby', 'dueOrganizationControllerAssessmentCreateFormList'])
// 组织 校验字段
export const organizationValidProps = new Set(['companyHistoryBusiness', 'incumbency', 'averageSalaryOnJob', 'socialSecurityNum', 'isSignEmployment', 'dueOrganizationSeniorCreateFormList', 'dueOrganizationPostCreateFormList', 'dueOrganizationOrgAssessmentCreateFormList'])
// 合作动机和风险 校验字段
export const motivationRiskValidProps = new Set(['cooperationIntention', 'cooperationRisk', 'companyAdvantage', 'companyShortBoard'])
