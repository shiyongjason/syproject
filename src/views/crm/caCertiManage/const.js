export const tableLabelPerson = [
    { label: '姓名', prop: 'name', width: '120' },
    { label: '手机号', prop: 'phone', width: '150' },
    { label: '身份证号', prop: 'idNo', width: '200' },
    { label: '个人账户ID', prop: 'accountId', width: '250' },
    { label: '是否实名', prop: 'status', width: '80' }, // 1：未认证 2：已认证【未实名】 3：已实名
    { label: '实名方式', prop: 'realType', width: '120' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTimes', width: '200' },
    { label: '实名时间', prop: 'realNameTime', formatters: 'dateTimes', width: '200' }
]

export const tableLabelEnterprise = [
    { label: '企业名称', prop: 'companyName', width: '120' },
    { label: '统一社会信用代码', prop: 'unifiedSocialCreditCode', width: '200' },
    { label: '企业账户ID', prop: 'orgId', width: '200' },
    { label: '经办人类型', prop: 'managerType', width: '100' },
    { label: '经办人', prop: 'managerBy', width: '120' },
    { label: '是否实名', prop: 'status', width: '80' },
    { label: '实名方式', prop: 'realType', width: '120' },
    { label: '创建时间', prop: 'createTime', formatters: 'dateTimes', width: '200' },
    { label: '实名时间', prop: 'realNameTime', formatters: 'dateTimes', width: '200' }
]