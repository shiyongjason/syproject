
import { IPagePrepaymentResponse, PrepaymentDetailResponse, PrepaymentSupplierSubmitResponse, RespContractSignHistory } from '@/interface/hbp-project'
import axios, { AxiosPromise } from 'axios'
// 银企列表
export const getUnionPayList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/bank/receipt/bank-receipt/page', { params })
}
// 银企金额
export const getUnionPayTotal: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get('/project/api/bank/receipt/bank-receipt/amount-statics', { params })
}
// 收款方主体
export const getAccountList: (params) => AxiosPromise<IPagePrepaymentResponse> = () => {
    return axios.get('/project/api/bank/receipt/payee-account/list')
}
// 认领详情
export const getBankDetail: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/bank/receipt/bank/${params.bankBillId}/detail`)
}
// 认领账单
export const getBankList: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/bank/receipt/bank/claim-fund-page`, { params })
}
// 入账信息
export const getEnterAccount: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/bank/receipt/bank/${params.bankBillId}`)
}
// 认领记录
export const getClaimFund: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.get(`/project/api/bank/receipt/bank/${params.bankBillId}/claim-fund-record`)
}
// 取消认领
export const getCancelClaim: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.put(`/project/api/bank/receipt/bank/claim-fund-cancel`, params)
}
// 认领账单
export const setClaimFund: (params) => AxiosPromise<IPagePrepaymentResponse> = (params) => {
    return axios.post(`/project/api/bank/receipt/bank/claim-fund`, params)
}