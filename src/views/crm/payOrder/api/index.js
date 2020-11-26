import axios from 'axios'

export const getPayOrderList = (params) => axios.get('/memeber/recommender/boss', { params })
