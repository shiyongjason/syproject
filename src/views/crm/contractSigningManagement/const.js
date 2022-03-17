export const CONTRACT_STATUS_KEY = {
    'DRAFT': 1, // 草稿
    'FINANCE_AUDIT': 2, // 待分财审核
    'FINANCE_AUDIT_REJECT': 3, // 分财审核未通过
    'OPERATE_AUDIT': 4, // 待运营审核
    'OPERATE_AUDIT_REJECT': 5, // 运营审核未通过
    'LEGAL_AUDIT': 6, // 待法务审核
    'LEGAL_AUDIT_REJECT': 7, // 法务审核未通过
    'CUSTOMER_SIGN': 8, // 待客户签署
    'CUSTOMER_SIGN_REJECT': 9, // 客户拒签
    'PLATFORM_SIGN': 10, // 待平台签署
    'PLATFORM_SIGN_REJECT': 11, // 平台签署未通过
    'COMPLETE': 12, // 合同已签署
    'EXCEPTION_CLOSE': 13, // 异常关闭
    'TIMEOUT_CLOSE': 14, // 超时关闭
    'SEAL_FAIL': 15, // 用印发起失败
    'ONLINE_CUSTOMER_SIGN': 16 // 发起线上待客户签署
}
