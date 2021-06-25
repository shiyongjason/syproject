import axios from 'axios'
// 工程方案列表
export const getCrmPlanList = (params) => axios.get('https://testiot.hosjoy.com:2286/mall/boss/project-scheme', { params })
