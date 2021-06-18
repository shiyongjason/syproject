import axios, { AxiosPromise } from 'axios'
import { B2bUrl } from '@/api/config'
import { RespBossProjectSupply } from '@/interface/hbp-member'

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
 */
export const getDictionary: (params: SearchByItem) => AxiosPromise<DictionaryList> = (params) => {
    return axios.get('memeber/api/dictionary/search-by-item', { params })
}

/** BOSS-2.0项目列表 */
export const getProjectList: (params: any) => AxiosPromise<any> = (params) => {
    return axios.get('memeber/api/project-supply', { params })
}
