import axios from 'axios'

export const getRecommenderRewardList = (params) => axios.get(`/memeber/recommend/reward/page`, { params })
export const getRecommenderRewardTotal = (params) => axios.get(`/memeber/recommend/reward/statis`, { params })
export const updateRecommenderPaid = (params) => axios.put(`/memeber/recommend/reward/paid`, params)
