import instance from '@/api/axios_new.js'

// 新增和编辑活动
export const saveOrEditEvent = (params) => {
    return instance.post('/ops/api/spike', params)
}

// 刷单
export const clickFarming = (params) => {
    return instance.post('/ops/api/spike/click-farming', params)
}
