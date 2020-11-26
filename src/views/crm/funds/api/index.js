import axios from 'axios'

export const getFundsList = (params) => axios.get('/memeber/recommender/boss', { params })
