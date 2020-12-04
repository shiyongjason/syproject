import axios from 'axios'
import { B2bUrl } from '@/api/config'

export const findSearchWordList = (params) => axios.get('ets/api/b2b/homepage/search-details', { params })

export const findSearchWordInfo = (params) => axios.get('ets/api/b2b/homepage/search/spu-details', { params })

export const findValidSearchList = (params) => axios.get('ets/api/b2b/homepage/search/daily_details', { params })

export const findClickRateList = (params) => axios.get('ets/api/b2b/homepage/search/click-rate', { params })

export const findNoResultList = (params) => axios.get('ets/api/b2b/homepage/search/non-reulsts', { params })

/* 2020-12-04 搜索词和同义词 starting */
export const findCustomDictList = (params) => axios.get(`${B2bUrl}search/open-api/dict/custom-dict/page`, { params }) // 词库列表
export const postCustomDict = (params) => axios.post(`${B2bUrl}search/open-api/dict/custom-dict/${params.dicType}/${params.keyword}`) // 新增词库
export const putCustomDict = (params) => axios.put(`${B2bUrl}search/open-api/dict/custom-dict/${params.customDictId}/${params.keyword}`) // 更新词库
export const deleteCustomDict = (params) => axios.delete(`${B2bUrl}search/open-api/dict/custom-dict/${params.customDictId}`) // 更新词库
/* 2020-12-04 搜索词和同义词 ending */
