import axios from 'axios'
// 服务预约列表
export const findReservations = (params) => axios.get('service/api/reservations/page', { params })
