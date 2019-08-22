import { getB2bUserInfo } from '../common/api'

export default {
    async getUserInfoMore ({ commit }) {
        const { data } = await getB2bUserInfo({ organizationCode: 'top' })
        const params = {
            organizationCode: data.data.organizationCode,
            organizationName: data.data.organizationName
        }
        commit('GET_USER_INFO_NAME_AND_CODE', params)
    }
}
