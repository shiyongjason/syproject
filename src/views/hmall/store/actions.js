import { getB2bUserInfo } from '../common/api'

export default {
    async getUserInfoMore ({ commit }) {
        const { data } = await getB2bUserInfo({ organizationCode: 'top' })
        // commit('GET_USER_INFO_NAME_AND_CODE')
        console.log(data, commit)
    }
}
