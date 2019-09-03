import axios from 'axios'
// 服务预约列表
export const findReservations = (params) => axios.get('/api/reservations/page', { params })
