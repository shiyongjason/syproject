import axios from 'axios'

export const getRecommenderList = (params) => axios.get('/memeber/recommender/boss', { params })
export const getStatisticsCompanyList = (params) => axios.get('/memeber/recommender/recommend-companys/page', { params })
export const getStatisticsUserList = (params) => axios.get('/memeber/recommender/recommend-users/page', { params })
export const getRecommenderInfo = (userId) => axios.get(`/memeber/recommender/${userId}`)
export const getRecommenderRewardList = (params) => axios.get(`/memeber/recommend/reward/page`, {params})
