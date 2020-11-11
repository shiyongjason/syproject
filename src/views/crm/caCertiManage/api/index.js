import axios from 'axios'
// 个人CA分页查询
export const getPersonalCAList = (params) => axios.get(`/project/api/ca/account/page`, { params })
// 企业CA分页查询
export const getCompanyCAList = (params) => axios.get(`/project/api/ca/org/page`, { params })
// 查看印章, CA类型：1-个人 2-企业
export const getCAImageBysealId = (params) => axios.get(`/project/api/ca/${params.sealId}`, { params })