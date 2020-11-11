export const tableLabel_person = [
    { label: '姓名', prop: 'name', width: '120' },
    { label: '手机号', prop: 'phone', width: '120' },
    { label: '身份证号', prop: 'idNo', width: '120' },
    { label: '个人账户ID', prop: 'accountId', width: '120' },
    { label: '是否实名', prop: 'status', width: '120' }, // 1：未认证 2：已认证【未实名】 3：已实名
    { label: '实名方式', prop: 'realType', width: '120' },
    { label: '创建时间', prop: 'createTime', width: '120', formatters: 'dateTimes' },
    { label: '实名时间', prop: 'updateTime', width: '120', formatters: 'dateTimes' },
]

export const tableLabel_enterprise = [
    { label: '企业名称', prop: 'companyName', width: '120' },
    { label: '统一社会信用代码', prop: 'unifiedSocialCreditCode', width: '120' },
    { label: '企业账户ID', prop: 'orgId', width: '120' },
    { label: '经办人类型', prop: 'managerType', width: '120' },
    { label: '经办人', prop: 'managerBy', width: '120' },
    { label: '是否实名', prop: 'status', width: '120' },
    { label: '实名方式', prop: 'realType', width: '120' },
    { label: '创建时间', prop: 'createTime', width: '120', formatters: 'dateTimes' },
    { label: '实名时间', prop: 'updateTime', width: '120', formatters: 'dateTimes' },
]