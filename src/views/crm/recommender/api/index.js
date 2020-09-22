import axios from 'axios'

export const getRecommenderList = (params) => axios.get('/memeber/recommender/boss', { params })
export const getRecommenderTotal = (params) => axios.get('/memeber/recommender/boss/statistics', { params })
export const getStatisticsCompanyList = (params) => axios.get('/memeber/recommender/recommend-companys/page', { params })
export const getStatisticsUserList = (params) => axios.get('/memeber/recommender/recommend-users/page', { params })
export const getRecommenderInfo = (userId) => axios.get(`/memeber/recommender/${userId}`)
