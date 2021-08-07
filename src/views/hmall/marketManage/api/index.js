import instance from '@/api/axios_new.js'

// 新增和编辑活动
export const saveEvent = (params) => {
    return instance.post('/ops/api/spike', params)
}
// 编辑活动
export const editEvent = (params) => {
    return instance.put('/ops/api/spike', params)
}

// 刷单
export const clickFarming = (params) => {
    return instance.post('/ops/api/spike/click-farming', params)
}

// 发布 终止 活动
export const updateSpikeStatus = (params) => {
    return instance.post('/ops/api/spike/status', params)
}