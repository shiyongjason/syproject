import axios from 'axios'
export const findBiToken = (params) => axios.get('/rms/bi/ali/token', { params })
