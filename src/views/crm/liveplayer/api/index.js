import axios from 'axios'
// 直播列表
export const getLiveList = (params) => axios.get('/memeber/openapi/applet/live-info/boss', { params })

export const getRooms = (params) => axios.get('/memeber/openapi/applet/live-info/boss/room-ids', { params })

// 新增房间 保存

export const addLiveInfo = (params) => axios.post('/memeber/openapi/applet/live-info/boss-add', params)

// 保存启用

export const enableLiveInfo = (params) => axios.post('/memeber/openapi/applet/live-info/boss-enable', params)

// 新增房间 保存

export const addLiveInfoPut = (params) => axios.put(`/memeber/openapi/applet/live-info/boss-save/${params.id}`, params)

// 保存启用

export const enableLiveInfoPut = (params) => axios.put(`/memeber/openapi/applet/live-info/boss-enable/${params.id}`, params)

// 删除房间
export const deleteLiveInfo = (id) => axios.delete(`/memeber/openapi/applet/live-info/boss/${id}`)
// 房间详情
export const findLiveInfo = (id) => axios.get(`/memeber/openapi/applet/live-info/boss/${id}`)
// 放在首页
export const getHomePage = (id) => axios.patch(`/memeber/openapi/applet/live-info/boss-home-page/${id}`)
// 不放首页
export const getNoHomePage = (id) => axios.patch(`/memeber/openapi/applet/live-info/boss-not-home-page/${id}`)
