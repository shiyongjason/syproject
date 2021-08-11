import axios from 'axios'
// 接口补偿机制列表
export const getApiCompensationSchemeList = (params) => axios.get('/project/api/interface-compensation-mechanisms/page', { params })
// 外部接口补偿机制重新调用
export const updateApiCompensationScheme = (id) => axios.put(`/project/api/interface-compensation-mechanisms/${id}/complete`)
