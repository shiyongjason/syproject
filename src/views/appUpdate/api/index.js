import axios from 'axios'

// 查询app版本列表
export const getAppVersionList = (params) => axios.get('/ims/app-versions', { params })
// 新增app版本
export const addAppVersion = (params) => axios.post('/ims/app-versions', params)
// 更新APP版本状态
export const updateAppVersionState = (params) => axios.put('/ims/app-versions/update-status', params)
// 查询app版本详情
export const getAppVersionDetail = (id) => axios.get(`/ims/app-versions/${id}`)
// 修改app版本详情
export const editAppVersionDetail = (params) => axios.put(`/ims/app-versions/${params.id}`, params)
// // 删除APP版本记录
export const deleteAppVersion = (id) => axios.delete(`/ims/app-versions/${id}`)