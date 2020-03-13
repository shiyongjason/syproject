/* 
    CA认证
    企业CA tableLabel
*/
export const tableLabelCompany = [
    { label: '企业名称', prop: 'companyName' },
    { label: '企业类型', prop: 'companyType' },
    { label: '企业账号ID', prop: 'companySignatureId' },
    { label: '操作人账号ID', prop: 'operatorSignatureId' },
    { label: '操作人姓名', prop: 'operatorName' },
    { label: '操作人手机号', prop: 'operatorPhone' },
    { label: '操作人身份证', prop: 'operatorIdNumber' },
    { label: '操作人邮箱', prop: 'operatorEmail' },
    { label: '证件类型', prop: 'companyDocumentType' },
    { label: '组织机构代码证号', prop: 'companyLicenseNumber' },
    { label: '创建日期', prop: 'createTime', formatters: 'dateTime' },
    { label: '法人姓名', prop: 'legalName' },
    { label: '法人手机号', prop: 'legalPhone' },
    { label: '法人身份证号', prop: 'legalIdNumber' },
    { label: '验证状态', prop: 'status' }
]
/* 
    CA认证
    个人CA tableLabel
*/
export const tableLabelPerson = [
    { label: '个人账号ID', prop: 'signatureSupplierSignerId' },
    { label: '个人姓名', prop: 'customerName' },
    { label: '个人手机号', prop: 'mobilePhone' },
    { label: '个人身份证号', prop: 'idNumber' },
    { label: '创建日期', prop: 'createDate', formatters: 'date' }
]
/* 
    企业客户
    企业客户列表 tableLabel
*/
export const tableLabelBsnCustomer = [
    { label: 'mis编码', prop: 'test' },
    { label: '客户号', prop: 'test' },
    { label: '企业属性', prop: 'test' },
    { label: '企业名称', prop: 'test' },
    { label: '注册日期', prop: 'test' },
    { label: '企业社会信用统一代码', prop: 'test' },
    { label: '是否还在经营', prop: 'test' },
    { label: '创建时间', prop: 'test' }
]