import axios from 'axios'
// 企业微信会员管理
export const getWxmemberPage = (params) => axios.get(`/memeber/wx/company/member/page`, { params })

export const getWxmemberLoan = (params) => axios.get(`/memeber/wx/company/member/static`, { params })

export const getDepartstatic = (params) => axios.get(`/memeber/wx/company/member/static/department`, { params })

export const getUserstatic = (params) => axios.get(`/memeber/wx/company/member/static/users`, { params })

export const getMemberUser = (params) => axios.get(`/memeber/wx/company/member/${params.wxCorpUserId}/${params.externalUserid}`)

export const getCustomerStatic = (params) => axios.get(`/memeber/wx/company/member/customer-manager/static`, { params })
