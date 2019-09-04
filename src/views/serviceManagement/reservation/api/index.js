import axios from 'axios'
// 服务预约列表
export const findReservations = (params) => axios.get('service/api/reservations/page', { params })
// 预约信息详情
export const findReservationsDetail = (params) => axios.get(`service/api/reservations/${params}`)
// 更新服务预约记录
export const updataReservations = (params) => axios.put(`service/api/reservations`, params)
