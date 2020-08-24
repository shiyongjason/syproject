import axios from 'axios'

export const findSearchWordList = (params) => axios.get('ets/api/b2b/homepage/search-details', { params })

export const findSearchWordInfo = (params) => axios.get('ets/api/b2b/homepage/search/spu-details', { params })

export const findValidSearchList = (params) => axios.get('ets/api/b2b/homepage/search/daily_details', { params })

export const findClickRateList = (params) => axios.get('ets/api/b2b/homepage/search/click-rate', { params })

export const findNoResultList = (params) => axios.get('ets/api/b2b/homepage/search/non-reulsts', { params })
