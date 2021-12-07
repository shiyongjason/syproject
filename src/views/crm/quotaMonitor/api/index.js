import axios from 'axios'

export const findQuotaPage = (params) => {
    return axios.get('memeber/api/quota/page', { params })
}
