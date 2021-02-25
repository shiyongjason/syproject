import axios from 'axios'


export const getYearHoliday = (params) => axios.get(`http://192.168.20.248:30000/project/api/holidays/2021`)

export const setHoliday = (params) => axios.patch(`/project/api/holidays/${params.date}?isHoliday=${params.isHoliday}`)

export const getHolidayList = (params) => axios.get(`/project/api/holidays`, { params })

