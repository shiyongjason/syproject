import axios from 'axios'
// 埋点请求
export const tracking = (params) => axios.post('ets/api/event-tracks', params)
