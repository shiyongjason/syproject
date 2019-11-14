import axios from 'axios'

// 
export const signCa = (params) => axios.post(`/signs`, params)
