import { B2bUrl, interfaceUrl } from '@/api/config'
import axios from 'axios'

// 省市区
export const getChiness = (params) => {
    return axios.get(B2bUrl + 'common/region/provinces/nesting', { params })
}

export const getCompanyBosslist = (params) => {
    return axios.post('memeber/api/crm/company/boss/page', params)
}

// CRM 认证详情
export const getBusinessAuthen = (params) => {
    return axios.get(B2bUrl + `merchant/api/crm/company/authentication-info/${params}`)
}
// CRM 认证信息
export const getAuthenticationMessage = (companyCode) => {
    return axios.get(`memeber/api/crm/company/open-record/${companyCode}`)
}

// CRM 认证状态
export const getBusinessDetail = (params) => {
    return axios.get('memeber/api/crm/company/boss/detail', { params })
}
// 获取详情统计
export const getCrmauthenStatic = (params) => {
    return axios.post('memeber/api/crm/company/boss/statistics', params)
}

// 分部列表
export const findBrandsList = (params) => {
    return axios.get(B2bUrl + 'common/api/organizations/branches', { params })
}

// 更新认证企业
export const updateCrmauthen = (params) => {
    return axios.put('memeber/api/crm/company/boss/update', params)
}

export const getPlatList = (params) => axios.get(interfaceUrl + 'develop/developbasicinfo/queryCompany', { params })

export const putWhiterecord = (params) => axios.post('memeber/api/crm/company/white-list-record', params)

export const findWhiterecord = (params) => axios.get(B2bUrl + 'merchant/api/crm/company/white-list-record/list', { params })

// 删除企业
export const delCompany = (params) => axios.delete(`memeber/api/crm/company/${params}`)

//
export const findCompanyContact = (companyId) => axios.get(`memeber/api/crm/company/search/${companyId}/company-contact`)
//
export const updateContact = (params) => axios.put('memeber/api/crm/company/contact', params)

// 获取天眼查url
export const getTianyanUrl = (params) => {
    return axios.get(`develop/companyurl/${params}`)
}

// 公司雇员列表
export const findEmployeeList = (params) => axios.get(`memeber/openapi/company/user/boss/staff-info`, { params })
// 转换管理员
export const updateAdmin = (params) => axios.post(`memeber/openapi/company/user/boss/transfer-admin`, params)
// 更新雇员信息
export const updateEmployeeInfo = (params) => axios.patch(`memeber/openapi/company/user/boss`, params)
// 角色字典
export const findRoleList = () => axios.get(`memeber/openapi/company/user/roles`)
// 名称模糊搜索
export const findEmployeeDept = (params) => axios.get(`uaa/employee/employee-dept`, { params })

// 修改客户经理
export const updateCustomerAdmin = (params) => axios.post(`memeber/api/customer-manager`, params)
