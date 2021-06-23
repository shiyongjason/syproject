// import { DictionaryList, getDictionary, SearchByItem } from '../api'

// // const PURCHASE_ORDER = 'PURCHASE_ORDER'

// enum ItemKey {
//     'project_intelligent_needs' = 'PROJECT_INTELLIGENT_NEEDS',
//     'project_building_type' = 'PROJECT_BUILDING_TYPE',
//     'project_step' = 'PROJECT_STEP',
//     'project_role' = 'PROJECT_ROLE',
//     'general_goods' = 'GENERAL_GOODS',
//     'refund_pay_type' = 'REFUND_PAY_TYPE'
// }

// interface IState {
//     /** 工程项目智能化需求 */
//     projectIntelligentNeeds: DictionaryList
//     /** 项目建筑类型 */
//     projectBuildingType: DictionaryList
//     /** 供应链产品所处阶段 */
//     projectStep: DictionaryList
//     /** 项目角色 */
//     projectRole: DictionaryList
//     /** 可从总部采购的产品 */
//     generalGoods: DictionaryList
//     /** 回款支付方式 */
//     refundPayType: DictionaryList
// }

// const state: IState = {
//     projectIntelligentNeeds: [],
//     projectBuildingType: [],
//     projectStep: [],
//     projectRole: [],
//     generalGoods: [],
//     refundPayType: []
// }
// const getters = {
//     projectIntelligentNeeds: (state: IState) => state.projectIntelligentNeeds,
//     projectBuildingType: (state: IState) => state.projectBuildingType,
//     projectStep: (state: IState) => state.projectStep,
//     projectRole: (state: IState) => state.projectRole,
//     generalGoods: (state: IState) => state.generalGoods,
//     refundPayType: (state: IState) => state.refundPayType
// }
// const mutations = {
//     [ItemKey.project_intelligent_needs] (state: IState, payload) {
//         state.projectIntelligentNeeds = payload
//     },
//     [ItemKey.project_building_type] (state: IState, payload) {
//         state.projectBuildingType = payload
//     },
//     [ItemKey.project_step] (state: IState, payload) {
//         state.projectStep = payload
//     },
//     [ItemKey.project_role] (state: IState, payload) {
//         state.projectRole = payload
//     },
//     [ItemKey.general_goods] (state: IState, payload) {
//         state.generalGoods = payload
//     },
//     [ItemKey.general_goods] (state: IState, payload) {
//         state.generalGoods = payload
//     },
//     [ItemKey.refund_pay_type] (state: IState, payload) {
//         state.refundPayType = payload
//     }
// }

// const actions = {
//     async findDictionaryList ({ commit }, params: SearchByItem) {
//         const { data } = await getDictionary(params)
//         commit(ItemKey[params.item], data)
//         // commit(PURCHASE_ORDER, data)
//     }
// }
// export default {
//     namespaced: true,
//     state,
//     getters,
//     actions,
//     mutations
// }
