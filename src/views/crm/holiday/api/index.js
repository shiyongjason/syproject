import axios from 'axios'


export const getYearHoliday = (params) => axios.get(`http://192.168.20.248:30000/project/api/holidays/2021`)