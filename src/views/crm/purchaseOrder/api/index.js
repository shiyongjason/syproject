import axios from 'axios'

export const getPurchaseList = (params) => axios.get('/memeber/recommender/boss', { params })
