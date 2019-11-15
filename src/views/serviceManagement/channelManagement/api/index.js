import axios from 'axios'

export function findChannelManagementList (params) {
    return axios.get('/service/api/index.do')
}
