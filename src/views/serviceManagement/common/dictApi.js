import axios from 'axios'

// 渠道字典
export function findChannelDict () {
    return axios.get('/service/api/common/channel/select')
}
