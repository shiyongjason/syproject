import axios from 'axios'
const iotUrl = 'https://testiot.hosjoy.com:2286/'
// 工程方案列表
export const getCrmPlanList = (params) => axios.get(iotUrl + '/mall/boss/project-scheme', { params })
// 获取工程方案详情
export const getCrmPlanDetail = params => axios.get(iotUrl + '/mall/boss/project-scheme/' + params.id)
// 新增修改工程方案
export const addCrmPlanDetail = params => axios.post(iotUrl + '/mall/boss/project-scheme', params)
// 删除工程方案
export const deleteProjectScheme = params => axios.delete(iotUrl + '/mall/boss/project-scheme/' + params.id)
