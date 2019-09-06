import axios from 'axios'

export const findCustomerList = (params) => axios.get(`/service/api/channel-users`, { params })
export default {
    editCustomerInfo (params) {
        return axios.put(`/service/api/channel-users/${params.id}`, { ...params })
    },
    addCustomerInfo (params) {
        return axios.post(`/service/api/channel-users`, { ...params })
    }
}