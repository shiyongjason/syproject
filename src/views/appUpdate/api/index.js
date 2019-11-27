import axios from 'axios'

export const getAppVersionList = (params) => axios.get('/ims/app-versions', params)