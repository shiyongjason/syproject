import axios from 'axios'

export const findSearchWordList = (params) => axios.get('ets/api/b2b/homepage/search-details', { params })
