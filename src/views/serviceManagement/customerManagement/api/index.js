import axios from 'axios'

export const findCustomerList = (params) => axios.get(`/service/api/channel-users`, { params })
export default {
    editCustomerInfo (params) {
        axios.put(`/service/api/channel-users/${params.id}`, { ...params })
    },
    addCustomerInfo (params) {
        axios.post(`/service/api/channel-users`, { ...params })
    }
}