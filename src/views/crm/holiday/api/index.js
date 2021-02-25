import axios from 'axios'

export const getYearHoliday = (params) => axios.get(`/project/api/holidays/${params}`)

export const setHoliday = (params) => axios.patch(`/project/api/holidays/${params.date}?isHoliday=${params.isHoliday}`)

export const getHolidayList = (params) => axios.get(`/project/api/holidays`, { params })

export const getHolidayMax = (params) => axios.get(`/project/api/holidays/max-year`, { params })

export const getHolidaRevise = ({ year, params }) => axios.get(`/project/api/holidays/record/${year}`, { params })