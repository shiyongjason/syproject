import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'
import { CompanyContactRequest, CompanyContactResponse, ReqProjectSupply, StaffInfoResponse } from '@/interface/hbp-member'
import { ReqBossProjectRefund } from '../interface'

export interface SearchByItem {
    item: 'project_intelligent_needs' | 'project_building_type' | 'project_step' | 'project_role' | 'general_goods'
}
export type DictionaryList = Array<{ key: string, value: string }>
//
//
//
//
//
//
export const getChiness: () => AxiosPromise<any> = () => {
    return axios.get(B2bUrl + 'merchant/openapi/region/provinces/nesting', {})
}
/** 根据item查找字典列表
 * @对应的 item:
 * @工程项目智能化需求 : project_intelligent_needs
 * @项目建筑类型 : project_building_type
 * @供应链产品所处阶段 : project_step
 * @项目角色 : project_role
 * @可从总部采购的产品 : general_goods
 * @回款支付方式 : refund_pay_type
 * @销售阶段跟进流程 flow_up_process
 */
export const getDictionary: (params: SearchByItem) => AxiosPromise<DictionaryList> = (params) => {
    return axios.get('memeber/api/dictionary/search-by-item', { params })
}

/** BOSS-2.0项目列表 */
export const getProjectList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get(`memeber/api/project-supply?${params}`, {})
}

/** BOSS-2.0项目导出 */
export const getListExport: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/project-supply/export', { params })
}

/** BOSS-2.0项目新增 */
export const addProject: (params: ReqProjectSupply) => AxiosPromise<any> = (params: any) => axios.post(`memeber/api/project-supply`, params)

/** BOSS-2.0模糊匹配好橙工企业列表 */
export const getcompanyByName: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/crm/company/companies/by-name', { params })
}

/** BOSS-2.0查询企业管理员,分部和客户经理 */
export const getCompanyUserById: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/crm/company/project-info', { params })
}
/** BOSS-2.0项目详情 */
export const getProjectDetail: (params: any) => AxiosPromise<ReqProjectSupply> = (params) => {
    return axios.get('memeber/api/project-supply/detail', { params })
}
/** BOSS-2.0更新项目详情 */
export const upDateProjectDetail: (params: ReqProjectSupply) => AxiosPromise<any> = (params) => {
    return axios.put('memeber/api/project-supply', params)
}

/** BOSS-2.0项目签约 */
export const projectSign: (params: ReqBossProjectRefund) => AxiosPromise<any> = (params) => {
    return axios.put('memeber/api/project-supply/sign', params)
}

/** BOSS-2.0项目回款 */
export const projectRefund: (params: ReqBossProjectRefund) => AxiosPromise<any> = (params) => {
    return axios.put('memeber/api/project-supply/refund', params)
}

/** BOSS-2.0跟进记录 */
export const getFlowUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/flow-up/boss', { params })
}

/** BOSS-2.0项目进度节点 */
export const getProcess: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/project-supply/process', { params })
}

/** BOSS-2.0新增跟进记录 */
export const addFlowUp: (params: any) => AxiosPromise<any> = (params) => {
    return axios.post('memeber/api/flow-up/boss', params)
}

/** BOSS-2.0boss跟进记录统计 */
export const getFlowUpCount: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/flow-up/count/boss', { params })
}

/** BOSS-员工列表 */
export const getCompanyUserList: (params: any) => AxiosPromise<StaffInfoResponse[]> = (params) => {
    return axios.get(`memeber/openapi/company/user/boss/staff-info`, { params })
}

/** BOSS-根据企业id获取企业联系人列表 */
export const getCompanyContactList: (companyId: any) => AxiosPromise<CompanyContactResponse[]> = (companyId) => {
    return axios.get(`memeber/api/company-contact/boss/${companyId}`, {})
}

/** BOSS-新增企业联系人 */
export const createCompanyContact: (params: any) => AxiosPromise<CompanyContactRequest> = (params) => {
    return axios.post('memeber/api/company-contact/boss', params)
}
/** BOSS-修改企业联系人 */
export const putCompanyContact: (params: any) => AxiosPromise<CompanyContactRequest> = (params) => {
    return axios.put('memeber/api/company-contact/boss', params)
}
/** BOSS-删除企业联系人 */
export const delCompanyContact: (params: any) => AxiosPromise<any> = (params) => {
    return axios.delete(`memeber/api/company-contact/boss/${params}`, {})
}